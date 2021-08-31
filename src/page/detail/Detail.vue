<template>
  <div class="detail">
    <!-- <div>{{ location }}</div> -->
    <detail-nav-bar class="detail-nav" />
    <scroll class="wrapper" ref="scroll">
      <template #wrapper>
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :param-info="paramInfo"/>
      </template>
    </scroll>
  </div>
</template>

<script>
import { getDetail,Goods,Shop,GoodsParam } from "../../network/detail";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo.vue';

import Scroll from "../../components/common/scroll/Scroll"



export default {
  name:'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo, 
    DetailParamInfo,
    Scroll
  },
  data() {
    return {
      // location: window.location.href,
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  created() {
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
      this.shop = new Shop(data.shopInfo);
      //获取商品详情数据
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new  GoodsParam(data.itemParams.info, data.itemParams.rule)
    });
  },
  mounted() {
   
  },
  updated() {
    // console.log("rpops: ", rpops);
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.refresh()
      console.log(this.$refs.scroll.scroll.y);
    }
  },
  computed: {
    // Location: () => {
    //    console.log(this.location);
    //   return this.location + Math.random();
    // }
  },
  beforeDestory() {
    console.log("组件卸载！");
  }
}
</script>
 
<style scoped>
  .detail{
    position: relative;
    z-index: 5;
    height: 100vh;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 5;
    background-color: #fff;
  }
  .wrapper {
    /* overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0; */
    height: calc(100% - 44px);
  }
</style>