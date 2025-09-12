<template>
  <v-app class="app-container">
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container fluid class="d-flex align-center justify-space-between py-0 px-6">
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

    <v-main class="main-content-container">
      <v-container fluid class="pa-0">
        <v-card
          flat
          class="d-flex align-center pl-6 mb-4"
          style="background-color: white; border: 1px solid lightgrey; height: 50px"
        >
          <h3 class="mb-0 font-weight-bold page-title-responsive">
            Certificate of Final Electrical Inspection
          </h3>
        </v-card>

        <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
          <v-stepper v-model="currentStep" alt-labels flat class="mb-4">
            <v-stepper-header>
              <v-stepper-item
                title="Applicant Information"
                value="1"
                color="blue"
                :complete="true"
              ></v-stepper-item>
              <v-divider style="border-width: 2px; border-color: blue"></v-divider>

              <v-stepper-item
                title="Electrical Details"
                value="2"
                color="blue"
                :complete="true"
              ></v-stepper-item>
              <v-divider style="border-width: 2px; border-color: blue"></v-divider>

              <v-stepper-item
                title="Cost Details"
                value="3"
                color="blue"
                :complete="true"
              ></v-stepper-item>
              <v-divider style="border-width: 2px; border-color: blue"></v-divider>

              <v-stepper-item
                title="Electrical Loads"
                value="4"
                color="blue"
                :complete="true"
              ></v-stepper-item>
              <v-divider style="border-width: 2px; border-color: blue"></v-divider>

              <v-stepper-item
                title="Review Application"
                value="5"
                :complete="currentStep > 5"
              ></v-stepper-item>
            </v-stepper-header>
          </v-stepper>

          <v-card class="my-2 pa-4">
            <v-card-title class="text-h6 card-title-responsive"
              >ELECTRICAL LOADS</v-card-title
            >
            <v-card-text>
              <v-form ref="form" @submit.prevent="validateAndProceed">
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.light"
                      label="LIGHT"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.convenienceReceptacle"
                      label="CONVENIENCE/RECEPTACLE"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.spoAircon"
                      label="SPO. AIRCON"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.spoCookingUnit"
                      label="SPO. COOKING UNIT"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.spoWaterHeater"
                      label="SPO. WATER HEATER"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.spoWaterPump"
                      label="SPO. WATER PUMP"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.toggleSwitch"
                      label="TOGGLE SWITCH"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.bellsBuzzers"
                      label="BELLS/BUZZERS"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="loads.pushButtons"
                      label="PUSH BUTTONS"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="loads.faDetectors"
                      label="FA DETECTORS"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="loads.others"
                      label="OTHERS"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>

          <div class="d-flex justify-end">
            <v-btn color="blue-grey-lighten-4" dark class="mt-4 mr-2" @click="goBack"
              >Back</v-btn
            >
            <v-btn color="blue" dark class="mt-4" @click="validateAndProceed">Next</v-btn>
          </div>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NagaElectricalLoads",
  data() {
    return {
      currentStep: 4,
      loads: {
        light: null,
        convenienceReceptacle: null,
        spoAircon: null,
        spoCookingUnit: null,
        spoWaterHeater: null,
        spoWaterPump: null,
        toggleSwitch: null,
        bellsBuzzers: null,
        pushButtons: null,
        faDetectors: null,
        others: null,
      },
    };
  },
  methods: {
    validateAndProceed() {
      // You can add validation logic here before proceeding to the next step.
      this.$router.push("/cfeireview");
    },
    goBack() {
      this.$router.push("/cfeicost");
    },
  },
});
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
.app-container {
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.main-content-container {
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.main-content-container::-webkit-scrollbar {
  display: none;
}

/* Responsive styles */
@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
}

@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .card-title-responsive {
    font-size: 1.15rem !important;
  }
}
</style>
