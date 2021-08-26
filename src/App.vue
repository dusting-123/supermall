<template>
  <div id="app">
    <keep-alive exclude="Detail">
    <!-- <keep-alive> -->
       <!-- <router-view :key="key"/> -->
       <router-view/>
    </keep-alive>
    <main-tabbar />
  </div>
</template>

<script>
import MainTabbar from './components/content/mainTabbar/MainTabbar.vue'
export default {
  name: 'App',
  components: {
    MainTabbar
  },
  computed:{
    // key(){
    //   return this.$route.path+Math.random()
    // }
  }
}
</script>

<style>
  @import url('./assets/css/base.css');
</style>
