<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <div class="d-flex align-center h-100 px-6"></div>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6 py-3"
        style="background-color: white; border-bottom: 1px solid lightgrey"
      >
        <div class="d-flex align-center">
          <v-icon color="blue" class="mr-3" size="24"
            >mdi-office-building</v-icon
          >
          <h2 class="mb-0 text-h6 font-weight-bold">
            Building Permit Application
          </h2>
        </div>

        <div class="d-flex align-center">
          <v-menu :close-on-content-click="false" location="bottom end">
            <template v-slot:activator="{ props }">
              <v-badge
                color="red"
                :content="unreadNotificationsCount"
                overlap
                class="me-3 cursor-pointer"
                v-bind="props"
              >
                <v-icon size="22">mdi-bell</v-icon>
              </v-badge>
            </template>
            <v-card min-width="320" max-width="450" class="rounded-lg">
              <v-card-title
                class="d-flex justify-space-between align-center py-2"
              >
                <span class="text-subtitle-1 font-weight-bold"
                  >Applications to Evaluate</span
                >
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="closeNotifications"
                >
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
                      class="font-weight-bold white--text"
                      >{{ application.initials }}</v-avatar
                    >
                  </template>
                  <v-list-item-title class="font-weight-bold text-subtitle-2">
                    {{ application.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ application.applicationId }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-caption mt-1 text-wrap">
                    {{ application.message }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-caption mt-1 text-grey">
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
                  class="text-none font-weight-bold"
                  >View All Applications</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>

          <v-btn text to="/profile" class="profile-btn pa-2 rounded-lg">
            <v-avatar size="36" class="mx-2">
              <v-img
                alt="Architect"
                src="https://cdn.vuetifyjs.com/images/john.jpg"
              ></v-img>
            </v-avatar>
            <div class="d-flex flex-column text-left">
              <span
                class="text-body-2 font-weight-bold"
                style="color: #555; white-space: nowrap"
              >
                Alyssa C. Alvarez
              </span>
              <span
                class="text-caption font-weight-medium"
                style="color: #888; white-space: nowrap"
              >
                Architect
              </span>
            </div>
          </v-btn>
        </div>
      </v-card>

      <div class="d-flex flex-grow-1 pa-6">
        <div class="d-flex flex-column" style="flex: 2; gap: 20px">
          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue"
                  >mdi-account-details-outline</v-icon
                >
                <div class="text-h6 font-weight-bold">
                  Applicant Information
                </div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Applicant Name:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.applicantName }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Project Name:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.projectName }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1">
                    Project Location:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.projectLocation }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>

          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-home-city-outline</v-icon>
                <div class="text-h6 font-weight-bold">Property Details</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Property Type:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.propertyType }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Building Use:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.buildingUse }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">Floor Area:</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.floorArea }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Number of Floors:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.numberOfFloors }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">Lot Area:</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.lotArea }}
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <div class="text-caption text-grey-darken-1">
                    Property Address:
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.propertyDetails.propertyAddress }}
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card>

          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue"
                  >mdi-file-download-outline</v-icon
                >
                <div class="text-h6 font-weight-bold">Submitted Documents</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-list class="pa-0">
                <v-list-item
                  v-for="(plan, index) in selectedApplicant.documents
                    .surveyPlans"
                  :key="index"
                  class="rounded-lg mb-2 document-item"
                  lines="two"
                  color="blue"
                >
                  <template v-slot:prepend>
                    <v-icon color="red-darken-1" size="24"
                      >mdi-file-pdf-box</v-icon
                    >
                  </template>
                  <v-list-item-title class="font-weight-medium text-body-1">
                    {{ plan.name }}
                    <v-chip
                      size="x-small"
                      label
                      class="ml-2 text-uppercase font-weight-bold"
                      color="blue-grey-lighten-4"
                      >{{ plan.planType }}</v-chip
                    >
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ plan.description }} - {{ plan.size }} MB
                  </v-list-item-subtitle>
                  <template v-slot:append>
                    <v-btn
                      color="blue"
                      variant="outlined"
                      size="small"
                      class="text-none"
                      @click="evaluateDocument(plan)"
                      >Evaluate</v-btn
                    >
                  </template>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </div>

        <div
          class="d-flex flex-column"
          style="flex: 1; margin-left: 20px; gap: 20px"
        >
          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-text-box-outline</v-icon>
                <div class="text-h6 font-weight-bold">Application Summary</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-row dense>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1">
                    Application Number
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.applicationId }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1">Type</div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.type }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1">
                    Processing Fee
                  </div>
                  <div class="text-subtitle-2 font-weight-medium text-black">
                    {{ selectedApplicant.processingFee }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-caption text-grey-darken-1 mb-1">
                    Payment Status
                  </div>
                  <v-chip
                    :color="selectedApplicant.paymentStatusColor"
                    size="small"
                    variant="flat"
                    label
                    class="font-weight-bold"
                    >{{ selectedApplicant.paymentStatus }}</v-chip
                  >
                </v-col>
              </v-row>
              <div class="text-caption mt-4 text-grey-darken-2">
                <strong class="font-weight-bold">Note:</strong> Payment will be
                processed after plan evaluation is complete.
              </div>
            </div>
          </v-card>

          <v-card elevation="2" class="rounded-lg" v-if="selectedApplicant.id">
            <div class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon class="me-3" color="blue">mdi-list-box-outline</v-icon>
                <div class="text-h6 font-weight-bold">Application Timeline</div>
              </div>
              <v-divider class="mb-4"></v-divider>
              <v-timeline side="end" align="start" density="compact">
                <v-timeline-item
                  v-for="(event, index) in selectedApplicant.timeline"
                  :key="index"
                  :dot-color="event.color"
                  size="small"
                  :fill-dot="event.filled"
                  class="pb-0"
                >
                  <div class="text-body-2 font-weight-bold text-black">
                    {{ event.title }}
                  </div>
                  <div class="text-caption text-grey-darken-1">
                    {{ event.date }}
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </v-card>
        </div>
      </div>

      <v-card
        v-if="!selectedApplicant.id"
        class="ma-6 pa-6 text-center text-h6 text-grey-darken-1"
      >
        Select an application from the table to view its details and begin
        evaluation.
      </v-card>
    </v-main>

    <v-dialog v-model="isEvaluationModalVisible" max-width="1400">
      <v-card class="pa-6 rounded-xl">
        <v-card-title class="d-flex align-center justify-space-between pb-2">
          <div class="text-h5 font-weight-bold text-blue-darken-2">
            Document Evaluation: {{ currentEvaluationPlan.name }}
            <v-chip size="small" class="ml-2" color="blue">{{
              currentEvaluationPlan.planType
            }}</v-chip>
          </div>
          <v-btn
            icon
            size="small"
            variant="text"
            @click="isEvaluationModalVisible = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="12" md="9">
              <div
                class="pa-2 rounded-lg border"
                style="background-color: #f5f5f5"
              >
                <v-img
                  :src="mockPlanImage"
                  contain
                  class="rounded-lg"
                  style="max-height: 80vh"
                ></v-img>
              </div>
              <div class="text-caption text-center pt-2 text-grey-darken-1">
                Plan View - Zoom and annotation tools would be implemented here.
              </div>
            </v-col>

            <v-col cols="12" md="3">
              <v-form @submit.prevent="submitEvaluation">
                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    {{ currentEvaluationPlan.planType }} Requirements Checklist
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <div v-for="(req, index) in currentChecklist" :key="index">
                    <div class="d-flex align-center">
                      <v-checkbox
                        v-model="evaluationData.requirements"
                        :label="req.label"
                        :value="req.value"
                        density="compact"
                        hide-details
                        class="flex-grow-1"
                        color="blue"
                      ></v-checkbox>
                      <v-btn
                        icon
                        size="x-small"
                        variant="text"
                        :color="
                          evaluationData.commentsByRequirement[req.value] !==
                          undefined
                            ? 'red'
                            : 'grey-lighten-1'
                        "
                        @click="showCommentField(req.value)"
                        class="ms-2"
                      >
                        <v-icon size="18">mdi-comment-alert</v-icon>
                      </v-btn>
                    </div>
                    <v-textarea
                      v-if="
                        evaluationData.commentsByRequirement[req.value] !==
                        undefined
                      "
                      v-model="evaluationData.commentsByRequirement[req.value]"
                      placeholder="Add non-compliance comment..."
                      variant="outlined"
                      rows="2"
                      class="mt-1 mb-2"
                      hide-details
                      density="compact"
                    ></v-textarea>
                  </div>
                </div>

                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    General Comments/Feedback
                  </div>
                  <v-textarea
                    v-model="evaluationData.comments"
                    placeholder="General summary or additional feedback..."
                    variant="outlined"
                    rows="3"
                    hide-details
                  ></v-textarea>
                </div>

                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Assessment Status
                  </div>
                  <v-radio-group
                    v-model="evaluationData.status"
                    hide-details
                    color="blue"
                    class="mt-1"
                  >
                    <v-radio label="Approved" value="Verified"></v-radio>
                    <v-radio label="For Revision" value="Return"></v-radio>
                  </v-radio-group>
                </div>

                <v-card
                  variant="flat"
                  color="white"
                  class="pa-3 mb-4 elevation-1"
                >
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Fee Summary
                  </div>
                  <div class="d-flex flex-column" style="gap: 4px">
                    <div class="d-flex justify-space-between">
                      <div class="text-caption text-grey-darken-2">
                        Architectural Plan Review
                      </div>
                      <div class="text-caption font-weight-medium">₱500.00</div>
                    </div>
                    <div class="d-flex justify-space-between">
                      <div class="text-caption text-grey-darken-2">
                        Processing Fee
                      </div>
                      <div class="text-caption font-weight-medium">
                        ₱2,500.00
                      </div>
                    </div>
                    <v-divider class="my-1"></v-divider>
                    <div
                      class="d-flex justify-space-between font-weight-bold text-blue-darken-2"
                    >
                      <div class="text-body-2">Total Amount Due</div>
                      <div class="text-body-2">₱3,000.00</div>
                    </div>
                  </div>
                </v-card>

                <v-btn
                  type="submit"
                  color="blue"
                  variant="elevated"
                  block
                  size="large"
                  class="mt-4 text-none font-weight-bold"
                  >Submit Evaluation</v-btn
                >
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

// --- STATE MANAGEMENT ---
const search = ref("");
const activeFilter = ref("All");
const loading = ref(false);

// Modal State
const isEvaluationModalVisible = ref(false);
const currentEvaluationPlan = ref({});
const evaluationData = ref({
  requirements: [],
  comments: "",
  commentsByRequirement: {},
  status: "",
});

// Mock data for the evaluation form
const mockPlanImage = ref(
  "https://placehold.co/1000x800/e0e0e0/000000?text=Architectural+Plan+Placeholder"
);

// --- DYNAMIC CHECKLISTS DEFINITION (Only Architectural is needed, but retaining structure) ---
const planChecklists = {
  Architectural: [
    { label: "Complete Plan Set (1:100 scale)", value: "complete_plan_set" },
    { label: "Site Plan showing setbacks and site lines", value: "site_plan" },
    { label: "Floor Plans showing all Rooms", value: "floor_plans" },
    { label: "All Elevations", value: "all_elevations" },
    { label: "Section Showing all Floors", value: "all_sections" },
    { label: "Details (Stair Section/Ramp etc)", value: "details" },
  ],
};

// Computed property to dynamically fetch the correct checklist for the modal
const currentChecklist = computed(() => {
  const planType = currentEvaluationPlan.value.planType;
  return planChecklists[planType] || [];
});

// --- MOCK DATA (All applications focused on Architectural Plans) ---

const applicationsToEvaluate = ref([
  {
    name: "Jin Degusman",
    initials: "JD",
    applicationId: "BP-2024-000123-T",
    message: "Architectural plan ready for review",
    time: "2 days ago",
    status: "Pending",
    read: false,
  },
  {
    name: "David Tolo...",
    initials: "DT",
    applicationId: "BP-2024-000567-T",
    message: "Architectural plan ready for review",
    time: "3 days ago",
    status: "Verified",
    read: false,
  },
  {
    name: "Jennifer Nayda",
    initials: "JN",
    applicationId: "BP-2024-000910-T",
    message: "Missing elevation plans, returned for revision",
    time: "4 days ago",
    status: "Return",
    read: false,
  },
]);

const applicantsDetailed = ref([
  {
    id: 1,
    applicantName: "Jim Deguzman",
    initials: "JD",
    status: "Pending",
    applicationId: "BP-2024-000123-T",
    projectName: "Commercial Building",
    projectLocation: "San Felipe, Deca II Naga City",
    propertyDetails: {
      propertyType: "Commercial Building",
      buildingUse: "Retail Store",
      floorArea: "230 sq m",
      numberOfFloors: "2 Floors",
      propertyAddress: "456 Commercial Avenue, San Felipe, Deca I Naga City",
      lotArea: "350 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan ",
          description: "Floor plan and elevations",
          size: 2.5,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱2,500.00",
    paymentStatus: "Pending Plan Evaluation",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 16, 2024 - 10:30 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Architectural Review",
        date: "Jan 17, 2024 - 9:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
  {
    id: 2,
    applicantName: "David Tolo",
    initials: "DT",
    status: "Verified",
    applicationId: "BP-2024-000567-T",
    projectName: "Residential House",
    projectLocation: "Magarao, Camarines Sur",
    propertyDetails: {
      propertyType: "Residential House",
      buildingUse: "Single-family Home",
      floorArea: "150 sq m",
      numberOfFloors: "1 Floor",
      propertyAddress: "789 Pine Street, Magarao, Camarines Sur",
      lotArea: "250 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Plan - Full Set",
          description: "Complete drawings",
          size: 2.1,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱1,800.00",
    paymentStatus: "Approved - Fee Due",
    paymentStatusColor: "green",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 10, 2024 - 9:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Architectural Review Completed",
        date: "Jan 11, 2024 - 2:00 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Jan 12, 2024 - 10:00 AM",
        color: "#FBF46D",
        filled: true,
      },
    ],
  },
  {
    id: 3,
    applicantName: "Jennifer Nayda",
    initials: "JN",
    status: "Return",
    applicationId: "BP-2024-000910-T",
    projectName: "Office Renovation",
    projectLocation: "Penafrancia Ave, Naga City",
    propertyDetails: {
      propertyType: "Office",
      buildingUse: "Office Space",
      floorArea: "500 sq m",
      numberOfFloors: "5th Floor",
      propertyAddress: "123 Business Center, Penafrancia Ave, Naga City",
      lotArea: "1000 sq m",
    },
    documents: {
      surveyPlans: [
        {
          name: "Architectural Layout",
          description: "Floor plan only, missing elevations",
          size: 5.0,
          planType: "Architectural",
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱5,000.00",
    paymentStatus: "Revision Required",
    paymentStatusColor: "red",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 20, 2024 - 1:00 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Returned for Architectural Corrections",
        date: "Jan 22, 2024 - 9:00 AM",
        color: "red",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
]);

// CRITICAL FIX: Initialize selectedApplicant to the first detailed record
const selectedApplicant = ref(applicantsDetailed.value[0]);

// --- COMPUTED PROPERTIES ---

const unreadNotificationsCount = computed(() => {
  return applicationsToEvaluate.value.filter((n) => !n.read).length;
});

// --- METHODS ---

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

const closeNotifications = () => {
  applicationsToEvaluate.value.forEach((notification) => {
    notification.read = true;
  });
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
  };
  return colors[initials] || "grey";
};

// Function to handle viewing an applicant's details and opening the modal
const viewDetails = (applicant) => {
  // Find the detailed applicant object based on the applicationId
  const detailedData = applicantsDetailed.value.find(
    (a) => a.applicationId === applicant.applicationId
  );

  if (detailedData) {
    selectedApplicant.value = detailedData;

    // Auto-select the first Architectural plan for evaluation
    const firstPlan = detailedData.documents.surveyPlans.find(
      (p) => p.planType === "Architectural"
    );

    if (firstPlan) {
      evaluateDocument(firstPlan);
    } else if (detailedData.documents.surveyPlans.length > 0) {
      // Fallback to evaluating the very first document if Architectural isn't explicitly found
      evaluateDocument(detailedData.documents.surveyPlans[0]);
    } else {
      console.warn("No Architectural plans submitted for this application.");
    }
  } else {
    selectedApplicant.value = {};
    console.error("Detailed applicant data not found.");
  }
};

// Functions to simulate document actions (FIXED)
const evaluateDocument = (plan) => {
  currentEvaluationPlan.value = plan;
  isEvaluationModalVisible.value = true;
  // Reset evaluation form state to unselected/empty
  evaluationData.value = {
    requirements: [],
    comments: "",
    commentsByRequirement: {},
    status: "",
  };
};

const showCommentField = (requirementValue) => {
  const isCommentFieldVisible =
    evaluationData.value.commentsByRequirement[requirementValue] !== undefined;

  if (isCommentFieldVisible) {
    delete evaluationData.value.commentsByRequirement[requirementValue];
    if (!evaluationData.value.requirements.includes(requirementValue)) {
      evaluationData.value.requirements.push(requirementValue);
    }
  } else {
    evaluationData.value.commentsByRequirement[requirementValue] = "";
    const index = evaluationData.value.requirements.indexOf(requirementValue);
    if (index > -1) {
      evaluationData.value.requirements.splice(index, 1);
    }
  }
};

// Function to handle the form submission (Simplified status update)
const submitEvaluation = () => {
  // Find the applicant in the detailed data and update status
  const applicant = applicantsDetailed.value.find(
    (a) => a.applicationId === selectedApplicant.value.applicationId
  );

  if (applicant && evaluationData.value.status) {
    applicant.status =
      evaluationData.value.status === "Verified" ? "Verified" : "Return";
    applicant.paymentStatus =
      evaluationData.value.status === "Verified"
        ? "Pending Payment"
        : "Revision Required";
    applicant.paymentStatusColor =
      evaluationData.value.status === "Verified" ? "orange" : "red";

    // Add a timeline entry for the review
    applicant.timeline.push({
      title: `${currentEvaluationPlan.value.planType} Review - ${
        evaluationData.value.status === "Verified" ? "Approved" : "Returned"
      }`,
      date: new Date().toLocaleString(),
      color: evaluationData.value.status === "Verified" ? "green" : "red",
      filled: true,
    });
  }

  isEvaluationModalVisible.value = false;
  // Reset the form data
  evaluationData.value = {
    requirements: [],
    comments: "",
    commentsByRequirement: {},
    status: "",
  };
};
</script>

<style scoped>
/* Scoped styles for aesthetic enhancements */

/* Profile Button Hover Effect */
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
  transition: background-color 0.2s ease;
  border: 1px solid transparent;
}

.profile-btn:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
  border: 1px solid lightgrey;
}

/* Document Card Hover Effect */
.document-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.document-item:hover {
  background-color: #f0f0f0; /* Light hover background */
}
</style>