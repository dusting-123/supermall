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
  porps: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted(){
    BScroll.use(Pullup)
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      click: true,
      //pullUpLoad:true
    })
    
   this.scroll.on('scroll',(postiton)=>{
     //console.log(postiton);
     this.$emit('scroll',postiton)
   }) 
   this.scroll.on('pullingUp',()=>{
     console.log('上拉加载更多');
     this.$emit('pullingUp')
   })
  },
  methods:{
    scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
     
    }
  }
}
</script>

<style scoped>
</style>