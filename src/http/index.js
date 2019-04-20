// 导出一个配置好的axios
import axios from 'axios/index'

// baseUrl 配置
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 导出
export default axios
