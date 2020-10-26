<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Header from "@/components/common/Header";
  import Footer from "@/components/common/Footer";

  export default {
    name: 'App',
    components: {Header, Footer}
  }
</script>

<style>
  body {
    margin: 0;
  }

  #app {
    padding: 0;
    margin: 0 auto;
    width: 1140px;
  }
</style>