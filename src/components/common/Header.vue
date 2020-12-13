<template>
  <el-menu class="el-menu-demo" mode="horizontal" style="min-width: 960px">
    <el-menu-item @click="$router.push('/')">
      <img id="img-logo" src="@/assets/logo.gif" alt="logo">
    </el-menu-item>

    <el-menu-item index="1">
      <el-input placeholder="请输入内容" v-model="keyword">
        <el-button slot="append" icon="el-icon-search" @click="$router.push(`/search/${keyword}`)"></el-button>
      </el-input>
    </el-menu-item>

    <template v-if="current_user">
      <el-menu-item style="float: right" index="2">
        <!-- 会员中心 -->
        <el-dropdown trigger="click" @command="userCommand">
          <span class="el-dropdown-link expand-menu-item">
            <i class="el-icon-user"></i>
            会员中心
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in center_items" :key="item.path" :command="item.path" :icon='item.icon'>{{item.title}}</el-dropdown-item>
            <el-dropdown-item command="logout" icon='el-icon-switch-button' divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item style="float: right">欢迎，{{current_user.nickname}}。</el-menu-item>
      <el-menu-item style="float: right" index="4">
        <!-- 购物车 -->
        <el-dropdown trigger="click" :hide-on-click="false" ref="cart" @command="cartCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-shopping-cart-1 expand-menu-item"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-if="cart_items.length">
              <el-dropdown-item v-for="commodity in cart_items" :key="commodity.id">
                <el-row style="width: 320px">
                  <router-link :to="`/commodity/${commodity.id}`">
                    <el-col :span="6">
                      <el-image :src="vm.api.BASE + commodity.defaultImg" fit="scale-down" class="commodity-thumb"></el-image>
                    </el-col>
                    <el-col :span="18">
                      <span style="color: #666666; font-size:9px">{{commodity.name}}</span>
                      <br>
                      <span style="color: #233333; font-size: 12px">¥{{commodity.shopPrice}}</span>
                      &nbsp;
                      <span style="color: #aaaaaa; font-size:9px">数量：{{commodity.quantity}}</span>
                    </el-col>
                  </router-link>
                </el-row>
              </el-dropdown-item>
              <el-dropdown-item class="cart-final-item" command="final" divided>
                <el-tag type="warning">共：¥{{cart_price}}</el-tag>
                <router-link to="/account/shopping-cart">
                  <el-button type="success" style="float: right" size="mini">查看购物车</el-button>
                </router-link>
              </el-dropdown-item>
            </template>
            <el-dropdown-item v-else disabled>购物车空空如也，去整点啥吧。</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </template>
    <template v-else>
      <el-menu-item style="float: right;" index="5">
        <router-link to="/login">登录</router-link>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        vm: null,
        current_user: null,
        cart_items: [],
        cart_price: null,
        center_items: [
          {path:'/account/my-orders', title:'我的订单', icon:'el-icon-tickets'},
          {path:'/account/favourites', title:'收藏夹', icon:'el-icon-star-off'},
          {path:'/account/contacts', title:'常用联系人', icon:'el-icon-collection'},
          {path:'/account/infomation', title:'个人信息', icon:'el-icon-user'},
          {path:'/account/charge', title:'账户充值', icon:'el-icon-money'},
          {path:'/account/payment', title:'未支付订单', icon:'el-icon-goods'},
        ],
        keyword: this.$route.params.keyword,
      }
    },
    created() {
      this.vm = this;
      this.bus.$on('userChanged', this.getCurrentUser);
      this.getCurrentUser();
      this.bus.$on('cartChanged', this.getCartItems);
      this.getCartItems();
    },
    methods: {
      cartCommand(command) {
        if(command !== 'final') {
          this.$refs.cart.visible = false
        }
      },
      userCommand(command){
        if (command === 'logout') {
          this.stor.local.remove('current_user');
          this.bus.$emit('userChanged');
          if(this.$route.path.indexOf('/account') !== -1) {
            this.$router.push('/');
          }
        } else {
          this.$router.push(command);
        }
      },
      getCurrentUser() {
        this.current_user = this.stor.local.get('current_user');
      },
      getCartItems() {
        if (!this.current_user) return;
        this.req.post(this.api.CART_LIST, {
          userId: this.current_user.id,
        }).then(
          resp => {
            this.cart_items = resp.data.productList;
            this.cart_price = resp.data.price.toFixed(2);
          }
        )
      }
    }
  }
</script>

<style scoped>
  * {
    user-select: none;
  } 

  #img-logo {
    height: 100%;
  }

  .commodity-thumb {
    border: 1px solid #ebebeb;
    padding: 2px;
    border-radius: 4px;
    width: 64px;
    height: 64px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .cart-final-item {
    background: white;
    cursor: auto;
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .cart-final-item:hover {
    background: white;
  }

  .expand-menu-item {
    padding-top: 16px;
    padding-bottom: 16px;
  }
</style>