<template>

  <el-menu>
    <el-menu-item v-for="category in categories" v-bind:index="category.id" v-bind:key="category" @click="openCategory(category)">
      <img class="pic-category" v-bind:src="vm.api.BASE + category.image" alt=""/>
      {{category.name}}
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "Category",
    data() {
      return {
        vm: null,
        categories: [
          {id: null, image: null, name: null, sortOrder: null}
        ]
      };
    },
    created() {
      this.vm = this;
      this.getCategories();
    },
    methods: {
      getCategories() {
        this.req.get(this.api.CONTACT_LIST).then(resp => {
          this.categories = resp.data;
          this.categories.sort(function (a, b) {
            return a.sortOrder > b.sortOrder;
          })
        })
      },
      openCategory(category) {
        console.log(category)
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