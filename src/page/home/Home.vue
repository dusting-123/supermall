<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>首页</div>
      </template>
    </nav-bar>
    <tab-control
          class="tab-control" 
          :titles="['流行','新款','精选']"
          ref="tabControl1"
          @tabClick="tabClick"
          v-show="isTabFixed"
        />
    <scroll 
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <template #wrapper>
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control
          :titles="['流行','新款','精选']"
          ref="tabControl2"
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
import {debounce} from '../../common/utils'
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
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list:[]},
        'new': {page: 0, list:[]},
        'sell': {page: 0, list:[]},
      },
      currentType:'pop',
      isShowBackTop:true,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY: 0
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
  mounted() {
    //监听图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh(),0)
    this.$bus.$on('itemImageLoad',()=>{
     refresh()
    })
    //获取tabControl的offsetTop
   // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
   
  },
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },
  /**
  * 网络请求相关的方法
  */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //请求商品数据
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
    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
 }
 .tab-control {
  position: relative;
  z-index: 9;
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