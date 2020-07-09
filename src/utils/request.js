import axios from 'axios'
import { elegantPromise } from './common'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
})

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});

const request = (url, config) => elegantPromise(instance(url, config))

const get = (url, params, config) => elegantPromise(instance.get(url, {
  params,
  ...config,
}))
const del = (url, config) => elegantPromise(instance.delete(url, config))
const post = (url, data, config) => elegantPromise(instance.post(url, data, config))
const put = (url, data, config) => elegantPromise(instance.put(url, data, config))

export { get, del, post, put }
export default request