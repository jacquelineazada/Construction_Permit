<template>
  <v-app>
    <AdminHeader />
    <AdminNavigation />

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
            <div class="text-h6 font-weight-bold">Building Inspection</div>
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
                  <v-card-title class="d-flex justify-space-between align-center">
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
                      <div class="text-caption text-grey-darken-1">Applicant Name:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.applicantName }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Project Name:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.projectName }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">Project Location:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.projectLocation }}
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-home-city-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">Property Details</div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Property Type:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.propertyType }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Building Use:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.buildingUse }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Floor Area:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.floorArea }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Number of Floors:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.numberOfFloors }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Property Address:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.propertyAddress }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Lot Area:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.lotArea }}
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-calendar-check-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">
                      Building Inspection Schedule
                    </div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Date:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.inspectionSchedule.date }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">Time:</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.inspectionSchedule.time }}
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-card>

              <v-card style="border-radius: 8px">
                <div class="pa-4">
                  <div class="d-flex align-center mb-2">
                    <v-icon class="me-2">mdi-file-download-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">Required Documents</div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <v-data-table
                    :headers="headers"
                    :items="selectedApplicant.documents.requiredDocs"
                    density="compact"
                    class="elevation-1"
                    hide-default-footer
                  >
                    <template v-slot:item.description="{ item }">
                      <span class="text-caption text-grey-darken-1">{{
                        item.description
                      }}</span>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-btn
                        color="blue"
                        variant="flat"
                        size="small"
                        @click="viewDocument(item)"
                        >View</v-btn
                      >
                    </template>
                    <template v-slot:item.status="{ item }">
                      <v-chip :color="getStatusColor(item.status)" size="small" label>{{
                        item.status
                      }}</v-chip>
                    </template>
                  </v-data-table>
                </div>
              </v-card>
            </div>

            <div class="d-flex flex-column" style="flex: 1; margin-left: 16px; gap: 16px">
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
                        {{ selectedApplicant.applicationId }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">Type</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.type }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">Processing Fee</div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.processingFee }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">Payment Status</div>
                      <div class="text-caption font-weight-medium">
                        <v-chip
                          :color="selectedApplicant.paymentStatusColor"
                          size="small"
                          variant="flat"
                          >{{ selectedApplicant.paymentStatus }}</v-chip
                        >
                      </div>
                    </v-col>
                  </v-row>
                  <div class="text-caption mt-4">
                    <strong>Note:</strong> Payment will be processed after building
                    inspection is complete. is complete. You will be notified once the
                    inspection is done.
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
                      v-for="(event, index) in selectedApplicant.timeline"
                      :key="index"
                      :dot-color="event.color"
                      size="small"
                      :fill-dot="event.filled"
                      class="pb-0"
                    >
                      <div class="text-caption font-weight-bold">
                        {{ event.title }}
                      </div>
                      <div class="text-caption">{{ event.date }}</div>
                    </v-timeline-item>
                  </v-timeline>
                </div>
              </v-card>
            </div>
          </div>
        </v-card>
      </div>
    </v-main>

    <v-dialog v-model="reportDialogVisible" max-width="800px">
      <v-card class="report-card" v-if="selectedInspection">
        <v-toolbar color="white" flat>
          <v-toolbar-title class="text-h5 font-weight-bold text-black">{{
            selectedInspection.type
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip
            :color="getStatusColor(selectedInspection.status)"
            label
            class="font-weight-bold text-caption mr-2"
          >
            {{ selectedInspection.status }}
          </v-chip>
          <v-btn icon @click="reportDialogVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-6">
          <div class="d-flex align-start mb-4">
            <div class="flex-grow-1">
              <div class="report-info-label">
                Assigned Inspector: {{ selectedInspection.inspector }}
              </div>
              <div class="report-info-label">
                Date of Inspection: {{ selectedInspection.date }}
              </div>
            </div>
          </div>
          <div class="report-content-text-area"></div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="d-flex justify-space-between pa-4">
          <v-btn
            variant="text"
            class="text-none"
            :disabled="currentIndex === 0"
            @click="goToPrevious"
          >
            <v-icon start>mdi-chevron-left</v-icon>Previous
          </v-btn>
          <span class="text-caption text-grey"
            >{{ currentIndex + 1 }} of {{ inspections.length }}</span
          >
          <v-btn
            variant="flat"
            color="primary"
            class="text-none"
            :disabled="currentIndex === inspections.length - 1"
            @click="goToNext"
          >
            Next<v-icon end>mdi-chevron-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

const applicationsToEvaluate = ref([
  {
    name: "",
    initials: "",
    applicationId: "OP-2024-001",
    message: "New Occupancy Permit Application",
    time: "2 hours ago",
    status: "Pending",
    read: false,
  },
]);

// Updated headers
const headers = [
  { title: "Inspection Type", key: "name", align: "start" },
  { title: "Inspector Name", key: "inspector", align: "start" },
  { title: "Status", key: "status", align: "start" },
  { title: "Actions", key: "actions", align: "end", sortable: false },
];

const applicants = ref([
  {
    id: "OP-2024-001",
    applicantName: " ",
    initials: "",
    status: "",
    applicationId: "",
    projectName: "",
    projectLocation: "",
    propertyDetails: {
      propertyType: "",
      buildingUse: "",
      floorArea: "",
      numberOfFloors: "",
      propertyAddress: "",
      lotArea: "",
    },
    inspectionSchedule: {
      date: "",
      time: "",
    },
    documents: {
      requiredDocs: [
        {
          name: "Architectural Works",
          status: "Pending",
          inspector: "",
        },
        {
          name: "Civil/Structural Works",
          status: "Pending",
          inspector: "",
        },
        {
          name: "Electrical Works",
          status: "Pending",
          inspector: "",
        },
        {
          name: "Sanitary Plumbing Works",
          status: "Pending",
          inspector: "",
        },
      ],
    },
    type: "Occupancy Permit",
    processingFee: "",
    paymentStatus: "Pending",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 16, 2024 - 10:30 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Document Verified",
        date: "Verified",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Building Inspection",
        date: "Pending",
        color: "grey",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Pending",
        color: "grey",
        filled: false,
      },
      {
        title: "Final Approval",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
]);

const inspections = ref([
  {
    type: "Architectural Works",
    status: "Pending",
    inspector: "Eng. Joyce Oberos",
    date: null,
  },
  {
    type: "Civil/Structural Works",
    status: "Pending",
    inspector: "Eng. Roberto Martinez",
    date: null,
  },
  {
    type: "Electrical Works",
    status: "Pending",
    inspector: "Eng. Bernadette Veroza",
    date: null,
  },
  {
    type: "Sanitary Plumbing Works",
    status: "Pending",
    inspector: "Eng. Andrew Villapane",
    date: null,
  },
]);

const selectedApplicant = ref(applicants.value[0]);

const reportDialogVisible = ref(false);
const currentIndex = ref(0);
const selectedInspection = computed(() => inspections.value[currentIndex.value] || {});

const unreadNotificationsCount = computed(() => {
  return applicationsToEvaluate.value.filter((n) => !n.read).length;
});

const closeNotifications = () => {
  applicationsToEvaluate.value.forEach((notification) => {
    notification.read = true;
  });
};

const logout = () => {
  console.log("User logged out.");
};

const getStatusColor = (status) => {
  if (status === "Verified") return "green";
  if (status === "Pending") return "orange";
  if (status === "Return" || status === "Rejected") return "red";
  return "grey";
};

const getAvatarColor = (initials) => {
  const colors = {};
  return colors[initials] || "grey";
};

const viewDocument = (item) => {
  const index = inspections.value.findIndex((insp) => insp.type === item.name);
  if (index !== -1) {
    currentIndex.value = index;
    reportDialogVisible.value = true;
  }
};

const goToNext = () => {
  if (currentIndex.value < inspections.value.length - 1) {
    currentIndex.value++;
  }
};

const goToPrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>

<style scoped>
.main-content {
  background-color: #f8f9fa;
}
.content-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  padding: 16px 24px 24px 24px;
}

.v-navigation-drawer {
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
}
.construction-permit-header {
  color: #101828;
  font-weight: 600;
  font-size: 0.9rem;
  padding-left: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.construction-permit-header .v-icon {
  color: #2563eb !important;
}
.active-nav-item {
  background-color: #a9c3fa6e;
  color: rgb(58, 57, 57) !important;
  border-radius: 4px;
}
.active-nav-item :deep(.v-icon) {
  color: rgb(97, 97, 97) !important;
}
.v-list-item:hover {
  background-color: transparent;
}

.toolbar-title {
  padding-left: 16px;
  font-weight: 600;
  font-size: 1.2rem;
  color: #344054;
}
.user-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #101828;
}
.user-role {
  font-size: 0.8rem;
  color: #667085;
}

.header-card {
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid #eaecf0;
}
.header-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #101828;
  line-height: 1.2;
}
.header-subtitle {
  color: #667085;
  font-size: 0.9rem;
}

.section-card {
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid #eaecf0;
}
.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #101828;
  padding: 16px 24px 8px 24px;
}
.v-card-text {
  padding: 8px 24px 16px 24px;
}

.schedule-card {
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  border: 1px solid #eaecf0;
}
.schedule-title {
  font-size: 1rem;
  font-weight: 600;
  color: #101828;
  padding: 16px 24px 8px 24px;
  border-bottom: 1px solid #eaecf0;
}
.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}
.schedule-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #667085;
}
.schedule-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #344054;
}

.inspector-table th {
  font-weight: 600 !important;
  color: #4a4a4a !important;
  background-color: #f5f5f5 !important;
  border-bottom: 1px solid #e0e0e0;
}
.inspector-table td {
  font-weight: 400 !important;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
}
.v-table__wrapper > table > tbody > tr:last-child > td {
  border-bottom: none !important;
}

.status-chip {
  font-weight: 500;
}
.status-chip-pending {
  background-color: #fef9c3;
  color: #f59e0b;
  font-weight: 500;
  border-radius: 16px;
  font-size: 0.75rem;
  height: 22px;
}
.status-chip-result-pending {
  background-color: #fef3c7;
  color: #d97706;
  font-weight: 500;
  border-radius: 16px;
  font-size: 0.75rem;
  height: 22px;
}

.info-block {
  margin-bottom: 1.25rem;
}
.info-block:last-child {
  margin-bottom: 0;
}
.info-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #667085;
  margin-bottom: 4px;
}
.info-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: #344054;
}
.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-card {
  border-radius: 12px !important;
}
.report-header {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.report-header-supertitle {
  font-size: 0.8rem;
  color: #667085;
  margin-bottom: 2px;
}
.report-header-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #101828;
}
.report-info-label {
  font-size: 0.9rem;
  color: #4a4a4a;
  line-height: 1.6;
}
.report-content-text-area {
  margin-top: 24px;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  height: 250px;
  padding: 16px;
  color: #333;
}
</style>
