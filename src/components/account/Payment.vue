<template>
<el-container>
  <el-row style="width: 1024px; margin-left: auto; margin-right: auto;" v-if="order_items">
    <el-col :span="18">
      <el-table :data="order_items" border>
        <el-table-column label="产品名称" width="400">
          <template slot-scope="scope">
            <router-link :to="`/commodity/${scope.row.productList[0].id}`">
              <el-col :span="6">
                <el-image :src="vm.api.BASE + scope.row.productList[0].defaultImg" fit="scale-down" class="commodity-thumb"></el-image>
              </el-col>
              <el-col :span="18">
                <span style="color: #233333">{{ scope.row.productList[0].name }}</span>
              </el-col>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="200">
          <template slot-scope="scope">
            <span style="font-size: 16px">{{scope.row.quantity}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合计价格" width="150">
          <template slot-scope="scope">
            <span style="font-size: 16px; display: block">¥{{scope.row.quantity * scope.row.price}}</span>
            <span style="font-size: 12px">{{scope.row.quantity}} × ¥{{scope.row.price}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 16px">
        <span class="divide-title">选择常用联系人</span>
        <el-divider/>
        <el-radio v-model="contact_id" v-for="item in contact_items" :label="item.id" :key="item.id"
          style="display: block; margin: 8px; font-size: 16px;">{{`姓名：${item.name}    联系电话：${item.mobile}    地址：${item.address}`}}</el-radio>
      </el-row>
      <el-row style="margin-top: 16px">
        <span class="divide-title">选择是否需要发票</span>
        <el-divider/>
        <el-radio v-model="ticket" :label="true">是</el-radio>
        <el-radio v-model="ticket" :label="false">否</el-radio>
      </el-row>
      <el-row style="margin-top: 16px">
        <span class="divide-title">请选择支付方式</span>
        <el-divider/>
        <el-button style="padding: 0" @click="wechatPayment()"><img src="@/assets/wechat.png"/></el-button>
        <el-button style="padding: 0" @click="aliPayment()"><img src="@/assets/alipay.png"/></el-button>
        <el-dialog title="支付宝扫码" :visible.sync="alipay_visible"
          width="360px" style="text-align: center" :before-close="(done) => { stopAlipayCheck(); done(); }">
          <el-badge :value="alipay_status">
            <qr :logoSrc="require('@/assets/alipay.png')" :size="256" :text="qrdata"></qr>
          </el-badge>
        </el-dialog>
      </el-row>
    </el-col>
    <el-col :span="6" style="padding: 24px; font-size: 14px; color: #666666; background-color: #f4f4f4; margin-top: 16px">
      <el-row>
        <span>商品总价：</span>
        <span style="float: right">¥{{price}}</span>
      </el-row>
      <el-row>
        <span>物流费用</span>
        <span style="float: right">包邮</span>
        <el-divider/>
      </el-row>
      <el-row>
        <span>合计金额：</span>
        <span style="float: right">¥{{price}}</span>
      </el-row>
    </el-col>
  </el-row>
  <el-row v-else style="padding-top: 128px; display: flex; flex: 1; justify-content: center;">
    <span style="font-size: 64px; color: #233333">暂无未支付订单。</span>
  </el-row>
</el-container>
</template>

<script>
import qr from 'vue-qr';

export default {
  name: 'Payment',
  components: {qr},
  data() {
    return {
      vm: null,
      current_user: null,
      order_items: [],
      contact_items: [],
      price: null,
      contact_id: null,
      ticket: false,
      order_num: null,
      alipay_visible: false,
      alipay_check_timer: null,
      alipay_status: null,
    }
  },
  created() {
    this.vm = this;
    this.getCurrentUser();
    this.getOrderItems();
  },
  computed: {
    totalPrice() {
      let price = 0;
      for (let commodity of this.order_items) {
        price += commodity.shopPrice * commodity.quantity;
      }
      return price.toFixed(2);
    },
    qrdata() {
      return JSON.stringify({
        orderNum: this.order_num,
        userId: this.current_user.id,
        id: this.contact_id,
        paymentType: 1,
      });
    },
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.stor.local.get('current_user');
    },
    getOrderItems() {
      this.req.post(this.api.ORDER_VIEW, {
        userId: this.current_user.id,
      }).then(
        resp => {
          if (resp.data) {
            this.order_items = resp.data.orderItemList;
            this.contact_items = resp.data.contectList;
            for(let item of this.contact_items) {
              if (item.contactFlag) {
                this.contact_id = item.id;
              }
            }
            this.price = resp.data.price.toFixed(2);
            this.order_num = resp.data.orderNum;  
          } else {
            this.order_items = null;
          }
        }
      )
    },
    wechatPayment() {
      this.req.post(this.api.PAYMENT_WECHAT, {
        id: 101,
        orderNum: this.order_num,
        paymentType: 0,
        userId: this.current_user.id,
      }).then(
        resp => {
          this.notify('微信支付', resp.errorMsg);
          this.getOrderItems();
        }
      )
    },
    aliPayment() {
      this.alipay_visible = true;
      this.alipay_check_timer = setInterval(
        ()=>{
          this.req.post(this.api.PAYMENT_ALIPAY_CHECK, {
            orderNum: this.order_num,
            userId: this.current_user.id,
          }).then(
            resp => {
              this.alipay_status = resp.errorMsg;
              if (resp.data) {
                this.notify('支付宝付款', resp.errorMsg);
                this.stopAlipayCheck();
                this.getOrderItems();
              }
            }
          )
        }, 1000
      )
    },
    stopAlipayCheck() {
      clearInterval(this.alipay_check_timer);
    },
  }
}
</script>

<style scoped>
  .commodity-thumb {
    border: 1px solid #ebebeb;
    padding: 2px;
    border-radius: 4px;
    width: 64px;
    height: 64px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .divide-title {
    text-align: center;
    display: block;
    color: rgba(0,0,0,0.6);
    font-size: 24px;
    font-weight: bold;
  }
</style>