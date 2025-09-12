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
            Certificate of Completion
          </h3>
        </v-card>

        <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
          <!-- ✅ Vuetify 3 Stepper -->
          <v-stepper v-model="currentStep" class="mb-4">
            <v-stepper-header>
              <v-stepper-item :value="1" title="Applicant Information" />
              <v-stepper-item :value="2" title="Project Information" />
              <v-stepper-item :value="3" title="Summary of Actual Cost" />
              <v-stepper-item :value="4" title="Review Application" />
            </v-stepper-header>

            <v-stepper-window>
              <v-stepper-window-item :value="3">
                <!-- Your summary form goes here -->
                <v-card class="my-2 pa-4">
                  <v-card-title class="text-h6 card-title-responsive">
                    SUMMARY OF ACTUAL COSTS
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" @submit.prevent="validateAndProceed">
                      <v-row dense>
                        <v-col cols="12" md="6">
                          <p class="input-label">TOTAL COST OF DIRECT LABOR:</p>
                          <v-text-field
                            v-model="costs.directLabor"
                            variant="outlined"
                            density="compact"
                            class="textfield-50"
                            label="Enter amount"
                          />
                        </v-col>

                        <v-col cols="12" md="6">
                          <p class="input-label">
                            TOTAL COST OF MATERIALS: CEMENT (BAGS)
                          </p>
                          <v-text-field
                            v-model="costs.cement"
                            variant="outlined"
                            density="compact"
                            class="textfield-50"
                            label="Enter quantity"
                          />
                        </v-col>

                        <!-- ✅ repeat same pattern for your other fields -->
                        <v-col cols="12" md="6">
                          <p class="input-label">TOTAL COST OF EQUIPMENT UTILIZATION</p>
                          <v-text-field
                            v-model="costs.equipment"
                            variant="outlined"
                            density="compact"
                            class="textfield-50"
                            label="Enter amount"
                          />
                        </v-col>

                        <v-col cols="12" md="6">
                          <p class="input-label">
                            TOTAL COST OF MATERIALS: LUMBER (BD. FT.)
                          </p>
                          <v-text-field
                            v-model="costs.lumber"
                            variant="outlined"
                            density="compact"
                            class="textfield-50"
                            label="Enter quantity"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>

          <div class="d-flex justify-end">
            <v-btn color="blue-grey-lighten-4" dark class="mt-4 mr-2" to="/project"
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
  name: "NagaActualCosts",
  data() {
    return {
      currentStep: 3,
      costs: {
        directLabor: null,
        equipment: null,
        otherCosts: null,
        buildingStructure: null,
        cement: null,
        lumber: null,
        rebar: null,
        giSheets: null,
        prefabSteel: null,
        otherMaterials: null,
      },
    };
  },
  methods: {
    async validateAndProceed() {
      this.$router.push("/cfeireview");
    },
  },
});
</script>
