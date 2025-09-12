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
                :complete="currentStep > 3"
              ></v-stepper-item>
              <v-divider
                :style="{
                  'border-width': '2px',
                  'border-color': currentStep > 3 ? 'blue' : 'grey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Electrical Loads"
                value="4"
                :complete="currentStep > 4"
              ></v-stepper-item>
              <v-divider
                :style="{
                  'border-width': '2px',
                  'border-color': currentStep > 4 ? 'blue' : 'grey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Review Application"
                value="5"
                :complete="currentStep > 5"
              ></v-stepper-item>
            </v-stepper-header>
          </v-stepper>

          <v-card class="my-2 pa-4">
            <v-card-title class="text-h6 card-title-responsive"
              >ELECTRICAL DETAILS</v-card-title
            >
            <v-card-text>
              <v-form ref="form" @submit.prevent="validateAndProceed">
                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive"
                    >START OF INSTALLATION</v-card-title
                  >
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-menu
                          :close-on-content-click="false"
                          v-model="installationDates.startDateMenu"
                          location="bottom"
                        >
                          <template v-slot:activator="{ props }">
                            <v-text-field
                              v-model="installationDates.start"
                              label="DATE OF START"
                              variant="outlined"
                              density="compact"
                              prepend-inner-icon="mdi-calendar"
                              v-bind="props"
                              readonly
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="installationDates.start"
                            @update:model-value="installationDates.startDateMenu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-menu
                          :close-on-content-click="false"
                          v-model="installationDates.completionDateMenu"
                          location="bottom"
                        >
                          <template v-slot:activator="{ props }">
                            <v-text-field
                              v-model="installationDates.completion"
                              label="DATE OF COMPLETION"
                              variant="outlined"
                              density="compact"
                              prepend-inner-icon="mdi-calendar"
                              v-bind="props"
                              readonly
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="installationDates.completion"
                            @update:model-value="
                              installationDates.completionDateMenu = false
                            "
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive"
                    >OUTLETS/DEVICES/EQUIPMENTS</v-card-title
                  >
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="outlets.light"
                          label="LIGHT"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="outlets.convenience"
                          label="CONVENIENCE/RECEPTACLE"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="outlets.aircon"
                          label="SPO. AIRCON"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="outlets.cookingUnit"
                          label="SPO. COOKING UNIT"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="outlets.waterHeater"
                          label="SPO. WATER HEATER"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="outlets.waterPump"
                          label="SPO. WATER PUMP"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card>
                  <v-card-title class="text-h6 card-title-responsive"
                    >NO. OF EQUIPMENT WIRING DEVICES</v-card-title
                  >
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="wiringDevices.toggleSwitch"
                          label="TOGGLE SWITCH"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="wiringDevices.bells"
                          label="BELLS/BUZZERS"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="wiringDevices.pushButtons"
                          label="PUSH BUTTONS"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="wiringDevices.faDetectors"
                          label="FA DETECTORS"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-model="wiringDevices.others"
                          label="OTHERS"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-card-text>
          </v-card>
          <v-card class="mb-4">
            <v-card-title class="text-h6 card-title-responsive"
              >TYPES OF INSTALLATION</v-card-title
            >
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-checkbox
                    v-model="installationTypes.temporary"
                    label="Temporary"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox v-model="installationTypes.new" label="New"></v-checkbox>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox
                    v-model="installationTypes.remodel"
                    label="Remodel"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mb-4">
            <v-card-title class="text-h6 card-title-responsive"
              >TYPES OF WIRING</v-card-title
            >
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-checkbox
                    v-model="wiringTypes.openWiring"
                    label="Open Wiring"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox
                    v-model="wiringTypes.conduits"
                    label="Conduits"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox v-model="wiringTypes.cable" label="Cable"></v-checkbox>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox
                    v-model="wiringTypes.armoredCable"
                    label="Armored Cable"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="4">
                  <v-checkbox
                    v-model="wiringTypes.raceways"
                    label="Raceways"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" md="4" class="d-flex align-center">
                  <v-checkbox
                    v-model="wiringTypes.others"
                    label="Others (Specify):"
                  ></v-checkbox>
                  <v-text-field
                    v-if="wiringTypes.others"
                    v-model="wiringTypes.otherSpecification"
                    variant="outlined"
                    density="compact"
                    class="ml-2"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end">
            <v-btn
              color="blue-grey-lighten-4"
              dark
              class="mt-4 mr-2"
              to="/cfeiapplication"
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
  name: "NagaElectricalDetails",
  data() {
    return {
      currentStep: 2,
      installationDates: {
        startDateMenu: false,
        completionDateMenu: false,
        start: null,
        completion: null,
      },
      installationTypes: {
        temporary: false,
        new: false,
        remodel: false,
      },
      wiringTypes: {
        openWiring: false,
        conduits: false,
        cable: false,
        armoredCable: false,
        raceways: false,
        others: false,
        otherSpecification: "",
      },
      outlets: {
        light: null,
        convenience: null,
        aircon: null,
        cookingUnit: null,
        waterHeater: null,
        waterPump: null,
      },
      wiringDevices: {
        toggleSwitch: null,
        bells: null,
        pushButtons: null,
        faDetectors: null,
        others: null,
      },
      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  methods: {
    async validateAndProceed() {
      // You can add validation logic here before proceeding to the next step.
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
