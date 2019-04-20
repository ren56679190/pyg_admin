import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  next()
})

export default router
