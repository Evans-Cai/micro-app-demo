import LayoutPage from "../layout/IndexPage.vue";
import HomePage from "../pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: LayoutPage,
    children: [
      {
        path: '/home',
        component: HomePage
      }
    ]
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})
export default router;
