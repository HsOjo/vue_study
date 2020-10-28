<template>
<el-container>
  <el-row style="width: 1024px; margin-left: auto; margin-right: auto;">
    <el-col :span="18">
      <el-table :data="cart_items">
        <el-table-column label="产品名称" width="400">
          <template slot-scope="scope">
            <router-link :to="`/commodity/${scope.row.id}`">
              <el-col :span="6">
                <el-image :src="vm.api.BASE + scope.row.defaultImg" fit="scale-down" class="commodity-thumb"></el-image>
              </el-col>
              <el-col :span="18">
                <span style="color: #233333">{{ scope.row.name }}</span>
              </el-col>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="200">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.quantity"
              :min="1" label="数量" size="small"></el-input-number>
            <span style="display:block">× ¥{{scope.row.shopPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="合计价格" width="150">
          <template slot-scope="scope">
            <span style="font-size: 16px">¥{{scope.row.shopPrice * scope.row.quantity}}</span>
            <el-button size="small" type="danger" icon="el-icon-delete" circle
              style="float: right; margin-right: 16px" @click="removeCartItem(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="float: right; margin-top: 16px; margin-right: 32px">
        <el-button type="danger" @click="removeCartAllItems()">清空购物车</el-button>
        <el-button type="success" @click="updateCartItems()">更新购物车</el-button>
      </el-row>
    </el-col>
    <el-col :span="6" style="padding-top: 32px; font-size: 14px; color: #666666">
      <el-row>
        <span>商品总价：</span>
        <span style="float: right">¥{{totalPrice}}</span>
      </el-row>
      <el-row>
        <span>物流费用</span>
        <span style="float: right">包邮</span>
        <el-divider/>
      </el-row>
      <el-row>
        <span>合计金额：</span>
        <span style="float: right">¥{{totalPrice}}</span>
      </el-row>
      <el-row style="margin-top: 16px">
        <el-button type="success" style="display: block; float: right">立即支付</el-button>
      </el-row>
    </el-col>
  </el-row>
</el-container>
</template>

<script>
export default {
  name: 'ShoppingCart',
  data() {
    return {
      vm: null,
      current_user: null,
      cart_items: [],
      cart_price: null,
    }
  },
  created() {
    this.vm = this;
    this.bus.$on('userChanged', this.getCurrentUser);
    this.getCurrentUser();
    this.bus.$on('cartChanged', this.getCartItems);
    this.getCartItems();
  },
  computed: {
    totalPrice() {
      let price = 0;
      for (let commodity of this.cart_items) {
        price += commodity.shopPrice * commodity.quantity;
      }
      return price.toFixed(2);
    },
  },
  methods: {
    checkLogin(){
      if(!this.current_user){
        this.$router.push('/login');
        return false;
      }
      return true;
    },
    getCurrentUser() {
      this.current_user = this.stor.local.get('current_user');
    },
    getCartItems() {
      this.req.post(this.api.CART_LIST, {
        userId: this.current_user.id,
      }).then(
        resp => {
          this.cart_items = resp.data.productList;
          this.cart_price = resp.data.price.toFixed(2);
        }
      )
    },
    removeCartItem(commodity_id) {
      this.checkLogin();
      this.req.post(`${this.api.CART_REMOVE}`, {
        productId: commodity_id,
        userId: this.current_user.id,
      }).then(
        resp => {
          this.bus.$emit('cartChanged');
          this.notify('移除购物车', resp.errorMsg);
        }
      );
    },
    removeCartAllItems() {
      this.checkLogin();
      this.req.post(`${this.api.CART_REMOVE_ALL}`, {
        userId: this.current_user.id,
      }).then(
        resp => {
          this.bus.$emit('cartChanged');
          this.notify('清空购物车', resp.errorMsg);
        }
      );
    },
    updateCartItems(){
      let items = [];
      for(let commodity of this.cart_items){
        items.push({ productId: commodity.id, quantity: commodity.quantity })
      }
      this.req.post(`${this.api.CART_UPDATE}`, {
        cartItemList: items,
        userId: this.current_user.id,
      }).then(
        resp => {
          this.bus.$emit('cartChanged');
          this.notify('更新购物车', resp.errorMsg);
        }
      );
    }
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
</style>