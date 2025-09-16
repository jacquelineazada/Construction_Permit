import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    // Route for Main Pages
    {
      path: "/",
      component: () => import("@/layout/MainLayout.vue"),
      children: [
        // Main Pages for All Users
        {
          path: "",
          name: "home",
          component: () => import("@/pages/home.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/pages/login .vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/layout/AdminLayout.vue"),
      children: [
        {
          path: "AdminLogin",
          name: "AdminLogin",
          component: () => import("@/pages/AdminLogin.vue"),
        },

        // Building Permit Admin

        // Locational Clearance Admin

        // Compliance Monitoring Admin

        // Occupancy Permit Admin
      ],
    },

    {
      path: "/applicant",
      component: () => import("@/layout/ApplicantLayout.vue"),
      children: [
        // Main Pages for Applicant
        {
          path: "permits",
          name: "permits",
          component: () => import("@/pages/permits.vue"),
        },
        {
          path: "services",
          name: "services",
          component: () => import("@/pages/services.vue"),
        },

        // Building Permit Applicant

        // Locational Clearance Applicant

        // Occupancy Permit Applicant

        //
      ],
    },
  ],
});
export default router;
