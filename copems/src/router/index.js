import path from "path";
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
          component: () => import("@/pages/login.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/pages/register.vue"),
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
          path: "evaluation",
          name: "evaluation",
          component: () =>
            import("@/module/admin/BuildingPermit/Evaluators/evaluation.vue")
        },
                        {
          path: "plans",
          name: "plans",
          component: () =>
            import("@/module/admin/BuildingPermit/Evaluators/plans.vue")
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
            import("@/module/applicant/BuildingPermit/UnifiedApplication/selectancillary.vue")
        },

        {
          path: "uploadingofplans",
          name: "uploadingofplans",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/uploadingofplans.vue")
        },
        {
          path: "applicantportal",
          name: "applicantportal",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/applicantportal.vue")
        },
        {
          path: "documentaryrequirement",
          name: "documentaryrequirement",
          component: () =>
            import("@/module/applicant/BuildingPermit/UnifiedApplication/documentaryrequirement.vue")  
        },
        {
          path: "architectural",
          name: "architectural",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryPermit/architectural.vue")
        },
        {
          path: "civilstructural",
          name: "civilstructural",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryPermit/civilstructural.vue")
        },
        {
          path: "electrical",
          name: "electrical",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryPermit/electrical.vue")
        },
        {
          path: "electronics",
          name: "electronics",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryPermit/electronics.vue")
        },
        {
          path: "mechanical",
          name: "mechanical",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryPermit/mechanical.vue")
        },
        {
          path: "plumbing",
          name: "plumbing",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryPermit/plumbing.vue")
        },
        {
          path: "sanitary",
          name: "sanitary",
          component: () =>
            import("@/module/applicant/BuildingPermit/AncillaryPermit/sanitary.vue")
        },
        // 
        // Locational Clearance Applicant

        // Occupancy Permit Applicant

        //
      ],
    },
  ],
});
export default router;
