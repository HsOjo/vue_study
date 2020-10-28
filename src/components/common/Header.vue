<template>
  <el-menu class="el-menu-demo" mode="horizontal" style="min-width: 960px">
    <el-menu-item>
      <router-link to="/">
        <img id="img-logo" src="@/assets/logo.gif" alt="logo">
      </router-link>
    </el-menu-item>

    <el-menu-item index="1">
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-menu-item>

    <template v-if="current_user">
      <el-menu-item style="float: right" index="2">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i>
            会员中心
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
      <el-menu-item style="float: right">欢迎，{{current_user.nickname}}。</el-menu-item>
      <el-menu-item style="float: right" index="4">
        <el-dropdown trigger="click" :hide-on-click="false" ref="dropdown" @command="checkDropDown">
          <span class="el-dropdown-link">
            <i class="el-icon-shopping-cart-1"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
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
              <el-button type="success" style="float: right" size="mini">查看购物车</el-button>
            </el-dropdown-item>
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
      }
    },
    created() {
      this.vm = this;
      this.bus.$on('userChanged', () => {
        this.current_user = this.stor.local.get('current_user');
      });
      this.bus.$emit('userChanged');

      this.bus.$on('cartChanged', this.getCartItems);
      this.bus.$emit('cartChanged');
    },
    methods: {
      checkDropDown(command) {
        if(command !== 'final') {
          this.$refs.dropdown.visible = false
        }
      },
      userCommand(command){
        if (command === 'logout') {
          this.stor.local.remove('current_user');
          this.bus.$emit('userChanged');
        }
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
    padding-bottom: 2px;
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
</style>