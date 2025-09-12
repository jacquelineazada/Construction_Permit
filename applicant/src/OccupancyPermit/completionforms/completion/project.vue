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
                title="Project Information"
                value="2"
                color="blue"
                :complete="true"
              ></v-stepper-item>
              <v-divider style="border-width: 2px; border-color: blue"></v-divider>

              <v-stepper-item
                title="Summary of Actual Cost"
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
                title="Review Application"
                value="4"
                :complete="currentStep > 4"
              ></v-stepper-item>
            </v-stepper-header>
          </v-stepper>

          <v-card class="my-2 pa-4">
            <v-card-title class="text-h6 card-title-responsive"
              >PROJECT INFORMATION</v-card-title
            >
            <v-card-text>
              <v-form ref="form" @submit.prevent="validateAndProceed">
                <v-row dense>
                  <v-col cols="12" md="6">
                    <p class="input-label">DATE OF START OF CONSTRUCTION: PLANNED</p>
                    <v-text-field
                      v-model="projectData.plannedStartDate"
                      variant="plain"
                      density="compact"
                      class="textfield-50"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="input-label">DATE OF START OF CONSTRUCTION: ACTUAL</p>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="startDateMenu"
                      location="bottom"
                    >
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          :model-value="formatDate(projectData.actualStartDate)"
                          variant="outlined"
                          density="compact"
                          class="textfield-50"
                          prepend-inner-icon="mdi-calendar"
                          v-bind="props"
                          readonly
                          :clearable="projectData.actualStartDate !== null"
                          @click:clear="projectData.actualStartDate = null"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="projectData.actualStartDate"
                        @update:model-value="startDateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" md="6">
                    <p class="input-label">DATE OF COMPLETION: PLANNED</p>
                    <v-text-field
                      v-model="projectData.plannedCompletionDate"
                      variant="plain"
                      density="compact"
                      class="textfield-50"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="input-label">DATE OF COMPLETION: ACTUAL</p>
                    <v-menu
                      :close-on-content-click="false"
                      v-model="completionDateMenu"
                      location="bottom"
                    >
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          :model-value="formatDate(projectData.actualCompletionDate)"
                          variant="outlined"
                          density="compact"
                          class="textfield-50"
                          prepend-inner-icon="mdi-calendar"
                          v-bind="props"
                          readonly
                          :clearable="projectData.actualCompletionDate !== null"
                          @click:clear="projectData.actualCompletionDate = null"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="projectData.actualCompletionDate"
                        @update:model-value="completionDateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" md="6">
                    <p class="input-label">TOTAL FLOOR AREA (SQUARE METERS): PLANNED</p>
                    <v-text-field
                      v-model="projectData.plannedFloorArea"
                      variant="plain"
                      density="compact"
                      class="textfield-50"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="input-label">TOTAL FLOOR AREA (SQUARE METERS): ACTUAL</p>
                    <v-text-field
                      v-model="projectData.actualFloorArea"
                      variant="outlined"
                      density="compact"
                      class="textfield-50"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <p class="input-label">NO. OF STOREY(S): PLANNED</p>
                    <v-text-field
                      v-model="projectData.plannedStories"
                      variant="plain"
                      density="compact"
                      class="textfield-50"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="input-label">NO. OF STOREY(S): ACTUAL</p>
                    <v-text-field
                      v-model="projectData.actualStories"
                      variant="outlined"
                      density="compact"
                      class="textfield-50"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <p class="input-label">NO. OF UNITS: PLANNED</p>
                    <v-text-field
                      v-model="projectData.plannedUnits"
                      variant="plain"
                      density="compact"
                      class="textfield-50"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="input-label">NO. OF UNITS: ACTUAL</p>
                    <v-text-field
                      v-model="projectData.actualUnits"
                      variant="outlined"
                      density="compact"
                      class="textfield-50"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end">
            <v-btn color="blue-grey-lighten-4" dark class="mt-4 mr-2" to="/application"
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
  name: "NagaProjectInformation",
  data() {
    return {
      currentStep: 2,
      startDateMenu: false,
      completionDateMenu: false,
      projectData: {
        plannedStartDate: "2023-01-15",
        actualStartDate: null,
        plannedCompletionDate: "2024-03-30",
        actualCompletionDate: null,
        plannedFloorArea: "500",
        actualFloorArea: "",
        plannedStories: "2",
        actualStories: "",
        plannedUnits: "1",
        actualUnits: "",
      },
    };
  },
  methods: {
    async validateAndProceed() {
      // Logic for moving to the next step (e.g., Summary of Actual Cost)
      this.$router.push("/cost");
    },
    formatDate(date) {
      if (!date) return null;

      // Handle both Date objects and string inputs
      let formattedDate = new Date(date);
      if (isNaN(formattedDate)) {
        return date; // Return original string if it's not a valid date
      }

      const yyyy = formattedDate.getFullYear();
      const mm = String(formattedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const dd = String(formattedDate.getDate()).padStart(2, "0");

      return `${mm}/${dd}/${yyyy}`;
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

.textfield-50 .v-input__control {
  min-height: 50px;
}
.input-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

.my-2 {
  margin-top: 8px;
  margin-bottom: 8px;
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
