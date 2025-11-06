<template>
  <v-app>
    <v-app-bar flat color="blue-darken-3" dark height="88" app>
      <v-toolbar-title class="ml-2 font-weight-bold">
        <v-icon left>mdi-office-building-outline</v-icon> Notice of Construction
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
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
            Notice of Construction Application Form
          </h2>
        </div>
      </v-card>

      <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
        <v-stepper
          v-model="currentStep"
          alt-labels
          flat
          class="mb-4 mt-2 stepper-elevated"
          :class="{ 'no-print': currentStep === 7 }"
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

        <v-card class="my-2 pa-4 card-shadow">
          <v-card-title class="text-h6 card-title-responsive mb-2"
            >APPLICATION DETAILS (STEP {{ currentStep }})</v-card-title
          >
          <v-divider class="mb-4"></v-divider>
          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="validateAndProceed"
              :key="currentStep"
            >
              <v-card v-if="currentStep <= 4" class="card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                  ><v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-domain</v-icon
                  >{{ steps[currentStep - 1].title }} INFORMATION</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData[currentStep].companyName"
                        label="Company Name"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-office-building"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].pcabLicenseNo"
                        label="PCAB License No."
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-badge-account-outline"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].validity"
                        label="Validity"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-calendar-check"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].tin"
                        label="TIN"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData[currentStep].address"
                        label="Address"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="formData[currentStep].telNo"
                        label="Tel. No."
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-phone"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="formData[currentStep].date"
                        label="Date"
                        variant="outlined"
                        density="comfortable"
                        type="date"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-calendar"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="mt-4">
                      <v-label class="input-label mb-1"
                        >Authorized Managing Officer</v-label
                      >
                      <div
                        class="pa-2 signature-block d-flex justify-space-between align-end"
                      >
                        <div class="text-center signature-line-container">
                          <div class="signature-line"></div>
                          <div class="text-caption text-medium-emphasis mt-1">
                            (Signature Over Printed Name)
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card
                v-else-if="currentStep === 5 || currentStep === 6"
                class="card-section"
              >
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account-circle</v-icon
                  >
                  <span v-if="currentStep === 5">BUILDING OWNER</span>
                  <span v-else>WITH MY CONSENT: LOT OWNER</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" class="mb-4">
                      <v-label class="input-label mb-1"
                        >Signature Over Printed Name</v-label
                      >
                      <div
                        class="pa-2 signature-block d-flex justify-end align-end"
                      >
                        <div
                          class="text-center signature-line-container"
                          style="max-width: 60%"
                        >
                          <div class="signature-line"></div>
                          <div class="text-caption text-medium-emphasis mt-1">
                            (Signature Over Printed Name)
                          </div>
                        </div>
                        <v-text-field
                          v-model="formData[currentStep].date"
                          label="Date"
                          variant="plain"
                          density="compact"
                          type="date"
                          style="
                            max-width: 150px;
                            flex-grow: 0;
                            margin-left: 20px;
                          "
                          :rules="[rules.required]"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="formData[currentStep].address"
                        label="Address"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].ctcNo"
                        label="C.T.C. No."
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].dateIssued"
                        label="Date Issued"
                        variant="outlined"
                        density="comfortable"
                        type="date"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-calendar-edit"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].placeIssued"
                        label="Place Issued"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-city"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card v-else-if="currentStep === 7" class="card-section print-form-container">
                <div class="no-print">
                  <v-card-title class="text-h6 section-title">
                    <v-icon left color="blue-darken-3" class="mr-2"
                      >mdi-check-circle-outline</v-icon
                    >
                    APPLICATION REVIEW
                  </v-card-title>
                  <v-divider class="mb-3"></v-divider>
                  <v-alert
                    type="info"
                    variant="tonal"
                    icon="mdi-information-outline"
                    class="mb-4 mx-4"
                  >
                    Please review the content below which is formatted to resemble the official form. Click **Print Application** to finalize.
                  </v-alert>
                </div>
                
                <div class="print-content pa-4">
                  <div class="text-center mb-4 print-header">
                    <div class="text-caption font-weight-bold">NBC FORM NO. B-20</div>
                    <div class="text-caption">Republic of the Philippines</div>
                    <div class="text-caption">City/Municipality of ________________________ Province of ________________________</div>
                    <div class="text-subtitle-1 font-weight-bold my-2">OFFICE OF THE BUILDING OFFICIAL</div>
                    <h1 class="text-h5 font-weight-black">NOTICE OF CONSTRUCTION</h1>
                  </div>

                  <p class="form-text-line">
                    I, 
                    <span class="data-underline">{{ formData[5].ownerPrintedName || '________________________________________________' }}</span>,
                    owner of the proposed ________________________________________________ to be constructed at Lot No.
                    _______________________ Block No. _______________________ under OCT/TCT No. _______________________ Barangay
                    _______________________ City/Municipality of _______________________ covered by Building Permit No. _______________________ issued
                    on _______________________ have engaged the service/s of the following contractor/s to undertake the construction and other ancillary
                    works of the aforesaid building/structure pursuant to the provisions of the Contractor's License Law (R.A. 4566) which is expected to
                    start on _______________________.
                  </p>

                    <v-row dense class="contractor-grid">
                    <v-col
                      v-for="step in [1, 2, 3, 4]"
                      :key="step"
                      :cols="step === 1 ? 12 : 6"
                      :lg="step === 1 ? 12 : 6"
                    >
                      <div class="contractor-box pa-2 fill-height">
                        <p class="font-weight-bold mb-1 print-label">{{ steps[step - 1].title }}:</p>
                        <p class="print-data">Company Name: <span class="data-underline">{{ formData[step].companyName || '________________________' }}</span></p>
                        <p class="print-data d-flex justify-space-between">
                          <span>PCAB License No.: <span class="data-underline">{{ formData[step].pcabLicenseNo || '________________' }}</span></span>
                          <span>Validity: <span class="data-underline">{{ formData[step].validity || '________________' }}</span></span>
                        </p>
                        <p class="print-data">Address: <span class="data-underline">{{ formData[step].address || '____________________________________________________' }}</span></p>
                        <p class="print-data d-flex justify-space-between">
                          <span>TIN: <span class="data-underline">{{ formData[step].tin || '________________' }}</span></span>
                          <span>Tel. No.: <span class="data-underline">{{ formData[step].telNo || '________________' }}</span></span>
                        </p>
                        <div class="d-flex justify-space-between align-end mt-4">
                          <div class="text-center print-signature-block">
                            <div class="signature-line-print"></div>
                            <div class="text-caption">Authorized Managing Officer</div>
                          </div>
                          <div class="text-center print-signature-block date-block">
                            <div>{{ formData[step].date || '________________' }}</div>
                            <div class="text-caption">Date</div>
                          </div>
                        </div>
                        <div class="text-center text-caption my-1">(Signature Over Printed Name)</div>
                      </div>
                    </v-col>
                  </v-row>

                  <div class="my-4 text-center font-weight-bold">
                    I/WE HEREBY AFFIX MY/OUR SIGNATURE/S SIGNIFYING MY/OUR CONFORMITY TO THE INFORMATION HEREIN ABOVE SET FORTH
                  </div>

                    <v-row dense>
                    <v-col cols="12" md="6">
                      <div class="owner-box pa-2 fill-height">
                        <p class="font-weight-bold mb-1 print-label">BUILDING OWNER</p>
                        <div class="text-center print-signature-full">
                          <div class="signature-line-print"></div>
                          <div class="text-caption">(Signature Over Printed Name)</div>
                        </div>
                        <p class="print-data my-1">Date: <span class="data-underline">{{ formData[5].date || '________________________' }}</span></p>
                        <p class="print-data my-1">Address: <span class="data-underline">{{ formData[5].address || '________________________________________________' }}</span></p>
                        <p class="print-data d-flex justify-space-between my-1">
                          <span>C.T.C. No.: <span class="data-underline">{{ formData[5].ctcNo || '________________' }}</span></span>
                          <span>Date Issued: <span class="data-underline">{{ formData[5].dateIssued || '________________' }}</span></span>
                        </p>
                        <p class="print-data my-1">Place Issued: <span class="data-underline">{{ formData[5].placeIssued || '________________________________________________' }}</span></p>
                      </div>
                    </v-col>
                    
                    <v-col cols="12" md="6">
                      <div class="owner-box pa-2 fill-height">
                        <p class="font-weight-bold mb-1 print-label">WITH MY CONSENT: LOT OWNER</p>
                        <div class="text-center print-signature-full">
                          <div class="signature-line-print"></div>
                          <div class="text-caption">(Signature Over Printed Name)</div>
                        </div>
                        <p class="print-data my-1">Date: <span class="data-underline">{{ formData[6].date || '________________________' }}</span></p>
                        <p class="print-data my-1">Address: <span class="data-underline">{{ formData[6].address || '________________________________________________' }}</span></p>
                        <p class="print-data d-flex justify-space-between my-1">
                          <span>C.T.C. No.: <span class="data-underline">{{ formData[6].ctcNo || '________________' }}</span></span>
                          <span>Date Issued: <span class="data-underline">{{ formData[6].dateIssued || '________________' }}</span></span>
                        </p>
                        <p class="print-data my-1">Place Issued: <span class="data-underline">{{ formData[6].placeIssued || '________________________________________________' }}</span></p>
                      </div>
                    </v-col>
                  </v-row>

                    <div class="mt-4 print-notes">
                      <p class="font-weight-bold">NOTE:</p>
                      <ol class="text-caption">
                        <li>The duly accomplished Notice of Construction shall be submitted to the Office of the Building Official concerned prior to construction. The Building Official shall submit a copy to the Construction Industry Authority of the Philippines and the Department of Labor and Employment. </li>
                        <li>Under Article 1723 of the Civil Code of the Philippines, the engineer or architect who drew up the plans and specifications for the building/structure is liable for damages if within fifteen (15) years from completion of the building/structure, the same should collapse due to defect on the plans and specifications or defects in the ground. The contractor is likewise solidarily liable with the engineer or architect who supervises the construction for damages should the edifice collapse due to defect in the construction or the use of inferior materials. </li>
                        <li>Before commencing the excavation, the person making or causing the excavation to be made shall notify the in writing the owner of adjoining property not less than Ten (10) days before such excavation is to be made and show how the adjoining property should be protected. The contractor shall be obliged to provide necessary protection prescribed by the IRR and the Department of Labor and Employment. </li>
                        <li>Installation of Signboard at Construction Site, every licensed contractor shall install or erect in a prominent position on the site, of any construction (other than construction work constituting alterations or repairs of any building, house or establishment) being carried out by him or on his behalf or on the outside of the place where such construction is being carried out at least 900 millimeters by 1800 millimeters billboard showing in easily legible characters his name and license number, and the classification of the license held by him, and if the license is a "specialty contractor's license", the classified trade in which he is authorized to undertake and carry out construction work. Provided, that where the holder of a specialty contractor's license is carrying out construction work in association with the holder of a general engineering contractor's license or a general building contractor's license, or in both, it shall be a sufficient compliance of this section if the installation requirement is complied only by the general building or the general engineering contractor. </li>
                      </ol>
                    </div>
                </div>
                <v-card-actions class="pa-4 pt-0 no-print">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green-darken-3"
                    class="btn-rounded"
                    elevation="4"
                    @click="printForm"
                    variant="elevated"
                  >
                    <v-icon left>mdi-printer</v-icon>Print Application
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>

        <div class="d-flex justify-end mt-6 mb-8 no-print">
          <v-btn
            color="blue-grey-lighten-4"
            class="mr-2 btn-rounded"
            elevation="2"
            @click="goBack"
            variant="tonal"
            :disabled="currentStep === 7"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            {{ currentStep > 1 ? "Back" : "Previous Page" }}
          </v-btn>

          <v-btn
            color="blue-darken-3"
            class="btn-rounded"
            elevation="2"
            @click="validateAndProceed"
            variant="elevated"
            :disabled="currentStep === 7"
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

// Default data structure for Contractor Steps (1-4)
const DEFAULT_CONTRACTOR_DATA = () => ({
  companyName: null,
  pcabLicenseNo: null,
  validity: null,
  tin: null,
  address: null,
  telNo: null,
  managingOfficer: null, // Not used, but kept for data model integrity
  date: new Date().toISOString().substr(0, 10),
});

// Default data structure for Owner Steps (5-6)
const DEFAULT_OWNER_DATA = () => ({
  ownerPrintedName: 'Winston Villante', // Placeholder for simulation
  date: new Date().toISOString().substr(0, 10),
  address: null,
  ctcNo: null,
  dateIssued: null,
  placeIssued: null,
});

export default defineComponent({
  name: "NagaApplicationForm",
  data() {
    return {
      currentStep: 1,
      steps: [
        { title: "GENERAL BUILDING CONTRACTOR", value: 1 },
        { title: "SPECIALTY CONTRACTOR: ELECTRICAL", value: 2 },
        { title: "SPECIALTY CONTRACTOR: MECHANICAL", value: 3 },
        { title: "SPECIALTY CONTRACTOR: PLUMBING", value: 4 },
        { title: "BUILDING OWNER", value: 5 },
        { title: "WITH MY CONSENT: LOT OWNER", value: 6 },
        { title: "REVIEW AND PRINT", value: 7 }, // NEW STEP 7
      ],
      // Data stored by step number
      formData: {
        1: DEFAULT_CONTRACTOR_DATA(), // Data for Step 1
        2: DEFAULT_CONTRACTOR_DATA(), // Data for Step 2
        3: DEFAULT_CONTRACTOR_DATA(), // Data for Step 3
        4: DEFAULT_CONTRACTOR_DATA(), // Data for Step 4
        5: DEFAULT_OWNER_DATA(), // Data for Step 5 (Building Owner)
        6: DEFAULT_OWNER_DATA(), // Data for Step 6 (Lot Owner)
        7: {}, // No data fields for Step 7
      },

      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  methods: {
    async validateAndProceed() {
      const maxStep = Math.max(...this.steps.map((s) => s.value));

      // Steps 1-6 require validation; Step 7 (Review) just proceeds
      if (this.currentStep <= 6) {
        // Only validate if we are on a step that has required fields (1-6)
        const valid = (await this.$refs.form.validate()).valid;
        if (!valid) return;
      }

      if (this.currentStep < maxStep) {
        // Move to the next stepper step
        this.currentStep++;
      } else if (this.currentStep === maxStep) {
        // User is on the final step (Review) and clicks 'Next'
        alert("Application review complete. Click 'Print' to finalize.");
      }
    },
    goBack() {
      if (this.currentStep > 1) {
        // Decrement the stepper step
        this.currentStep--;
      } else {
        // If at the first step (1), navigate to the previous route/page
        // Simulate navigation
        alert("Navigating to previous page (Simulated).");
      }
    },
    printForm() {
      // This function triggers the browser's print dialogue
      window.print();
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

.review-item {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-left: 10px;
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

/* Custom Signature Block Styling - For Input Steps */
.signature-block {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  min-height: 80px;
}

.signature-line-container {
  flex-grow: 1;
  margin-right: 20px;
  padding-top: 15px;
  align-self: center;
}

.signature-line {
  border-bottom: 1px solid black;
  height: 1px;
  width: 100%;
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

/* --- PRINT-SPECIFIC STYLING FOR STEP 7 --- */

.print-form-container {
  background: white !important; /* Ensure white background for print */
  border: 1px solid #ccc; /* Add border to simulate a printable document */
  max-width: 8.5in; /* Standard paper width simulation */
  margin: 20px auto;
}

.print-content {
  font-size: 0.9rem;
  line-height: 1.4;
}

.print-header h1, .print-header .text-subtitle-1 {
  color: black;
}

.form-text-line {
  text-align: justify;
  margin-bottom: 20px;
}

.data-underline {
  border-bottom: 1px solid black;
  font-style: italic;
  padding: 0 5px;
  min-width: 50px;
  display: inline-block;
  text-align: center;
  word-break: break-all;
}

/* Contractor Blocks Layout */
.contractor-grid .col-md-6 {
  border: 1px solid #ddd;
}
.contractor-box {
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.print-label {
  font-size: 0.9rem;
  color: #333;
}

.print-data {
  font-size: 0.85rem;
  margin-bottom: 3px;
}

.print-signature-block {
  width: 45%;
  text-align: center;
}

.print-signature-block.date-block {
  width: 30%;
}

.signature-line-print {
  border-bottom: 1px solid black;
  height: 1px;
  width: 100%;
  margin-bottom: 2px;
}

.print-signature-full {
  width: 100%;
  margin: 10px 0;
}

.owner-box {
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

/* Print Media Query to hide UI elements */
@media print {
  .no-print, .v-toolbar, .v-container, .v-main > .v-card:not(.print-form-container) {
    display: none !important;
  }
  
  .print-form-container {
    box-shadow: none !important;
    border: none !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  @page {
    margin: 0.5in;
  }
}
</style>