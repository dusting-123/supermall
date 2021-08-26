<template>
  <div>
    <nav-bar>
     <!--  <template #center>
       
      </template> -->
      <div slot="left" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="" class="back">
      </div>
       <div slot="center"  class="title">
          <div
            class="title-item"
            v-for="(item,index) in titles" 
            :key="index"
            :class="{active: index === currentIndex}"
            @click="titleClick(index)"
            >{{item}}
          </div>
        </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
export default {
  components:{
    NavBar
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
  methods:{
    backClick(){
      this.$router.back()
    },
    titleClick(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }
  .back {
    vertical-align: middle;
  }
</style>