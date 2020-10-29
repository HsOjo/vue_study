<template>
  <el-container>
    <el-aside width="224px">
      <CategoryAside></CategoryAside>
    </el-aside>
    <el-main>
      <el-row v-for="category in categories" :key="category.id">
        <span style="text-align: center; display: block; color: rgba(0,0,0,0.6)">{{category.name}}</span>
        <el-divider/>
        <el-container class="category-container">
          <CommodityItem v-for="commodity in category.productRelationList" :key="commodity.id"
          :item_id="commodity.id"
          :item_name="commodity.name"
          :item_img="vm.api.BASE + commodity.defaultImg"
          :item_price="commodity.price"
          :item_price_real="commodity.shopPrice"
          ></CommodityItem>
        </el-container>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import CategoryAside from "@/components/common/CategoryAside";
  import CommodityItem from "@/components/common/CommodityItem";

  export default {
    name: "Home",
    components: {CategoryAside, CommodityItem},
    data() {
      return {
        vm: null,
        categories: [],
      }
    },
    created() {
      this.vm = this;
      this.getCategories();
    },
    methods: {
      getCategories() {
        this.req.get(this.api.CATEGORY_SUMMARY).then(resp => {
          this.categories = resp.data;
          this.categories.sort((a, b) => {
            return a.sortOrder > b.sortOrder;
          })
        })
      },
    }
  }
</script>

<style scoped>
  .category-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>