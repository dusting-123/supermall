<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>首页</div>
      </template>
    </nav-bar>
    
    <scroll 
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <template #wrapper>
        <home-swiper :banners="banners" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control
          class="tab-control" 
          :titles="['流行','新款','精选']"
          @tabClick="tabClick"
        />
        <goods-list :goods="showGoods" />
      </template> 
    </scroll>
    <!-- .native修饰符 监听组件事件 -->
    <back-top  @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import HomeSwiper from './childComps/HomeSwiper'

import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '../../components/content/tabcontrol/TabControl'
import GoodsList from '../../components/content/goods/GoodsList'
import scroll from '../../components/common/scroll/Scroll'
import BackTop from '../../components/content/backtop/BackTop'


import {getHomeMultidata, getHomeGoods} from '../../network/home'

export default {
  name: 'Home',
  components: {
    RecommendView,
    FeatureView, 
    HomeSwiper,
    NavBar,
    TabControl,
    GoodsList,
    scroll,
    BackTop
  },
  data() {
    return {
      tabOffsetTop: 0,
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]},
      },
      currentType:'pop',
      isShowBackTop:true
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /* 事件监听相关 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position) {
        this.isShowBackTop = (-position.y)>1000
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
/*     swiperImageLoad() {
      //this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }, */
  /**
  * 网络请求相关的方法
  */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style >
  #home {
    /* vh(view-height):视口高度 100vh 即100% */
    height: 100vh; 
    position: relative;
  }
 .home-nav{
   background-color:#ff8198;
   color: #fff;
   overflow: hidden;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
  z-index: 5;
 }
 .tab-control {
  
 }
 /* 方案一 */
 .wrapper {
   overflow: hidden;
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
   
 }
 /* 方案二 */
/*  .wrapper {
   height: calc(100% - 93px);
   margin-top: 44px;
   overflow: hidden;
 } */
</style>