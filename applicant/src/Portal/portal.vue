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
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>

            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>

        <div class="d-none d-md-flex nav-links">
          <v-btn text class="mx-2" style="color: white" to="/home">Home</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/services"
            >Services</v-btn
          >
          <v-btn text class="mx-2" style="color: white" to="/about"
            >About</v-btn
          >
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="no-scroll">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6"
        style="
          background-color: white;
          border: 1px solid lightgrey;
          height: 50px;
        "
      >
        <h3 class="mb-0 font-weight-bold">Building Permit Application</h3>
      </v-card>

      <v-container fluid class="pa-0 content-area">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="3" class="pa-0">
            <v-card
              flat
              class="pa-4 quick-guide-card"
              style="
                border: 1px solid lightgrey;
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

                <v-btn block color="#2563EB" class="mt-2 white--text">
                  Download Complete Checklist
                </v-btn>
              </div>

              <div>
                <v-btn
                  block
                  color="white"
                  class="white--text"
                  @click="handleLogout"
                >
                  Logout
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" md="9" class="pa-2">
            <v-row>
              <v-col cols="12" sm="4" class="pa-2">
                <v-card
                  outlined
                  class="pa-4 text-center d-flex flex-column align-center justify-center"
                  style="height: 250px"
                >
                  <v-icon color="#4F46E5" size="70"
                    >mdi-file-document-edit</v-icon
                  >
                  <div class="font-weight-semibold mt-2">
                    Fill up Unified Application Form
                  </div>
                  <v-btn
                    color="#4F46E5"
                    class="mt-4 white--text"
                    to="/application"
                  >
                    Fill up Form
                  </v-btn>
                </v-card>
              </v-col>

              <v-col cols="12" sm="4" class="pa-2">
                <v-card
                  outlined
                  class="pa-4 text-center d-flex flex-column align-center justify-center"
                  style="height: 250px"
                >
                  <v-icon color="#9333EA" size="70">mdi-file-check</v-icon>
                  <div class="font-weight-semibold mt-2">
                    Select Required Ancillary Form
                  </div>
                  <v-btn
                    color="#9333EA"
                    class="mt-4 white--text"
                    to="/ancillary"
                  >
                    Select Ancillary Form
                  </v-btn>
                </v-card>
              </v-col>

              <v-col cols="12" sm="4" class="pa-2">
                <v-card
                  outlined
                  class="pa-4 text-center d-flex flex-column align-center justify-center"
                  style="height: 250px"
                >
                  <v-icon color="#2563EB" size="70">mdi-cloud-upload</v-icon>
                  <div class="font-weight-semibold mt-2">
                    Upload Requirements
                  </div>
                  <v-btn color="#2563EB" class="mt-4 white--text" to="/upload">
                    Upload Documents
                  </v-btn>
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
        "Select Ancillary Forms",
        "Download your filled up Forms",
        "Upload building required documents",
        "Wait for your application status",
      ],
    };
  },
  methods: {
    handleLogout() {
      console.log("User logged out");
    },
  },
};
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}
html,
body,
#app,
.v-application {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
}
.content-area {
  flex: 1;
  overflow: hidden;
}
.quick-guide-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
