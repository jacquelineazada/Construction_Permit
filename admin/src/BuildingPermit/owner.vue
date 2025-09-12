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
                color="blue"
                :complete="true"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>

              <v-stepper-item
                title="Owner/Applicant"
                value="2"
                color="blue"
                :complete="true"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>

              <v-stepper-item
                title="Location & Scope of Work"
                value="3"
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
            <v-card-title class="text-h6 card-title-responsive"
              >APPLICATION DETAILS</v-card-title
            >
            <v-card-text>
              <v-form ref="form" @submit.prevent="validateAndProceed">
                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive"
                    >OWNER/APPLICANT</v-card-title
                  >
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="6">
                        <p class="input-label">Last Name</p>
                        <v-text-field
                          v-model="lastName"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p class="input-label">First Name</p>
                        <v-text-field
                          v-model="firstName"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p class="input-label">Middle Initial</p>
                        <v-text-field
                          v-model="middleInitial"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p class="input-label">TIN</p>
                        <v-text-field
                          v-model="tin"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive"
                    >FOR CONSTRUCTION OWNED BY AN ENTERPRISE</v-card-title
                  >
                  <v-card-text>
                    <v-row dense class="d-flex align-center">
                      <v-col cols="12" md="6">
                        <v-radio-group
                          v-model="ownedByEnterprise"
                          :rules="[rules.requiredRadio]"
                          mandatory
                          class="mt-0 pt-0"
                          hide-details
                        >
                          <v-radio
                            label="Owned by an Enterprise"
                            value="enterprise"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="12" md="6">
                        <p class="input-label">Form of Ownership</p>
                        <v-text-field
                          v-model="formOfOwnership"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :disabled="ownedByEnterprise !== 'enterprise'"
                          :rules="[
                            ownedByEnterprise === 'enterprise'
                              ? rules.required
                              : true,
                          ]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card>
                  <v-card-title class="text-h6 card-title-responsive"
                    >ADDRESS</v-card-title
                  >
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="6">
                        <p class="input-label">No. Street</p>
                        <v-text-field
                          v-model="street"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p class="input-label">Barangay</p>
                        <v-text-field
                          v-model="barangay"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p class="input-label">City/Municipality</p>
                        <v-text-field
                          v-model="city"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p class="input-label">Contact No.</p>
                        <v-text-field
                          v-model="contactNo"
                          variant="outlined"
                          class="textfield-50"
                          density="compact"
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
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
              to="/application"
              >Back</v-btn
            >
            <v-btn color="blue" dark class="mt-4" @click="validateAndProceed"
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
      currentStep: "2",
      lastName: null,
      firstName: null,
      middleInitial: null,
      tin: null,
      ownedByEnterprise: null,
      formOfOwnership: null,
      street: null,
      barangay: null,
      city: null,
      contactNo: null,
      rules: {
        required: (value) => !!value || "This field is required.",
        requiredRadio: (value) => !!value || "Please select an option.",
      },
    };
  },
  methods: {
    async validateAndProceed() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$router.push("/location");
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

.textfield-50 .v-input__control {
  min-height: 50px;
}
.input-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
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