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
                color="blue"
              ></v-stepper-item>
              <v-divider
                :style="{
                  'border-width': '2px',
                  'border-color': currentStep > 1 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>
              <v-stepper-item
                title="Construction Information"
                value="2"
                :complete="currentStep > 2"
                color="blue"
              ></v-stepper-item>
              <v-divider
                :style="{
                  'border-width': '2px',
                  'border-color': currentStep > 2 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>
              <v-stepper-item
                title="Use or Character of Occupancy"
                value="3"
                :complete="currentStep > 3"
                color="blue"
              ></v-stepper-item>
              <v-divider
                :style="{
                  'border-width': '2px',
                  'border-color': currentStep > 3 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>
              <v-stepper-item
                title="Signatories Details"
                value="4"
                :complete="currentStep > 4"
                color="blue"
              ></v-stepper-item>
              <v-divider
                :style="{
                  'border-width': '2px',
                  'border-color': currentStep > 4 ? 'blue' : 'lightgrey',
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
            <v-card-text>
              <v-card class="mb-4">
                <v-card-title class="text-h6 card-title-responsive"
                  >USE OR CHARACTER OF OCCUPANCY</v-card-title
                >
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

              <v-card>
                <v-card-title class="text-h6 card-title-responsive"
                  >PROJECT DETAILS</v-card-title
                >
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">
                        OCCUPANCY CLASSIFIED
                      </div>
                      <v-text-field
                        v-model="occupancyClassified"
                        variant="outlined"
                        density="compact"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-subtitle-1 mb-2">
                        TOTAL ESTIMATED COST
                      </div>
                      <div class="font-weight-bold text-h6">
                        ₱ {{ totalEstimatedCostComputed }}
                      </div>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">NUMBER OF UNITS</div>
                      <v-text-field
                        v-model="numberOfUnits"
                        variant="outlined"
                        density="compact"
                        hide-details
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">BUILDING</div>
                      <v-text-field
                        v-model="costBuilding"
                        variant="outlined"
                        density="compact"
                        prefix="₱"
                        hide-details
                        @keypress="isNumber($event)"
                        @blur="formatNumber('costBuilding')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">ELECTRICAL</div>
                      <v-text-field
                        v-model="costElectrical"
                        variant="outlined"
                        density="compact"
                        prefix="₱"
                        hide-details
                        @keypress="isNumber($event)"
                        @blur="formatNumber('costElectrical')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">NUMBER OF STOREY</div>
                      <v-text-field
                        v-model="numberOfStorey"
                        variant="outlined"
                        density="compact"
                        hide-details
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">MECHANICAL</div>
                      <v-text-field
                        v-model="costMechanical"
                        variant="outlined"
                        density="compact"
                        prefix="₱"
                        hide-details
                        @keypress="isNumber($event)"
                        @blur="formatNumber('costMechanical')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">ELECTRONICS</div>
                      <v-text-field
                        v-model="costElectronics"
                        variant="outlined"
                        density="compact"
                        prefix="₱"
                        hide-details
                        @keypress="isNumber($event)"
                        @blur="formatNumber('costElectronics')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">
                        TOTAL FLOOR AREA (SQ. M)
                      </div>
                      <v-text-field
                        v-model="totalFloorArea"
                        variant="outlined"
                        density="compact"
                        hide-details
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">PLUMBING</div>
                      <v-text-field
                        v-model="costPlumbing"
                        variant="outlined"
                        density="compact"
                        prefix="₱"
                        hide-details
                        @keypress="isNumber($event)"
                        @blur="formatNumber('costPlumbing')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">OTHERS</div>
                      <v-text-field
                        v-model="costOthers"
                        variant="outlined"
                        density="compact"
                        prefix="₱"
                        hide-details
                        @keypress="isNumber($event)"
                        @blur="formatNumber('costOthers')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">LOT AREA (SQ. M)</div>
                      <v-text-field
                        v-model="lotArea"
                        variant="outlined"
                        density="compact"
                        hide-details
                        @keypress="isNumber($event)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">
                        PROPOSED DATE OF CONSTRUCTION
                      </div>
                      <v-text-field
                        v-model="proposedDate"
                        type="date"
                        variant="outlined"
                        density="compact"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                      <div class="v-label text-caption">
                        EXPECTED DATE OF COMPLETION
                      </div>
                      <v-text-field
                        v-model="expectedDate"
                        type="date"
                        variant="outlined"
                        density="compact"
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end">
            <v-btn
              color="blue-grey-lighten-4"
              dark
              class="mt-4 mr-2"
              to="/applicant/constructioninformation"
              >Back</v-btn
            >
            <v-btn
              color="blue"
              dark
              class="mt-4"
              to="/applicant/engineerinformation"
              @click="goToNextStep"
              :disabled="!formValid"
              >Next</v-btn
            >
          </div>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NagaApplicationForm",
  data() {
    return {
      currentStep: "3",
      selectedGroup: null,
      selectedCategory: null,
      occupancyClassified: "",
      numberOfUnits: "",
      numberOfStorey: "",
      totalFloorArea: "",
      lotArea: "",
      costBuilding: "",
      costElectrical: "",
      costMechanical: "",
      costElectronics: "",
      costPlumbing: "",
      costOthers: "",
      proposedDate: "",
      expectedDate: "",
      formValid: false,
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
    totalEstimatedCostComputed() {
      const costs = [
        this.costBuilding,
        this.costElectrical,
        this.costMechanical,
        this.costElectronics,
        this.costPlumbing,
        this.costOthers,
      ];
      const total = costs.reduce((sum, cost) => {
        const cleanedCost = parseFloat(cost.replace(/,/g, "")) || 0;
        return sum + cleanedCost;
      }, 0);

      return total.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },
  watch: {
    selectedGroup() {
      this.selectedCategory = null;
      this.validateForm();
    },
    selectedCategory: "validateForm",
    occupancyClassified: "validateForm",
    numberOfUnits: "validateForm",
    numberOfStorey: "validateForm",
    totalFloorArea: "validateForm",
    lotArea: "validateForm",
    costBuilding() {
      this.validateForm();
    },
    costElectrical() {
      this.validateForm();
    },
    costMechanical() {
      this.validateForm();
    },
    costElectronics() {
      this.validateForm();
    },
    costPlumbing() {
      this.validateForm();
    },
    costOthers() {
      this.validateForm();
    },
    proposedDate: "validateForm",
    expectedDate: "validateForm",
  },
  mounted() {
    this.validateForm();
  },
  methods: {
    isNumber(event) {
      const charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();
      }
    },
    formatNumber(fieldName) {
      let value = this[fieldName].replace(/,/g, "");
      value = value.replace(/[^\d.]/g, "");
      const parts = value.split(".");
      let integer = parts[0];
      const decimal = parts[1];

      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      if (decimal !== undefined) {
        this[fieldName] = integer + "." + decimal.slice(0, 2);
      } else {
        this[fieldName] = integer;
      }
      this.validateForm();
    },
    validateForm() {
      const isDropdownSelected =
        this.selectedGroup !== null && this.selectedCategory !== null;

      const projectDetailsFilled =
        this.occupancyClassified.trim() !== "" &&
        this.numberOfUnits.trim() !== "" &&
        this.numberOfStorey.trim() !== "" &&
        this.totalFloorArea.trim() !== "" &&
        this.lotArea.trim() !== "" &&
        this.proposedDate.trim() !== "" &&
        this.expectedDate.trim() !== "";

      const totalCostValue =
        parseFloat(this.totalEstimatedCostComputed.replace(/,/g, "")) || 0;
      const isTotalCostValid = totalCostValue > 0;

      this.formValid =
        isDropdownSelected && projectDetailsFilled && isTotalCostValid;
    },
    goToNextStep() {
      this.currentStep = "4";
    },
  },
});
</script>

<style scoped>
/* Scoped styles can go here if needed */
</style>