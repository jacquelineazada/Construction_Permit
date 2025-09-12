import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "",
    },
  ],
});

export default router;
