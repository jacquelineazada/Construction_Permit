import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home.vue"),
    },
  ],
});
export default router;
