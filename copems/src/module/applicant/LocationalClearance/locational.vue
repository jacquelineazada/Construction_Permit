<template>
  <v-app :style="{ backgroundColor: 'var(--bg-color)' }">
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container fluid class="d-flex align-center py-0" style="max-width: 100%">
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-4"
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
        <v-spacer></v-spacer>
        <v-btn icon color="white" class="no-print">
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <!-- Hero Section / Title -->
      <div style="background: var(--primary-color); height: 120px;" class="no-print"></div>
      
      <v-container class="px-4" style="max-width: 1100px">
        <v-card class="stepper-modern no-print">
          <v-stepper
            v-model="currentStep"
            flat
            class="bg-transparent"
          >
            <v-stepper-header>
              <template v-for="(step, index) in steps" :key="index">
                <v-stepper-item
                  :title="step.title"
                  :value="step.value"
                  :complete="currentStep > step.value"
                  color="secondary"
                >
                  <template v-slot:icon>
                    <v-icon v-if="currentStep > step.value">mdi-check</v-icon>
                    <v-icon v-else>{{ index === 0 ? 'mdi-account-circle' : index === 1 ? 'mdi-file-edit' : 'mdi-printer' }}</v-icon>
                  </template>
                </v-stepper-item>
                <v-divider
                  v-if="index < steps.length - 1"
                  class="mx-2 mt-4"
                ></v-divider>
              </template>
            </v-stepper-header>
          </v-stepper>
        </v-card>

        <div class="d-flex align-center mt-12 mb-6 no-print">
          <v-icon color="secondary" size="36" class="mr-4">mdi-office-building-marker</v-icon>
          <h1 class="text-h4 gradient-text">Locational Clearance Application</h1>
        </div>

        <v-form
          v-if="currentStep === 1"
          ref="form1"
          @submit.prevent="validateAndProceed"
        >
          <v-card class="card-premium pa-8 mt-6">
            <div class="section-header">
              <v-icon color="secondary" class="mr-3">mdi-account-details</v-icon>
              <h2 class="text-h5 font-weight-bold">Application Type</h2>
            </div>
            
            <p class="text-body-1 text-secondary mb-6">Please select the type of applicant for this clearance.</p>
            
            <v-radio-group
              v-model="applicant.type"
              :rules="[(v) => !!v || 'Please select applicant type.']"
              mandatory
              color="secondary"
              class="pt-0 mt-0"
            >
              <v-row>
                <v-col cols="12" sm="4">
                  <v-card
                    variant="outlined"
                    :class="['pa-4', applicant.type === 'Individual' ? 'border-secondary bg-blue-lighten-5' : '']"
                    @click="applicant.type = 'Individual'"
                    style="cursor: pointer; transition: all 0.2s"
                  >
                    <v-radio label="Individual" value="Individual"></v-radio>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-card
                    variant="outlined"
                    :class="['pa-4', applicant.type === 'Corporation' ? 'border-secondary bg-blue-lighten-5' : '']"
                    @click="applicant.type = 'Corporation'"
                    style="cursor: pointer; transition: all 0.2s"
                  >
                    <v-radio label="Corporation" value="Corporation"></v-radio>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-card
                    variant="outlined"
                    :class="['pa-4', applicant.type === 'Others_ApplicantType' ? 'border-secondary bg-blue-lighten-5' : '']"
                    @click="applicant.type = 'Others_ApplicantType'"
                    style="cursor: pointer; transition: all 0.2s"
                  >
                    <v-radio label="Others" value="Others_ApplicantType"></v-radio>
                  </v-card>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-card>
        </v-form>

        <v-form
          v-else-if="currentStep === 2"
          ref="form2"
          @submit.prevent="validateAndProceed"
        >
          <v-card class="card-premium pa-8 mt-6">
            <div class="section-header mb-8">
              <v-icon color="secondary" class="mr-3">mdi-file-document-edit</v-icon>
              <h2 class="text-h5 font-weight-bold">Project & Applicant Information</h2>
            </div>

            <div class="section-premium">
              <h3 class="text-subtitle-1 font-weight-bold mb-4 d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-account-circle</v-icon>
                Applicant Information
              </h3>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.name"
                    label="Applicant Name"
                    placeholder="Enter full name"
                    :rules="[rules.required]"
                    variant="outlined"
                    color="secondary"
                    prepend-inner-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.address"
                    label="Address / Tel No."
                    placeholder="Enter complete address and contact number"
                    :rules="[rules.required]"
                    variant="outlined"
                    color="secondary"
                    prepend-inner-icon="mdi-map-marker"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="section-premium">
              <h3 class="text-subtitle-1 font-weight-bold mb-4 d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-account-tie</v-icon>
                Authorized Representative
              </h3>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.authorizedRepresentative"
                    label="Representative Name (Optional)"
                    variant="outlined"
                    color="secondary"
                    prepend-inner-icon="mdi-account-outline"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicant.authorizedRepresentativeAddress"
                    label="Address / Tel No. (Optional)"
                    variant="outlined"
                    color="secondary"
                    prepend-inner-icon="mdi-map-marker-outline"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="section-premium">
              <h3 class="text-subtitle-1 font-weight-bold mb-4 d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-information-outline</v-icon>
                Project Details
              </h3>
              <v-row>
                <v-col cols="12">
                  <v-label class="mb-2 font-weight-medium">Nature of Application</v-label>
                  <v-radio-group
                    v-model="project.natureOfApplication"
                    :rules="[rules.required]"
                    mandatory
                    inline
                    color="secondary"
                  >
                    <v-radio label="New Development" value="New Development" class="mr-6"></v-radio>
                    <v-radio label="Improvement / Renovation" value="Improvement / Renovation" class="mr-6"></v-radio>
                    <v-radio label="Others" value="Others_Nature"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-if="project.natureOfApplication === 'Others_Nature'"
                    v-model="project.natureOfApplicationOther"
                    label="Specify Nature"
                    variant="outlined"
                    density="compact"
                    class="mt-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="project.projectTitle"
                    label="Project Title"
                    :rules="[rules.required]"
                    variant="outlined"
                    color="secondary"
                    prepend-inner-icon="mdi-format-title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="project.locational"
                    label="Location of Project"
                    :rules="[rules.required]"
                    variant="outlined"
                    color="secondary"
                    prepend-inner-icon="mdi-crosshairs-gps"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="section-premium">
              <h3 class="text-subtitle-1 font-weight-bold mb-4 d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-ruler-square</v-icon>
                Technical Specifications
              </h3>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model.number="project.floorArea"
                    label="Floor Area (sq.m.)"
                    type="number"
                    variant="outlined"
                    color="secondary"
                    suffix="sq.m."
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model.number="project.height"
                    label="Height (m)"
                    type="number"
                    variant="outlined"
                    color="secondary"
                    suffix="m"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model.number="project.numberOfStoreys"
                    label="No. of Storeys"
                    type="number"
                    variant="outlined"
                    color="secondary"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model.number="project.lotArea"
                    label="Lot Area (sq.m.)"
                    type="number"
                    variant="outlined"
                    color="secondary"
                    suffix="sq.m."
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="project.tctOctNo"
                    label="TCT (OCT) No."
                    variant="outlined"
                    color="secondary"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="project.lotOthers"
                    label="Lot Others"
                    variant="outlined"
                    color="secondary"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div class="section-premium">
              <h3 class="text-subtitle-1 font-weight-bold mb-4 d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-shield-check-outline</v-icon>
                Zoning & Tenure
              </h3>
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="project.rightOverLand"
                    :items="['Land Owner', 'Lessee', 'Others_ROL']"
                    label="Right Over Land"
                    variant="outlined"
                    color="secondary"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="project.projectTenure"
                    :items="['Permanent', 'Temporary', 'Others_Tenure']"
                    label="Project Tenure"
                    variant="outlined"
                    color="secondary"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="project.landUseClassification"
                    :items="['Residential', 'Commercial', 'Institutional', 'Agricultural', 'Open Space', 'Industrial', 'Forestry', 'Others_LandUse']"
                    label="Land Use Classification"
                    variant="outlined"
                    color="secondary"
                  ></v-select>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-form>

        <v-card v-else-if="currentStep === 3" class="card-premium pa-0 mt-6 overflow-visible">
          <div class="review-container">
            <div class="d-flex align-center justify-space-between mb-8 no-print">
              <div>
                <h2 class="text-h4 font-weight-bold mb-1">Review Application</h2>
                <p class="text-secondary">Please verify all details before printing.</p>
              </div>
              <v-btn
                color="secondary"
                variant="flat"
                prepend-icon="mdi-printer"
                class="btn-premium"
                @click="printApplication"
              >
                Print Now
              </v-btn>
            </div>

            <div class="review-document">
              <div class="document-header">
                <v-img
                  src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
                  alt="LGU Seal"
                  width="60"
                  height="60"
                  contain
                  class="mx-auto mb-4"
                />
                <h3 class="text-h6 font-weight-bold mb-0">CITY GOVERNMENT OF NAGA</h3>
                <p class="text-caption mb-0">City Planning and Development Office</p>
                <h2 class="text-h5 font-weight-black mt-4">LOCATIONAL CLEARANCE APPLICATION</h2>
              </div>

              <div class="print-section-title">1. Application Type</div>
              <div class="review-grid">
                <div class="review-field">
                  <div class="field-label">Applicant Type</div>
                  <div class="field-value">{{ applicant.type }}</div>
                </div>
              </div>

              <div class="print-section-title">2. Applicant & Project Info</div>
              <div class="review-grid">
                <div class="review-field">
                  <div class="field-label">Applicant Name</div>
                  <div class="field-value">{{ applicant.name }}</div>
                </div>
                <div class="review-field">
                  <div class="field-label">Address / Tel No.</div>
                  <div class="field-value">{{ applicant.address }}</div>
                </div>
                <div class="review-field">
                  <div class="field-label">Representative Name</div>
                  <div class="field-value">{{ applicant.authorizedRepresentative || 'N/A' }}</div>
                </div>
                <div class="review-field">
                  <div class="field-label">Representative Address</div>
                  <div class="field-value">{{ applicant.authorizedRepresentativeAddress || 'N/A' }}</div>
                </div>
              </div>

              <div class="review-grid">
                <div class="review-field" style="grid-column: span 2">
                  <div class="field-label">Project Title</div>
                  <div class="field-value">{{ project.projectTitle }}</div>
                </div>
                <div class="review-field" style="grid-column: span 2">
                  <div class="field-label">Location of Project</div>
                  <div class="field-value">{{ project.locational }}</div>
                </div>
              </div>

              <div class="print-section-title">3. Technical Specifications</div>
              <div class="review-grid" style="grid-template-columns: repeat(3, 1fr)">
                <div class="review-field">
                  <div class="field-label">Floor Area</div>
                  <div class="field-value">{{ project.floorArea }} sq.m.</div>
                </div>
                <div class="review-field">
                  <div class="field-label">Height</div>
                  <div class="field-value">{{ project.height }} m</div>
                </div>
                <div class="review-field">
                  <div class="field-label">Storeys</div>
                  <div class="field-value">{{ project.numberOfStoreys }}</div>
                </div>
                <div class="review-field">
                  <div class="field-label">Lot Area</div>
                  <div class="field-value">{{ project.lotArea }} sq.m.</div>
                </div>
                <div class="review-field">
                  <div class="field-label">TCT/OCT No.</div>
                  <div class="field-value">{{ project.tctOctNo }}</div>
                </div>
                <div class="review-field">
                  <div class="field-label">Zoning</div>
                  <div class="field-value">{{ project.landUseClassification }}</div>
                </div>
              </div>

              <div class="mt-12 d-flex justify-space-between pt-8" style="border-top: 1px dashed #cbd5e1">
                <div class="text-center" style="width: 200px">
                  <div style="border-bottom: 2px solid #0f172a; height: 40px"></div>
                  <div class="text-caption font-weight-bold mt-2">APPLICANT SIGNATURE</div>
                </div>
                <div class="text-center" style="width: 200px">
                  <div style="border-bottom: 2px solid #0f172a; height: 40px"></div>
                  <div class="text-caption font-weight-bold mt-2">REPRESENTATIVE SIGNATURE</div>
                </div>
              </div>

              <!-- Notary Block Restored -->
              <div class="mt-12 pt-8 border-t-2 border-slate-900">
                <div class="text-body-2 font-weight-bold mb-4">
                  REPUBLIC OF THE PHILIPPINES) <br>
                  CITY OF NAGA ) S.S.
                </div>
                
                <div class="text-body-2 mb-8" style="line-height: 2">
                  SUBSCRIBED AND SWORN to before me this <span class="d-inline-block border-b border-slate-900" style="width: 60px"></span> day of <span class="d-inline-block border-b border-slate-900" style="width: 100px"></span> 20<span class="d-inline-block border-b border-slate-900" style="width: 40px"></span>, affiant exhibiting his/her Community Tax Certificate No. <span class="d-inline-block border-b border-slate-900" style="width: 150px"></span> issued at <span class="d-inline-block border-b border-slate-900" style="width: 150px"></span> on <span class="d-inline-block border-b border-slate-900" style="width: 120px"></span>.
                </div>

                <v-row>
                  <v-col cols="4">
                    <div class="text-body-2">Doc. No. <span class="d-inline-block border-b border-slate-900 w-full ml-1"></span></div>
                    <div class="text-body-2 mt-2">Page No. <span class="d-inline-block border-b border-slate-900 w-full ml-1"></span></div>
                    <div class="text-body-2 mt-2">Book No. <span class="d-inline-block border-b border-slate-900 w-full ml-1"></span></div>
                    <div class="text-body-2 mt-2">Series of 20<span class="d-inline-block border-b border-slate-900 w-full ml-1" style="width: 40px"></span></div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="5" class="text-center pt-8">
                    <div class="border-b-2 border-slate-900 mb-2"></div>
                    <div class="text-subtitle-2 font-weight-black">NOTARY PUBLIC</div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>

          <v-divider class="no-print"></v-divider>
          
          <v-card-actions class="pa-6 no-print bg-slate-50">
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              variant="outlined"
              class="btn-premium mr-4"
              @click="currentStep = 1"
            >
              Edit Type
            </v-btn>
            <v-btn
              color="secondary"
              variant="outlined"
              class="btn-premium"
              @click="currentStep = 2"
            >
              Edit Info
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Navigation Buttons -->
        <div class="d-flex justify-end mt-12 mb-16 no-print">
          <v-btn
            v-if="currentStep > 1 && currentStep < 3"
            variant="text"
            color="secondary"
            class="btn-premium mr-4"
            @click="currentStep--"
          >
            <v-icon left class="mr-2">mdi-arrow-left</v-icon>
            Back
          </v-btn>
          
          <v-btn
            v-if="currentStep < 3"
            color="secondary"
            elevation="0"
            class="btn-premium"
            @click="validateAndProceed"
          >
            Continue
            <v-icon right class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
          
          <v-btn
            v-else
            color="secondary"
            elevation="4"
            class="btn-premium"
            @click="printApplication"
          >
            Finish & Print
            <v-icon right class="ml-2">mdi-check-all</v-icon>
          </v-btn>
        </div>
      </v-container>

      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        :multi-line="snackbar.multiline"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NagaLocationalClearanceForm',
  // NOTE: This assumes you are using Vue Router (e.g., this.$router.push).
  // If you are not using Vue Router, you would use window.location.href = '/LCRequirement' instead.
  // For this demo, we will use an alert and log to simulate router push.
  // If this component were part of a real Vue application using Vue Router, the next two lines would be uncommented:
  // inject: ['router'], 
  // setup() { const router = inject('router'); return { router }; },
  
  data() {
    return {
      currentStep: 1,
      steps: [
        { title: 'Applicant Type', value: 1 }, // Changed back to 'Applicant Type'
        { title: 'Project & Applicant Info', value: 2 }, // Updated title
        { title: 'Review & Print', value: 3 },
      ],
      // Data models
      applicant: {
        type: null,
        name: '', // Now validated in Step 2
        address: '', // Now validated in Step 2
        authorizedRepresentative: '', // Now validated in Step 2
        authorizedRepresentativeAddress: '', // Now validated in Step 2
      },
      project: {
        natureOfApplication: null, 
        natureOfApplicationOther: '', 
        projectTitle: '', 
        locational: '', 
        floorArea: null, 
        height: null, 
        numberOfStoreys: null, 
        lotArea: null, 
        tctOctNo: '', 
        lotOthers: '', 
        rightOverLand: null, 
        projectTenure: null, 
        landUseClassification: null, 
      },
      // Validation Rules
      rules: {
        required: (value) => !!value || 'This field is required.',
        number: (value) =>
          (value !== null && value !== '' && !isNaN(value)) ||
          'Must be a valid number.',
      },
      // Snackbar for messages
      snackbar: {
        show: false,
        text: '',
        color: '',
        timeout: 3000,
        multiline: false,
      },
    };
  },
  methods: {
    async validateAndProceed() {
      let formRef;

      if (this.currentStep === 1) {
        formRef = this.$refs.form1;
      } else if (this.currentStep === 2) {
        formRef = this.$refs.form2; 
      } else {
        this.currentStep++;
        return;
      }

      if (formRef) {
        // Vuetify 3's validate returns an object with a 'valid' property.
        const { valid } = await formRef.validate();
        if (valid) {
          this.currentStep++; // Move to the next step
        } else {
           this.snackbar.text = 'Please fill out all required fields before proceeding.';
           this.snackbar.color = 'red-darken-2';
           this.snackbar.show = true;
        }
      }
    },
    printApplication() {
      // Build the nature of application display value
      const natureDisplay =
        this.project.natureOfApplication === 'Others_Nature'
          ? this.project.natureOfApplicationOther || 'Others'
          : this.project.natureOfApplication || '—';

      // Helper to safely display a value or em-dash placeholder
      const val = (v) => (v !== null && v !== '' && v !== undefined ? v : '—');

      const printContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Locational Clearance Application</title>
  <style>
    @page { size: A4 portrait; margin: 8mm 10mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 8pt;
      color: #1e293b;
      line-height: 1.2;
      background: white;
    }
    .doc-header {
      text-align: center;
      border-bottom: 1.5px solid #0f172a;
      padding-bottom: 6px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .doc-header img { width: 42px; height: 42px; display: block; flex-shrink: 0; }
    .doc-header-text { text-align: center; }
    .doc-header .gov-name { font-size: 11pt; font-weight: 700; letter-spacing: 0.04em; }
    .doc-header .office-name { font-size: 7.5pt; color: #475569; margin-top: 1px; }
    .doc-header .form-title {
      font-size: 10pt;
      font-weight: 900;
      letter-spacing: 0.06em;
      margin-top: 3px;
      text-transform: uppercase;
    }
    .section-title {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-left: 3px solid #3b82f6;
      padding-left: 6px;
      margin: 7px 0 4px;
    }
    .review-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3px 12px;
      margin-bottom: 4px;
    }
    .review-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
    .review-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
    .review-grid.cols-1 { grid-template-columns: 1fr; }
    .field { margin-bottom: 3px; }
    .field-label {
      font-size: 6.5pt;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 1px;
    }
    .field-value {
      font-size: 8pt;
      font-weight: 500;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 2px;
      min-height: 13px;
    }
    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding-top: 8px;
      border-top: 1px dashed #94a3b8;
    }
    .sig-block { text-align: center; width: 180px; }
    .sig-line { border-bottom: 1.5px solid #0f172a; height: 24px; margin-bottom: 3px; }
    .sig-label { font-size: 6.5pt; font-weight: 700; text-transform: uppercase; }
    .notary-block {
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1.5px solid #0f172a;
      font-size: 7.5pt;
      line-height: 1.5;
    }
    .notary-row { display: flex; justify-content: space-between; margin-top: 8px; }
    .notary-left div { margin-bottom: 2px; font-size: 7.5pt; }
    .notary-right { text-align: center; width: 180px; padding-top: 16px; }
    .notary-right .sig-line { border-bottom: 1.5px solid #0f172a; height: 22px; }
    .blank { display: inline-block; border-bottom: 1px solid #0f172a; }
  </style>
</head>
<body>
  <div class="doc-header">
    <img src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png" alt="LGU Seal" />
    <div class="doc-header-text">
      <div class="gov-name">CITY GOVERNMENT OF NAGA</div>
      <div class="office-name">City Planning and Development Office</div>
      <div class="form-title">Locational Clearance Application</div>
    </div>
  </div>

  <div class="section-title">1. Application Type</div>
  <div class="review-grid cols-4">
    <div class="field">
      <div class="field-label">Applicant Type</div>
      <div class="field-value">${val(this.applicant.type)}</div>
    </div>
    <div class="field">
      <div class="field-label">Nature of Application</div>
      <div class="field-value">${natureDisplay}</div>
    </div>
    <div class="field">
      <div class="field-label">Right Over Land</div>
      <div class="field-value">${val(this.project.rightOverLand)}</div>
    </div>
    <div class="field">
      <div class="field-label">Project Tenure</div>
      <div class="field-value">${val(this.project.projectTenure)}</div>
    </div>
  </div>

  <div class="section-title">2. Applicant &amp; Project Information</div>
  <div class="review-grid cols-2">
    <div class="field">
      <div class="field-label">Applicant Name</div>
      <div class="field-value">${val(this.applicant.name)}</div>
    </div>
    <div class="field">
      <div class="field-label">Address / Tel No.</div>
      <div class="field-value">${val(this.applicant.address)}</div>
    </div>
    <div class="field">
      <div class="field-label">Authorized Representative</div>
      <div class="field-value">${val(this.applicant.authorizedRepresentative) || '—'}</div>
    </div>
    <div class="field">
      <div class="field-label">Representative Address / Tel No.</div>
      <div class="field-value">${val(this.applicant.authorizedRepresentativeAddress) || '—'}</div>
    </div>
    <div class="field">
      <div class="field-label">Project Title</div>
      <div class="field-value">${val(this.project.projectTitle)}</div>
    </div>
    <div class="field">
      <div class="field-label">Location of Project</div>
      <div class="field-value">${val(this.project.locational)}</div>
    </div>
  </div>

  <div class="section-title">3. Technical Specifications &amp; Zoning</div>
  <div class="review-grid cols-4">
    <div class="field">
      <div class="field-label">Floor Area</div>
      <div class="field-value">${val(this.project.floorArea)} sq.m.</div>
    </div>
    <div class="field">
      <div class="field-label">Height</div>
      <div class="field-value">${val(this.project.height)} m</div>
    </div>
    <div class="field">
      <div class="field-label">No. of Storeys</div>
      <div class="field-value">${val(this.project.numberOfStoreys)}</div>
    </div>
    <div class="field">
      <div class="field-label">Lot Area</div>
      <div class="field-value">${val(this.project.lotArea)} sq.m.</div>
    </div>
    <div class="field">
      <div class="field-label">TCT / OCT No.</div>
      <div class="field-value">${val(this.project.tctOctNo)}</div>
    </div>
    <div class="field">
      <div class="field-label">Lot Others</div>
      <div class="field-value">${val(this.project.lotOthers)}</div>
    </div>
    <div class="field">
      <div class="field-label">Land Use Classification</div>
      <div class="field-value">${val(this.project.landUseClassification)}</div>
    </div>
  </div>

  <div class="signatures">
    <div class="sig-block">
      <div class="sig-line"></div>
      <div class="sig-label">Applicant Signature</div>
    </div>
    <div class="sig-block">
      <div class="sig-line"></div>
      <div class="sig-label">Representative Signature</div>
    </div>
  </div>

  <div class="notary-block">
    <div>
      REPUBLIC OF THE PHILIPPINES)<br/>
      CITY OF NAGA ) S.S.
    </div>
    <div style="margin-top:6px;">
      SUBSCRIBED AND SWORN to before me this
      <span class="blank" style="width:44px;">&nbsp;</span> day of
      <span class="blank" style="width:80px;">&nbsp;</span> 20<span class="blank" style="width:30px;">&nbsp;</span>,
      affiant exhibiting his/her Community Tax Certificate No.
      <span class="blank" style="width:120px;">&nbsp;</span> issued at
      <span class="blank" style="width:120px;">&nbsp;</span> on
      <span class="blank" style="width:100px;">&nbsp;</span>.
    </div>
    <div class="notary-row">
      <div class="notary-left">
        <div>Doc. No. <span class="blank" style="width:70px;">&nbsp;</span></div>
        <div>Page No. <span class="blank" style="width:70px;">&nbsp;</span></div>
        <div>Book No. <span class="blank" style="width:70px;">&nbsp;</span></div>
        <div>Series of 20<span class="blank" style="width:30px;">&nbsp;</span></div>
      </div>
      <div class="notary-right">
        <div class="sig-line"></div>
        <div style="font-size:7.5pt;font-weight:900;text-transform:uppercase;">Notary Public</div>
      </div>
    </div>
  </div>

</body>
</html>`;

      // Open a clean popup window, write the HTML, then print it
      const printWindow = window.open('', '_blank', 'width=900,height=700');
      if (!printWindow) {
        this.snackbar.text = 'Pop-up blocked. Please allow pop-ups for this site and try again.';
        this.snackbar.color = 'red-darken-2';
        this.snackbar.show = true;
        return;
      }
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();

      // Wait for resources (seal image) to load before printing
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };

      this.snackbar.text = 'Print dialog opened successfully.';
      this.snackbar.color = 'green-darken-2';
      this.snackbar.show = true;
    },
    resetFormData() {
      // Resets all form data to initial state
      this.applicant = {
        type: null,
        name: '',
        address: '',
        authorizedRepresentative: '',
        authorizedRepresentativeAddress: '',
      };
      this.project = {
        natureOfApplication: null,
        natureOfApplicationOther: '',
        projectTitle: '',
        locational: '',
        floorArea: null,
        height: null,
        numberOfStoreys: null,
        lotArea: null,
        tctOctNo: '',
        lotOthers: '',
        rightOverLand: null,
        projectTenure: null,
        landUseClassification: null,
      };
    }
  },
});
</script>

<style scoped>
/* Modern Color Palette & Variables */
:deep(.v-application) {
  --primary-color: #0000CC;
  --secondary-color: #0000CC;
  --accent-color: #10b981;
  --bg-color: #f8fafc;
  --surface-color: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* Gradient Title */
.gradient-text {
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

/* App Bar Customization */
.custom-app-bar {
  background: #0000CC !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Stepper Styles */
.stepper-modern {
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  margin-top: -24px;
  position: relative;
  z-index: 2;
  padding: 8px;
}

:deep(.v-stepper-header) {
  box-shadow: none !important;
  height: auto !important;
  padding: 16px;
}

:deep(.v-stepper-item) {
  opacity: 0.6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-stepper-item--active) {
  opacity: 1;
  transform: scale(1.05);
}

:deep(.v-stepper-item--complete) {
  opacity: 1;
}

/* Card & Section Styles */
.card-premium {
  background: white;
  border-radius: 24px;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-premium:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

.section-premium {
  background: #f1f5f9;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.section-premium:hover {
  background: #e2e8f0;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.section-header v-icon {
  background: white;
  padding: 8px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
}

/* Input Fields */
:deep(.v-field) {
  border-radius: 12px !important;
  background: white !important;
}

:deep(.v-field--focused) {
  border-color: var(--secondary-color) !important;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* Review Document */
.review-container {
  background: #f8fafc;
  padding: 40px;
  border-radius: 20px;
}

.review-document {
  background: white;
  padding: 60px;
  border-radius: 4px;
  box-shadow: var(--shadow-lg);
  max-width: 850px;
  margin: 0 auto;
  position: relative;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #1e293b;
  line-height: 1.6;
}

.document-header {
  text-align: center;
  margin-bottom: 40px;
  border-bottom: 2px solid #0f172a;
  padding-bottom: 20px;
}

.print-section-title {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #0f172a;
  margin: 32px 0 16px 0;
  display: flex;
  align-items: center;
  border-left: 4px solid #3b82f6;
  padding-left: 12px;
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.review-field {
  margin-bottom: 16px;
}

.field-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.field-value {
  font-size: 1rem;
  font-weight: 500;
  color: #0f172a;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
}

/* Button Customization */
.btn-premium {
  border-radius: 12px !important;
  text-transform: none !important;
  font-weight: 600 !important;
  letter-spacing: 0.01em !important;
  padding: 0 24px !important;
  height: 48px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.btn-premium:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Print styles are handled inside the popup window opened by printApplication().
   The scoped @media print block is intentionally removed — Vuetify's component
   wrappers (v-app, v-main, v-container) apply overflow:hidden and flex layouts
   that cannot be fully overridden from a scoped stylesheet, resulting in a blank
   printed page. The popup approach avoids this entirely. */

/* Responsive */
@media (max-width: 600px) {
  .review-document {
    padding: 24px;
  }
  .review-grid {
    grid-template-columns: 1fr;
  }
}

/* Utility Classes for Document */
.border-b { border-bottom: 1px solid #0f172a; }
.border-b-2 { border-bottom: 2px solid #0f172a; }
.border-t-2 { border-top: 2px solid #0f172a; }
.border-slate-900 { border-color: #0f172a !important; }
.w-full { width: 100%; }
</style>