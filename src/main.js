import Vue from 'vue'
import App from './App'
import router from './router'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式
import './assets/css/global.css'

// 引入字体图标样式
import './assets/fonts/iconfont.css'

// 导入axios
import axios from './http/index'
Vue.prototype.$axios = axios

Vue.use(ElementUI, {size: 'small'})
// 在生产环境开启提示   在控制台的日志更详细
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
