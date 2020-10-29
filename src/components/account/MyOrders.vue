<template>
  <el-container class="center-container">
    <CenterTabs>
      <el-row>
        <el-table :data="order_items" border>
          <el-table-column
            fixed
            prop="orderNum"
            label="订单编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="contactName"
            label="联系人姓名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="contactMobile"
            label="联系人电话"
            width="120">
          </el-table-column>
          <el-table-column
            prop="note"
            label="订单状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="price"
            label="订单金额"
            width="300">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 8px">
        <el-pagination background layout="prev, pager, next" @current-change="getOrderItems(page_now)"
        :total="page_max" :page-size="1" :current-page.sync="page_now"></el-pagination>
      </el-row>
    </CenterTabs>
  </el-container>
</template>

<script>
import CenterTabs from '@/components/account/common/CenterTabs'
export default {
  name: 'MyOrders',
  components: {CenterTabs},
  data() {
    return {
      vm: null,
      current_user: null,
      order_items: [],
      page_now: 1,
      page_max: 1,
    }
  },
  created() {
    this.vm = this;
    this.getCurrentUser();
    this.getOrderItems(this.page_now);
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.stor.local.get('current_user');
    },
    getOrderItems(page) {
      this.req.post(this.api.ORDER_LIST, {
        userId: this.current_user.id,
        type: 0, nowPage: page,
      }).then(
        resp => {
          this.page_now = resp.data.nowPage;
          this.page_max = resp.data.pageCount;
          this.order_items = resp.data.orderListData;
        }
      )
    },
  }
}
</script>

<style scoped>
.center-container {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}
</style>