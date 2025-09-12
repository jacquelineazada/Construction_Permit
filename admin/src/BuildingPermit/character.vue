<template>
  <v-app class="app-container">
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0 px-6"
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
                title="Application"
                value="1"
                :complete="currentStep > 1"
                color="blue"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>
              <v-stepper-item
                title="Owner/Applicant"
                value="2"
                :complete="currentStep > 2"
                color="blue"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>
              <v-stepper-item
                title="Location & Scope of Work"
                value="3"
                :complete="currentStep > 3"
                color="blue"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>
              <v-stepper-item
                title="Use or Character of Occupancy"
                value="4"
                :complete="currentStep > 4"
                color="blue"
              ></v-stepper-item>
              <v-divider style="border-width: 2px"></v-divider>
              <v-stepper-item
                title="Review Application"
                value="5"
                :complete="currentStep > 5"
              ></v-stepper-item>
            </v-stepper-header>
          </v-stepper>
          <v-card class="my-2 pa-4">
            <v-card-title class="text-h6 card-title-responsive"
              >APPLICATION DETAILS</v-card-title
            >
            <v-card-text>
              <v-card class="mb-4">
                <v-card-title class="text-h6 card-title-responsive"
                  >USE OR CHARACTER OF OCCUPANCY</v-card-title
                >
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupA"
                          label="GROUP A: RESIDENTIAL (DWELLINGS)"
                          value="Group A"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupAOptions"
                            label="SINGLE"
                            value="Single"
                            hide-details
                            density="compact"
                            :disabled="!groupA"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupAOptions"
                            label="DUPLEX"
                            value="Duplex"
                            hide-details
                            density="compact"
                            :disabled="!groupA"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupAOptions"
                            label="RESIDENTIAL R-1, R-2"
                            value="Residential R-1, R-2"
                            hide-details
                            density="compact"
                            :disabled="!groupA"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupAOptions"
                            label="OTHERS"
                            value="OthersA"
                            hide-details
                            density="compact"
                            :disabled="!groupA"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupAOptions.includes('OthersA')"
                            v-model="groupAOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupB"
                          label="GROUP B: RESIDENTIAL"
                          value="Group B"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupBOptions"
                            label="HOTEL"
                            value="Hotel"
                            hide-details
                            density="compact"
                            :disabled="!groupB"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupBOptions"
                            label="MOTEL"
                            value="Motel"
                            hide-details
                            density="compact"
                            :disabled="!groupB"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupBOptions"
                            label="TOWNHOUSE"
                            value="Townhouse"
                            hide-details
                            density="compact"
                            :disabled="!groupB"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupBOptions"
                            label="DORMITORY"
                            value="Dormitory"
                            hide-details
                            density="compact"
                            :disabled="!groupB"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupBOptions"
                            label="OTHERS"
                            value="OthersB"
                            hide-details
                            density="compact"
                            :disabled="!groupB"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupBOptions.includes('OthersB')"
                            v-model="groupBOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupC"
                          label="GROUP C: EDUCATIONAL & RECREATIONAL"
                          value="Group C"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupCOptions"
                            label="SCHOOL BUILDING"
                            value="School Building"
                            hide-details
                            density="compact"
                            :disabled="!groupC"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupCOptions"
                            label="SCHOOL AUDITORIUM, GYMNASIUM"
                            value="School Auditorium, Gymnasium"
                            hide-details
                            density="compact"
                            :disabled="!groupC"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupCOptions"
                            label="OTHERS"
                            value="OthersC"
                            hide-details
                            density="compact"
                            :disabled="!groupC"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupCOptions.includes('OthersC')"
                            v-model="groupCOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupE"
                          label="GROUP E: COMMERCIAL"
                          value="Group E"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupEOptions"
                            label="BANK"
                            value="Bank"
                            hide-details
                            density="compact"
                            :disabled="!groupE"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupEOptions"
                            label="STORE"
                            value="Store"
                            hide-details
                            density="compact"
                            :disabled="!groupE"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupEOptions"
                            label="SHOPPING CENTER/MALL"
                            value="Shopping Center/Mall"
                            hide-details
                            density="compact"
                            :disabled="!groupE"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupEOptions"
                            label="OTHERS"
                            value="OthersE"
                            hide-details
                            density="compact"
                            :disabled="!groupE"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupEOptions.includes('OthersE')"
                            v-model="groupEOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupF"
                          label="GROUP F: LIGHT INDUSTRIAL"
                          value="Group F"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupFOptions"
                            label="FACTORY/PLANT"
                            value="Factory/Plant"
                            hide-details
                            density="compact"
                            :disabled="!groupF"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupFOptions"
                            label="OTHERS"
                            value="OthersF"
                            hide-details
                            density="compact"
                            :disabled="!groupF"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupFOptions.includes('OthersF')"
                            v-model="groupFOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupG"
                          label="GROUP G: MEDIUM INDUSTRIAL"
                          value="Group G"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupGOptions"
                            label="STORAGE/WAREHOUSE"
                            value="Storage/Warehouse"
                            hide-details
                            density="compact"
                            :disabled="!groupG"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupGOptions"
                            label="FACTORY"
                            value="Factory"
                            hide-details
                            density="compact"
                            :disabled="!groupG"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupGOptions"
                            label="OTHERS"
                            value="OthersG"
                            hide-details
                            density="compact"
                            :disabled="!groupG"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupGOptions.includes('OthersG')"
                            v-model="groupGOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupH"
                          label="GROUP H: ASSEMBLY"
                          value="Group H"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupHOptions"
                            label="THEATER, AUDITORIUM"
                            value="Theater, Auditorium"
                            hide-details
                            density="compact"
                            :disabled="!groupH"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupHOptions"
                            label="OTHERS"
                            value="OthersH"
                            hide-details
                            density="compact"
                            :disabled="!groupH"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupHOptions.includes('OthersH')"
                            v-model="groupHOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupI"
                          label="GROUP I: ASSEMBLY"
                          value="Group I"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupIOptions"
                            label="COLISEUM, SPORTS COMPLEX"
                            value="Coliseum, Sports Complex"
                            hide-details
                            density="compact"
                            :disabled="!groupI"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupIOptions"
                            label="OTHERS"
                            value="OthersI"
                            hide-details
                            density="compact"
                            :disabled="!groupI"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupIOptions.includes('OthersI')"
                            v-model="groupIOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-card outlined class="pa-2 h-100">
                        <v-checkbox
                          v-model="groupJ"
                          label="GROUP J: AGRICULTURAL & ACCESSORIES"
                          value="Group J"
                          hide-details
                          density="compact"
                        ></v-checkbox>
                        <div class="ms-4">
                          <v-checkbox
                            v-model="groupJOptions"
                            label="AGRICULTURAL STRUCTURES"
                            value="Agricultural Structures"
                            hide-details
                            density="compact"
                            :disabled="!groupJ"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupJOptions"
                            label="ACCESSORIES"
                            value="Accessories"
                            hide-details
                            density="compact"
                            :disabled="!groupJ"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="groupJOptions"
                            label="OTHERS"
                            value="OthersJ"
                            hide-details
                            density="compact"
                            :disabled="!groupJ"
                          ></v-checkbox>
                          <v-text-field
                            v-if="groupJOptions.includes('OthersJ')"
                            v-model="groupJOthers"
                            label="Please specify"
                            variant="outlined"
                            density="compact"
                            class="mt-2"
                          ></v-text-field>
                        </div>
                      </v-card>
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
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">NUMBER OF UNITS</div>
                      <v-text-field
                        v-model="numberOfUnits"
                        variant="outlined"
                        density="compact"
                        hide-details
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
                        @input="formatNumber('costBuilding')"
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
                        @input="formatNumber('costElectrical')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">NUMBER OF STOREY</div>
                      <v-text-field
                        v-model="numberOfStorey"
                        variant="outlined"
                        density="compact"
                        hide-details
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
                        @input="formatNumber('costMechanical')"
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
                        @input="formatNumber('costElectronics')"
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
                        @input="formatNumber('costPlumbing')"
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
                        @input="formatNumber('costOthers')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <div class="v-label text-caption">LOT AREA (SQ. M)</div>
                      <v-text-field
                        v-model="lotArea"
                        variant="outlined"
                        density="compact"
                        hide-details
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
              to="/location"
              >Back</v-btn
            >
            <v-btn
              color="blue"
              dark
              class="mt-4"
              to="/review"
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
      currentStep: "4",
      groupA: false,
      groupAOptions: [],
      groupAOthers: "",
      groupB: false,
      groupBOptions: [],
      groupBOthers: "",
      groupC: false,
      groupCOptions: [],
      groupCOthers: "",
      groupE: false,
      groupEOptions: [],
      groupEOthers: "",
      groupF: false,
      groupFOptions: [],
      groupFOthers: "",
      groupG: false,
      groupGOptions: [],
      groupGOthers: "",
      groupH: false,
      groupHOptions: [],
      groupHOthers: "",
      groupI: false,
      groupIOptions: [],
      groupIOthers: "",
      groupJ: false,
      groupJOptions: [],
      groupJOthers: "",
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
    };
  },
  watch: {
    groupA: "validateForm",
    groupAOptions: "validateForm",
    groupAOthers: "validateForm",
    groupB: "validateForm",
    groupBOptions: "validateForm",
    groupBOthers: "validateForm",
    groupC: "validateForm",
    groupCOptions: "validateForm",
    groupCOthers: "validateForm",
    groupE: "validateForm",
    groupEOptions: "validateForm",
    groupEOthers: "validateForm",
    groupF: "validateForm",
    groupFOptions: "validateForm",
    groupFOthers: "validateForm",
    groupG: "validateForm",
    groupGOptions: "validateForm",
    groupGOthers: "validateForm",
    groupH: "validateForm",
    groupHOptions: "validateForm",
    groupHOthers: "validateForm",
    groupI: "validateForm",
    groupIOptions: "validateForm",
    groupIOthers: "validateForm",
    groupJ: "validateForm",
    groupJOptions: "validateForm",
    groupJOthers: "validateForm",
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
      let value = this[fieldName].replace(/[^\d]/g, "");
      value = Number(value).toLocaleString("en-US");
      this[fieldName] = value === "0" ? "" : value;
    },
    validateForm() {
      // Check if at least one main group is selected [cite: 155]
      const isAnyGroupSelected =
        this.groupA ||
        this.groupB ||
        this.groupC ||
        this.groupE ||
        this.groupF ||
        this.groupG ||
        this.groupH ||
        this.groupI ||
        this.groupJ;
      // Check if any "Others" options are selected and their text fields are empty [cite: 156, 157, 158]
      const isOthersFilled =
        (!this.groupAOptions.includes("OthersA") ||
          this.groupAOthers.trim() !== "") &&
        (!this.groupBOptions.includes("OthersB") ||
          this.groupBOthers.trim() !== "") &&
        (!this.groupCOptions.includes("OthersC") ||
          this.groupCOthers.trim() !== "") &&
        (!this.groupEOptions.includes("OthersE") ||
          this.groupEOthers.trim() !== "") &&
        (!this.groupFOptions.includes("OthersF") ||
          this.groupFOthers.trim() !== "") &&
        (!this.groupGOptions.includes("OthersG") ||
          this.groupGOthers.trim() !== "") &&
        (!this.groupHOptions.includes("OthersH") ||
          this.groupHOthers.trim() !== "") &&
        (!this.groupIOptions.includes("OthersI") ||
          this.groupIOthers.trim() !== "") &&
        (!this.groupJOptions.includes("OthersJ") ||
          this.groupJOthers.trim() !== "");
      // The form is valid only if at least one group is selected AND all required "Others" fields are filled [cite: 159]
      this.formValid = isAnyGroupSelected && isOthersFilled;
    },
    goToNextStep() {
      // Logic to proceed to the next step, e.g., using Vue Router
      // this.$router.push('/review-application');
      console.log("Proceeding to next step!");
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

.card-selected {
  border: 2px solid #1976d2;
  background-color: #e3f2fd;
}

.card-list-container {
  display: flex;
  flex-direction: column;
}

.my-2 {
  margin-top: 8px;
  margin-bottom: 8px;
}

/* Responsive adjustments */
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
  .radio-card-title-responsive {
    font-size: 1rem !important;
  }
}
</style>