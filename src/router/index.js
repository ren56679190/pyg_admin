import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home/home.vue'
import Welcome from '../components/home/welcome.vue'
import Users from '../components/users/users.vue'
import Roles from '../components/authority/roles.vue'
import Rights from '@/components/authority/rights.vue'
import Categories from '../components/goods/Categories'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', name: 'welcome', component: Welcome },
        { path: '/users', name: 'users', component: Users },
        { path: '/roles', name: 'roles', component: Roles },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/categories', name: 'categories', component: Categories }
      ]
    }
  ]
})

// 添加导航守卫 监视登录信息
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!sessionStorage.getItem('token')) return next('/login')
  next()
})

export default router
