<template>
  <el-container>
    <el-aside width="224px">
      <Category></Category>
    </el-aside>
    <el-main>
      <p @click="$router.push('/about')">This is index page.</p>
    </el-main>
  </el-container>
</template>

<script>
  import Category from "@/components/common/Category";

  export default {
    name: "Home",
    components: {Category}
  }
</script>

<style scoped>

</style>