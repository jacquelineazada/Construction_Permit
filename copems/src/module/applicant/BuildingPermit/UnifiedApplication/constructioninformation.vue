<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar flat color="blue-darken-3" dark height="88" app>
      <v-toolbar-title class="ml-2 font-weight-bold"
        ><v-icon left>mdi-office-building-outline</v-icon> Building Permit
        Portal</v-toolbar-title
      >
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <!-- Header Card -->
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6"
        style="
          background-color: white;
          border-bottom: 1px solid #e0e0e0;
          height: 60px;
        "
      >
        <div class="d-flex align-center">
          <v-icon color="blue-darken-3" class="mr-3" size="32"
            >mdi-office-building-outline</v-icon
          >
          <h2 class="mb-0 font-weight-bold page-title-responsive gradient-text">
            Building Permit Application
          </h2>
        </div>
      </v-card>

      <!-- Stepper -->
      <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
        <v-stepper
          v-model="currentStep"
          alt-labels
          flat
          class="mb-4 mt-2 stepper-elevated"
        >
          <v-stepper-header>
            <v-stepper-item
              title="Building Owner Information"
              value="1"
              :complete="currentStep > 1"
              :color="currentStep >= 1 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 1 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>

            <v-stepper-item
              title="Construction Information"
              value="2"
              :complete="currentStep > 2"
              :color="currentStep >= 2 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 2 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>

            <v-stepper-item
              title="Use or Character of Occupancy"
              value="3"
              :complete="currentStep > 3"
              :color="currentStep >= 3 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 3 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>

            <v-stepper-item
              title="Signatories Details"
              value="4"
              :complete="currentStep > 4"
              :color="currentStep >= 4 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 4 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>

            <v-stepper-item
              title="Review Application"
              value="5"
              :complete="currentStep > 5"
              :color="currentStep >= 5 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
          </v-stepper-header>
        </v-stepper>

        <v-card class="my-2 pa-4 card-shadow">
          <v-card-text>
            <v-form ref="form" v-model="formValid">
              <!-- Construction Information Step -->
              <v-card class="mb-4 card-section" v-if="currentStep === '2'">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-map-marker</v-icon
                  >
                  PROJECT LOCATION
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Barangay</div>
                      <v-select
                        v-model="barangay"
                        :items="barangays"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-home-group"
                        color="blue-darken-3"
                        style="min-height: 50px"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">BLK. No.</div>
                      <v-text-field
                        v-model="blkNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                        style="min-height: 50px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Street</div>
                      <v-text-field
                        v-model="street"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-road-variant"
                        color="blue-darken-3"
                        style="min-height: 50px"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mb-4 card-section" v-if="currentStep === '2'">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-file-document-outline</v-icon
                  >
                  LOT INFORMATION
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="input-label">TCT No.</div>
                      <v-text-field
                        v-model="tctNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                        style="min-height: 50px"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="input-label">Current Tax Dec No.</div>
                      <v-text-field
                        v-model="taxDecNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                        style="min-height: 50px"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mb-4 card-section" v-if="currentStep === '2'">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-hammer-wrench</v-icon
                  >
                  SCOPE OF WORK
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <div class="input-label">Select Scope of Work</div>
                      <v-select
                        v-model="selectedScope"
                        :items="scopeOfWork"
                        variant="outlined"
                        density="comfortable"
                        multiple
                        :rules="[rules.requiredScope]"
                        chips
                        prepend-inner-icon="mdi-format-list-bulleted"
                        color="blue-darken-3"
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
                        density="comfortable"
                        :rules="[rules.requiredOther]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-pencil"
                        class="my-1"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Use or Character of Occupancy Step -->
              <v-card class="mb-4 card-section" v-if="currentStep === '3'">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-domain</v-icon
                  >
                  USE OR CHARACTER OF OCCUPANCY
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="selectedGroup"
                        :items="groups"
                        label="Groups"
                        variant="outlined"
                        prepend-inner-icon="mdi-format-list-bulleted"
                        color="blue-darken-3"
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
                        prepend-inner-icon="mdi-shape"
                        color="blue-darken-3"
                        hide-details
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Navigation Buttons -->
        <div class="d-flex justify-end mt-6 mb-8">
          <router-link to="/applicant/applicantdetails">
            <v-btn
              color="blue-grey-lighten-4"
              class="mr-2 btn-rounded"
              elevation="2"
              variant="tonal"
            >
              <v-icon left>mdi-arrow-left</v-icon>Back
            </v-btn>
          </router-link>
          <v-btn
            color="blue-darken-3"
            class="btn-rounded"
            elevation="2"
            @click="nextStep"
            variant="elevated"
          >
            Next<v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
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
      let validationPassed = true;
      if (this.currentStep === "2") {
        const { valid } = await this.$refs.form.validate();
        validationPassed = valid;
      }

      if (validationPassed) {
        const nextStepNumber = parseInt(this.currentStep) + 1;
        this.currentStep = nextStepNumber.toString();

        if (nextStepNumber === 3) {
          this.router.push("/applicant/usecharacterofoccupancy");
        }
      }
    },
  },
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 20px 0;
}

.stepper-item-custom .v-stepper-item__step {
  box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.13);
  transition: background 0.2s;
}

.card-shadow {
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}

.card-section {
  background: #f7fafd;
  border-radius: 12px;
  border: 1px solid #e3eafc;
}

.section-title {
  color: #1976d2;
  font-weight: bold;
  font-size: 1.09rem;
  letter-spacing: 0.01em;
}

.input-label {
  font-size: 0.85rem;
  color: #2a2a2a;
  margin-bottom: 4px;
  font-weight: 500;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.page-title-responsive {
  font-size: 1.4rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.12rem !important;
  }
}

@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
}

@media (max-width: 800px) {
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
  .section-title {
    font-size: 0.92rem !important;
  }
}

@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .page-title-responsive {
    font-size: 0.95rem !important;
  }
  .card-title-responsive,
  .section-title {
    font-size: 0.98rem !important;
  }
  .card-shadow,
  .card-section {
    padding: 6px !important;
  }
}

@media (max-width: 480px) {
  .v-card-title {
    font-size: 0.88rem !important;
  }
  .btn-rounded {
    min-width: 90px;
    font-size: 0.9rem;
  }
}
</style>