import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import ('../page/home/Home')
const Category = () => import ('../page/category/Category')
const Cart = () => import ('../page/cart/Cart')
const Profile = () => import ('../page/profile/Profile')
 
//安装插件
Vue.use(VueRouter)

const routes = [{
  path: '',
  redirect: '/home'
},{
  path: '/home',
  component: Home
},{
  path: '/category',
  component: Category
},{
  path: '/cart',
  component: Cart
},{
  path: '/profile',
  component: Profile
}]
//创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

//导出router
export default router