<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app>
      <v-toolbar-title class="text-h5 font-weight-bold page-title-gradient">
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
              class="pa-4 quick-guide-card d-flex flex-column justify-space-between elevation-2"
              style="
                border-right: 1px solid #e0e0e0;
                height: 100%;
                background: #fcfcff;
              "
            >
              <div>
                <h4 class="mb-2 text-h5 font-weight-bold text-blue-darken-3">
                  Building Permit Application
                </h4>
                <div class="text-subtitle-2 mb-6 text-blue-grey-darken-1">
                  Follow these steps to complete your application
                </div>
                <v-card
                  v-for="(step, index) in steps"
                  :key="index"
                  flat
                  :color="currentStep === index ? 'blue-lighten-5' : '#f6f8fa'"
                  class="d-flex align-center pa-3 mb-4 rounded-lg quick-guide-step"
                  :class="{
                    'clickable-step': index === 0,
                    'active-step': currentStep === index,
                  }"
                  @click="goToStep(index)"
                  elevation="currentStep === index ? 3 : 0"
                  style="transition: box-shadow 0.16s, background 0.16s"
                >
                  <v-avatar
                    :color="currentStep === index ? 'primary' : '#2563EB'"
                    size="36"
                    class="white--text mr-3 quick-guide-avatar"
                  >
                    <span class="text-h6 font-weight-bold">
                      {{ index + 1 }}
                    </span>
                  </v-avatar>
                  <div class="font-weight-bold text-body-1 step-label">
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
                  to="/login"
                  class="text-capitalize font-weight-bold"
                  @click="handleLogout"
                >
                  <v-icon left>mdi-logout</v-icon>
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- Main Content: Status Tracker -->
          <v-col cols="12" md="9" class="pa-6 main-content-bg">
            <div class="status-tracker-outer">
              <h2
                class="text-h5 font-weight-bold text-center mb-7 status-tracker-title status-tracker-title-blue"
              >
                Application Status Tracker
              </h2>
              <!-- Stepper: compressed, centered, with fixed max-width -->
              <div class="stepper-bar-container">
                <div class="stepper-bar-bg"></div>
                <div
                  class="stepper-bar-progress"
                  :style="{
                    width:
                      ((currentStatusIndex + progressPercent) /
                        (applicationStatuses.length - 1)) *
                        100 +
                      '%',
                    background:
                      progressPercent > 0
                        ? progressGradient
                        : completedGradient,
                  }"
                ></div>
                <div class="stepper-steps">
                  <div
                    v-for="(status, index) in applicationStatuses"
                    :key="index"
                    class="stepper-step"
                    :style="{
                      left:
                        (index / (applicationStatuses.length - 1)) * 100 + '%',
                    }"
                  >
                    <div
                      class="stepper-icon"
                      :class="{
                        'stepper-icon-completed': index < currentStatusIndex,
                        'stepper-icon-active': index === currentStatusIndex,
                        'stepper-icon-pending': index > currentStatusIndex,
                      }"
                    >
                      <v-icon
                        :color="
                          index < currentStatusIndex
                            ? 'green'
                            : index === currentStatusIndex
                            ? 'blue'
                            : '#BDBDBD'
                        "
                        :class="{
                          'icon-outline': index >= currentStatusIndex,
                        }"
                        size="24"
                      >
                        {{ status.icon }}
                      </v-icon>
                    </div>
                  </div>
                </div>
              </div>
              <div class="stepper-labels">
                <div
                  v-for="(status, index) in applicationStatuses"
                  :key="index"
                  class="stepper-label"
                  :style="{
                    left:
                      (index / (applicationStatuses.length - 1)) * 100 + '%',
                  }"
                >
                  <div
                    class="step-title"
                    :class="{
                      'text-green font-weight-bold': index < currentStatusIndex,
                      'text-blue font-weight-bold':
                        index === currentStatusIndex,
                      'text-grey font-weight-bold': index > currentStatusIndex,
                    }"
                  >
                    {{ status.title }}
                  </div>
                  <div class="step-status text-caption">
                    {{ status.status_text }}
                  </div>
                  <div
                    v-if="status.progress"
                    class="step-progress text-blue font-weight-bold"
                  >
                    {{ status.progress }}
                  </div>
                  <div class="step-date text-caption">
                    {{ status.date }}
                  </div>
                </div>
              </div>

              <!-- Current Status Card -->
              <div class="current-status-outer">
                <div class="current-status-card">
                  <div class="d-flex align-start">
                    <v-icon color="blue" size="28" class="mr-3"
                      >mdi-information</v-icon
                    >
                    <div>
                      <h3
                        class="text-h6 font-weight-bold text-blue-darken-3 mb-1"
                      >
                        Current Status:
                        {{ applicationStatuses[currentStatusIndex].title }}
                      </h3>
                      <p class="text-body-2 mb-3 text-grey-darken-3">
                        Your building plans and specifications are currently
                        under evaluation by our engineering team. This process
                        typically takes 5-7 business days.
                      </p>
                      <v-progress-linear
                        :value="progressPercent * 100"
                        color="blue"
                        height="8"
                        rounded
                        class="mb-3"
                        striped
                        style="background-color: #cde6fd"
                      ></v-progress-linear>
                      <div class="d-flex justify-space-between align-center">
                        <span class="text-caption font-weight-bold text-blue"
                          >Next Step: Site inspection will be scheduled upon
                          completion of plans evaluation.</span
                        >
                        <span class="text-h6 font-weight-bold text-blue"
                          >{{ Math.round(progressPercent * 100) }}%</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      currentStep: 0,
      steps: [
        "Fill up the Unified Application Form",
        "Filled up Locational Clearance Application Form",
        "Upload Building Plans & Lot Plans",
        "Download Required Ancillary Permits",
        "Documentary Requirements Checklist",
        "Payment",
      ],
      currentStatusIndex: 1, // 0-indexed: Document Verification in progress
      progressPercent: 0.25, // 25% progress in current step (e.g., Document Verification)
      completedGradient: "linear-gradient(90deg, #4caf50 80%, #4caf50 100%)",
      progressGradient: "linear-gradient(90deg, #4caf50 80%, #2196f3 100%)",
      applicationStatuses: [
        {
          title: "APPLICATION SUBMITTED",
          status_text: "Completed",
          date: "Mar 15, 2024",
          icon: "mdi-file-document",
        },
        {
          title: "DOCUMENT VERIFICATION",
          status_text: "In Progress",
          icon: "mdi-check-circle-outline",
          progress: "25% Complete",
        },
        {
          title: "PLANS EVALUATION",
          status_text: "Pending",
          date: "Est. Mar 20",
          icon: "mdi-account-search",
        },
        {
          title: "SITE INSPECTION",
          status_text: "Pending",
          date: "Est. Mar 25",
          icon: "mdi-clipboard-text-search",
        },
        {
          title: "PERMIT APPROVAL",
          status_text: "Pending",
          date: "Est. Mar 30",
          icon: "mdi-star-four-points",
        },
      ],
    };
  },
  methods: {
    handleLogout() {
      // Add your logout logic here (e.g., remove tokens, redirect, etc.)
      console.log("User logged out");
    },
    goToStep(index) {
      this.currentStep = index;
      if (index === 0) {
        this.$router.push("/applicant/applicantdetails");
      }
    },
  },
};
</script>

<style scoped>
/* Main Layout */
.no-scroll {
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}
.content-area {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 24px;
}
.main-content-bg {
  background: linear-gradient(90deg, #fafdff 70%, #f3f7ff 100%);
  border-radius: 0 24px 24px 0;
}

/* COMPRESSED TRACKER CONTAINER */
.status-tracker-outer {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 12px 32px 12px;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 24px 0 rgba(33, 150, 243, 0.08);
}
@media (max-width: 1200px) {
  .status-tracker-outer {
    max-width: 98vw;
    padding: 12px 2vw 18px 2vw;
  }
}
@media (max-width: 900px) {
  .status-tracker-outer {
    max-width: 100vw;
    border-radius: 10px;
    padding: 8px 0;
  }
}
.page-title-gradient {
  background: linear-gradient(90deg, #1976d2 20%, #3b82f6 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Sidebar/Quick Guide */
.quick-guide-card {
  min-height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}
.quick-guide-step {
  transition: background 0.2s, box-shadow 0.2s;
}
.quick-guide-step:hover {
  background: #e3f0ff !important;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
}
.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
}
.quick-guide-avatar {
  transition: background 0.2s;
}
.step-label {
  color: #23407c;
}

/* Application Status Tracker Card */
.status-tracker-card {
  box-shadow: 0 6px 32px rgba(59, 130, 246, 0.1);
  border-radius: 24px !important;
  background: #fafdff;
  margin-bottom: 0.5rem;
}
.status-tracker-title {
  letter-spacing: 0.02em;
  color: #1976d2;
  text-shadow: 0 2px 8px #fff4;
}
.status-tracker-title-blue {
  color: #1565c0 !important;
  font-size: 2rem !important;
}

/* Stepper Bar (Compressed and Centered) */
.stepper-bar-container {
  position: relative;
  height: 40px;
  margin-bottom: 6px;
  width: 90%;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}

.stepper-bar-bg,
.stepper-bar-progress,
.stepper-steps,
.stepper-labels,
.current-status-outer {
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.stepper-bar-bg {
  position: absolute;
  top: 18px;
  left: 0;
  right: 0;
  height: 3px;
  background: #e0e0e0;
  border-radius: 3px;
  z-index: 1;
}
.stepper-bar-progress {
  position: absolute;
  top: 18px;
  left: 0;
  height: 3px;
  border-radius: 3px;
  z-index: 2;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s;
}
.stepper-steps {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 3;
}
.stepper-step {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110px;
}
.stepper-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  margin-bottom: 4px;
  transition: border-color 0.28s, background 0.28s;
}
.v-icon[size="24"] {
  font-size: 20px !important;
}
.stepper-icon-completed {
  border-color: #4caf50 !important;
  background: #fff;
}
.stepper-icon-active {
  border-color: #2196f3 !important;
  background: #fff;
}
.stepper-icon-pending {
  border-color: #e0e0e0;
  background: #fff;
}
.icon-outline {
  border-radius: 50%;
  background: #fff;
}
.stepper-labels {
  position: relative;
  margin-top: 8px;
  min-height: 70px;
}
.stepper-label {
  position: absolute;
  top: 0;
  width: 110px;
  text-align: center;
  left: 0;
  font-size: 0.95rem;
  white-space: normal;
  word-break: break-word;
}
.stepper-label:nth-child(n) {
  transform: translateX(-50%);
  text-align: center;
}
.stepper-label:first-child {
  transform: translateX(0);
  text-align: left;
}
.stepper-label:last-child {
  transform: translateX(-100%);
  text-align: right;
}

.stepper-label .step-title {
  font-size: 0.9rem;
  margin-bottom: 1px;
  letter-spacing: 0.01em;
  line-height: 1.2;
}
.text-green {
  color: #43a047;
}
.text-blue {
  color: #1976d2;
}
.text-grey {
  color: #757575;
}
.step-status,
.step-progress,
.step-date {
  font-size: 0.8rem;
  margin-bottom: 0px;
}
.step-progress {
  font-weight: bold;
  margin-bottom: 0;
}

/* Current Status Card */
.current-status-outer {
  max-width: 800px;
  margin: 18px auto 0 auto;
}
.current-status-card {
  border-radius: 18px;
  border-left: 6px solid #1976d2;
  box-shadow: 0 4px 18px 0 rgba(33, 150, 243, 0.08);
  background: #e3f2fd;
  padding: 16px 16px !important;
  border: 2px solid #90caf9;
}
.current-status-card h3 {
  color: #1976d2 !important;
  letter-spacing: 0.01em;
  font-size: 1rem;
}
.current-status-card .text-body-2 {
  font-size: 0.85rem !important;
}
.current-status-card .text-caption {
  font-size: 0.75rem !important;
}
.current-status-card .text-h6 {
  font-size: 1.1rem !important;
}
.current-status-card .v-progress-linear {
  background-color: #cde6fd !important;
}
.current-status-card .v-progress-linear__determinate {
  background-color: #2196f3 !important;
}

@media (max-width: 900px) {
  .status-tracker-outer,
  .stepper-bar-container,
  .stepper-labels,
  .current-status-outer {
    max-width: 99vw;
  }
  .stepper-label {
    width: 70px;
    font-size: 0.8rem;
  }
  .stepper-step {
    width: 70px;
  }
  .current-status-card {
    padding: 10px 10px !important;
  }
}
@media (max-width: 700px) {
  .stepper-label {
    width: 60px;
    font-size: 0.75rem;
  }
  .stepper-step {
    width: 60px;
  }
  .current-status-card {
    padding: 8px 8px !important;
  }
}
@media (max-width: 600px) {
  .main-content-bg {
    border-radius: 0;
    padding: 2px !important;
  }
  .status-tracker-title-blue {
    font-size: 1.1rem !important;
  }
  .stepper-icon {
    width: 24px;
    height: 24px;
    border-width: 1px;
  }
  .v-icon[size="24"] {
    font-size: 14px !important;
  }
  .stepper-label {
    font-size: 0.7rem !important;
    width: 45px;
  }
  .stepper-step {
    width: 45px;
  }
  .current-status-card h3 {
    font-size: 0.9rem !important;
  }
}
.status-step .status-details {
  max-width: 120px;
  margin-top: 10px;
}
</style>