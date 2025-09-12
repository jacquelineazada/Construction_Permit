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
          <v-list-item link to="/buildingpermits" class="py-1">
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
          "
        >
          <div
            class="px-4 py-3 d-flex align-center justify-space-between"
            style="height: 57px"
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
                    <span class="text-h6">Applications to Evaluate</span>
                    <v-btn icon @click="closeNotifications">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item
                      v-for="(application, index) in applicationsToEvaluate"
                      :key="index"
                      class="py-2"
                    >
                      <template v-slot:prepend>
                        <v-avatar
                          size="40"
                          :color="getAvatarColor(application.initials)"
                          class="font-weight-bold"
                          >{{ application.initials }}</v-avatar
                        >
                      </template>
                      <v-list-item-title class="font-weight-bold">
                        {{ application.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-caption">
                        {{ application.applicationId }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="text-caption mt-1">
                        {{ application.message }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle class="text-caption mt-1">
                        {{ application.time }}
                      </v-list-item-subtitle>
                      <template v-slot:append>
                        <v-chip
                          :color="getStatusColor(application.status)"
                          size="small"
                          label
                          >{{ application.status }}</v-chip
                        >
                      </template>
                    </v-list-item>
                  </v-list>
                  <v-divider></v-divider>
                  <v-card-actions class="d-flex justify-center">
                    <v-btn
                      variant="text"
                      color="blue"
                      to="/building-permit"
                      class="text-none"
                    >
                      View All Applications
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>

              <v-btn text to="/profile" class="profile-btn">
                <v-avatar size="32" class="mx-2">
                  <v-img alt="Charlene" src="@/assets/charlene.jpg"></v-img>
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-caption font-weight-bold"
                    style="color: #555; white-space: nowrap"
                  >
                    Charlene Lumanta
                  </span>
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                  >
                    Mechanical Engineer
                  </span>
                </div>
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>

          <v-card-text class="flex-grow-1 pa-4">
            <v-row class="mb-6">
              <v-col cols="12" sm="6" md="3">
                <v-card
                  color="#007bff"
                  @click="filterByStatus('Total')"
                  class="text-white"
                >
                  <v-card-text
                    class="d-flex align-center justify-space-between"
                  >
                    <div>
                      <div class="text-h6 font-weight-bold">
                        Total Applicants
                      </div>
                      <div class="text-h4 font-weight-bold">
                        {{ totalApplicants }}
                      </div>
                    </div>
                    <v-icon size="48" color="white">mdi-account-group</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card
                  color="#ffc107"
                  @click="filterByStatus('Pending')"
                  class="text-white"
                >
                  <v-card-text
                    class="d-flex align-center justify-space-between"
                  >
                    <div>
                      <div class="text-h6 font-weight-bold">Pending</div>
                      <div class="text-h4 font-weight-bold">
                        {{ pendingApplicants }}
                      </div>
                    </div>
                    <v-icon size="48" color="white">mdi-clock-outline</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card
                  color="#28a745"
                  @click="filterByStatus('Verified')"
                  class="text-white"
                >
                  <v-card-text
                    class="d-flex align-center justify-space-between"
                  >
                    <div>
                      <div class="text-h6 font-weight-bold">Verified</div>
                      <div class="text-h4 font-weight-bold">
                        {{ verifiedApplicants }}
                      </div>
                    </div>
                    <v-icon size="48" color="white"
                      >mdi-check-circle-outline</v-icon
                    >
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card
                  color="#dc3545"
                  @click="filterByStatus('Return')"
                  class="text-white"
                >
                  <v-card-text
                    class="d-flex align-center justify-space-between"
                  >
                    <div>
                      <div class="text-h6 font-weight-bold">Return</div>
                      <div class="text-h4 font-weight-bold">
                        {{ returnApplicants }}
                      </div>
                    </div>
                    <v-icon size="48" color="white"
                      >mdi-alert-circle-outline</v-icon
                    >
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-4 align-center">
              <v-col cols="12" sm="8" md="6">
                <v-text-field
                  v-model="search"
                  label="Search applicants..."
                  append-inner-icon="mdi-magnify"
                  density="compact"
                  variant="solo"
                  hide-details
                  single-line
                  :loading="loading"
                  @click:append-inner="onClick"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="6" class="d-flex justify-end">
                <v-menu :close-on-content-click="false" location="bottom right">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="#007bff"
                      class="text-white"
                      prepend-icon="mdi-filter-variant"
                      v-bind="props"
                    >
                      Filter
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="filterByStatus('Total')">
                      <v-list-item-title>All</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="filterByStatus('Pending')">
                      <v-list-item-title>Pending</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="filterByStatus('Verified')">
                      <v-list-item-title>Verified</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="filterByStatus('Return')">
                      <v-list-item-title>Return</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>

            <v-card class="elevation-1">
              <v-data-table
                :headers="headers"
                :items="filteredApplicants"
                item-key="name"
                class="elevation-0"
                hide-default-footer
              >
                <template v-slot:item.name="{ item }">
                  <div class="d-flex align-center py-2">
                    <v-avatar
                      size="36"
                      :color="getAvatarColor(item.initials)"
                      class="me-2 text-white"
                    >
                      {{ item.initials }}
                    </v-avatar>
                    <span>{{ item.name }}</span>
                  </div>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip :color="getStatusColor(item.status)" dark small>
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn
                    color="#007bff"
                    class="text-white"
                    small
                    @click="viewDetails(item)"
                  >
                    View Details
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
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

const applicationsToEvaluate = ref([
  {
    name: "Jin Degusman",
    initials: "JD",
    applicationId: "BP-2024-000123-T",
    message: "Building permit application requires architectural evaluation",
    time: "2 days ago",
    status: "Verified",
    read: false,
  },
  {
    name: "David Tolo...",
    initials: "DT",
    applicationId: "BP-2024-000567-T",
    message: "Building permit application requires architectural evaluation",
    time: "3 days ago",
    status: "Verified",
    read: false,
  },
  {
    name: "Jennifer Nayda",
    initials: "JN",
    applicationId: "BP-2024-000910-T",
    message: "Building permit application requires architectural evaluation",
    time: "4 days ago",
    status: "Verified",
    read: false,
  },
]);

const unreadNotificationsCount = computed(() => {
  return applicationsToEvaluate.value.filter((n) => !n.read).length;
});

const closeNotifications = () => {
  applicationsToEvaluate.value.forEach((notification) => {
    notification.read = true;
  });
};

const headers = [
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Date Submitted", key: "dateSubmitted", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

const applicants = ref([
  {
    initials: "JM",
    name: "Jm Deguzman",
    applicationNumber: "BP-2024-808123-T",
    dateSubmitted: "Jan 15, 2024",
    status: "Verified",
  },
  {
    initials: "SG",
    name: "Sarah Geronimo",
    applicationNumber: "BP-2024-808234-T",
    dateSubmitted: "Jan 16, 2024",
    status: "Verified",
  },
  {
    initials: "MP",
    name: "Michael Padilla",
    applicationNumber: "BP-2024-808345-T",
    dateSubmitted: "Jan 17, 2024",
    status: "Return",
  },
  {
    initials: "CL",
    name: "Czarina Lopez",
    applicationNumber: "BP-2024-808456-T",
    dateSubmitted: "Jan 18, 2024",
    status: "Pending",
  },
]);

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
    JD: "#007bff",
    DT: "#17a2b8",
    JN: "#6f42c4",
    MS: "#ffc107",
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

/* This is the new CSS rule to hide the button's visual elements */
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}
</style>