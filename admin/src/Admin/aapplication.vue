<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
        style="max-width: 1600px"
      >
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-3"
          />
          <div>
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
        <div class="d-none d-md-flex nav-links">
          <v-btn text class="mx-2" style="color: white" to="/home">Home</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/services"
            >Services</v-btn
          >
          <v-btn text class="mx-2" style="color: white" to="/about"
            >About</v-btn
          >
        </div>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer app permanent>
      <div class="d-flex align-center px-4" style="height: 57px">
        <v-icon size="36" class="me-2" color="#007bff"
          >mdi-office-building</v-icon
        >
        <div>
          <div class="text-h7 font-weight-bold" style="line-height: 1.2">
            Construction Permit
          </div>
          <div class="text-caption font-weight-regular" style="color: #6c757d">
            Management System
          </div>
        </div>
      </div>
      <div class="d-flex flex-column" style="height: calc(100vh - 88px - 57px)">
        <v-list
          nav
          dense
          class="py-0"
          style="font-size: 14px; flex-grow: 1; overflow-y: auto"
        >
          <v-list-item link to="/dashboard" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-home-outline</v-icon>
              <span>Dashboard</span>
            </div>
          </v-list-item>
          <v-list-item link to="/locational-clearance" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-map-marker-outline</v-icon>
              <span>Locational Clearance</span>
            </div>
          </v-list-item>
          <v-list-item link to="/building-permit" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-file-document-outline</v-icon>
              <span>Building Permit</span>
            </div>
          </v-list-item>
          <v-list-item link to="/occupancy-permit" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-file-certificate-outline</v-icon>
              <span>Occupancy Permit</span>
            </div>
          </v-list-item>
          <v-list-item link to="/compliance-monitoring" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-clipboard-list-outline</v-icon>
              <span>Compliance Monitoring</span>
            </div>
          </v-list-item>
        </v-list>
        <v-list nav dense class="py-0 mt-auto" style="font-size: 14px">
          <v-list-item link @click="logout" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-logout</v-icon>
              <span>Logout</span>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <div class="d-flex justify-center">
        <v-card
          class="d-flex flex-column fill-height"
          style="
            width: 100%;
            max-width: 1300px;
            border-radius: 0;
            box-shadow: none;
            border-left: 1px solid rgba(0, 0, 0, 0.12);
          "
        >
          <div
            class="px-4 py-3 d-flex align-center justify-space-between"
            style="height: 56px"
          >
            <div class="text-h6 font-weight-bold">
              Building Permit Applicants
            </div>
            <div class="d-flex align-center">
              <v-menu :close-on-content-click="false" location="bottom end">
                <template v-slot:activator="{ props }">
                  <v-badge
                    color="red"
                    :content="unreadNotificationsCount"
                    overlap
                    class="me-2"
                    v-bind="props"
                  >
                    <v-icon size="20">mdi-bell</v-icon>
                  </v-badge>
                </template>
                <v-card min-width="300" max-width="400">
                  <v-card-title
                    class="d-flex justify-space-between align-center"
                  >
                    <span class="text-h6">Notifications</span>
                    <v-btn icon @click="closeNotifications">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card
                    v-for="(notification, index) in notifications"
                    :key="index"
                    color="blue-lighten-4"
                    class="ma-2"
                  >
                    <v-list-item class="d-flex flex-column align-start">
                      <div class="d-flex align-center">
                        <v-icon class="me-2" color="blue-darken-2"
                          >mdi-file-document-outline</v-icon
                        >
                        <div class="font-weight-bold">
                          Documents submitted for verification
                        </div>
                      </div>
                      <v-list-item-subtitle class="text-caption mt-1">{{
                        notification.applicationId
                      }}</v-list-item-subtitle>
                      <v-list-item-subtitle class="text-caption">{{
                        notification.time
                      }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-card>
                </v-card>
              </v-menu>
              <v-btn text to="/profile" class="profile-btn">
                <v-avatar size="32" class="mx-2">
                  <v-img
                    alt="John"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                  ></v-img>
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                  >
                    AlyssaC.Alvarez
                  </span>
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                  >
                    Administrative
                  </span>
                </div>
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="d-flex flex-grow-1 pa-4 bg-grey-lighten-4">
            <div class="d-flex flex-column" style="flex: 2; gap: 16px">
              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-account-details-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">
                      Applicant Information
                    </div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Applicant Name:
                      </div>
                      <div class="text-caption font-weight-medium">
                        Jim Deguzman
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Project Name:
                      </div>
                      <div class="text-caption font-weight-medium">
                        Commercial
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">
                        Project Location:
                      </div>
                      <div class="text-caption font-weight-medium">
                        San Felipe, Deca II Naga City
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-home-city-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">
                      Property Details
                    </div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Property Type:
                      </div>
                      <div class="text-caption font-weight-medium">
                        Commercial Building
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Building Use:
                      </div>
                      <div class="text-caption font-weight-medium">
                        Retail Store
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Floor Area:
                      </div>
                      <div class="text-caption font-weight-medium">
                        230 sq m
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Number of Floors:
                      </div>
                      <div class="text-caption font-weight-medium">
                        2 Floors
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Property Address:
                      </div>
                      <div class="text-caption font-weight-medium">
                        456 Commercial Avenue, San Felipe, Deca I Naga City
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Lot Area:
                      </div>
                      <div class="text-caption font-weight-medium">
                        350 sq m
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-file-download-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">
                      Survey Plans
                    </div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <div class="d-flex flex-column" style="gap: 8px">
                    <v-card class="py-2 px-3">
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-icon color="red">mdi-file-pdf-box</v-icon>
                          <div class="ms-3">
                            <div class="font-weight-medium">
                              Architectural Plan
                            </div>
                            <div class="text-caption text-grey-darken-1">
                              Required Document - 2.5 MB
                            </div>
                          </div>
                        </div>
                        <v-btn color="blue" variant="flat" size="small"
                          >View</v-btn
                        >
                      </div>
                    </v-card>
                    <v-card class="py-2 px-3">
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-icon color="red">mdi-file-pdf-box</v-icon>
                          <div class="ms-3">
                            <div class="font-weight-medium">
                              Structural Plan
                            </div>
                            <div class="text-caption text-grey-darken-1">
                              Required Document
                            </div>
                          </div>
                        </div>
                        <v-btn color="blue" variant="flat" size="small"
                          >View</v-btn
                        >
                      </div>
                    </v-card>
                    <v-card class="py-2 px-3">
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-icon color="red">mdi-file-pdf-box</v-icon>
                          <div class="ms-3">
                            <div class="font-weight-medium">Electrical</div>
                            <div class="text-caption text-grey-darken-1">
                              Required Document
                            </div>
                          </div>
                        </div>
                        <v-btn color="blue" variant="flat" size="small"
                          >View</v-btn
                        >
                      </div>
                    </v-card>
                    <v-card class="py-2 px-3">
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-icon color="red">mdi-file-pdf-box</v-icon>
                          <div class="ms-3">
                            <div class="font-weight-medium">Sanitary</div>
                            <div class="text-caption text-grey-darken-1">
                              Required Document
                            </div>
                          </div>
                        </div>
                        <v-btn color="blue" variant="flat" size="small"
                          >View</v-btn
                        >
                      </div>
                    </v-card>
                  </div>
                </div>
              </v-card>
            </div>
            <div
              class="d-flex flex-column"
              style="flex: 1; margin-left: 16px; gap: 16px"
            >
              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-text-box-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">
                      Application Summary
                    </div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-row dense>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">
                        Application Number
                      </div>
                      <div class="text-caption font-weight-medium">
                        BP-2024-000123-T
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">Type</div>
                      <div class="text-caption font-weight-medium">
                        Building Permit
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">
                        Processing Fee
                      </div>
                      <div class="text-caption font-weight-medium">
                        ₱2,500.00
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">
                        Payment Status
                      </div>
                      <v-chip color="#FBF46D" size="small" variant="flat"
                        >Pending Evaluation</v-chip
                      >
                    </v-col>
                  </v-row>
                  <div class="text-caption mt-4">
                    <strong>Note:</strong> Payment will be processed after plan
                    evaluation is complete. You will be notified once the
                    evaluation is done.
                  </div>
                </div>
              </v-card>

              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-list-box-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">
                      Application Timeline
                    </div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-timeline side="end" align="start" density="compact">
                    <v-timeline-item
                      dot-color="#B4FE98"
                      size="small"
                      fill-dot
                      class="pb-0"
                    >
                      <div class="text-caption font-weight-bold">
                        Application Submitted
                      </div>
                      <div class="text-caption">Jan 16, 2024 - 10:30 AM</div>
                    </v-timeline-item>
                    <v-timeline-item
                      dot-color="#FBF46D"
                      size="small"
                      fill-dot
                      class="pb-0"
                    >
                      <div class="text-caption font-weight-bold">
                        Under Verification
                      </div>
                      <div class="text-caption">Jan 16, 2024 - 2:15 PM</div>
                    </v-timeline-item>
                    <v-timeline-item dot-color="grey" size="small" class="pb-0">
                      <div class="text-caption font-weight-bold">
                        Plan Evaluation
                      </div>
                      <div class="text-caption">Jan 17, 2024 - 9:00 AM</div>
                    </v-timeline-item>
                    <v-timeline-item dot-color="grey" size="small" class="pb-0">
                      <div class="text-caption font-weight-bold">
                        Payment Processing
                      </div>
                      <div class="text-caption">Pending</div>
                    </v-timeline-item>
                    <v-timeline-item dot-color="grey" size="small" class="pb-0">
                      <div class="text-caption font-weight-bold">
                        Final Approval
                      </div>
                      <div class="text-caption">Pending</div>
                    </v-timeline-item>
                  </v-timeline>
                </div>
              </v-card>
            </div>
          </div>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
const fileInput = ref(null);
const search = ref("");
const activeFilter = ref("All");
const loading = ref(false);

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

const notifications = ref([
  {
    title: "Documents submitted for verification",
    applicationId: "Application ID: BP-2025-0808-001",
    message:
      "A new building permit application has been submitted for verification.",
    time: "Just now",
    read: false,
  },
  {
    title: "Documents submitted for verification",
    applicationId: "Application ID: BP-2024-808234-T",
    message: "Documents submitted for verification",
    time: "2 hours ago",
    read: false,
  },
  {
    title: "Documents submitted for verification",
    applicationId: "Application ID: BP-2024-808345-T",
    message: "Documents submitted for verification",
    time: "4 hours ago",
    read: false,
  },
]);

const unreadNotificationsCount = computed(() => {
  return notifications.value.filter((n) => !n.read).length;
});

const closeNotifications = () => {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
};

const headers = [];

const applicants = ref([]);

const totalApplicants = computed(() => applicants.value.length);
const pendingApplicants = computed(
  () => applicants.value.filter((a) => a.status === "Pending").length
);
const verifiedApplicants = computed(
  () => applicants.value.filter((a) => a.status === "Verified").length
);
const returnApplicants = computed(
  () => applicants.value.filter((a) => a.status === "Return").length
);

const filteredApplicants = computed(() => {
  let filtered = applicants.value;
  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    filtered = filtered.filter((applicant) =>
      applicant.name.toLowerCase().includes(searchTerm)
    );
  }
  if (activeFilter.value !== "All" && activeFilter.value !== "Total") {
    filtered = filtered.filter(
      (applicant) => applicant.status === activeFilter.value
    );
  }
  return filtered;
});

const handleUploadClick = () => {
  fileInput.value.click();
};

const logout = () => {
  console.log("Logged out");
};

const getStatusColor = (status) => {
  if (status === "Verified") return "green";
  if (status === "Pending") return "orange";
  if (status === "Return") return "red";
  return "grey";
};

const getAvatarColor = (initials) => {
  const colors = {
    JM: "#007bff",
    SG: "#28a745",
    MP: "#dc3545",
    CL: "#ffc107",
    RB: "#6f42c4",
    AS: "#17a2b8",
    JL: "#e83e8c",
    MR: "#fd7e14",
    AL: "#20c997",
    DC: "#6c757d",
  };
  return colors[initials] || "grey";
};

const viewDetails = (item) => {
  console.log("Viewing details for:", item);
};

const filterByStatus = (status) => {
  if (status === "Total") {
    activeFilter.value = "All";
  } else {
    activeFilter.value = status;
  }
};
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}
</style>