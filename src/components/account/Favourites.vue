<template>
  <el-container class="center-container">
    <CenterTabs>
      <el-row>
        <el-table :data="favourite_items.slice((page_now - 1) * page_size, page_now * page_size)" border>
          <el-table-column label="商品名称" width="400">
            <template slot-scope="scope">
              <el-col :span="6">
                <el-image :src="vm.api.BASE + scope.row.product.defaultImg" fit="scale-down" class="commodity-thumb"></el-image>
              </el-col>
              <el-col :span="18">
                <span style="color: #233333">{{ scope.row.product.name }}</span>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column label="市场价格" width="150">
            <template slot-scope="scope">
              <span style="font-size: 16px; text-decoration: line-through; color: #aaaaaa">¥{{scope.row.product.price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="店内价格" width="150">
            <template slot-scope="scope">
              <span style="font-size: 16px">¥{{scope.row.product.shopPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <router-link :to="`/commodity/${scope.row.product.productId}`">
                <el-button size="mini" style="margin-right: 8px">查看</el-button>
              </router-link>
              <el-button size="mini" type="danger" @click="removeFavouriteItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="margin-top: 8px">
        <el-pagination background layout="prev, pager, next, sizes" :page-size.sync="page_size"
        :total="favourite_items.length" :page-sizes="[5, 10, 50, 100]" :current-page.sync="page_now"></el-pagination>
      </el-row>
    </CenterTabs>
  </el-container>
</template>

<script>
import CenterTabs from '@/components/account/common/CenterTabs'
export default {
  name: 'Favourites',
  components: {CenterTabs},
  data() {
    return {
      vm: null,
      current_user: null,
      favourite_items: [],
      page_now: 1,
      page_size: 5,
    }
  },
  created() {
    this.vm = this;
    this.getCurrentUser();
    this.getFavouriteItems(this.page_now);
  },
  methods: {
    getCurrentUser() {
      this.current_user = this.stor.local.get('current_user');
    },
    getFavouriteItems() {
      this.req.post(`${this.api.FAVOURITE_LIST}/1`, {
        userId: this.current_user.id,
      }).then(
        resp => {
          this.favourite_items = resp.data;
        }
      )
    },
    removeFavouriteItem(item_id) {
      this.req.post(`${this.api.FAVOURITE_REMOVE}`, {
        id: item_id,
        userId: this.current_user.id,
      }).then(
        resp => {
          this.notify('移除收藏', resp.errorMsg);
          this.getFavouriteItems();
        }
      );
    },
  }
}
</script>

<style scoped>
.center-container {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

.commodity-thumb {
  border: 1px solid #ebebeb;
  padding: 2px;
  border-radius: 4px;
  width: 64px;
  height: 64px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

</style>