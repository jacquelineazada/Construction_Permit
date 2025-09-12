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
          class="d-flex align-center justify-space-between pl-6 mb-4"
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
          <v-stepper alt-labels class="mb-4" flat>
            <v-stepper-header>
              <v-stepper-item
                title="Application"
                value="1"
                color="blue"
              ></v-stepper-item>
              <v-divider
                style="border-width: 2px; border-color: blue"
              ></v-divider>
              <v-stepper-item
                title="Owner/Applicant"
                value="2"
              ></v-stepper-item>
              <v-divider style="border-width: 2px"></v-divider>
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

          <v-form ref="form" @submit.prevent="validateAndProceed">
            <v-card class="pa-4 my-4">
              <v-card-title class="card-title-responsive"
                >SELECT APPLICATION</v-card-title
              >
              <v-card
                height="120"
                class="my-2"
                :class="{
                  'not-filled': isValidating && !selectedApplicationType,
                }"
              >
                <v-card-title class="text-h6 card-title-responsive"
                  >TYPE OF APPLICATION</v-card-title
                >
                <v-card-text>
                  <v-radio-group
                    v-model="selectedApplicationType"
                    :rules="[
                      (v) => !!v || 'Please select an application type.',
                    ]"
                    mandatory
                  >
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-card
                          height="65"
                          :class="{
                            'card-selected':
                              selectedApplicationType === 'simple',
                          }"
                          @click="selectedApplicationType = 'simple'"
                          class="pa-4"
                          flat
                        >
                          <div class="d-flex align-center">
                            <v-radio :value="'simple'"></v-radio>
                            <div class="flex-grow-1 ml-2">
                              <div class="text-h6 radio-card-title-responsive">
                                Simple
                              </div>
                            </div>
                            <v-icon
                              :color="
                                selectedApplicationType === 'simple'
                                  ? 'blue'
                                  : 'grey'
                              "
                              >mdi-home</v-icon
                            >
                          </div>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-card
                          height="65"
                          :class="{
                            'card-selected':
                              selectedApplicationType === 'complex',
                          }"
                          @click="selectedApplicationType = 'complex'"
                          class="pa-4"
                          flat
                        >
                          <div class="d-flex align-center">
                            <v-radio :value="'complex'"></v-radio>
                            <div class="flex-grow-1 ml-2">
                              <div class="text-h6 radio-card-title-responsive">
                                Complex
                              </div>
                            </div>
                            <v-icon
                              :color="
                                selectedApplicationType === 'complex'
                                  ? 'blue'
                                  : 'grey'
                              "
                              >mdi-truck</v-icon
                            >
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </v-card-text>
              </v-card>

              <v-card
                height="130"
                class="my-2"
                :class="{
                  'not-filled': isValidating && !selectedApplicationStatus,
                }"
              >
                <v-card-title class="text-h6 card-title-responsive"
                  >APPLICATION STATUS</v-card-title
                >
                <v-card-text>
                  <v-radio-group
                    v-model="selectedApplicationStatus"
                    :rules="[
                      (v) => !!v || 'Please select an application status.',
                    ]"
                    mandatory
                  >
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-card
                          :class="{
                            'card-selected':
                              selectedApplicationStatus === 'new',
                          }"
                          @click="selectedApplicationStatus = 'new'"
                          class="pa-2"
                          flat
                          height="70"
                        >
                          <div
                            class="d-flex flex-column align-center justify-center"
                          >
                            <v-radio
                              :value="'new'"
                              style="transform: scale(0.8)"
                            ></v-radio>
                            <div class="text-center" style="margin-top: -8px">
                              <div style="font-size: 0.9rem; font-weight: 500">
                                New
                              </div>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-card
                          :class="{
                            'card-selected':
                              selectedApplicationStatus === 'renewal',
                          }"
                          @click="selectedApplicationStatus = 'renewal'"
                          class="pa-2"
                          flat
                          height="70"
                        >
                          <div
                            class="d-flex flex-column align-center justify-center"
                          >
                            <v-radio
                              :value="'renewal'"
                              style="transform: scale(0.8)"
                            ></v-radio>
                            <div class="text-center" style="margin-top: -8px">
                              <div style="font-size: 0.9rem; font-weight: 500">
                                Renewal
                              </div>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-card
                          :class="{
                            'card-selected':
                              selectedApplicationStatus === 'amendatory',
                          }"
                          @click="selectedApplicationStatus = 'amendatory'"
                          class="pa-2"
                          flat
                          height="70"
                        >
                          <div
                            class="d-flex flex-column align-center justify-center"
                          >
                            <v-radio
                              :value="'amendatory'"
                              style="transform: scale(0.8)"
                            ></v-radio>
                            <div class="text-center" style="margin-top: -8px">
                              <div style="font-size: 0.9rem; font-weight: 500">
                                Amendatory
                              </div>
                            </div>
                          </div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-card>
            <div class="d-flex justify-end">
              <v-btn color="blue" dark class="mt-4" @click="validateAndProceed"
                >Next</v-btn
              >
            </div>
          </v-form>
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
      selectedApplicationType: null,
      selectedApplicationStatus: null,
      isValidating: false,
    };
  },
  methods: {
    async validateAndProceed() {
      this.isValidating = true;
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.isValidating = false; // Reset state on valid form
        this.$router.push("/owner");
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

/* New style for validation mark */
.not-filled {
  border: 2px solid red !important;
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