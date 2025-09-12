import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    // LOGIN PART,

    // HOME PART,
    {
      path: "/home",
      name: "home",
      component: () => import("@/Home/home.vue"),
    },

    // SERVICES PART,
    {
      path: "/services",
      name: "services",
      component: () => import("@/Services/services.vue"),
    },
    // ABOUT PART,
    {
      path: "/about",
      name: "about",
      component: () => import("@/About/about.vue"),
    },
    // LOCATIONAL CLEARANCE PART,
    {
      path: "/locational",
      name: "Locational",
      component: () => import("@/LocationalClearance/locational.vue"),
    },

    // LOCATIONAL CLEARANCE LOGIN PART

    {
      path: "/lclogin",
      name: "lclogin",
      component: () => import("@/Login/LC_Login/lclogin.vue"), // Or any other component for the root
    },

    {
      path: "/application",
      name: "application",
      component: () => import("@/BuildingPermit/application.vue"), // Or any other component for the root
    },

    {
      path: "/owner",
      name: "owner",
      component: () => import("@/BuildingPermit/owner.vue"), // Or any other component for the root
    },

    {
      path: "/location",
      name: "location",
      component: () => import("@/BuildingPermit/location.vue"), // Or any other component for the root
    },

    {
      path: "/character",
      name: "character",
      component: () => import("@/BuildingPermit/character.vue"), // Or any other component for the root
    },

    // BUILDING PERMIT PART ANCILLARY PART

    {
      path: "/ancillary",
      name: "ancillary",
      component: () => import("@/BuildingPermit/ancillary.vue"), // Or any other component for the root
    },

    {
      path: "/plans",
      name: "plans",
      component: () => import("@/BuildingPermit/plans.vue"), // Or any other component for the root
    },

    {
      path: "/review",
      name: "review",
      component: () => import("@/BuildingPermit/review.vue"), // Or any other component for the root
    },
    // ADMIN FOLDER

    {
      path: "/ainformation",
      name: "ainformation",
      component: () => import("@/Admin/ainformation.vue"), // Or any other component for the root
    },

    {
      path: "/bpapplicants",
      name: "bpapplicants",
      component: () => import("@/Admin/bpapplicants.vue"), // Or any other component for the root
    },

    {
      path: "/evaluation",
      name: "evaluation",
      component: () => import("@/Admin/evaluation.vue"), // Or any other component for the root
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/Admin/dashboard.vue"), // Or any other component for the root
    },

    {
      path: "/opapplicants",
      name: "opapplicants",
      component: () => import("@/Admin/opapplicants.vue"), // Or any other component for the root
    },
    {
      path: "/opverification",
      name: "opverification",
      component: () => import("@/Admin/opverification.vue"), // Or any other component for the root
    },

    // ADMIN FOLDER INFOS WITH LOGIN PART

    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/Admin/dashboard.vue"), // Or any other component for the root
    },

    // BUILDING PERMIT LOGIN PART
    {
      path: "/",
      name: "bplogin",
      component: () => import("@/Login/BP_Login/bplogin.vue"), // Or any other component for the root
    },

    // OCCUPANCY PERMIT PART,
    {
      path: "/opapplication",
      name: "opapplication",
      component: () => import("@/OccupancyPermit/opapplication.vue"), // Or any other component for the root
    },
    {
      path: "/opowner",
      name: "opowner",
      component: () => import("@/OccupancyPermit/opowner.vue"), // Or any other
    },
    {
      path: "/oplocation",
      name: "oplocation",
      component: () => import("@/OccupancyPermit/oplocation.vue"),
    },
    {
      path: "/opcharacter",
      name: "opcharacter",
      component: () => import("@/OccupancyPermit/opcharacter.vue"),
    },
    {
      path: "/opreview",
      name: "opreview",
      component: () => import("@/OccupancyPermit/opreview.vue"),
    },
    {
      path: "/forms",
      name: "forms",
      component: () => import("@/OccupancyPermit/completionforms/forms.vue"),
    },
    {
      path: "/documents",
      name: "documents",
      component: () => import("@/OccupancyPermit/documents.vue"),
    },
    {
      path: "/application",
      name: "application",
      component: () =>
        import("@/OccupancyPermit/completionforms/completion/application.vue"), // Or any other component for the root
    },
    {
      path: "/project",
      name: "project",
      component: () =>
        import("@/OccupancyPermit/completionforms/completion/project.vue"), // Or any other component for the root
    },
    {
      path: "/cost",
      name: "cost",
      component: () =>
        import("@/OccupancyPermit/completionforms/completion/cost.vue"), // Or any other component for the root
    },
    {
      path: "/cfreview",
      name: "cfreview",
      component: () =>
        import("@/OccupancyPermit/completionforms/completion/cfreview.vue"), // Or any other component for the root
    },
    {
      path: "/cfeicost",
      name: "cfeicost",
      component: () =>
        import("@/OccupancyPermit/completionforms/electrical/cfeicost.vue"), // Or any other component for the root
    },
    {
      path: "/cfeiloads",
      name: "cfeiloads",
      component: () =>
        import("@/OccupancyPermit/completionforms/electrical/cfeiloads.vue"), // Or any other component for the root
    },

    // Status of application,
    {
      path: "/submitted",
      name: "submitted",
      component: () => import("@/OccupancyPermit/status/submitted.vue"), // Or any other component for the root
    },
    {
      path: "/checking",
      name: "checking",
      component: () => import("@/OccupancyPermit/status/checking.vue"), // Or any other component for the root
    },
    {
      path: "/inspection",
      name: "inspection",
      component: () => import("@/OccupancyPermit/status/inspection.vue"), // Or any other component for the root
    },
    {
      path: "/opinspection",
      name: "opinspection",
      component: () => import("@/Admin/opinspection.vue"), // Or any other component for the root
    },

    {
      path: "/cfeielectrical",
      name: "cfeielectrical",
      component: () =>
        import(
          "@/OccupancyPermit/completionforms/electrical/cfeielectrical.vue"
        ), // Or any other component for the root
    },
    {
      path: "/cfeiapplication",
      name: "cfeiapplication",
      component: () =>
        import(
          "@/OccupancyPermit/completionforms/electrical/cfeiapplication.vue"
        ), // Or any other component for the root
    },
    // OCCUPANCY LOGIN PART
    {
      path: "/oplogin",
      name: "oplogin",
      component: () => import("@/Login/OP_Login/oplogin.vue"), // Or any other component for the root
    },

    // COMPLIANCE MONITORING PART,
    {
      path: "/compliance",
      name: "ComplianceMonitoring",
      component: () => import("@/ComplianceMonitoring/compliance.vue"), // Or any other component for the root
    },

    // PORTAL PART,
    {
      path: "/portal",
      name: "portal",
      component: () => import("@/Portal/portal.vue"), // Or any other component for the root
    },
    {
      path: "/opportal",
      name: "opportal",
      component: () => import("@/Portal/opportal.vue"), // Or any other component for the root
    },
  ],
});

export default router;
