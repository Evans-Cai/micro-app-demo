import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import store from './store/index.js';
import router from './router/index.js';
import install from './plugins/install.js';
//
import '@varlet/touch-emulator';
// 引入模块后自动生效
import { Lazyload, setToastDefaultOptions, resetToastDefaultOptions } from 'vant';
//
setToastDefaultOptions({ duration: 2000 });
setToastDefaultOptions('loading', { forbidClick: true });
resetToastDefaultOptions();
resetToastDefaultOptions('loading');
// Toast
import 'vant/es/toast/style/index.mjs';
// Dialog
import 'vant/es/dialog/style/index.mjs';
// Notify
import 'vant/es/notify/style/index.mjs';
// ImagePreview
import 'vant/es/image-preview/style/index.mjs';
//
import SvgIcon from '@jamescoyle/vue-icon';
// directive
import focusable from 'vue-tv-focusable';
//
import microApp from '@micro-zoe/micro-app';
// 全局监听
microApp.start({
  'router-mode': 'pure',
  lifeCycles: {
    created() {
      console.log('created 全局监听')
    },
    beforemount() {
      console.log('beforemount 全局监听')
    },
    mounted() {
      console.log('mounted 全局监听')
    },
    unmount() {
      console.log('unmount 全局监听')
    },
    error() {
      console.log('error 全局监听')
    }
  },
  /**/
  plugins: {
    modules: {
      web: [{
        loader(code, url) {
          console.log('web插件', url)
          if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
            code = code.replace('window.location.port', '3001')
          }
          return code
        }
      }],
      mobile: [{
        loader(code, url) {
          console.log('mobile插件', url)
          if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
            code = code.replace('window.location.port', '3002')
          }
          return code
        }
      }]
    }
  },
  /**
   * 自定义fetch
   * @param url 静态资源地址
   * @param options fetch请求配置项
   * @param appName
   * @returns Promise<string>
   */
  fetch(url, options, appName) {
    console.log(url, options, appName);
    if (url === 'http://localhost:3001/error.js') {
      return Promise.resolve('')
    }
    let config = null
    if (url === 'http://localhost:3001/web/') {
      config = {
        headers: {
          'custom-head': 'custom-head',
        }
      }
    }
    return fetch(url, Object.assign({}, options, config)).then((res) => {
      return res.text()
    })
  }
});
// 创建vue实例
const app = createApp(App);
// app.use(vLoading);
app.use(focusable);
app.use(install);
app.use(store);
app.use(router);
app.use(Lazyload);
app.component('svg-icon', SvgIcon);
app.mount('#app');
