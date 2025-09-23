<template>
  <v-app class="app-container">
    <v-main class="main-content-container">
      <v-container fluid class="pa-0">
        <v-card
          flat
          class="d-flex align-center pl-6 mb-4"
          style="
            background-color: white;
            border: 1px solid lightgrey;
            height: 50px;
          "
        >
          <h3 class="mb-0 font-weight-bold page-title-responsive">
            Building Permit Application
          </h3>
        </v-card>

        <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
          <v-stepper v-model="currentStep" alt-labels flat class="mb-4">
            <v-stepper-header>
              <v-stepper-item
                title="Building Owner Information"
                value="1"
                :complete="currentStep > 1"
                :color="currentStep >= 1 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 1 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Construction Information"
                value="2"
                :complete="currentStep > 2"
                :color="currentStep >= 2 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 2 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Use or Character of Occupancy"
                value="3"
                :complete="currentStep > 3"
                :color="currentStep >= 3 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 3 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Signatories Details"
                value="4"
                :complete="currentStep > 4"
                :color="currentStep >= 4 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 4 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Review Application"
                value="5"
                :complete="currentStep > 5"
                :color="currentStep >= 5 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
            </v-stepper-header>
          </v-stepper>

          <v-card class="my-2 pa-4">
            <v-card-text>
              <v-form ref="form" v-model="formValid">
                <v-card class="mb-4" v-if="currentStep === '2'">
                  <v-card-title class="text-h6 card-title-responsive">
                    PROJECT LOCATION
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Barangay</div>
                        <v-select
                          v-model="barangay"
                          :items="barangays"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">BLK. No.</div>
                        <v-text-field
                          v-model="blkNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Street</div>
                        <v-text-field
                          v-model="street"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4" v-if="currentStep === '2'">
                  <v-card-title class="text-h6 card-title-responsive">
                    LOT INFORMATION
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="6">
                        <div class="input-label">TCT No.</div>
                        <v-text-field
                          v-model="tctNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="input-label">Current Tax Dec No.</div>
                        <v-text-field
                          v-model="taxDecNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4" v-if="currentStep === '2'">
                  <v-card-title class="text-h6 card-title-responsive">
                    SCOPE OF WORK
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12">
                        <div class="input-label">Select Scope of Work</div>
                        <v-select
                          v-model="selectedScope"
                          :items="scopeOfWork"
                          variant="outlined"
                          density="compact"
                          multiple
                          :rules="[rules.requiredScope]"
                          style="min-height: 50px"
                        ></v-select>
                      </v-col>
                      <v-col
                        v-if="selectedScope.includes('Other (Specify)')"
                        cols="12"
                      >
                        <v-text-field
                          v-model="otherDetails"
                          label="Please specify"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.requiredOther]"
                          class="my-1"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4" v-if="currentStep === '3'">
                  <v-card-title class="text-h6 card-title-responsive">
                    USE OR CHARACTER OF OCCUPANCY
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="selectedGroup"
                          :items="groups"
                          label="Groups"
                          variant="outlined"
                          hide-details
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-select
                          v-model="selectedCategory"
                          :items="categories"
                          label="Category"
                          variant="outlined"
                          :disabled="!selectedGroup"
                          hide-details
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-card-text>
          </v-card>

          <div class="d-flex justify-end">
            <router-link to="/applicant/applicantdetails">
              <v-btn color="blue-grey-lighten-4" dark class="mt-4 mr-2">
                Back
              </v-btn>
            </router-link>
            <v-btn color="blue" dark class="mt-4" @click="nextStep">
              Next
            </v-btn>
          </div>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NagaApplicationForm",
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      currentStep: "2",
      formValid: false,
      formSubmitted: false,
      // Location data
      barangay: null,
      blkNo: "",
      street: "",
      cityMunicipality: "Naga City",

      // Lot Information data
      tctNo: "",
      taxDecNo: "",

      // Scope of Work data
      selectedScope: [],
      otherDetails: "",
      scopeOfWork: [
        "New Construction",
        "Erection",
        "Addition",
        "Alteration",
        "Renovation",
        "Conversion",
        "Repair",
        "Moving",
        "Raising",
        "Accessory Building/Structure",
        "Legalization of Existing Building",
        "Other (Specify)",
      ],
      barangays: [
        "Abella",
        "Bagumbayan Norte",
        "Bagumbayan Sur",
        "Balatas",
        "Calauag",
        "Cararayan",
        "Carolina",
        "Concepcion Grande",
        "Concepcion Pequeña",
        "Dayangdang",
        "Del Rosario",
        "Dinaga",
        "Igualdad Interior",
        "Lerma",
        "Liboton",
        "Mabolo",
        "Pacol",
        "Panicuason",
        "Peñafrancia",
        "Sabang",
        "San Felipe",
        "San Francisco",
        "San Isidro",
        "Santa Cruz",
        "Tabuco",
        "Tinago",
        "Triangulo",
      ],
      rules: {
        required: (value) => !!value || "This field is required.",
        requiredScope: (value) =>
          value.length > 0 || "Please select at least one scope of work.",
        requiredOther: (value) => {
          if (this.selectedScope.includes("Other (Specify)")) {
            return !!value || "Please specify details for 'Other'.";
          }
          return true;
        },
      },
      // Data from OccupancyContainer
      selectedGroup: null,
      selectedCategory: null,
      groupCategoryData: {
        "GROUP A: RESIDENTIAL (DWELLINGS)": [
          "SINGLE",
          "DUPLEX",
          "RESIDENTIAL R-1, R-2",
          "OTHERS",
        ],
        "GROUP B: RESIDENTIAL": [
          "HOTEL",
          "MOTEL",
          "TOWNHOUSE",
          "DORMITORY",
          "OTHERS",
        ],
        "GROUP C: EDUCATIONAL & RECREATIONAL": [
          "SCHOOL BUILDING",
          "SCHOOL AUDITORIUM, GYMNASIUM",
          "OTHERS",
        ],
        "GROUP E: COMMERCIAL": [
          "BANK",
          "STORE",
          "SHOPPING CENTER/MALL",
          "OTHERS",
        ],
        "GROUP F: LIGHT INDUSTRIAL": ["FACTORY/PLANT", "OTHERS"],
        "GROUP G: MEDIUM INDUSTRIAL": [
          "STORAGE/WAREHOUSE",
          "FACTORY",
          "OTHERS",
        ],
        "GROUP H: ASSEMBLY": ["THEATER, AUDITORIUM", "OTHERS"],
        "GROUP I: ASSEMBLY": ["COLISEUM, SPORTS COMPLEX", "OTHERS"],
        "GROUP J: AGRICULTURAL & ACCESSORIES": [
          "AGRICULTURAL STRUCTURES",
          "ACCESSORIES",
          "OTHERS",
        ],
      },
    };
  },
  computed: {
    groups() {
      return Object.keys(this.groupCategoryData);
    },
    categories() {
      return this.selectedGroup
        ? this.groupCategoryData[this.selectedGroup]
        : [];
    },
  },
  watch: {
    selectedGroup() {
      this.selectedCategory = null;
    },
  },
  methods: {
    async nextStep() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        // Only navigate if the form is valid
        this.currentStep = (parseInt(this.currentStep) + 1).toString();
        this.router.push("/applicant/usecharacterofoccupancy");
      }
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

.input-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
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