<template>
  <el-container>
    <el-aside width="224px">
      <CategoryAside></CategoryAside>
    </el-aside>
    <el-main id="category-container">
      <div class="commodity-block" v-for="commodity in category" :key="commodity.id">
        <router-link :to="`/commodity/${commodity.id}`" class="commodity-link">
          <el-image :src="vm.api.BASE + commodity.defaultImg" fit="cover" class="commodity-img"></el-image>
          {{ commodity.name }}
        </router-link>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import CategoryAside from "@/components/common/CategoryAside";

  export default {
    name: "Category",
    components: {CategoryAside},
    data() {
      return {
        vm: null,
        category: []
      }
    },
    computed: {
      categoryId() {
        return this.$route.params.id;
      }
    },
    watch: {
      categoryId(new_value) {
        this.getCategoryInfo(new_value);
      }
    },
    created() {
      this.vm = this;
      this.getCategoryInfo(this.categoryId);
    },
    methods: {
      getCategoryInfo(category_id) {
        this.req.get(`${this.api.CATEGORY_INFO}/${category_id}`).then(
            resp => {
              this.category = resp.data.data.productList;
            }
        );
      }
    },
  }
</script>

<style scoped>
  #category-container {
    display: flex;
    flex-wrap: wrap;
  }

  .commodity-block {
    width: 150px;
    margin-right: 32px;
    text-align: left;
    margin-left: 20px;
    margin-bottom: 40px;
  }

  .commodity-link {
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    text-decoration: none;
  }

  .commodity-img {
    width: 144px;
    height: 144px;
    border: #ebebeb solid 1px;
    border-radius: 4px;
    padding: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .commodity-img:hover {
    box-shadow: 0 2px 4px rgba(255, 0, 0, 1), 0 0 6px rgba(0, 0, 0, .04)
  }
</style>