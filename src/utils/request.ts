import axios from 'axios'
import { useUserStore } from '@/stores'
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { showToast } from 'vant'
import router from '@/router'

const instance = axios.create({
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 10000
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Do something before request is sent
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = 'Bearer ' + store.user.token
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    // 如果code值为10000 响应成功
    if (res.data?.code !== 10000) {
      showToast(res.data?.message)
      return Promise.reject(res.data)
    }
    return res.data
  },
  (error) => {
    // 如果status状态值为401 代表token过时
    if (error.response.status === 401) {
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转到登录页  但是登录要跳转到历史记录页面
      router.push('/login?router.currentRoute.value.fullPath')
    }
    return Promise.reject(error)
  }
)

export default instance
