<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app>
      <v-toolbar-title class="text-h5 font-weight-bold">
        <v-icon color="white" class="mr-2">mdi-office-building</v-icon>
        Construction Permit Management System
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card d-flex flex-column justify-space-between"
              style="border-right: 1px solid lightgrey; height: 100%"
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold">
                  Building Permit Application
                </h4>
                <div class="text-subtitle-2 mb-6">
                  Follow these steps to complete your application
                </div>
                <v-card
                  v-for="(step, index) in steps"
                  :key="index"
                  flat
                  :color="index < 5 ? '#EAF2FF' : '#E8F5E9'"
                  class="d-flex align-center pa-3 mb-4 rounded-lg"
                  :class="{ 'clickable-step': index === 0 }"
                  @click="goToStep(index)"
                >
                  <v-avatar
                    :color="index < 5 ? '#2563EB' : '#4CAF50'"
                    size="36"
                    class="white--text mr-3"
                  >
                    <span class="text-h6 font-weight-bold">{{
                      index + 1
                    }}</span>
                  </v-avatar>
                  <div class="font-weight-bold text-body-1">
                    {{ step }}
                  </div>
                </v-card>
              </div>
              <v-spacer></v-spacer>
              <div class="mt-4">
                <v-btn
                  block
                  color="white"
                  outlined
                  class="text-capitalize"
                  @click="handleLogout"
                >
                  <v-icon left>mdi-logout</v-icon>
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="9" class="pa-6">
            <h1 class="text-h4 font-weight-bold mb-4">
              Building Permit Application Process
            </h1>
            <p class="text-subtitle-1 mb-6">
              Complete guide to obtaining your building permit in Naga City
            </p>

            <v-card
              flat
              color="#2563EB"
              dark
              class="pa-5 mb-6"
              style="border-radius: 12px"
            >
              <div class="d-flex align-center justify-space-between">
                <div>
                  <h2 class="text-h6 font-weight-bold mb-1">
                    Standard Processing Time
                  </h2>
                  <p class="text-subtitle-2 mb-0">
                    Your building permit will be processed and released within
                  </p>
                </div>
                <div class="text-h2 font-weight-bold">
                  7
                  <div class="text-caption font-weight-medium">
                    Working Days
                  </div>
                </div>
              </div>
            </v-card>

            <h2 class="text-h5 font-weight-bold mb-4">Application Timeline</h2>
            <div class="application-timeline">
              <div
                v-for="(item, i) in timelineItems"
                :key="i"
                class="d-flex align-start mb-4"
              >
                <v-avatar color="#2563EB" size="36" class="white--text mr-4">
                  <span class="text-h6 font-weight-bold">{{ i + 1 }}</span>
                </v-avatar>
                <div>
                  <h3 class="font-weight-bold">{{ item.title }}</h3>
                  <p class="mb-0 text-body-2">{{ item.description }}</p>
                </div>
              </div>
            </div>

            <h2 class="text-h5 font-weight-bold mt-6 mb-4">
              Important Information
            </h2>
            <v-card
              class="pa-4 rounded-lg"
              outlined
              style="border-left: 5px solid #ffc107"
              color="#fffde7"
            >
              <v-row>
                <v-col cols="12" md="6">
                  <h3 class="text-h6 font-weight-bold">Processing Time</h3>
                  <p class="mb-1">
                    <span class="font-weight-medium">Standard:</span> 7 working
                    days
                  </p>
                  <p class="mb-0">
                    <span class="font-weight-medium">Complex projects:</span>
                    May require additional time
                  </p>
                </v-col>
                <v-col cols="12" md="6">
                  <h3 class="text-h6 font-weight-bold">Office Hours</h3>
                  <p class="mb-1">
                    <span class="font-weight-medium">Monday - Friday:</span>
                    8:00 AM - 5:00 PM
                  </p>
                  <p class="mb-0">
                    <span class="font-weight-medium">Lunch Break:</span> 12:00
                    PM - 1:00 PM
                  </p>
                </v-col>
                <v-col cols="12" md="6">
                  <h3 class="text-h6 font-weight-bold">Payment Methods</h3>
                  <p class="mb-1">Cash and Online Payment</p>
                  <p class="text-caption mb-0">
                    All fees must be settled before permit release
                  </p>
                </v-col>
                <v-col cols="12" md="6">
                  <h3 class="text-h6 font-weight-bold">Contact Information</h3>
                  <p class="mb-1">Phone: (054) 473-2328</p>
                  <p class="mb-0">Email: permits@nagacity.gov.ph</p>
                </v-col>
              </v-row>
            </v-card>

            <h2 class="text-h5 font-weight-bold mt-6 mb-4">
              Requirements Overview
            </h2>
            <v-row>
              <v-col cols="12" md="4">
                <v-card flat class="pa-4 rounded-lg" color="#e8f5e9">
                  <h3 class="text-h6 font-weight-bold mb-3">
                    Basic Requirements
                  </h3>
                  <div
                    v-for="(req, i) in basicRequirements"
                    :key="i"
                    class="d-flex align-center mb-2"
                  >
                    <v-icon color="success" class="mr-2">mdi-check</v-icon>
                    <div class="text-body-1">{{ req }}</div>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card flat class="pa-4 rounded-lg" color="#ffebee">
                  <h3 class="text-h6 font-weight-bold mb-3">
                    Common Reasons for Delays
                  </h3>
                  <div
                    v-for="(reason, i) in delayReasons"
                    :key="i"
                    class="d-flex align-center mb-2"
                  >
                    <v-icon color="error" class="mr-2">mdi-close</v-icon>
                    <div class="text-body-1">{{ reason }}</div>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card flat class="pa-4 rounded-lg" color="#fffde7">
                  <h3 class="text-h6 font-weight-bold mb-3">
                    Tips for Faster Processing
                  </h3>
                  <div
                    v-for="(tip, i) in fasterProcessingTips"
                    :key="i"
                    class="d-flex align-center mb-2"
                  >
                    <v-icon color="warning" class="mr-2"
                      >mdi-lightbulb-on</v-icon
                    >
                    <div class="text-body-1">{{ tip }}</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <h2 class="text-h5 font-weight-bold mt-6 mb-4">Important Notes</h2>
            <v-card class="pa-4 rounded-lg" outlined color="#F2F2F2">
              <p class="mb-2">
                <span class="font-weight-bold">Complete Documentation:</span>
                Ensure all required documents are submitted to avoid delays in
                processing.
              </p>
              <p class="mb-2">
                <span class="font-weight-bold">Processing Time Variation:</span>
                Processing time may vary based on the complexity of your
                application and current workload.
              </p>
              <p class="mb-2">
                <span class="font-weight-bold">Technical Support:</span> For
                technical assistance, contact our Building Official at (054)
                473-2328 ext. 205.
              </p>
              <p class="mb-0">
                <span class="font-weight-bold">Status Updates:</span> You can
                check your application status online or visit our office during
                business hours.
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BuildingPermitPage",
  data() {
    return {
      steps: [
        "Fill up the Unified Application Form",
        "Filled up Locational Clearance Application Form",
        "Upload Building Plans & Lot Plans",
        "Download Required Ancillary Permits",
        "Documentary Requirements Checklist",
        "Payment",
      ],
      timelineItems: [
        {
          title: "Application Submission & Verification",
          description:
            "Day 1 - Submit complete documents and initial verification",
        },
        {
          title: "Document Review & Assessment",
          description:
            "Days 2-3 - Thorough review of submitted documents and plans",
        },
        {
          title: "Technical Evaluation",
          description:
            "Days 4-5 - Engineering and architectural plan evaluation",
        },
        {
          title: "Final Approval & Permit Release",
          description: "Days 6-7 - Final approval and permit issuance",
        },
      ],
      // The following data arrays are now unused but kept in the script for context
      basicRequirements: [
        "Completed Unified Application Form",
        "Locational Clearance Application Form",
        "Building Plans and Lot Plans",
        "Required Ancillary Permits",
        "Complete Documentary Requirements",
      ],
      delayReasons: [
        "Incomplete or incorrect documentation",
        "Plans not compliant with building codes",
        "Missing ancillary permits",
        "Unpaid fees or incorrect payment amounts",
      ],
      fasterProcessingTips: [
        "Submit complete and accurate documents",
        "Ensure plans are signed by licensed professionals",
        "Follow up regularly on application status",
        "Prepare all fees in advance",
      ],
    };
  },
  methods: {
    handleLogout() {
      console.log("User logged out");
      // Logic for logging out
    },
    goToStep(index) {
      if (index === 0) {
        // Assuming vue-router is configured and available
        this.$router.push("/applicant/applicantdetails");
      }
      // You can add more conditions here for other steps if they become clickable
    },
  },
};
</script>

<style scoped>
.no-scroll {
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
}
.content-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
}
.quick-guide-item {
  display: flex;
  align-items: center;
}
.clickable-step {
  cursor: pointer;
}
</style>