<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main id="main-content">
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
    width: 100vw;
  }

  #main-content {
    min-height: calc(100vh - 120px);
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    width: 1600px;
  }
</style>