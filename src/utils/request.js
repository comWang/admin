import axios from 'axios'
import storage from 'store'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { ACCESS_TOKEN } from '@/store/types'
import { elegantPromise, throttle } from './common'

const loginRoutePath = '/user/login'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 1000 * 10,
  withCredentials: true,
})

const defaultHeaders = {}

const errorNotify = throttle(Message.error, null, 3 * 1000)

instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (!config.headers) config.headers = defaultHeaders
    config.headers['Access-Token'] = storage.get(ACCESS_TOKEN)
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data
  },
  function(error) {
    // 对响应错误做点什么
    if (!error.response) {
      Message.error({
        message: '服务不可达，可能是网络连接出现了问题',
      })
    } else if (error.response.status === 401) {
      store.commit('clearUserInfo')
      setTimeout(() => {
        router.push({ path: loginRoutePath })
      }, 1000)
    } else if (error.response.status >= 500 || error.response.status < 200) {
      errorNotify({
        message: '服务器开小差了，请稍后再试~',
      })
    }
    return Promise.reject(error)
  }
)

const request = (url, config) => elegantPromise(instance(url, config))

export default request
