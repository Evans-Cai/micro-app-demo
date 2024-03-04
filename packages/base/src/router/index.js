import LayoutPage from "../layout/index.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: LayoutPage,
    children: [
      {
        path: '/home',
        component: () => import('@/pages/home/index.vue'),
        name: 'Home',
        meta: { title: '首页', affix: true }
      },
      /**/
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/login/index.vue'),
        meta: { title: '登录', affix: true }
      },
      {
        path: '/autoLogin',
        name: 'AutoLogin',
        component: () => import('@/pages/autoLogin/index.vue'),
        meta: { title: '免密登录', affix: true }
      },
      {
        path: '/401',
        component: () => import('@/pages/error/401.vue'),
        meta: { title: '401', affix: true }
      }
    ]
  },
  {
    path: '/web/:page*',
    name: 'app-web',
    component: () => import('@/pages/WebPage.vue'),
  },
  {
    path: '/mobile/:page*',
    name: 'app-mobile',
    component: () => import('@/pages/MobilePage.vue'),
  }
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
})
export default router;
