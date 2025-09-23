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
                {
          path: "plans",
          name: "plans",
          component: () =>
            import("@/module/admin/BuildingPermit/Evaluators/plans.vue")
        },
                        {
          path: "evaluation",
          name: "evaluation",
          component: () =>
            import("@/module/admin/BuildingPermit/Evaluators/evaluation.vue")
        },
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
                {
          path: "applicantdetails",
          name: "applicantdetails",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/applicantdetails.vue")
        },
                        {
          path: "constructioninformation",
          name: "constructioninformation",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/constructioninformation.vue")
        },
                                {
          path: "usecharacterofoccupancy",
          name: "usecharacterofoccupancy",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/usecharacterofoccupancy.vue")
        },
                                        {
          path: "engineerinformation",
          name: "engineerinformation",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/engineerinformation.vue")
        },
                                                {
          path: "reviewapplication",
          name: "reviewapplication",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/reviewapplication.vue")
        },
                                        {
          path: "buildingpermitportal",
          name: "buildingpermitportal",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/buildingpermitportal.vue")
        },
                                                {
          path: "selectancillary",
          name: "selectancillary",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryForm/selectancillary.vue")
        },
                                                        {
          path: "uploadingofplans",
          name: "uploadingofplans",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryForm/uploadingofplans.vue")
        },
        // Locational Clearance Applicant

        // Occupancy Permit Applicant

        //
      ],
    },
  ],
});
export default router;
