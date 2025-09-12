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
                :complete="true"
                color="blue"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>
              <v-stepper-item
                title="Owner/Applicant"
                value="2"
                :complete="true"
                color="blue"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>
              <v-stepper-item
                title="Location & Scope of Work"
                value="3"
                color="blue"
              ></v-stepper-item>
              <v-divider style="border-width: 2px"></v-divider>
              <v-stepper-item
                title="Use or Character of Occupancy"
                value="4"
              ></v-stepper-item>
              <v-divider style="border-width: 2px"></v-divider>
              <v-stepper-item
                title="Review Application"
                value="5"
              ></v-stepper-item>
            </v-stepper-header>
          </v-stepper>

          <v-card class="my-2 pa-4">
            <v-card-text>
              <v-form ref="form" v-model="formValid">
                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive"
                    >LOCATION OF CONSTRUCTION</v-card-title
                  >
                  <v-card-text>
                    <v-row dense>
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
                        <div class="input-label">TCT No.</div>
                        <v-text-field
                          v-model="tctNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <div class="input-label">Current Tax Dec No.</div>
                        <v-text-field
                          v-model="taxDecNo"
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
                        <div class="input-label">City/Municipal of</div>
                        <v-text-field
                          v-model="cityMunicipality"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card>
                  <v-card-title class="text-h6 card-title-responsive"
                    >SCOPE OF WORK</v-card-title
                  >
                  <v-card-text>
                    <v-row dense>
                      <v-col
                        v-for="(item, i) in scopeOfWork"
                        :key="i"
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-checkbox
                          v-model="selectedScope"
                          :label="item"
                          :value="item"
                          hide-details
                          density="compact"
                        ></v-checkbox>

                        <v-text-field
                          v-if="
                            item === 'Other (Specify)' &&
                            selectedScope.includes('Other (Specify)')
                          "
                          v-model="otherDetails"
                          label="Please specify"
                          variant="outlined"
                          density="compact"
                          class="ml-6 my-1"
                          :rules="[rules.requiredOther]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <div
                      v-if="!selectedScope.length && formSubmitted"
                      class="v-input__details"
                      style="padding-top: 10px; color: #b00020"
                    >
                      Please select at least one scope of work.
                    </div>
                  </v-card-text>
                </v-card>
              </v-form>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end">
            <v-btn
              color="blue-grey-lighten-4"
              dark
              class="mt-4 mr-2"
              to="/owner"
              >Back</v-btn
            >
            <v-btn color="blue" dark class="mt-4" @click="nextStep">Next</v-btn>
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
      formValid: false,
      formSubmitted: false,
      blkNo: "",
      tctNo: "",
      taxDecNo: "",
      street: "",
      barangay: null,
      cityMunicipality: "Naga City", // Default value set here
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
      selectedScope: [],
      otherDetails: "",
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
        requiredOther: (value) => {
          if (this.selectedScope.includes("Other (Specify)")) {
            return !!value || "Please specify details for 'Other'.";
          }
          return true;
        },
      },
    };
  },
  methods: {
    async nextStep() {
      this.formSubmitted = true;
      const { valid } = await this.$refs.form.validate();
      const scopeSelected = this.selectedScope.length > 0;

      if (valid && scopeSelected) {
        this.$router.push("/character");
      } else {
        alert("Please fill in all required fields and select a scope of work.");
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