import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    // Route for Main Pages
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home.vue"),
    },
    {
      path: "/services",
      name: "services",
      component: () => import("@/pages/services.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login .vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/pages/about.vue"),
    },
    {
      path: "/permits",
      name: "permits",
      component: () => import("@/pages/permits.vue"),
    },

    // Route for Building Permit

    // Route for Location Clearance

    // Route for Compliance

    // Route for Occupancy Permit
  ],
});
export default router;
