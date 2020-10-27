<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item>
      <router-link to="/">
        <img id="img-logo" src="@/assets/logo.gif" alt="logo">
      </router-link>
    </el-menu-item>

    <el-menu-item>
      <el-input placeholder="请输入内容">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-menu-item>

    <el-menu-item style="float: right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-user"></i>
          会员中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
    <el-menu-item style="float: right">欢迎，xxx。</el-menu-item>
    <el-menu-item style="float: right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-shopping-cart-1"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "Header"
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
</style>