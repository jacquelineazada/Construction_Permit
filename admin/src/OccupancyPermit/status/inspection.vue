<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app>
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
              style="font-size: 12px; font-weight: 400; color: white; line-height: 1.2"
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="font-size: 15px; font-weight: 700; color: white; line-height: 1.2"
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
        <div class="d-none d-md-flex nav-links">
          <v-btn text class="mx-2" style="color: white" to="/home">Home</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/services">Services</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/about">About</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6"
        style="background-color: white; border-bottom: 1px solid lightgrey; height: 50px"
      >
        <h3 class="mb-0 font-weight-bold">Occupancy Permit Application</h3>

        <div class="d-flex align-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <div
                class="notif-wrapper"
                v-bind="attrs"
                v-on="on"
                role="button"
                aria-label="Notifications"
              >
                <v-badge
                  :content="notifications.length"
                  :value="notifications.length"
                  color="red"
                  offset-x="8"
                  offset-y="8"
                  overlap
                >
                  <v-icon size="28" color="#4285F4">mdi-bell</v-icon>
                </v-badge>
              </div>
            </template>
            <v-list dense>
              <v-subheader>NOTIFICATIONS</v-subheader>
              <v-divider></v-divider>
              <v-list-item v-if="notifications.length === 0">
                <v-list-item-title>No new notifications</v-list-item-title>
              </v-list-item>
              <v-list-item v-for="(item, index) in notifications" :key="index" link>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <div class="text-caption text-right ml-3">
            Building Permit Number<br />
            <span class="font-weight-bold">BP-2024-001</span>
          </div>
        </div>
      </v-card>

      <v-container fluid class="fill-height pa-0">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card"
              style="
                border-right: 1px solid lightgrey;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              "
            >
              <div>
                <h4 class="mb-2">Quick Guide</h4>
                <div class="text-subtitle-2 mb-4">
                  Follow these steps to complete your application
                </div>
                <div
                  v-for="(step, index) in steps"
                  :key="index"
                  class="quick-guide-item mb-3"
                >
                  <v-avatar color="#2563EB" size="30" class="white--text mr-3">
                    {{ index + 1 }}
                  </v-avatar>
                  <div class="font-weight-medium text-body-2">
                    {{ step }}
                  </div>
                </div>
                <v-btn
                  block
                  color="#2563EB"
                  class="mt-2 white--text"
                  href="https://www2.naga.gov.ph/wp-content/uploads/2022/02/CC-5E-CEO-Securing-Certificate-of-Occupancy-Certificate-of-Use-Certificate-of-Operation.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Complete Checklist
                </v-btn>
              </div>
              <div>
                <v-btn block color="white" class="white--text" @click="handleLogout">
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="9" class="pa-2 overflow-y-auto">
            <v-row>
              <v-col cols="12" sm="4" v-for="(card, i) in cards" :key="i" class="pa-2">
                <v-card
                  outlined
                  class="pa-4 text-center d-flex flex-column align-center justify-center"
                  style="height: 250px"
                >
                  <v-icon :color="card.color" size="70">{{ card.icon }}</v-icon>
                  <div class="font-weight-semibold mt-2">{{ card.title }}</div>
                  <v-btn
                    :color="card.color"
                    class="mt-4 white--text"
                    @click="handleAction(card.action)"
                  >
                    {{ card.button }}
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-2">
                <v-card outlined class="pa-4">
                  <h4 class="mb-2">Application Status Tracker</h4>
                  <div class="custom-timeline-container">
                    <div class="custom-timeline-item">
                      <div class="timeline-stepper">
                        <div class="timeline-dot-wrapper">
                          <v-icon color="#2563EB" size="24">mdi-check-circle</v-icon>
                        </div>
                        <div class="timeline-line"></div>
                      </div>
                      <div class="timeline-content">
                        <div class="font-weight-medium">Submitted Application</div>
                        <div class="text-caption">Application ID: BP-2024-001</div>
                        <div class="text-caption">Submitted: January 15, 2024</div>
                        <div class="mt-1 text-caption">
                          Your application has been successfully submitted and is now in
                          the review process.
                        </div>
                      </div>
                      <v-chip color="green" outlined class="timeline-status-chip"
                        >Completed</v-chip
                      >
                    </div>

                    <div class="custom-timeline-item">
                      <div class="timeline-stepper">
                        <div class="timeline-dot-wrapper">
                          <v-icon color="#2563EB" size="24">mdi-check-circle</v-icon>
                        </div>
                        <div class="timeline-line"></div>
                      </div>
                      <div class="timeline-content">
                        <div class="font-weight-medium">Requirements Checking</div>
                        <div class="text-caption">Application ID: BP-2024-001</div>
                        <div class="text-caption">Submitted Documents Verified</div>
                        <div class="mt-1 text-caption">
                          Your submitted docuuments have been reviewed and verified.
                        </div>
                      </div>
                      <v-chip color="green" outlined class="timeline-status-chip"
                        >Completed</v-chip
                      >
                    </div>

                    <div class="custom-timeline-item">
                      <div class="timeline-stepper">
                        <div class="timeline-dot-wrapper">
                          <v-icon color="#2563EB" size="24">mdi-check-circle</v-icon>
                        </div>
                        <div class="timeline-line"></div>
                      </div>
                      <div class="timeline-content">
                        <div class="font-weight-medium">Building Inspection</div>
                        <div class="text-caption">Application ID: BP-2024-001</div>
                        <div class="text-caption">Onsite inspection scheduled</div>
                        <div class="mt-1 text-caption">
                          An inspection of the building site has been scheduled. Please
                          ensure access is available.
                        </div>
                      </div>
                      <div class="d-flex align-center timeline-status-wrapper">
                        <span
                          class="view-schedule-text me-2"
                          @click="handleAction('View Schedule')"
                          >View Schedule</span
                        >
                        <v-chip outlined>Pending</v-chip>
                      </div>
                    </div>

                    <div class="custom-timeline-item">
                      <div class="timeline-stepper">
                        <div class="timeline-dot-wrapper">
                          <v-icon color="#E5E7EB" size="24">mdi-circle-outline</v-icon>
                        </div>
                        <div class="timeline-line no-line"></div>
                      </div>
                      <div class="timeline-content">
                        <div class="font-weight-medium">Final Approval</div>
                        <div class="text-caption">Application ID: BP-2024-001</div>
                        <div class="text-caption">Awaiting previous stages</div>
                        <div class="mt-1 text-caption">
                          Final approval and permit issuance will proceed after successful
                          inspection.
                        </div>
                      </div>
                      <v-chip outlined class="timeline-status-chip">Pending</v-chip>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
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
        "Select Completion Forms",
        "Download your filled up Forms",
        "Upload occupancy supporting documents",
        "Wait for your application status",
      ],
      cards: [
        {
          title: "Fill up Unified Application Form",
          color: "#4F46E5",
          icon: "mdi-file-document-edit",
          action: "Fill up Form",
          button: "Fill up Form",
        },
        {
          title: "Select Required Completion Form",
          color: "#9333EA",
          icon: "mdi-file-check",
          action: "Select Ancillary Form",
          button: "Select Ancillary Form",
        },
        {
          title: "Upload Requirements",
          color: "#2563EB",
          icon: "mdi-cloud-upload",
          action: "Upload Documents",
          button: "Upload Documents",
        },
      ],
      notifications: [
        {
          title: "New update on your application",
          subtitle: "Your application has been updated with a new status.",
        },
      ],
    };
  },
  methods: {
    handleAction(actionName) {
      console.log(`Action clicked: ${actionName}`);
    },
    handleLogout() {
      console.log("User logged out");
    },
  },
};
</script>

<style scoped>
/*
  The following styles were removed to address the "no scroll" issue:
  .no-scroll, .v-main.no-scroll, .content-area
*/
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.quick-guide-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Notification wrapper: no background, no circle */
.notif-wrapper {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  line-height: 0;
}

/* Custom Timeline Styles */
.custom-timeline-container {
  padding-left: 20px;
}

.custom-timeline-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  position: relative;
}

.timeline-stepper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  height: 100%;
}

.timeline-dot-wrapper {
  position: relative;
  z-index: 1;
  background-color: white;
}

.timeline-line {
  width: 2px;
  background-color: #e5e7eb;
  flex-grow: 1;
  margin-top: 4px;
}

.timeline-content {
  flex-grow: 1;
  padding-right: 16px;
}

.timeline-status-wrapper {
  margin-left: auto;
  align-self: flex-start;
}

.view-schedule-text {
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
}

.no-line {
  background-color: transparent !important;
}
</style>
