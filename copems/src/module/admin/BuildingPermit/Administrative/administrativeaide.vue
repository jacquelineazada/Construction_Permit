<template>
  <v-app id="inspire">
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
                class="me-4 cursor-pointer"
                v-bind="props"
                v-if="unreadNotificationsCount > 0"
              >
                <v-icon size="22">mdi-bell</v-icon>
              </v-badge>
              <v-icon
                v-else
                size="22"
                v-bind="props"
                class="me-4 cursor-pointer"
                >mdi-bell</v-icon
              >
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

          <v-divider vertical class="mx-3"></v-divider>

          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <div
                v-bind="props"
                class="d-flex align-center"
                style="cursor: pointer"
              >
                <v-avatar color="primary" size="36">
                  <span class="white--text">AU</span>
                </v-avatar>
                <div class="ml-3">
                  <div class="font-weight-bold text-body-2">Admin User</div>
                  <div class="text-caption">Administrative Aide</div>
                </div>
              </div>
            </template>

            <v-card min-width="200" class="mt-2">
              <v-list density="compact">
                <v-list-item
                  prepend-icon="mdi-account"
                  title="Profile"
                ></v-list-item>
                <v-list-item
                  prepend-icon="mdi-logout"
                  title="Logout"
                ></v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-card>

      <v-container fluid>
        <v-card class="mt-4">
          <v-card-title class="font-weight-bold text-h6">
            Approved Plans for Verification
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="approvedPlans"
            :search="search"
            class="elevation-0"
          >
            <template v-slot:item.physicalStatus="{ item }">
              <v-chip
                :color="getPhysicalStatusColor(item.physicalStatus)"
                label
                variant="tonal"
              >
                {{ item.physicalStatus }}
              </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn
                color="primary"
                @click="viewPlan(item)"
                variant="flat"
                size="small"
              >
                Verify Physical
              </v-btn>
            </template>
          </v-data-table>
        </v-card>

        <v-dialog v-model="viewPlanDialog" width="90vw" persistent>
          <v-card>
            <v-card-title
              class="text-h5 pa-4"
              style="background-color: #f4f5f9; position: relative"
            >
              Verify Plan:
              <span class="font-weight-bold ml-2">{{
                selectedPlan ? selectedPlan.planId : ""
              }}</span>
              <v-btn
                icon
                variant="text"
                size="small"
                @click="viewPlanDialog = false"
                class="position-absolute top-0 right-0 ma-2"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text class="pt-4">
              <v-row>
                <v-col cols="12" md="6">
                  <h3 class="mb-3 text-h6">Application Evaluation Sheet</h3>

                  <v-row dense class="mb-3 text-body-2">
                    <v-col cols="12" sm="4">
                      <span class="text-grey">Control No:</span>
                      <span class="font-weight-medium ml-2">{{
                        selectedPlan
                          ? selectedPlan.controlNo
                          : "_________________"
                      }}</span>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <span class="text-grey">Type of Application:</span>
                      <span class="font-weight-medium ml-2">{{
                        selectedPlan
                          ? selectedPlan.applicationType
                          : "_________________"
                      }}</span>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <span class="text-grey">Applicant Name:</span>
                      <span class="font-weight-medium ml-2">{{
                        selectedPlan
                          ? selectedPlan.applicantName
                          : "_________________"
                      }}</span>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <span class="text-grey">Date/Time Received:</span>
                      <span class="font-weight-medium ml-2">{{
                        selectedPlan
                          ? selectedPlan.dateTimeReceived
                          : "_________________"
                      }}</span>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <span class="text-grey">Project Name:</span>
                      <span class="font-weight-medium ml-2">{{
                        selectedPlan
                          ? selectedPlan.projectName
                          : "_________________"
                      }}</span>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <span class="text-grey">Date/Time Printed:</span>
                      <span class="font-weight-medium ml-2">{{
                        selectedPlan
                          ? selectedPlan.dateTimePrinted
                          : "_________________"
                      }}</span>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <span class="text-grey">Project Location:</span>
                      <span class="font-weight-medium ml-2">{{
                        selectedPlan
                          ? selectedPlan.projectLocation
                          : "_________________"
                      }}</span>
                    </v-col>
                  </v-row>

                  <v-divider class="mb-4"></v-divider>

                  <div style="max-height: 50vh; overflow-y: auto">
                    <div class="text-body-2 font-weight-bold mb-1">
                      ASSIGNED FIELD INSPECTOR:
                    </div>
                    <v-row dense class="mb-3 text-body-2">
                      <v-col cols="8">
                        <span class="text-grey">FINDINGS:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.fieldInspectorFindings
                            : "_________________"
                        }}</span>
                      </v-col>
                      <v-col cols="4">
                        <span class="text-grey">DATE OF INSPECTION:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.fieldInspectorDate
                            : "__________"
                        }}</span>
                      </v-col>
                    </v-row>

                    <div class="text-body-2 font-weight-bold mb-1">
                      ASSIGNED BLDG. PLAN EVALUATOR:
                    </div>
                    <v-row dense class="mb-3 text-body-2">
                      <v-col cols="8">
                        <span class="text-grey">FINDINGS:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.bldgEvaluatorFindings
                            : "_________________"
                        }}</span>
                      </v-col>
                      <v-col cols="4">
                        <span class="text-grey">DATE OF EVALUATION:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.bldgEvaluatorDate
                            : "__________"
                        }}</span>
                        <br /><span class="text-grey">TIME STARTED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.bldgEvaluatorTimeStart
                            : "_____"
                        }}</span>
                        <br /><span class="text-grey">TIME ENDED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.bldgEvaluatorTimeEnd
                            : "_____"
                        }}</span>
                      </v-col>
                    </v-row>

                    <div class="text-body-2 font-weight-bold mb-1">
                      ASSIGNED ELECTRICAL PLAN EVALUATOR:
                    </div>
                    <v-row dense class="mb-3 text-body-2">
                      <v-col cols="8">
                        <span class="text-grey">FINDINGS:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.electricalEvaluatorFindings
                            : "_________________"
                        }}</span>
                      </v-col>
                      <v-col cols="4">
                        <span class="text-grey">DATE OF EVALUATION:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.electricalEvaluatorDate
                            : "__________"
                        }}</span>
                        <br /><span class="text-grey">TIME STARTED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.electricalEvaluatorTimeStart
                            : "_____"
                        }}</span>
                        <br /><span class="text-grey">TIME ENDED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.electricalEvaluatorTimeEnd
                            : "_____"
                        }}</span>
                      </v-col>
                    </v-row>

                    <div class="text-body-2 font-weight-bold mb-1">
                      ASSIGNED MECHANICAL PLAN EVALUATOR:
                    </div>
                    <v-row dense class="mb-3 text-body-2">
                      <v-col cols="8">
                        <span class="text-grey">FINDINGS:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.mechanicalEvaluatorFindings
                            : "_________________"
                        }}</span>
                      </v-col>
                      <v-col cols="4">
                        <span class="text-grey">DATE OF EVALUATION:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.mechanicalEvaluatorDate
                            : "__________"
                        }}</span>
                        <br /><span class="text-grey">TIME STARTED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.mechanicalEvaluatorTimeStart
                            : "_____"
                        }}</span>
                        <br /><span class="text-grey">TIME ENDED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.mechanicalEvaluatorTimeEnd
                            : "_____"
                        }}</span>
                      </v-col>
                    </v-row>

                    <div class="text-body-2 font-weight-bold mb-1">
                      ASSIGNED ELECTRONICS PLAN EVALUATOR:
                    </div>
                    <v-row dense class="mb-3 text-body-2">
                      <v-col cols="8">
                        <span class="text-grey">FINDINGS:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.electronicsEvaluatorFindings
                            : "_________________"
                        }}</span>
                      </v-col>
                      <v-col cols="4">
                        <span class="text-grey">DATE OF EVALUATION:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.electronicsEvaluatorDate
                            : "__________"
                        }}</span>
                        <br /><span class="text-grey">TIME STARTED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.electronicsEvaluatorTimeStart
                            : "_____"
                        }}</span>
                        <br /><span class="text-grey">TIME ENDED:</span>
                        <span class="ml-1">{{
                          selectedPlan
                            ? selectedPlan.electronicsEvaluatorTimeEnd
                            : "_____"
                        }}</span>
                      </v-col>
                    </v-row>

                    <v-divider class="my-4"></v-divider>

                    <v-row dense class="mb-3 text-body-2">
                      <v-col cols="8">
                        <div class="font-weight-bold mb-1">RECOMMENDATION:</div>
                      </v-col>
                      <v-col cols="4">
                        <v-checkbox
                          v-model="selectedPlan.recommendationEvalCompliant"
                          label="EVALUATED AND COMPLIANT: FOR ORDER OF PAYMENT"
                          readonly
                          disabled
                          hide-details
                          density="compact"
                          class="mb-0"
                        ></v-checkbox>
                        <v-checkbox
                          v-model="selectedPlan.recommendationEvalDeficiency"
                          label="DEFICIENCY FOUND. RETURN DOCUMENTS TO APPLICANT."
                          readonly
                          disabled
                          hide-details
                          density="compact"
                          class="mb-0"
                        ></v-checkbox>
                      </v-col>
                    </v-row>

                    <v-row dense class="text-body-2">
                      <v-col cols="8">
                        <div class="font-weight-bold mb-1">
                          SECTION HEAD<br />PROCESSING & EVALUATION
                        </div>
                        <span class="text-grey">FINDINGS:</span>
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.sectionHeadFindings
                            : "_________________"
                        }}</span>
                      </v-col>
                      <v-col cols="4">
                        <span class="text-grey"
                          >DATE & TIME COMPLETED/FINISHED:</span
                        >
                        <span class="ml-2">{{
                          selectedPlan
                            ? selectedPlan.sectionHeadDate
                            : "_________________"
                        }}</span>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>

                <v-divider vertical></v-divider>

                <v-col cols="12" md="6">
                  <div class="d-flex justify-space-between align-center mb-2">
                    <h3 class="text-h6">Physical Document Checklist</h3>
                    <v-btn
                      v-if="!isEditingPhysicalChecklist"
                      color="secondary"
                      @click="isEditingPhysicalChecklist = true"
                      size="small"
                      variant="tonal"
                    >
                      Edit Checklist
                    </v-btn>
                    <v-btn
                      v-else
                      color="success"
                      @click="savePhysicalChecklist"
                      size="small"
                      prepend-icon="mdi-content-save"
                      variant="flat"
                    >
                      Save Checklist
                    </v-btn>
                  </div>

                  <v-list
                    density="compact"
                    class="checklist-container"
                    style="
                      max-height: 65vh;
                      overflow-y: auto;
                      border: 1px solid #ddd;
                      padding: 8px;
                      border-radius: 4px;
                    "
                  >
                    <div
                      v-for="(item, index) in physicalDocumentChecklist"
                      :key="index"
                    >
                      <v-list-item
                        class="pa-0"
                        :class="{ 'sub-item': item.isSubItem }"
                      >
                        <template v-slot:prepend>
                          <v-checkbox-btn
                            v-model="item.checked"
                            :disabled="!isEditingPhysicalChecklist"
                          ></v-checkbox-btn>
                        </template>
                        <v-list-item-title
                          class="text-body-2"
                          :class="{
                            'font-weight-bold': !item.isSubItem,
                            'text-grey-darken-1': item.isSubItem,
                          }"
                          >{{ item.label }}</v-list-item-title
                        >
                        <template v-slot:append>
                          <v-chip
                            v-if="item.copies"
                            label
                            size="small"
                            variant="tonal"
                            >{{ item.copies }}</v-chip
                          >
                        </template>
                      </v-list-item>
                      <v-divider
                        v-if="item.addDivider"
                        class="my-2"
                      ></v-divider>
                    </div>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="pa-4" style="background-color: #f4f5f9">
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                @click="markAsMismatch"
                :disabled="isEditingPhysicalChecklist"
                variant="flat"
              >
                Report Mismatch
              </v-btn>
              <v-btn
                color="success"
                @click="markAsVerified"
                :disabled="isEditingPhysicalChecklist"
                variant="flat"
              >
                Mark as Verified
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "AdminDashboard",
  data() {
    return {
      search: "",
      // currentPDFTab removed

      // --- DATA FROM NEW NOTIFICATION SCRIPT ---
      mockEvaluatorProfile: {
        name: "Alyssa C. Alvarez",
        title: "Architect",
        specialty: "Architectural", // This will filter the notifications
        image: "https://cdn.vuetifyjs.com/images/john.jpg",
      },
      applicationsToEvaluate: [
        {
          name: "Jin Degusman",
          initials: "JD",
          applicationId: "BP-2024-000123-T",
          message:
            "Building permit application requires architectural evaluation",
          time: "2 days ago",
          status: "Pending",
          read: false,
          discipline: "Architectural", // Matches mockEvaluatorProfile.specialty
        },
        {
          name: "David Tolo...",
          initials: "DT",
          applicationId: "BP-2024-000567-T",
          message: "Building permit application requires structural review",
          time: "3 days ago",
          status: "Pending",
          read: false,
          discipline: "Structural", // Will be filtered out
        },
        {
          name: "Jennifer Nayda",
          initials: "JN",
          applicationId: "BP-2024-000910-T",
          message: "Missing mandatory site plan documentation",
          time: "4 days ago",
          status: "Return",
          read: false,
          discipline: "Architectural", // Matches mockEvaluatorProfile.specialty
        },
        {
          name: "Carl L",
          initials: "CL",
          applicationId: "BP-2D024-000155-T",
          message: "Electrical permit review required.",
          time: "4 days ago",
          status: "Pending",
          read: false,
          discipline: "Electrical", // Will be filtered out
        },
      ],
      // --- END OF NEW NOTIFICATION DATA ---

      headers: [
        { title: "Plan ID", value: "planId", key: "planId", align: "start" },
        {
          title: "Applicant Name",
          value: "applicantName",
          key: "applicantName",
        },
        { title: "Project Type", value: "projectType", key: "projectType" },
        { title: "Approval Date", value: "approvalDate", key: "approvalDate" },
        {
          title: "Physical Verification",
          value: "physicalStatus",
          key: "physicalStatus",
          align: "center",
        },
        {
          title: "Actions",
          value: "actions",
          key: "actions",
          sortable: false,
          align: "center",
        },
      ],
      approvedPlans: [
        {
          planId: "BPA-2023-001",
          applicantName: "Juan Dela Cruz",
          projectType: "Single Dwelling Residential",
          approvalDate: "2023-10-26",
          physicalStatus: "Verified",
          submissionDate: "2023-09-15",
          physicalChecklistStatus: [
            /* ... */
          ],
          // UPDATED MOCK DATA FOR EVAL SHEET
          controlNo: "APP-12345",
          projectName: "2-Storey Residence",
          projectLocation: "Naga City, Camarines Sur",
          applicationType: "BUILDING PERMIT",
          dateTimeReceived: "2023-09-15 10:00 AM",
          dateTimePrinted: "2023-10-25 09:00 AM",
          fieldInspectorFindings:
            "Site inspection completed. No encroachments found.",
          fieldInspectorDate: "2023-09-20",
          bldgEvaluatorFindings:
            "Architectural plans reviewed. Complies with setbacks.",
          bldgEvaluatorDate: "2023-10-01",
          bldgEvaluatorTimeStart: "09:00 AM",
          bldgEvaluatorTimeEnd: "11:30 AM",
          electricalEvaluatorFindings:
            "Load schedule matches proposed installations.",
          electricalEvaluatorDate: "2023-10-02",
          electricalEvaluatorTimeStart: "01:00 PM",
          electricalEvaluatorTimeEnd: "03:00 PM",
          mechanicalEvaluatorFindings: "N/A",
          mechanicalEvaluatorDate: "",
          mechanicalEvaluatorTimeStart: "",
          mechanicalEvaluatorTimeEnd: "",
          electronicsEvaluatorFindings: "N/A",
          electronicsEvaluatorDate: "",
          electronicsEvaluatorTimeStart: "",
          electronicsEvaluatorTimeEnd: "",
          recommendationEvalCompliant: true,
          recommendationEvalDeficiency: false,
          sectionHeadFindings: "All evaluations complete and compliant.",
          sectionHeadDate: "2023-10-26 08:30 AM",
        },
        {
          planId: "BPA-2023-002",
          applicantName: "Maria Santos",
          projectType: "Commercial Building",
          approvalDate: "2023-10-20",
          physicalStatus: "Pending",
          submissionDate: "2023-09-01",
          physicalChecklistStatus: null, // Not yet verified
          // UPDATED MOCK DATA FOR EVAL SHEET
          controlNo: "APP-67890",
          projectName: "Retail Store Fit-out",
          projectLocation: "Magsaysay Ave, Naga City",
          applicationType: "BUILDING PERMIT",
          dateTimeReceived: "2023-09-01 02:30 PM",
          dateTimePrinted: "2023-10-19 04:00 PM",
          fieldInspectorFindings: "Pending site inspection.",
          fieldInspectorDate: "",
          bldgEvaluatorFindings:
            "Initial review shows compliance with mall guidelines.",
          bldgEvaluatorDate: "2023-10-05",
          bldgEvaluatorTimeStart: "10:00 AM",
          bldgEvaluatorTimeEnd: "12:00 PM",
          electricalEvaluatorFindings: "Panel board diagram needed.",
          electricalEvaluatorDate: "2023-10-06",
          electricalEvaluatorTimeStart: "08:00 AM",
          electricalEvaluatorTimeEnd: "09:30 AM",
          mechanicalEvaluatorFindings: "HVAC details provided.",
          mechanicalEvaluatorDate: "2023-10-06",
          mechanicalEvaluatorTimeStart: "09:30 AM",
          mechanicalEvaluatorTimeEnd: "10:30 AM",
          electronicsEvaluatorFindings: "CCTV layout okay.",
          electronicsEvaluatorDate: "2023-10-07",
          electronicsEvaluatorTimeStart: "02:00 PM",
          electronicsEvaluatorTimeEnd: "02:45 PM",
          recommendationEvalCompliant: false,
          recommendationEvalDeficiency: false, // Assume pending evaluation
          sectionHeadFindings: "Waiting for electrical revisions.",
          sectionHeadDate: "",
        },
      ],
      viewPlanDialog: false,
      selectedPlan: null,
      isEditingPhysicalChecklist: false,
      physicalDocumentChecklist: [], // This will be dynamically populated
      baseChecklistTemplate: [], // To store the master checklist template
    };
  },

  // --- COMPUTED PROPERTIES FOR NOTIFICATIONS ---
  computed: {
    // Filters the master list to only show notifications for the current user's discipline
    filteredApplicationsToEvaluate() {
      // Ensure applicationsToEvaluate exists before filtering
      if (!this.applicationsToEvaluate) return [];
      return this.applicationsToEvaluate.filter(
        (app) => app.discipline === this.mockEvaluatorProfile.specialty
      );
    },
    // Calculates the count for the red badge
    unreadNotificationsCount() {
      // Ensure filteredApplicationsToEvaluate exists before reducing
      if (!this.filteredApplicationsToEvaluate) return 0;
      return this.filteredApplicationsToEvaluate.filter((n) => !n.read).length;
    },
  },

  created() {
    // Populate the master checklist template when the component is created
    this.populateChecklistTemplate();
  },
  methods: {
    // --- METHODS FROM NEW NOTIFICATION SCRIPT ---
    // Marks all visible notifications as 'read' when the close button is clicked
    closeNotifications() {
      this.filteredApplicationsToEvaluate.forEach((notification) => {
        notification.read = true;
      });
    },
    // Returns a color based on the application status
    getStatusColor(status) {
      if (status === "Verified") return "success";
      if (status === "Pending") return "warning";
      if (status === "Return") return "error";
      if (status === "Approved") return "primary";
      return "grey";
    },
    // Generates a consistent color from a string
    stringToHslColor(str, s, l) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const h = hash % 360;
      return `hsl(${h}, ${s}%, ${l}%)`;
    },
    // Gets a color for the user avatar
    getAvatarColor(initials) {
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
      return definedColors[initials] || this.stringToHslColor(initials, 60, 40);
    },
    // --- END OF NEW NOTIFICATION METHODS ---

    getPhysicalStatusColor(status) {
      if (status === "Verified") return "success";
      if (status === "Mismatch") return "error";
      return "warning"; // for 'Pending'
    },

    viewPlan(item) {
      // Ensure evaluation fields exist to avoid errors, create if not
      const evalFields = [
        "fieldInspectorFindings",
        "fieldInspectorDate",
        "bldgEvaluatorFindings",
        "bldgEvaluatorDate",
        "bldgEvaluatorTimeStart",
        "bldgEvaluatorTimeEnd",
        "electricalEvaluatorFindings",
        "electricalEvaluatorDate",
        "electricalEvaluatorTimeStart",
        "electricalEvaluatorTimeEnd",
        "mechanicalEvaluatorFindings",
        "mechanicalEvaluatorDate",
        "mechanicalEvaluatorTimeStart",
        "mechanicalEvaluatorTimeEnd",
        "electronicsEvaluatorFindings",
        "electronicsEvaluatorDate",
        "electronicsEvaluatorTimeStart",
        "electronicsEvaluatorTimeEnd",
        "recommendationEvalCompliant",
        "recommendationEvalDeficiency",
        "sectionHeadFindings",
        "sectionHeadDate",
      ];
      evalFields.forEach((field) => {
        if (item[field] === undefined) {
          // Set default based on expected type (string or boolean)
          item[field] =
            field.includes("Compliant") || field.includes("Deficiency")
              ? false
              : "";
        }
      });

      this.selectedPlan = item;
      this.isEditingPhysicalChecklist = false; // Reset edit state
      // currentPDFTab removed

      let newChecklist = JSON.parse(JSON.stringify(this.baseChecklistTemplate));
      if (item.physicalChecklistStatus) {
        newChecklist.forEach((doc) => {
          const savedDoc = item.physicalChecklistStatus.find(
            (s) => s.label === doc.label
          );
          if (savedDoc) {
            doc.checked = savedDoc.checked;
          }
        });
      }
      this.physicalDocumentChecklist = newChecklist;
      this.viewPlanDialog = true;
    },

    populateChecklistTemplate() {
      // This method creates the master checklist template from your image data.
      this.baseChecklistTemplate = [
        // TECHNICAL DOCUMENTS
        {
          label: "Filled-up Unified Application Form for Building Permit",
          copies: "4 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label:
            "Duly Accomplished Ancillary Permit Forms (Signed & Sealed by respective Design Professionals)",
          copies: "4 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label:
            "Design Plans and Other Related Documents (Signed & Sealed by respective Design Professionals)",
          copies: "4 sets",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Architectural Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Civil/Structural Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Electrical Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Sanitary Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Plumbing Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Mechanical Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Electronics Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Geodetic Documents",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Fire Protection Documents (if applicable)",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label:
            "Lot Plan with Certification of Non-Encroachment (Signed & Sealed by a Geodetic Engineer)",
          copies: "3 sets",
          checked: false,
          isSubItem: false,
        },
        {
          label:
            "Photocopies of Valid Licenses (PRC ID) of all involved Professionals",
          copies: "3 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label:
            "Notarized estimated value of the building/structure to be erected as declared by the owner (Signed & Sealed by an Architect or Civil Engineer)",
          copies: "3 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label:
            "Technical Specifications (Signed & Sealed by an Architect or Civil Engineer)",
          copies: "3 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Structural Design and Seismic Analysis",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Soil Test (Signed & Sealed by a Civil Engineer)*",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Plate Load Test Result (for 2-storeys with roof deck)",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Soil Boring Test Result (for 3-storeys and above)",
          copies: "",
          checked: false,
          isSubItem: true,
        },
        {
          label: "Electrical Design Analysis",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
          addDivider: true,
        },
        // LOT DOCUMENTS & PROOF OF OWNERSHIP
        {
          label:
            "Original Certificate of Title (OCT) / Transfer Certificate Title (TCT), Deed of Absolute Sale or Locational Plan from LRA (if lessee, Contract of Lease)",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Tax Declaration",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Tax Receipt",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
          addDivider: true,
        },
        // CLEARANCES
        {
          label:
            "Construction Safety and Health Program approved by DOLE (Original)",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Fire Safety Evaluation Clearance from BFP (Original)",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Locational Clearance from CPDO (Original)",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "DPWH Clearance (if project is along National Highway)",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label:
            "ECC from DENR or ENRO Clearance from CENRO (for Commercial and Industrial)",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Barangay Clearance",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
        {
          label: "Other Clearances:",
          copies: "2 copies",
          checked: false,
          isSubItem: false,
        },
      ];
    },

    savePhysicalChecklist() {
      const planIndex = this.approvedPlans.findIndex(
        (p) => p.planId === this.selectedPlan.planId
      );
      if (planIndex !== -1) {
        this.approvedPlans[planIndex].physicalChecklistStatus = JSON.parse(
          JSON.stringify(this.physicalDocumentChecklist)
        );
      }
      this.isEditingPhysicalChecklist = false;
      console.log("Physical checklist saved for:", this.selectedPlan.planId);
      // You would typically show a success snackbar here
    },

    markAsVerified() {
      if (this.selectedPlan) {
        const index = this.approvedPlans.findIndex(
          (p) => p.planId === this.selectedPlan.planId
        );
        if (index !== -1) {
          this.approvedPlans[index].physicalStatus = "Verified";
          this.approvedPlans[index].physicalChecklistStatus = JSON.parse(
            JSON.stringify(this.physicalDocumentChecklist)
          );
          console.log(
            `Plan ${this.selectedPlan.planId} marked as physically verified.`
          );
          this.viewPlanDialog = false;
        }
      }
    },

    markAsMismatch() {
      if (this.selectedPlan) {
        const index = this.approvedPlans.findIndex(
          (p) => p.planId === this.selectedPlan.planId
        );
        if (index !== -1) {
          this.approvedPlans[index].physicalStatus = "Mismatch";
          this.approvedPlans[index].physicalChecklistStatus = JSON.parse(
            JSON.stringify(this.physicalDocumentChecklist)
          );
          console.log(`Plan ${this.selectedPlan.planId} marked as MISMATCH.`);
          this.viewPlanDialog = false;
        }
      }
    },
  },
};
</script>

<style scoped>
/* Adds indentation for sub-items in the checklist */
.sub-item {
  margin-left: 32px;
}
/* Added this to make the bell icon and profile clickable */
.cursor-pointer {
  cursor: pointer;
}
</style>