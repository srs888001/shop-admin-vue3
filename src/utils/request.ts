import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
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
    // 统一处理响应错误，例如 token 无效、服务端异常等
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data) as T
  })
}
