import axios from 'axios';
import { showToast } from 'vant';
import store from '@/store/index.js';
import { getToken } from '@/utils/auth.js';
import { ENVIRONMENT } from '@/utils/config.js';
// create an axios instance
const service = axios.create({
  baseURL: ENVIRONMENT.VITE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 // request timeout
})
const blacklistPath = ['/clinic/saveConsultationLog'];
// request interceptor request拦截器
service.interceptors.request.use(config => {
  // do something before request is sent
  if (getToken()) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['Authorization'] = `Bearer ${getToken()}`
  }
  return config
}, error => {
  // do something with request error
  console.error(error) // for debug
  return Promise.reject(error)
})
// response interceptor response拦截器
service.interceptors.response.use(response => {
  const { code, message } = response.data;
  if ([200, '200'].includes(code)) {
    return response.data
  } else {
    if (!(blacklistPath.includes(response.config.url))) {
      showToast({ type: 'text', message: message, mask: true, duration: 1500 });
    }
    return Promise.reject(new Error(message || 'Error'))
  }
}, error => {
  console.error('onRejected error', error) // for debug
  if (error && error.response) {
    const { status } = error.response;
    switch (status) {
      case 400:
        error.message = '请求错误';
        break
      case 401:
        error.message = '未授权，请登录';
        break
      case 403:
        error.message = '拒绝访问';
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`;
        break
      case 408:
        error.message = '请求超时';
        break
      case 500:
        error.message = '网络异常，请刷新重试！';
        break
      case 501:
        error.message = '网络异常，请刷新重试！';
        break
      case 502:
        error.message = '网络异常，请刷新重试！';
        break
      case 503:
        error.message = '服务不可用';
        break
      case 504:
        error.message = '网关超时';
        break
      case 505:
        error.message = 'HTTP版本不受支持';
        break
      default:
        break
    }
    //
    if ([401, '401'].includes(status)) {
      store.dispatch('user/resetToken');
    } else {
       showToast({ type: 'text', message: error.message, mask: true, duration: 1500 });
    }
  } else {
    showToast({ type: 'text', message: error.message, mask: true, duration: 1500 });
  }
  return Promise.reject(error);
})
export default service
