import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import 'amfe-flexible'

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()

//使用懒加载组件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
