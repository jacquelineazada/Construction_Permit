<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <div class="d-flex align-center h-100 px-6"></div>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6 py-3"
        style="
          background-color: white;
          border-bottom: 1px solid lightgrey;
          z-index: 1000;
        "
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
                class="me-4 cursor-pointer"
                v-bind="props"
              >
                <v-icon size="22">mdi-bell</v-icon>
              </v-badge>
            </template>
            <v-card min-width="320" max-width="400" class="rounded-lg">
              <v-card-title
                class="d-flex justify-space-between align-center text-subtitle-1 font-weight-bold py-3"
              >
                <span>Applications to Evaluate</span>
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
                  v-for="(application, index) in filteredApplicationsToEvaluate"
                  :key="index"
                  class="py-2"
                >
                  <template v-slot:prepend>
                    <v-avatar
                      size="40"
                      :color="getAvatarColor(application.initials)"
                      class="font-weight-bold text-white"
                      >{{ application.initials }}</v-avatar
                    >
                  </template>
                  <v-list-item-title class="font-weight-bold text-body-2">
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
                      class="font-weight-bold text-uppercase"
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
                alt="Alyssa C. Alvarez"
                :src="mockEvaluatorProfile.image"
              ></v-img>
            </v-avatar>
            <div class="d-flex flex-column text-left">
              <span
                class="text-body-2 font-weight-bold"
                style="color: #333; white-space: nowrap"
              >
                {{ mockEvaluatorProfile.name }}
              </span>
              <span
                class="text-caption font-weight-medium"
                style="color: #888; white-space: nowrap"
              >
                {{ mockEvaluatorProfile.title }}
              </span>
            </div>
          </v-btn>
        </div>
      </v-card>

      <div class="pa-6 flex-grow-1">
        <v-row class="mb-8" style="gap: 16px 0">
          <v-col cols="12" sm="6" md="3">
            <v-card
              color="#007bff"
              @click="filterByStatus('Total')"
              class="text-white elevation-4 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">
                    Total Applicants ({{ mockEvaluatorProfile.specialty }})
                  </div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ totalApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="white" class="opacity-75"
                  >mdi-account-group</v-icon
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card
              color="#ffc107"
              @click="filterByStatus('Pending')"
              class="text-white elevation-4 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">Pending</div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ pendingApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="white" class="opacity-75"
                  >mdi-clock-outline</v-icon
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card
              color="#28a745"
              @click="filterByStatus('Verified')"
              class="text-white elevation-4 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">Verified</div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ verifiedApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="white" class="opacity-75"
                  >mdi-check-circle-outline</v-icon
                >
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card
              color="#dc3545"
              @click="filterByStatus('Return')"
              class="text-white elevation-4 rounded-lg cursor-pointer"
            >
              <v-card-text
                class="d-flex align-center justify-space-between py-4"
              >
                <div>
                  <div class="text-subtitle-1 font-weight-bold">Return</div>
                  <div class="text-h4 font-weight-bold mt-1">
                    {{ returnApplicants }}
                  </div>
                </div>
                <v-icon size="48" color="white" class="opacity-75"
                  >mdi-alert-circle-outline</v-icon
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-6 align-center">
          <v-col cols="12" sm="8" md="6">
            <v-text-field
              v-model="search"
              :label="`Search ${mockEvaluatorProfile.specialty} applicants... (Status: ${activeFilter})`"
              prepend-inner-icon="mdi-magnify"
              density="comfortable"
              variant="outlined"
              hide-details
              single-line
              class="rounded-lg"
              :loading="loading"
              @click:append-inner="onClick"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="6" class="d-flex justify-end">
            <v-menu :close-on-content-click="true" location="bottom right">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="#007bff"
                  class="text-white text-none font-weight-bold px-4"
                  prepend-icon="mdi-filter-variant"
                  v-bind="props"
                  size="large"
                >
                  Filter by Status
                </v-btn>
              </template>
              <v-list class="rounded-lg">
                <v-list-item @click="filterByStatus('Total')">
                  <v-list-item-title>All Applicants</v-list-item-title>
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

        <v-card class="elevation-2 rounded-lg">
          <v-table class="custom-data-table">
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.key"
                  class="text-left font-weight-bold text-caption text-uppercase px-4"
                  :style="{ width: header.key === 'action' ? '120px' : '' }"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in filteredApplicants"
                :key="item.applicationNumber"
                class="data-table-row"
              >
                <td class="text-left py-3 px-4">
                  <div class="d-flex align-center">
                    <v-avatar
                      size="36"
                      :color="getAvatarColor(item.initials)"
                      class="me-3 text-white font-weight-bold"
                    >
                      {{ item.initials }}
                    </v-avatar>
                    <span class="font-weight-medium text-body-2">{{
                      item.name
                    }}</span>
                  </div>
                </td>

                <td class="text-left px-4 text-body-2">
                  {{ item.applicationNumber }}
                </td>

                <td class="text-left px-4 text-body-2">
                  {{ item.dateSubmitted }}
                </td>

                <td class="text-left px-4">
                  <v-chip
                    :color="getStatusColor(item.status)"
                    dark
                    size="small"
                    label
                    class="font-weight-bold text-uppercase"
                  >
                    {{ item.status }}
                  </v-chip>
                </td>

                <td class="text-left px-4">
                  <v-btn
                    color="#007bff"
                    variant="flat"
                    class="text-white text-none"
                    size="small"
                    @click="viewDetails(item)"
                  >
                    View Details
                  </v-btn>
                </td>
              </tr>
              <tr v-if="!filteredApplicants.length">
                <td :colspan="headers.length">
                  <div class="text-center pa-6 text-medium-emphasis">
                    No applicants found matching the search or filter criteria.
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </div>
    </v-main>

    <v-dialog v-model="isEvaluationModalVisible" max-width="1400">
      <v-card class="pa-6 rounded-xl">
        <v-card-title class="d-flex align-center justify-space-between pb-2">
          <div class="text-h5 font-weight-bold text-blue-darken-2">
            Document Evaluation:
            {{ currentEvaluationPlan.name || "Plan Details" }}
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
              <div class="text-subtitle-1 font-weight-bold mb-2">
                {{ selectedApplicant.projectName }}
                <span class="text-caption font-weight-regular text-grey"
                  >({{ selectedApplicant.applicationNumber }})</span
                >
              </div>

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
                Plan View - Click to zoom/annotate.
              </div>
            </v-col>

            <v-col cols="12" md="3">
              <v-form @submit.prevent="submitEvaluation">
                <div class="mb-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    {{ mockEvaluatorProfile.specialty }} Requirements Checklist
                  </div>
                  <v-divider class="mb-3"></v-divider>
                  <div v-for="(req, index) in currentRequirements" :key="index">
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
                    <v-radio label="Approved" value="Approved"></v-radio>
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
const fileInput = ref(null);
const search = ref("");
const activeFilter = ref("All");
const loading = ref(false);

// Modal State
const isEvaluationModalVisible = ref(false);
const selectedApplicant = ref({}); // Holds the detailed data for the currently selected applicant
const currentEvaluationPlan = ref({}); // Holds the details of the specific plan being reviewed
const evaluationData = ref({
  requirements: [],
  comments: "",
  commentsByRequirement: {},
  status: "",
});

// --- MOCK USER PROFILE (Key Addition for Discipline-Specific Filtering) ---
const mockEvaluatorProfile = ref({
  name: "Alyssa C. Alvarez",
  title: "Architect",
  specialty: "Architectural", // <--- THIS VALUE CONTROLS WHAT THE USER SEES
  image: "https://cdn.vuetifyjs.com/images/john.jpg",
});

// --- DYNAMIC EVALUATION CONTENT (Based on Discipline) ---
const mockPlanImage = ref(
  "https://placehold.co/1000x800/e0e0e0/000000?text=Plan+View+Placeholder"
);

// Discipline-specific checklists
const evaluationChecklists = ref({
  Architectural: [
    { label: "Complete Plan Set (1:100 scale)", value: "complete_plan_set" },
    { label: "Site Plan showing setbacks and site lines", value: "site_plan" },
    { label: "Floor Plans showing all Rooms", value: "floor_plans" },
    { label: "All Elevations", value: "all_elevations" },
    { label: "Sections showing all Floors", value: "all_sections" },
    { label: "Details (Stair sections/Ramp etc.)", value: "details" },
  ],
  Electrical: [
    { label: "Load Computation & Legend", value: "load_computation" },
    { label: "Riser Diagram & One-Line Layout", value: "riser_diagram" },
    { label: "Power and Lighting Layout", value: "power_layout" },
    { label: "Location of Service Equipment", value: "service_location" },
  ],
  Structural: [
    { label: "Foundation Plan & Details", value: "foundation_plan" },
    { label: "Column and Beam Schedules", value: "column_schedule" },
    { label: "Roof Framing Plan", value: "roof_framing" },
    { label: "Structural Computations (Stamped)", value: "computations" },
  ],
});

const currentRequirements = computed(() => {
  // Dynamically select the checklist based on the evaluator's specialty
  return evaluationChecklists.value[mockEvaluatorProfile.value.specialty] || [];
});

// --- MOCK DATA ---
// Added a 'discipline' field to identify the type of plan/evaluation needed
const applicationsToEvaluate = ref([
  {
    name: "Jin Degusman",
    initials: "JD",
    applicationId: "BP-2024-000123-T",
    message: "Building permit application requires architectural evaluation",
    time: "2 days ago",
    status: "Pending",
    read: false,
    discipline: "Architectural", // Filter key
  },
  {
    name: "David Tolo...",
    initials: "DT",
    applicationId: "BP-2024-000567-T",
    message: "Building permit application requires structural review",
    time: "3 days ago",
    status: "Pending",
    read: false,
    discipline: "Structural", // Filter key
  },
  {
    name: "Jennifer Nayda",
    initials: "JN",
    applicationId: "BP-2024-000910-T",
    message: "Missing mandatory site plan documentation",
    time: "4 days ago",
    status: "Return",
    read: false,
    discipline: "Architectural", // Filter key
  },
  {
    name: "Carl L",
    initials: "CL",
    applicationId: "BP-2024-000155-T",
    message: "Electrical permit review required.",
    time: "4 days ago",
    status: "Pending",
    read: false,
    discipline: "Electrical", // Filter key
  },
]);

// Combined data structure for the list view (Applicants) and detailed view (applicantsDetailed)
// Added a 'discipline' field for filtering
const applicants = ref([
  {
    initials: "JM",
    name: "Jm Deguzman",
    applicationNumber: "BP-2024-808123-T",
    dateSubmitted: "Jan 15, 2024",
    status: "Verified",
    discipline: "Architectural",
  },
  {
    initials: "MP",
    name: "Michael Padilla",
    applicationNumber: "BP-2024-808345-T",
    dateSubmitted: "Jan 17, 2024",
    status: "Return",
    discipline: "Architectural",
  },
  {
    initials: "DT",
    name: "David Tolo",
    applicationNumber: "BP-2024-808678-T",
    dateSubmitted: "Jan 20, 2024",
    status: "Pending",
    discipline: "Structural",
  },
  {
    initials: "SG",
    name: "Sarah Gomez",
    applicationNumber: "BP-2024-808890-T",
    dateSubmitted: "Jan 22, 2024",
    status: "Pending",
    discipline: "Electrical",
  },
  {
    initials: "RJ",
    name: "Robert Jimenez",
    applicationNumber: "BP-2024-808999-T",
    dateSubmitted: "Jan 25, 2024",
    status: "Verified",
    discipline: "Electrical",
  },
]);

// Detailed data used for the Evaluation Modal
const applicantsDetailed = ref([
  {
    applicationNumber: "BP-2024-808123-T",
    projectName: "Commercial Building Project",
    applicantName: "Jm Deguzman",
    documents: [
      { name: "Architectural Plan - Ground Floor", size: 2.5, type: "Arch" },
      { name: "Structural Plan - Footings", size: 1.2, type: "Struc" },
    ],
    // ... other detailed properties (fee, timeline, etc.)
  },
  {
    applicationNumber: "BP-2024-808345-T",
    projectName: "Residential House Renovation",
    applicantName: "Michael Padilla",
    documents: [{ name: "Site Development Plan", size: 0.8, type: "Site" }],
  },
  {
    applicationNumber: "BP-2024-808678-T",
    projectName: "Office Expansion",
    applicantName: "David Tolo",
    documents: [{ name: "Structural Layout Plan", size: 1.5, type: "Struc" }],
  },
  {
    applicationNumber: "BP-2024-808890-T",
    projectName: "Factory Wiring Upgrade",
    applicantName: "Sarah Gomez",
    documents: [{ name: "Electrical Layout Plan", size: 1.5, type: "Elec" }],
  },
  {
    applicationNumber: "BP-2024-808999-T",
    projectName: "Warehouse Lighting",
    applicantName: "Robert Jimenez",
    documents: [{ name: "Electrical Layout Plan", size: 1.5, type: "Elec" }],
  },
]);

const headers = [
  { title: "Applicant Name", key: "name", sortable: false },
  { title: "Application Number", key: "applicationNumber", sortable: false },
  { title: "Date Submitted", key: "dateSubmitted", sortable: true },
  { title: "Status", key: "status", sortable: true },
  { title: "Action", key: "action", sortable: false },
];

// --- COMPUTED PROPERTIES ---

// Filter notifications to only show those relevant to the evaluator's specialty
const filteredApplicationsToEvaluate = computed(() => {
  return applicationsToEvaluate.value.filter(
    (app) => app.discipline === mockEvaluatorProfile.value.specialty
  );
});

const unreadNotificationsCount = computed(() => {
  return filteredApplicationsToEvaluate.value.filter((n) => !n.read).length;
});

// Filter the main applicant list based on the evaluator's discipline
const relevantApplicants = computed(() => {
  return applicants.value.filter(
    (a) => a.discipline === mockEvaluatorProfile.value.specialty
  );
});

// Metrics use the discipline-filtered list
const totalApplicants = computed(() => relevantApplicants.value.length);
const pendingApplicants = computed(
  () => relevantApplicants.value.filter((a) => a.status === "Pending").length
);
const verifiedApplicants = computed(
  () => relevantApplicants.value.filter((a) => a.status === "Verified").length
);
const returnApplicants = computed(
  () => relevantApplicants.value.filter((a) => a.status === "Return").length
);

const filteredApplicants = computed(() => {
  let filtered = relevantApplicants.value; // Start with discipline-filtered list

  if (search.value) {
    const searchTerm = search.value.toLowerCase();
    filtered = filtered.filter(
      (applicant) =>
        applicant.name.toLowerCase().includes(searchTerm) ||
        applicant.applicationNumber.toLowerCase().includes(searchTerm)
    );
  }

  if (activeFilter.value !== "All" && activeFilter.value !== "Total") {
    filtered = filtered.filter(
      (applicant) => applicant.status === activeFilter.value
    );
  }
  return filtered;
});

// --- METHODS ---

function onClick() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}

const closeNotifications = () => {
  // Only mark the *filtered* notifications as read for simplicity
  filteredApplicationsToEvaluate.value.forEach((notification) => {
    notification.read = true;
  });
};

const getStatusColor = (status) => {
  if (status === "Verified") return "#28a745"; // Green
  if (status === "Pending") return "#ffc107"; // Orange/Yellow
  if (status === "Return") return "#dc3545"; // Red
  if (status === "Approved") return "#007bff"; // Blue (For evaluation modal status)
  return "grey";
};

const stringToHslColor = (str, s, l) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
};

const getAvatarColor = (initials) => {
  const definedColors = {
    JD: "#007bff",
    DT: "#17a2b8",
    JN: "#6f42c4",
    JM: "#007bff",
    SG: "#28a745",
    MP: "#dc3545",
    CL: "#ffc107",
    RJ: "#9c27b0",
  };

  if (definedColors[initials]) {
    return definedColors[initials];
  }

  return stringToHslColor(initials, 60, 40);
};

const filterByStatus = (status) => {
  if (status === "Total") {
    activeFilter.value = "All";
  } else {
    activeFilter.value = status;
  }
};

const viewDetails = (item) => {
  // 1. Find the detailed applicant data
  const detail = applicantsDetailed.value.find(
    (a) => a.applicationNumber === item.applicationNumber
  );

  if (!detail) {
    console.error("Detailed applicant data not found:", item.applicationNumber);
    return;
  }

  // Combine list data and detail data
  selectedApplicant.value = { ...item, ...detail };

  // 2. Set the current plan to review (e.g., the first document)
  if (
    selectedApplicant.value.documents &&
    selectedApplicant.value.documents.length > 0
  ) {
    // Find the first document that roughly matches the evaluator's specialty
    const specialtyAbbreviation = mockEvaluatorProfile.value.specialty
      .substring(0, 4)
      .toLowerCase();

    currentEvaluationPlan.value =
      selectedApplicant.value.documents.find((doc) =>
        doc.type.toLowerCase().includes(specialtyAbbreviation)
      ) || selectedApplicant.value.documents[0];
  } else {
    currentEvaluationPlan.value = { name: "No Documents Submitted" };
  }

  // Reset evaluation form state to unselected/empty
  evaluationData.value = {
    requirements: [],
    comments: "",
    commentsByRequirement: {},
    status: "",
  };

  // 3. Open the modal
  isEvaluationModalVisible.value = true;
};

const showCommentField = (requirementValue) => {
  const isCommentFieldVisible =
    evaluationData.value.commentsByRequirement[requirementValue] !== undefined;

  if (isCommentFieldVisible) {
    // If visible, hide it (delete comment) AND check the box (assuming requirement is met by default if no comment)
    delete evaluationData.value.commentsByRequirement[requirementValue];
    if (!evaluationData.value.requirements.includes(requirementValue)) {
      evaluationData.value.requirements.push(requirementValue);
    }
  } else {
    // If hidden, show it (initialize comment) AND uncheck the box (implying non-compliance)
    evaluationData.value.commentsByRequirement[requirementValue] = "";
    const index = evaluationData.value.requirements.indexOf(requirementValue);
    if (index > -1) {
      evaluationData.value.requirements.splice(index, 1);
    }
  }
};

const submitEvaluation = () => {
  console.log("Evaluation Submitted:", evaluationData.value);

  // Mock Update: Find the applicant in the list view and update their status
  const applicantInList = applicants.value.find(
    (a) => a.applicationNumber === selectedApplicant.value.applicationNumber
  );

  if (applicantInList && evaluationData.value.status) {
    // Update the status on the main table
    applicantInList.status = evaluationData.value.status;
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

.profile-btn {
  /* Ensuring the button is invisible but clickable/hoverable */
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
  transition: background-color 0.2s ease;
}

.profile-btn:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

/* Custom Data Table Styling */
.custom-data-table th {
  background-color: #f0f0f0 !important; /* Lighter header background */
  color: #616161 !important;
  border-bottom: 1px solid #e0e0e0 !important;
  padding-top: 12px;
  padding-bottom: 12px;
}

.data-table-row {
  transition: background-color 0.15s ease;
}

.data-table-row:hover {
  background-color: #f5f5f5 !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>