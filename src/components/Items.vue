<template>
  <el-container>
    <el-aside width="224px">
      <Category></Category>
    </el-aside>
    <el-main>

    </el-main>
  </el-container>
</template>

<script>
  import Category from "@/components/common/Category";
  export default {
    name: "Items",
    components: {Category}
  }
</script>

<style scoped>

</style>