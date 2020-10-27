<template>
<el-container class="commodity-block">
    <router-link :to="`/commodity/${item_id}`" class="commodity-link">
        <el-image :src="item_img" fit="cover" class="commodity-img"></el-image>
        <span style="display: block">{{ item_name }}</span>
        <span style="text-decoration: line-through; color: #aaaaaa; font-size: 12px">¥{{item_price}}</span>&nbsp;
        <span style="font-size: 16px">¥{{item_price_real}}</span>
    </router-link>
</el-container>
</template>

<script>
export default {
  name: 'CommodityItem',
  props: ['item_id', 'item_name', 'item_img', 'item_price', 'item_price_real', ],
}
</script>

<style scope>
  .commodity-block {
    margin-right: 32px;
    margin-left: 20px;
    margin-bottom: 40px;
    flex: none;
  }

  .commodity-link {
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    text-decoration: none;
    width: 150px;
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