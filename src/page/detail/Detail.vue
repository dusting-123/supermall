<template>
  <div class="detail">
    <!-- <div>{{ location }}</div> -->
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
    <detail-base-info :goods="goods" />
    <detail-shop-info :shop="shop" />
  </div>
</template>

<script>
import { getDetail,Goods,Shop } from "../../network/detail";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

export default {
  name:'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  data() {
    return {
      location: window.location.href,
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
    };
  },
  created() {},
  mounted() {
    //保存从home携带过来的id
    this.iid = this.$route.params.iid;
    console.log("this.iid: ", this.iid);
    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      let data = res.result;
      //获取顶部轮播图数据
      this.topImages = res.result.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息
      this.Shop = new Shop(data.shopInfo);
    });
  },
  updated(rpops) {
    console.log("rpops: ", rpops);
  },
  methods: {},
  computed: {
    Location: () => {
       console.log(this.location);
      return this.location + Math.random();
    },
  },
  beforeDestory() {
    console.log("组件卸载！");
  },
};
</script>

<style>
</style>