import axios from 'axios';
import storage from 'store'
import router from '@/router';
import { Message  } from 'element-ui';
import { ACCESS_TOKEN } from '@/store/types'
import { elegantPromise } from './common';

const loginRoutePath = '/user/login';
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 5000,
});


const defaultHeaders = {

};

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (!config.headers) config.headers = defaultHeaders;
  config.headers['Access-Token'] = storage.get(ACCESS_TOKEN);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data;
  },
  function(error) {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      Message.error({
        message: '认证失败，请重新登录！'
      })
      setTimeout(() => {
        router.push({ path: loginRoutePath, query: {rediect: router.currentRoute.fullPath} });
      }, 1000);
    }
    return Promise.reject(error);
  }
);

const request = (url, config) => elegantPromise(instance(url, config));

const get = (url, params, config) =>
  elegantPromise(
    instance.get(url, {
      params,
      ...config,
    })
  );
const del = (url, config) => elegantPromise(instance.delete(url, config));
const post = (url, data, config) => elegantPromise(instance.post(url, data, config));
const put = (url, data, config) => elegantPromise(instance.put(url, data, config));

export { get, del, post, put };
export default request;
