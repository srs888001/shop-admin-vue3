import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // 如果本地测试CROS，这边baseURL就不需要设置了
  baseURL: import.meta.env.VITE_API_BASEURL// 基础路径
})

// 1.request默认不支持泛型
// 2.request.get/post/*, 支持泛型，但是不能解析后台类型
// 3.自己封装request

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 统一设置用户身份 Token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const status = response.data.status

    // 正确的情况
    if (status && status !== 200) {
      // 其它错误情况
      ElMessage.error(response.data.msg || '请求失败，请稍后重试')
      // 手动返回一个 Promise 异常
      return Promise.reject(response)
    }

    // 统一处理响应错误，例如 token 无效、服务端异常等
    return response
  },
  err => {
    ElMessage.error(err.message || '请求失败，请稍后重试')
    return Promise.reject(err)
  }
)

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    // 防止只有一层数据返回
    return (res.data.data || res.data) as T
  })
}
