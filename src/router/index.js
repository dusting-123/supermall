import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../page/home/Home')
const Category = () => import('../page/category/Category')
const Cart = () => import('../page/cart/Cart')
const Profile = () => import('../page/profile/Profile')
const Detail = () => import('../page/detail/Detail')
//安装插件
Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: '/home'
}, {
  path: '/home',
  component: Home
}, {
  path: '/category',
  component: Category
}, {
  path: '/cart',
  component: Cart
}, {
  path: '/profile',
  component: Profile
}, {
  path: '/detail/:iid',
  name: Detail,
  component: Detail
}]
//创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})
/* router.afterEach((to, from) => {
  console.log('to', to, 'from: ', from);
  // ...
}) */
//导出router
export default router