<template>

  <el-menu>
    <el-menu-item v-for="category in categories" :key="category.id" @click="openCategory(category)">
      <img class="pic-category" :src="vm.api.BASE + category.image" alt=""/>
      {{category.name}}
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "CategoryAside",
    data() {
      return {
        vm: null,
        categories: [
          // {id: null, image: null, name: null, sortOrder: null}
        ]
      };
    },
    created() {
      this.vm = this;
      this.getCategories();
    },
    methods: {
      getCategories() {
        this.req.get(this.api.CATEGORY_LIST).then(resp => {
          this.categories = resp.data;
          this.categories.sort((a, b) => {
            return a.sortOrder > b.sortOrder;
          })
        })
      },
      openCategory(category) {
        this.$router.push(`/category/${category.id}`)
      },
    }
  }
</script>

<style scoped>
  .pic-category {
    width: 32px;
    border-radius: 32px;
    border-color: black;
    box-shadow: 0 0 10px black;
    margin-right: 8px;
  }
</style>