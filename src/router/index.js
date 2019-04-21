import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'

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
        { path: '/welcome', component: Welcome }
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
