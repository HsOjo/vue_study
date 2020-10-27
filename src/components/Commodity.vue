<template>
  <el-container class="commodity-container">
    <el-row>
      <h1 class="commodity-title">{{commodity.name}}</h1>
    </el-row>
    <el-row style="margin-top: 24px">
      <el-col :span="16">
        <el-row>
          <!-- 商品信息 -->
          <el-col :span="12">
            <el-image :src="vm.api.BASE + commodity.defaultImg" fit="scale-down" class="commodity-img"></el-image>
          </el-col>
          <el-col :span="12" class="commodity-info">
            <el-row style="padding-bottom: 16px">
              <span class="commodity-price">市场价：¥{{commodity.price}}</span>&nbsp;
              <span class="commodity-price-real" style="font-size: 24px;">¥{{commodity.shop_price}}</span>
              <el-button type="warning" icon="el-icon-star-off" circle id="btn-favourite" style="float: right;"></el-button>
            </el-row>
            <el-row style="margin-top: 8px">
              <span style="color: #aeaeae; font-size: 16px">商品简介：</span><br>
              <span style="color: #233333; font-size: 12px; display: block; margin-top: 6px">{{commodity.general_explain}}</span>
              <el-divider></el-divider>
            </el-row>
            <el-row style="text-align: center">
              <span style="color: #aeaeae; font-size: 12px">购买数量：</span>
              <el-input-number v-model="count" :min="1" :max="10"></el-input-number>
            </el-row>
            <el-row style="margin-top: 16px; text-align: center">
              <el-button type="warning" round @click="addCart(commodity.id, count)">加入购物车</el-button>
              <el-button type="danger" round>立即购买</el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="padding-top: 32px">
          <!-- 评论区 -->
          <el-tabs type="border-card">
            <el-tab-pane label="商品描述">
              <span v-html="commodity.explain"></span>
            </el-tab-pane>
            <el-tab-pane label="商品评论">
              <el-row style="margin-bottom: 32px">
                <span style="display: block;">添加评论</span>
                <el-divider></el-divider>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="comment_text"
                  maxlength="30"
                  show-word-limit
                  :rows="4"
                ></el-input>
                <el-row style="margin-top: 16px">
                  <el-rate 
                    v-model="comment_star"
                    :score-template="`${comment_star}分`"
                    show-score text-color="#ff9900"
                    style="float: left"
                  ></el-rate>
                  <el-button type="primary" icon="el-icon-edit" style="float: right"
                    @click="addComment(commodityId, comment_text, comment_star)">提交</el-button>
                </el-row>
              </el-row>
              <el-card class="box-card" v-for="comment in comments" :key="comment.id" style="margin-bottom: 24px">
                <div slot="header" class="clearfix">
                  <span style="font-size: 16px; margin-right: 16px">{{comment.user.nickname}}</span>
                  <el-rate 
                    v-model="comment.stars"
                    :score-template="`${comment.stars}分`"
                    disabled show-score text-color="#ff9900"
                    style="display: inline"
                    ></el-rate>
                </div>
                <span style="color: #aaaaaa; font-size: 14px">{{comment.content}}</span>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>
      <el-col :span="8" style="padding-left: 32px">
        <!-- 热销商品 -->
        <p style="color: #233333;">热销商品</p>
        <el-divider></el-divider>
        <el-row v-for="commodity in best_sellers" :key="commodity.id" style="margin-bottom: 16px;">
          <router-link :to="`/commodity/${commodity.id}`">
          <el-col :span="6">
            <el-image :src="vm.api.BASE + commodity.defaultImg" fit="scale-down" class="commodity-thumb"></el-image>
          </el-col>
          <el-col :span="18">
            <span style="color: #666666; font-size:9px">{{commodity.name}}</span>
            <br>
            <span style="color: #233333; font-size: 12px">¥{{commodity.shop_price}}</span>
            &nbsp;
            <span style="color: #aaaaaa; font-size:9px; text-decoration: line-through">市场价：¥{{commodity.price}}</span>
          </el-col>
          </router-link>
        </el-row>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
  export default {
    name: "Commodity",
    data() {
      return {
        vm: null,
        commodity: {},
        best_sellers: null,
        comments: null,
        comment_star: 0,
        comment_text: "",
        count: 1,
      }
    },
    created() {
      this.vm = this;
      this.getCommodityInfo(this.commodityId)
      this.getBestSellers(this.commodityId)
      this.getComments(this.commodityId)
    },
    computed: {
      commodityId() {
        return this.$route.params.id;
      }
    },
    watch: {
      commodityId(new_value) {
        this.getCommodityInfo(new_value)
        this.getBestSellers(new_value)
        this.getComments(new_value)
        this.bus.$emit('click', 123)
      }
    },

    methods: {
      getCommodityInfo(commodity_id) {
        this.req.post(`${this.api.COMMODITY_INFO}`, {productId: commodity_id}).then(
            resp => {
              this.commodity = resp.data.data;
            }
        );
      },
      getBestSellers(commodity_id) {
        this.req.get(`${this.api.COMMODITY_HOT_LIST}/${commodity_id}/hot/1/pagesize/3`).then(
            resp => {
              this.best_sellers = resp.data.data;
            }
        );
      },
      getComments(commodity_id) {
        this.req.get(`${this.api.COMMODITY_COMMENT_LIST}/${commodity_id}`).then(
            resp => {
              this.comments = resp.data.data;
            }
        );
      },
      addCart(commodity_id, num) {
        this.req.post(`${this.api.CART_ADD}`, {
          productId: commodity_id,
          quantity: num,
          userId: 123523,
        }).then(
          resp => {
            console.log(resp.data);
          }
        );
      },
      addComment(commodity_id, text, star) {
        this.req.post(this.api.COMMODITY_COMMENT_ADD, {
          content: text,
          productId: commodity_id,
          stars: star,
          userId: 123523,
        }).then(
          resp => {
            this.getComments(commodity_id);
            console.log(resp.data);
          }
        );
      },
    }
  }
</script>

<style scoped>
  .commodity-container {
    margin-left: auto;
    margin-right: auto;
    padding-left: 256px;
    padding-right: 256px;
    display: block;
  }

  .commodity-title {
    font-size: 24px;
    text-overflow: ellipsis;
    max-width: 800px;
  }

  .commodity-img {
    border: 1px solid #ebebeb;
    padding: 8px;
    border-radius: 4px;
    width: 320px;
    height: 320px;
    position: relative;
    margin-left: 32px;
  }

  .commodity-thumb {
    border: 1px solid #ebebeb;
    padding: 2px;
    border-radius: 4px;
    width: 64px;
    height: 64px;
  }

  .commodity-price {
    color: #aeaeae;
    text-decoration: line-through;
    font-size: 16px;
  }

  .commodity-info {
    padding-left: 48px;
    padding-top: 16px;
  }

</style>