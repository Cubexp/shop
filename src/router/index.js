import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Welcome from '../views/welcome.vue'
import Users from '../views/users/users.vue'
import Rights from '../views/power/rights.vue'
import Roles from '../views/power/roles.vue'
import Cate from '../views/goods/cate.vue'
import Params from '../views/goods/params.vue'
import GoodsList from '../views/goods/list.vue'
import Add from '../views/goods/add.vue'
import Order from '../views/order/order.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  //先跳转到home home 再重定向到welcome 页面
  // 选译 users 跳转到users页面
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome }, 
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodsList },
      { path: '/goods/add', component: Add},
      { path: '/orders', component: Order}
    ]
  },
] 

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');

  if (!tokenStr)
    return next('/login');
  next();
})
export default router
