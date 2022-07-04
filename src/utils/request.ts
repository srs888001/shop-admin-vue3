import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store'
// 加/代表目录，否则可能找的是router.d.ts
import router from '@/router/'

const request = axios.create({
  // 如果本地测试CROS，这边baseURL就不需要设置了
  baseURL: import.meta.env.VITE_API_BASEURL// 基础路径
})

// 1.request默认不支持泛型
// 2.request.get/post/*, 支持泛型，但是不能解析后台类型
// 3.自己封装request

// 请求拦截器
request.interceptors.request.use(function (config: AxiosRequestConfig) {
  // 统一设置用户身份 token
  const user = store.state.user
  if (user && user.token) {
    if (config.headers === undefined) {
      config.headers = {} as AxiosRequestHeaders
    }
    config.headers!.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 控制登录过期的锁
let isRefreshing = false

// 响应拦截器
request.interceptors.response.use(
  response => {
    const status = response.data.status

    // 正确的情况
    if (!status || status === 200) {
      return response
    }

    // 错误情况：比如 token 无效...

    // 统一处理登录过期
    if (status === 410000) {
      if (isRefreshing) return Promise.reject(response)
      isRefreshing = true
      ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
      // 清除本地过期的登录状态
        store.commit('setUser', null)
        // 跳转到登录页面
        router.push({
          name: 'login',
          query: {
            redirect: router.currentRoute.value.fullPath
          }
        })
      // 抛出异常
      }).finally(() => {
        isRefreshing = false
      })

      // 在内部消化掉这个业务异常
      return Promise.reject(response)
    }

    // 其它错误情况
    ElMessage.error(response.data.msg || '请求失败，请稍后重试')
    // 手动返回一个 Promise 异常
    return Promise.reject(response)
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
