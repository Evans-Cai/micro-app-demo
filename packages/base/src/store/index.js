import { createStore } from 'vuex';
import app from './modules/app.js';
import websocket from './modules/websocket.js';
import user from './modules/user.js';
import errorLog from '@/store/modules/errorLog.js';
//
// import createPersistedstate from 'vuex-persistedstate';
//
const store = createStore({
  modules: {
    app,
    websocket,
    user,
    errorLog
  },
  plugins: [
    /* createPersistedstate({
      key: 'vuex-local', // 存储持久状态的键。（默认：vuex）
      paths: ['user', 'app', 'dispose'], // 部分持续状态的任何路径的数组。如果不加，默认所有。
      storage: window.sessionStorage // 默认存储到localStorage,想要存储到sessionStorage
    })*/
  ]
})
export default store
