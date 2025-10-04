<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar flat color="blue-darken-3" dark height="88" app>
      <v-toolbar-title class="ml-2 font-weight-bold"
        ><v-icon left>mdi-office-building-outline</v-icon> Building Permit
        Portal</v-toolbar-title
      >
      <v-spacer />
    </v-app-bar>

    <!-- Main Content -->
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
            <template v-for="(step, index) in steps" :key="index">
              <v-stepper-item
                :title="step.title"
                :value="step.value"
                :complete="currentStep > step.value"
                :color="
                  currentStep >= step.value ? 'blue-darken-1' : 'grey lighten-2'
                "
                class="stepper-item-custom"
              ></v-stepper-item>
              <v-divider
                v-if="index < steps.length - 1"
                :thickness="3"
                :style="{
                  'border-color':
                    currentStep > step.value ? '#1976D2' : '#e0e0e0',
                }"
                class="mx-2"
              ></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>

        <!-- Application Details Card -->
        <v-card class="my-2 pa-4 card-shadow">
          <v-card-title class="text-h6 card-title-responsive mb-2"
            >APPLICATION DETAILS</v-card-title
          >
          <v-divider class="mb-4"></v-divider>
          <v-card-text>
            <v-form ref="form" @submit.prevent="validateAndProceed">
              <!-- Owner/Applicant Section -->
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                  ><v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account</v-icon
                  >OWNER/APPLICANT</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="lastName"
                        label="Last Name"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-account"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="firstName"
                        label="First Name"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-account"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="middleInitial"
                        label="Middle Initial"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        maxlength="2"
                        counter
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-alpha-m-box-outline"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="tin"
                        label="TIN"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-numeric"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Construction Owned by Enterprise Section -->
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                  ><v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-domain</v-icon
                  >FOR CONSTRUCTION OWNED BY AN ENTERPRISE</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense class="d-flex align-center">
                    <v-col cols="12" md="6">
                      <v-checkbox
                        v-model="isOwnedByEnterprise"
                        label="Owned by an Enterprise"
                        hide-details
                        class="mt-0 pt-0"
                        color="blue-darken-3"
                        density="comfortable"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formOfOwnership"
                        label="Form of Ownership"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :disabled="!isOwnedByEnterprise"
                        :rules="[isOwnedByEnterprise ? rules.required : true]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-account-group-outline"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Address Section -->
              <v-card class="card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                  ><v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-map-marker</v-icon
                  >ADDRESS</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="province"
                        label="Province"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-map"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="city"
                        label="City/Municipality"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-home-city"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="barangay"
                        label="Barangay"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-home-group"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="houseNo"
                        label="House No."
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-home-outline"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="street"
                        label="Street"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-road-variant"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-text-field
                        v-model="contactNo"
                        label="Contact No."
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        :rules="[rules.required]"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-phone"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Navigation Buttons -->
        <div class="d-flex justify-end mt-6 mb-8">
          <v-btn
            color="blue-grey-lighten-4"
            class="mr-2 btn-rounded"
            elevation="2"
            to="/applicant/typeofapplication"
            variant="tonal"
          >
            <v-icon left>mdi-arrow-left</v-icon>Back
          </v-btn>
          <v-btn
            color="blue-darken-3"
            class="btn-rounded"
            elevation="2"
            @click="validateAndProceed"
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

export default defineComponent({
  name: "NagaApplicationForm",
  data() {
    return {
      currentStep: 1,
      steps: [
        { title: "Building Owner Information", value: 1 },
        { title: "Construction Information", value: 2 },
        { title: "Use or Character of Occupancy", value: 3 },
        { title: "Signatories Details", value: 4 },
        { title: "Review Application", value: 5 },
      ],
      lastName: null,
      firstName: null,
      middleInitial: null,
      tin: null,
      isOwnedByEnterprise: false,
      formOfOwnership: null,
      houseNo: null,
      street: null,
      barangay: null,
      city: null,
      province: null,
      contactNo: null,
      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  methods: {
    async validateAndProceed() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$router.push("/applicant/constructioninformation");
      }
    },
  },
  watch: {
    isOwnedByEnterprise(newVal) {
      if (!newVal) {
        this.formOfOwnership = null;
      }
    },
  },
});
</script>

<style scoped>
/* Gradient Title */
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

.textfield-50 .v-input__control {
  min-height: 50px;
  border-radius: 8px;
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