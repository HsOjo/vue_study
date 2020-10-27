<template>
  <el-container>
    <el-aside width="224px">
      <CategoryAside></CategoryAside>
    </el-aside>
    <el-main>
      <p @click="$router.push('/login')">This is index page.</p>
    </el-main>
  </el-container>
</template>

<script>
  import CategoryAside from "@/components/common/CategoryAside";

  export default {
    name: "Home",
    components: {CategoryAside}
  }
</script>

<style scoped>

</style>