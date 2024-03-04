import LayoutPage from "../layout/IndexPage.vue";
import HomePage from "../pages/HomePage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: LayoutPage,
    children: [
      {
        path: '/home',
        component: HomePage
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
    ]
  }
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
})
export default router;
