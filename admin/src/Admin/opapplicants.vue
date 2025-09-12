<template>
  <v-app>
    <AdminHeader />
    <AdminNavigation />
    <v-main class="bg-grey-lighten-4">
      <div class="d-flex justify-center">
        <v-card
          class="d-flex flex-column fill-height"
          style="width: 100%; max-width: 1300px; border-radius: 0; box-shadow: none"
        >
          <Header
            header_title="Occupancy Permit"
            :username="auth.user.username"
            :user_type="auth.user.user_type"
          />
          <v-divider></v-divider>

          <v-card-text class="flex-grow-1 pa-4">
            <v-row class="mb-6">
              <v-col cols="12" sm="6" md="3">
                <v-card color="#007bff" @click="filterByStatus('Total')">
                  <v-card-text class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h6 font-weight-bold text-white">
                        Total Applicants
                      </div>
                      <div class="text-h4 font-weight-bold text-white">
                        {{ filteredApplicantsCount.total }}
                      </div>
                    </div>
                    <v-icon size="48" color="white">mdi-account-group</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card color="#ffc107" @click="filterByStatus('Pending')">
                  <v-card-text class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h6 font-weight-bold text-white">Pending</div>
                      <div class="text-h4 font-weight-bold text-white">
                        {{ filteredApplicantsCount.pending }}
                      </div>
                    </div>
                    <v-icon size="48" color="white">mdi-clock-outline</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card color="#28a745" @click="filterByStatus('PASSED')">
                  <v-card-text class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h6 font-weight-bold text-white">PASSED</div>
                      <div class="text-h4 font-weight-bold text-white">
                        {{ filteredApplicantsCount.passed }}
                      </div>
                    </div>
                    <v-icon size="48" color="white">mdi-check-circle-outline</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-card color="#dc3545" @click="filterByStatus('WITH VIOLATION')">
                  <v-card-text class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-h6 font-weight-bold text-white">
                        WITH VIOLATION
                      </div>
                      <div class="text-h4 font-weight-bold text-white">
                        {{ filteredApplicantsCount.violation }}
                      </div>
                    </div>
                    <v-icon size="48" color="white">mdi-alert-circle-outline</v-icon>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-tabs
              v-model="activeTab"
              color="#007bff"
              slider-color="#007bff"
              class="mb-4"
            >
              <v-tab value="occupancy">Occupancy Applications</v-tab>
              <v-tab value="inspection">Building Inspection</v-tab>
            </v-tabs>

            <v-window v-model="activeTab">
              <v-window-item value="occupancy">
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
                    :items="filteredOccupancyApplicants"
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
                        to="/opverification"
                      >
                        View Details
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-window-item>

              <v-window-item value="inspection">
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
                        <v-list-item @click="filterByStatus('PASSED')">
                          <v-list-item-title>PASSED</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="filterByStatus('WITH VIOLATION')">
                          <v-list-item-title>WITH VIOLATION</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-card class="elevation-1">
                  <v-data-table
                    :headers="inspectionHeaders"
                    :items="filteredInspectionApplicants"
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
                        to="/opinspection"
                      >
                        View Details
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const fileInput = ref(null);
const search = ref("");
const activeFilter = ref("All");
const loading = ref(false);
const activeTab = ref("occupancy");

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

const notifications = ref([
  {
    title: "",
    applicationId: "",
    message: "",
    time: "",
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

const headers = [
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Date Submitted", key: "dateSubmitted", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

const inspectionHeaders = [
  { title: "Applicant name", key: "name", sortable: false },
  { title: "Application number", key: "applicationNumber", sortable: false },
  { title: "Inspection date", key: "inspectionDate", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

const occupancyApplicants = ref([
  {
    initials: "",
    name: "",
    applicationNumber: "",
    dateSubmitted: "",
    status: "Pending",
  },
]);

const inspectionApplicants = ref([
  {
    initials: "",
    name: "",
    applicationNumber: "",
    inspectionDate: "",
    status: "Pending",
  },
]);

const currentApplicants = computed(() => {
  if (activeTab.value === "inspection") {
    return inspectionApplicants.value;
  }
  return occupancyApplicants.value;
});

const filteredOccupancyApplicants = computed(() => {
  let filtered = occupancyApplicants.value;
  const searchTerm = search.value.toLowerCase();

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter((applicant) =>
      applicant.name.toLowerCase().includes(searchTerm)
    );
  }

  // Apply status filter based on the activeFilter state
  if (activeFilter.value !== "All" && activeFilter.value !== "Total") {
    filtered = filtered.filter((applicant) => applicant.status === activeFilter.value);
  }

  return filtered;
});

const filteredInspectionApplicants = computed(() => {
  let filtered = inspectionApplicants.value;
  const searchTerm = search.value.toLowerCase();

  // Apply search filter
  if (searchTerm) {
    filtered = filtered.filter((applicant) =>
      applicant.name.toLowerCase().includes(searchTerm)
    );
  }

  // Apply status filter based on the activeFilter state
  if (activeFilter.value !== "All" && activeFilter.value !== "Total") {
    filtered = filtered.filter((applicant) => applicant.status === activeFilter.value);
  }

  return filtered;
});

const filteredApplicantsCount = computed(() => {
  const allApplicants = currentApplicants.value;
  return {
    total: allApplicants.length,
    pending: allApplicants.filter((a) => a.status === "Pending").length,
    passed: allApplicants.filter((a) => a.status === "PASSED").length,
    violation: allApplicants.filter((a) => a.status === "WITH VIOLATION").length,
  };
});

const handleUploadClick = () => {
  fileInput.value.click();
};

const logout = () => {
  console.log("Logged out");
};

const getStatusColor = (status) => {
  if (status === "PASSED") return "green";
  if (status === "Pending") return "orange";
  if (status === "WITH VIOLATION") return "red";
  if (status === "Verified") return "green";
  if (status === "Return") return "red";
  return "grey";
};

const getAvatarColor = () => {
  const colors = [
    "red-lighten-4",
    "blue-lighten-4",
    "green-lighten-4",
    "purple-lighten-4",
    "orange-lighten-4",
    "teal-lighten-4",
    "cyan-lighten-4",
    "amber-lighten-4",
    "lime-lighten-4",
    "pink-lighten-4",
    "indigo-lighten-4",
    "brown-lighten-4",
    "deep-orange-lighten-4",
    "light-blue-lighten-4",
    "light-green-lighten-4",
    "yellow-lighten-4",
    "deep-purple-lighten-4",
    "blue-grey-lighten-4",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
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
