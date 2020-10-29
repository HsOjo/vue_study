<template>
  <el-tabs v-model="path" type="card" @tab-click="tabClicked">
    <el-tab-pane v-for="tab in tabs" :label="tab.title" :name="tab.path" :key="tab.path">
      <slot v-if="tab.path == path"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      path: this.$route.path,
      tabs: [
        {path:'/account/my-orders', title:'我的订单'},
        {path:'/account/favourites', title:'收藏夹'},
        {path:'/account/contacts', title:'常用联系人'},
        {path:'/account/infomation', title:'个人信息'},
        {path:'/account/charge', title:'账户充值'},
        {path:'/account/payment', title:'未支付订单'},
      ],
    };
  },
  name: 'CenterTabs',
  methods: {
    tabClicked() {
      if(this.path !== this.$route.path) {
        this.$router.push(this.path);
      }
    },
  },
}
</script>

<style scoped>

</style>