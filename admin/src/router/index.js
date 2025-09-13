import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    // Main Route
    {
      path: "/",
      name: "login",
      component: () => import("@/pages/login.vue"),
    },

    // Route for Building Permit

    // Route for Locational Clearance

    // Route for Compliance Monitoring

    // Route for Occupancy Permit
  ],
});

export default router;
