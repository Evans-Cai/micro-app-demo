import "./public-path.js";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';


const app = createApp(App);
app.use(router);
app.mount('#web-app');
// 监听卸载操作
window.addEventListener("unmount", function() {
  app.unmount();
});
// 获取主应用的传递的数据
const getMicroData = () => {
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log("child-web getData:", window.microApp.getData());
    // 监听基座下发的数据变化
    window.microApp.addDataListener((data) => {
      console.log("child-web addDataListener:", data);
      // 监听基座下发路由
      if (data.path && data.path !== router.currentRoute.path) {
        router.push(data.path);
      }
    });
    // 3秒后向主应用发送数据
    setTimeout(() => {
      // 向主应用发送数据
      window.microApp.dispatch({ myname: "child-web" });
    }, 3000);
  }
};
getMicroData();
