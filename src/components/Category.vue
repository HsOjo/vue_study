<template>
  <el-container>
    <el-aside width="224px">
      <CategoryAside></CategoryAside>
    </el-aside>
    <el-main class="category-container">
      <CommodityItem v-for="commodity in category" :key="commodity.id"
       :item_id="commodity.id"
       :item_name="commodity.name"
       :item_img="vm.api.BASE + commodity.defaultImg"
       :item_price="commodity.price"
       :item_price_real="commodity.shop_price"
       ></CommodityItem>
    </el-main>
  </el-container>
</template>

<script>
  import CategoryAside from "@/components/common/CategoryAside";
  import CommodityItem from "@/components/common/CommodityItem";

  export default {
    name: "Category",
    components: {CategoryAside, CommodityItem},
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
            this.category = resp.data.productList;
          }
        );
      }
    },
  }
</script>

<style scoped>
  .category-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>