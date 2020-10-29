<template>
  <el-container>
    <el-main class="search-container">
      <span style="text-align: center; display: block; color: rgba(0,0,0,0.8); font-size: 24px">查询关键字：{{keyword}}</span>
      <el-divider/>
      <CommodityItem v-for="commodity in commodity_items" :key="commodity.id"
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
  import CommodityItem from "@/components/common/CommodityItem";

  export default {
    name: "Search",
    components: {CommodityItem},
    data() {
      return {
        vm: null,
        commodity_items: []
      }
    },
    computed: {
      keyword() {
        return this.$route.params.keyword;
      }
    },
    created() {
      this.vm = this;
      this.getSearchItems(this.keyword);
    },
    methods: {
      getSearchItems(keyword) {
        this.req.get(`${this.api.COMMODITY_SEARCH}/${keyword}/page/1`).then(
          resp => {
            this.commodity_items = resp.data.productList;
          }
        );
      }
    },
  }
</script>

<style scoped>
  .search-container {
    display: flex;
    flex-wrap: wrap;
    flex: none;
    width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
</style>