<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <div>
        <v-card
          class="d-flex flex-column fill-height"
          style="
            width: 100%;
            max-width: 100%; /* Changed to 100% */
            border-radius: 0;
            box-shadow: none;
            /* Removed border-left: 1px solid rgba(0, 0, 0, 0.12); */
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
                      <div class="text-caption text-grey-darken-1">
                        Applicant Name:
                      </div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.applicantName }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Project Name:
                      </div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.projectName }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">
                        Project Location:
                      </div>
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
                        {{ selectedApplicant.propertyDetails.propertyType }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Building Use:
                      </div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.buildingUse }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Floor Area:
                      </div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.floorArea }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Number of Floors:
                      </div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.numberOfFloors }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Property Address:
                      </div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.propertyDetails.propertyAddress }}
                      </div>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="text-caption text-grey-darken-1">
                        Lot Area:
                      </div>
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
                    <div class="text-subtitle-1 font-weight-bold">
                      Survey Plans
                    </div>
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <div class="d-flex flex-column" style="gap: 8px">
                    <v-card
                      v-for="(plan, index) in selectedApplicant.documents
                        .surveyPlans"
                      :key="index"
                      class="py-2 px-3"
                    >
                      <div class="d-flex align-center justify-space-between">
                        <div class="d-flex align-center">
                          <v-icon color="red">mdi-file-pdf-box</v-icon>
                          <div class="ms-3">
                            <div class="font-weight-medium">
                              {{ plan.name }}
                            </div>
                            <div class="text-caption text-grey-darken-1">
                              {{ plan.description }} - {{ plan.size }} MB
                            </div>
                          </div>
                        </div>
                        <v-btn
                          color="blue"
                          variant="flat"
                          size="small"
                          @click="evaluateDocument(plan)"
                          >Evaluate</v-btn
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
                      <div class="text-caption text-grey-darken-1">
                        Processing Fee
                      </div>
                      <div class="text-caption font-weight-medium">
                        {{ selectedApplicant.processingFee }}
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="text-caption text-grey-darken-1">
                        Payment Status
                      </div>
                      <v-chip
                        :color="selectedApplicant.paymentStatusColor"
                        size="small"
                        variant="flat"
                        >{{ selectedApplicant.paymentStatus }}</v-chip
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

    <v-dialog v-model="isEvaluationModalVisible" max-width="1400">
      <v-card class="pa-4 rounded-lg">
        <v-card-title class="d-flex align-center justify-space-between pb-0">
          <div class="text-h6 font-weight-bold">Standard Plan Evaluation</div>
          <v-btn icon @click="isEvaluationModalVisible = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="9">
              <div class="text-subtitle-1 font-weight-bold mb-2">
                {{ currentEvaluationPlan.name }}
              </div>
              <v-img
                :src="mockPlanImage"
                contain
                class="rounded-lg border-sm"
              ></v-img>
            </v-col>
            <v-col cols="12" md="3">
              <v-form @submit.prevent="submitEvaluation">
                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Architectural Requirements
                  </div>
                  <div
                    v-for="(req, index) in architecturalRequirements"
                    :key="index"
                  >
                    <div class="d-flex align-center">
                      <v-checkbox
                        v-model="evaluationData.requirements"
                        :label="req.label"
                        :value="req.value"
                        density="compact"
                        hide-details
                        class="flex-grow-1"
                      ></v-checkbox>
                      <v-icon
                        v-if="!evaluationData.requirements.includes(req.value)"
                        size="20"
                        class="ms-2"
                        color="red"
                        @click="showCommentField(req.value)"
                        >mdi-close-circle</v-icon
                      >
                    </div>
                    <v-textarea
                      v-if="
                        evaluationData.commentsByRequirement[req.value] !==
                        undefined
                      "
                      v-model="evaluationData.commentsByRequirement[req.value]"
                      placeholder="Add comment..."
                      variant="outlined"
                      rows="1"
                      class="mt-1 mb-2"
                      hide-details
                    ></v-textarea>
                  </div>
                </div>
                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Comments/Feedback
                  </div>
                  <v-textarea
                    v-model="evaluationData.comments"
                    placeholder="Add your general comments here..."
                    variant="outlined"
                    rows="3"
                    hide-details
                  ></v-textarea>
                </div>
                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    Assessment Fee
                  </div>
                  <v-radio-group v-model="evaluationData.status" hide-details>
                    <v-radio label="Approved" value="approved"></v-radio>
                    <v-radio label="For Revision" value="forRevision"></v-radio>
                  </v-radio-group>
                </div>
                <div class="d-flex flex-column" style="gap: 4px">
                  <div class="d-flex justify-space-between">
                    <div class="text-caption text-grey-darken-1">
                      Architectural Plan Review
                    </div>
                    <div class="text-caption font-weight-medium">₱500.00</div>
                  </div>
                  <div class="d-flex justify-space-between">
                    <div class="text-caption text-grey-darken-1">
                      Processing Fee
                    </div>
                    <div class="text-caption font-weight-medium">₱2,500.00</div>
                  </div>
                  <v-divider class="my-1"></v-divider>
                  <div class="d-flex justify-space-between font-weight-bold">
                    <div class="text-subtitle-2">Total Amount</div>
                    <div class="text-subtitle-2">₱3,000.00</div>
                  </div>
                </div>
                <v-btn
                  type="submit"
                  color="blue"
                  variant="flat"
                  block
                  class="mt-4"
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

// Hardcoded data to simulate a backend API response. In a real application, this data would be fetched.
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

// More comprehensive mock data for the main content area
const applicants = ref([
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
          name: "Architectural Plan",
          description: "Required Document",
          size: 2.5,
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱2,500.00",
    paymentStatus: "Pending Evaluation",
    paymentStatusColor: "#FBF46D",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 16, 2024 - 10:30 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Plan Evaluation",
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
      {
        title: "Final Approval",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
  {
    id: 2,
    applicantName: "Maria Santos",
    initials: "MS",
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
          name: "Architectural Plan",
          description: "Required Document",
          size: 2.1,
        },
        {
          name: "Electrical Plan",
          description: "Required Document",
          size: 1.5,
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱1,800.00",
    paymentStatus: "Payment Complete",
    paymentStatusColor: "green",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 10, 2024 - 9:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Document Verified",
        date: "Jan 10, 2024 - 11:30 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Plan Evaluation",
        date: "Jan 11, 2024 - 2:00 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Payment Processing",
        date: "Jan 12, 2024 - 10:00 AM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Final Approval",
        date: "Jan 15, 2024 - 3:00 PM",
        color: "#B4FE98",
        filled: true,
      },
    ],
  },
  {
    id: 3,
    applicantName: "Juan Dela Cruz",
    initials: "JD",
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
          name: "Architectural Plan",
          description: "Required Document",
          size: 5.0,
        },
      ],
    },
    type: "Building Permit",
    processingFee: "₱5,000.00",
    paymentStatus: "Pending Evaluation",
    paymentStatusColor: "red",
    timeline: [
      {
        title: "Application Submitted",
        date: "Jan 20, 2024 - 1:00 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Document Verified",
        date: "Jan 20, 2024 - 4:00 PM",
        color: "#B4FE98",
        filled: true,
      },
      {
        title: "Under Plan Evaluation",
        date: "Jan 21, 2024 - 11:00 AM",
        color: "#FBF46D",
        filled: true,
      },
      {
        title: "Returned for Corrections",
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
      {
        title: "Final Approval",
        date: "Pending",
        color: "grey",
        filled: false,
      },
    ],
  },
]);

// State for the selected applicant, initialized to the first one in the list
const selectedApplicant = ref(applicants.value[0]);

// New state for the evaluation modal
const isEvaluationModalVisible = ref(false);
const currentEvaluationPlan = ref({});
const evaluationData = ref({
  requirements: [],
  comments: "", // Main comment field, kept for general feedback
  commentsByRequirement: {}, // New object to hold comments for each requirement
  status: "approved",
});

// Mock data for the evaluation form
const mockPlanImage = ref(
  "https://placehold.co/1000x800/e0e0e0/000000?text=Architectural+Plan+Placeholder"
);
const architecturalRequirements = ref([
  { label: "Complete Plan Set (1:100 scale)", value: "complete_plan_set" },
  { label: "Site Plan showing setbacks and site lines", value: "site_plan" },
  { label: "Floor Plans showing all Rooms", value: "floor_plans" },
  { label: "All Elevations", value: "all_elevations" },
  { label: "Sections showing all Floors", value: "all_sections" },
  { label: "Details (Stair sections/Ramp etc.)", value: "details" },
]);

const unreadNotificationsCount = computed(() => {
  return applicationsToEvaluate.value.filter((n) => !n.read).length;
});

const closeNotifications = () => {
  applicationsToEvaluate.value.forEach((notification) => {
    notification.read = true;
  });
};

const logout = () => {
  // In a real app, this function would handle user authentication and session management.
  // For example, it would call an API endpoint to invalidate the user's token.
  console.log("User logged out.");
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

// Function to handle viewing an applicant's details
const viewDetails = (applicant) => {
  selectedApplicant.value = applicant;
};

// Functions to simulate document actions
const evaluateDocument = (plan) => {
  currentEvaluationPlan.value = plan;
  isEvaluationModalVisible.value = true;
  // Initialize the commentsByRequirement object for the new evaluation
  evaluationData.value.commentsByRequirement = {};
  console.log(`Evaluating document: ${plan.name}`);
};

const showCommentField = (requirementValue) => {
  // Toggle the comment field visibility and initialize the comment if it doesn't exist
  if (
    evaluationData.value.commentsByRequirement[requirementValue] === undefined
  ) {
    evaluationData.value.commentsByRequirement[requirementValue] = "";
    // Uncheck the box if they click the disapprove icon
    const index = evaluationData.value.requirements.indexOf(requirementValue);
    if (index > -1) {
      evaluationData.value.requirements.splice(index, 1);
    }
  } else {
    delete evaluationData.value.commentsByRequirement[requirementValue];
  }
};

const viewDocument = (docName) => {
  console.log(`Viewing document: ${docName}`);
  // This would typically open the document in a new tab or modal.
};

// Function to handle the form submission
const submitEvaluation = () => {
  console.log("Evaluation Submitted:", evaluationData.value);
  // Here you would send the data to a backend API
  isEvaluationModalVisible.value = false;
  // Reset the form data
  evaluationData.value = {
    requirements: [],
    comments: "",
    commentsByRequirement: {},
    status: "approved",
  };
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
</style>