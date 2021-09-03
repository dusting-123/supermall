<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot name='wrapper'></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
export default {
  name:'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  onload(){
    
  },
  mounted(){
    //注册插件
    BScroll.use(Pullup)
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click: true,
      pullUpLoad:this.pullUpLoad
    })
    //监听滚动位置
    //if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(postiton)=>{
        //console.log(postiton);
        this.$emit('scroll',postiton)
      })
   // }
    //监听scroll滚动到底部
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
     this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      console.log('当前scroll高度'+ this.scroll.y);
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
     
      return this.scroll?this.scroll.y:0
    }
  }
}
</script>

<style scoped>
</style>