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
            <div class="text-h6 font-weight-bold">Occupancy Permit Applicants</div>
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
                    <v-icon class="me-2">mdi-file-download-outline</v-icon>
                    <div class="text-subtitle-1 font-weight-bold">Required Documents</div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <div class="d-flex flex-column" style="gap: 8px">
                    <v-card
                      v-for="(doc, index) in selectedApplicant.documents.requiredDocs"
                      :key="index"
                      class="py-2 px-3"
                    >
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-icon color="red">mdi-file-pdf-box</v-icon>
                          <div class="ms-3">
                            <div class="font-weight-medium">
                              {{ doc.name }}
                            </div>
                            <div class="text-caption text-grey-darken-1">
                              {{ doc.description }}
                            </div>
                          </div>
                        </div>
                        <v-btn
                          color="blue"
                          variant="flat"
                          size="small"
                          @click="viewDocument(doc)"
                          >View</v-btn
                        >
                      </div>
                    </v-card>
                  </div>
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
                      <v-chip
                        :color="selectedApplicant.paymentStatusColor"
                        size="small"
                        variant="flat"
                        >{{ selectedApplicant.paymentStatus }}</v-chip
                      >
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

    <v-dialog
      v-model="dialogVisible"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="pdf-dialog-card">
        <v-toolbar color="primary" dark>
          <v-btn icon dark @click="dialogVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedDocTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-0 pdf-container">
          <iframe :src="selectedDocUrl" width="100%" height="100%" frameborder="0">
            Loading PDF...
          </iframe>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4 bg-white">
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            variant="flat"
            size="large"
            @click="handleReturn"
            class="mx-2"
          >
            <v-icon start>mdi-close-circle-outline</v-icon>
            Return
          </v-btn>
          <v-btn
            color="green"
            variant="flat"
            size="large"
            @click="handleVerify"
            class="mx-2"
          >
            <v-icon start>mdi-check-circle-outline</v-icon>
            Verified
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="scheduleDialogVisible" persistent max-width="700px">
      <v-card class="schedule-card">
        <div class="approval-header">
          <div class="d-flex align-center">
            <v-icon color="success" class="mr-3">mdi-check-circle</v-icon>
            <span class="approval-title">Application Verified</span>
          </div>
          <v-btn icon variant="text" size="small" @click="closeScheduleDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card-title class="schedule-title"> Schedule Inspection </v-card-title>
        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="12" md="6">
              <label class="form-label">Date of Inspection</label>
              <v-text-field
                v-model="inspectionDate"
                type="date"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <label class="form-label">Time</label>
              <v-text-field
                v-model="inspectionTime"
                type="time"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <label class="form-label mt-4 d-block">Assign Inspectors</label>
          <v-row>
            <v-col cols="12" md="6">
              <div class="inspector-label">Architectural Works</div>
              <v-select
                v-model="selectedInspectors.architectural"
                :items="inspectors"
                placeholder="Select Inspector"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <div class="inspector-label">Civil/Structural Works</div>
              <v-select
                v-model="selectedInspectors.civil"
                :items="inspectors"
                placeholder="Select Inspector"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <div class="inspector-label">Electrical Works</div>
              <v-select
                v-model="selectedInspectors.electrical"
                :items="inspectors"
                placeholder="Select Inspector"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <div class="inspector-label">Sanitary Plumbing Works</div>
              <v-select
                v-model="selectedInspectors.sanitary"
                :items="inspectors"
                placeholder="Select Inspector"
                density="compact"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-btn
            @click="sendSchedule"
            color="green-darken-1"
            variant="flat"
            block
            size="large"
          >
            Submit Schedule
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="returnDialogVisible" persistent max-width="600px">
      <v-card class="return-card">
        <v-card-title class="return-header">
          <v-icon class="return-header-icon">mdi-close-circle</v-icon>
          <span>Returned Application</span>
          <v-spacer></v-spacer>
          <v-btn icon variant="text" size="small" @click="closeReturnDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-6">
          <div class="return-info-grid">
            <div>
              <div class="info-label">Application Number</div>
              <div class="info-value"></div>
            </div>
            <div>
              <div class="info-label">Rejection Date</div>
              <div class="info-value"></div>
            </div>
            <div>
              <div class="info-label">Reviewed By</div>
              <div class="info-value"></div>
            </div>
            <div>
              <div class="info-label">Status</div>
              <div class="info-value">
                <v-chip color="red" variant="tonal" size="small"> Rejected </v-chip>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <div class="form-label font-weight-bold">Select Rejection Reason</div>
            <div class="rejection-checkboxes">
              <v-checkbox
                v-for="reason in rejectionReasons"
                :key="reason"
                v-model="selectedReasons"
                :label="reason"
                :value="reason"
                hide-details
                density="compact"
              ></v-checkbox>
            </div>
          </div>
          <div class="mt-4">
            <div class="form-label font-weight-bold">Detailed Explanation</div>
            <v-textarea
              v-model="rejectionExplanation"
              placeholder="Please provide detailed explanation for the rejection..."
              variant="outlined"
              rows="4"
              no-resize
              maxlength="500"
            ></v-textarea>
          </div>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer></v-spacer>
          <v-btn variant="outlined" size="large" @click="closeReturnDialog" class="mx-2"
            >Cancel</v-btn
          >
          <v-btn
            color="red"
            variant="flat"
            size="large"
            @click="confirmRejection"
            class="mx-2"
          >
            <v-icon start>mdi-check</v-icon>
            Confirm Rejection
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

const applicants = ref([
  {
    id: "OP-2024-001",
    applicantName: "",
    initials: "",
    status: "Pending",
    applicationId: "OP-2024-001",
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
    documents: {
      requiredDocs: [
        {
          name: "Construction Logbook",
          description: "Required Document",
          url:
            "https://drive.google.com/file/d/182bu9qPuKf3QtVyeEUOYApKjbEaPxoDF/preview",
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
        title: "Document Review",
        date: "Pending",
        color: "grey",
        filled: false,
      },
      {
        title: "Building Inspection",
        date: "Pending",
        color: "grey",
        filled: false,
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

const selectedApplicant = ref(applicants.value[0]);

const dialogVisible = ref(false);
const selectedDocUrl = ref("");
const selectedDocTitle = ref("");

// State for Schedule Inspection Dialog
const scheduleDialogVisible = ref(false);
const inspectionDate = ref(null);
const inspectionTime = ref(null);
const inspectors = ref(["Eng. ", "Arch."]);
const selectedInspectors = ref({
  architectural: null,
  civil: null,
  electrical: null,
  sanitary: null,
});

const returnDialogVisible = ref(false);
const rejectionReasons = ref([
  "Incomplete or missing entries",
  "Not signed and certified by the supervising architect/civil engineer",
  "No record of required inspections and tests",
  "Altered, erased, or falsified entries",
  "Non-compliance with prescribed format and standards",
]);
const selectedReasons = ref([]);
const rejectionExplanation = ref("");

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
  if (status === "Return") return "red";
  return "grey";
};

const getAvatarColor = (initials) => {
  const colors = {};
  return colors[initials] || "grey";
};

const viewDetails = (applicant) => {
  selectedApplicant.value = applicant;
};

const viewDocument = (doc) => {
  selectedDocUrl.value = doc.url;
  selectedDocTitle.value = doc.name;
  dialogVisible.value = true;
};

// This function now just opens the Return dialog. Timeline update is in confirmRejection.
const handleReturn = () => {
  console.log(`${selectedDocTitle.value} is being returned.`);
  dialogVisible.value = false;
  returnDialogVisible.value = true;
};

// This function now just opens the Schedule dialog. Timeline update is in sendSchedule.
const handleVerify = () => {
  console.log(`${selectedDocTitle.value} has been verified.`);
  dialogVisible.value = false;
  scheduleDialogVisible.value = true;
};

const closeScheduleDialog = () => {
  scheduleDialogVisible.value = false;
  inspectionDate.value = null;
  inspectionTime.value = null;
  selectedInspectors.value = {
    architectural: null,
    civil: null,
    electrical: null,
    sanitary: null,
  };
};

// New function to handle "Submit Schedule" button click
const sendSchedule = () => {
  console.log("Sending Schedule with the following data:");
  console.log("Date:", inspectionDate.value);
  console.log("Time:", inspectionTime.value);
  console.log("Assigned Inspectors:", selectedInspectors.value);

  // Update the timeline for "Document Review"
  const documentReviewStep = selectedApplicant.value.timeline.find(
    (item) => item.title === "Document Review"
  );
  if (documentReviewStep) {
    documentReviewStep.date = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    documentReviewStep.color = "#B4FE98";
    documentReviewStep.filled = true;
  }

  // Update the next step in the timeline for "Building Inspection"
  const buildingInspectionStep = selectedApplicant.value.timeline.find(
    (item) => item.title === "Building Inspection"
  );
  if (buildingInspectionStep) {
    buildingInspectionStep.date = "Pending";
    buildingInspectionStep.color = "orange";
    buildingInspectionStep.filled = true;
  }

  alert("Inspection Schedule has been sent!");
  closeScheduleDialog();
};

const closeReturnDialog = () => {
  returnDialogVisible.value = false;
  selectedReasons.value = [];
  rejectionExplanation.value = "";
};

// New function to handle "Confirm Rejection" button click
const confirmRejection = () => {
  console.log("Confirming Rejection with the following data:");
  console.log("Reasons:", selectedReasons.value);
  console.log("Explanation:", rejectionExplanation.value);

  // Update the timeline for "Document Review" only
  const documentReviewStep = selectedApplicant.value.timeline.find(
    (item) => item.title === "Document Review"
  );
  if (documentReviewStep) {
    documentReviewStep.date = new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    documentReviewStep.color = "red";
    documentReviewStep.filled = true;
  }

  alert("Application has been returned.");
  closeReturnDialog();
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
.v-list-item--active {
  background-color: rgba(0, 0, 0, 0.04);
}

.pdf-dialog-card {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.pdf-container {
  flex-grow: 1;
  overflow: hidden;
}

.schedule-card {
  border-radius: 12px !important;
}
.approval-header {
  background-color: #f0fdf4;
  color: #166534;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.approval-title {
  font-weight: 600;
  font-size: 1rem;
}
.schedule-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  padding: 16px 24px 0 24px;
}
.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}
.inspector-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.return-card {
  border-radius: 12px !important;
}
.return-header {
  background-color: #fef2f2;
  color: #b91c1c;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 12px 16px !important;
}
.return-header-icon {
  background-color: #fee2e2;
  border-radius: 50%;
  color: #ef4444;
  padding: 4px;
  margin-right: 12px;
  font-size: 1.5rem;
}
.return-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
}
.rejection-checkboxes :deep(.v-label) {
  font-size: 0.9rem;
  color: #374151;
}
</style>
