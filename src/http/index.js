// 导出一个配置好的axios
import axios from 'axios/index'

// baseUrl 配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 配置请求头 拦截器
axios.interceptors.request.use(config => {
  // 给config添加新的信息
  // config可以给请求头追加属性
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})
// 拦截令牌失效
axios.interceptors.response.use(res => {
  if (res.data.meta.status === 401) {
    location.href = '#/login'
  } else {
    return res
  }
})

// 导出
export default axios
