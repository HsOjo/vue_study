<template>
  <el-container class="center-container">
    <CenterTabs>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 16px; color: #666666;">当前账户余额：¥{{amount}}</span>
        </div>
        <el-input placeholder="请输入充值金额" v-model="value">
          <el-button slot="append" icon="el-icon-circle-plus-outline"
            @click="moneyCharge(value)"></el-button>
        </el-input>
      </el-card>
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
      amount: 0,
      value: null,
    }
  },
  created() {
    this.vm = this;
    this.getCurrentUser();
    this.getUserAmount();
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.stor.local.get('current_user');
    },
    moneyCharge(value) {
      this.req.post(this.api.USER_CHARGE, {
        amount: value, userId: this.current_user.id,
      }).then(
        resp => {
          this.notify('账户充值', resp.errorMsg);
          this.getUserAmount();
        }
      )
    },
    getUserAmount(){
      this.req.post(this.api.USER_AMOUNT, {
        userId: this.current_user.id,
      }).then(
        resp => {
          this.amount = resp.data.amount;
        }
      )
    }
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