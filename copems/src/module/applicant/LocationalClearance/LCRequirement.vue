<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" class="elevation-1">
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
            <div style="font-size: 12px; font-weight: 400; color: white; line-height: 1.2">
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div style="font-size: 15px; font-weight: 700; color: white; line-height: 1.2">
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6 page-header-card"
      >
        <div class="d-flex align-center">
          <v-icon color="blue-darken-3" class="mr-3" size="32">mdi-upload-multiple</v-icon>
          <h2 class="mb-0 font-weight-bold page-title-responsive gradient-text">
            Locational Clearance Requirements Submission
          </h2>
        </div>
      </v-card>

      <v-container fluid class="px-4 py-6 mx-auto" style="max-width: 1300px">
        <v-row>
          
          <!-- Main Content Area -->
          <v-col cols="12" md="8" lg="9">

            <v-form ref="submissionForm" @submit.prevent="handleConfirmSubmission">
                
                <!-- Instructions Banner -->
                <v-alert
                  type="info"
                  variant="tonal"
                  color="blue-darken-3"
                  class="mb-6 rounded-lg pa-4 instructions-banner"
                  icon="mdi-information"
                >
                  <div class="d-flex align-center justify-space-between flex-wrap gap-2">
                    <div>
                      <div class="text-subtitle-1 font-weight-bold mb-1">Upload Requirements</div>
                      <div class="text-body-2 text-medium-emphasis">
                        Please upload all required documents marked with <span class="text-red font-weight-bold">*</span>. <br class="d-md-none">
                        Accepted formats: <span class="font-weight-bold text-blue-darken-3">PDF</span>, <span class="font-weight-bold text-blue-darken-3">JPEG/JPG</span> (Max 5MB each).
                      </div>
                    </div>
                  </div>
                </v-alert>

                <!-- Required Documents Section -->
                <v-card class="mb-6 pa-0 card-shadow-gradient" flat>
                    <v-card-title class="required-header text-white px-5 py-3 d-flex align-center flex-wrap gap-2">
                        <div class="d-flex align-center">
                          <v-icon size="small" class="mr-2">mdi-file-document-check</v-icon>
                          Required Documents
                        </div>
                        <v-spacer class="d-none d-sm-block"></v-spacer>
                        <v-chip size="small" color="white" variant="flat" class="text-blue-darken-3 font-weight-bold ml-auto ml-sm-0">
                          {{ requiredCount }} of {{ totalRequired }} Uploaded
                        </v-chip>
                    </v-card-title>
                    <v-card-text class="pa-5 bg-white">
                        <v-row>
                          <v-col cols="12" md="6" v-for="(req, index) in requiredList" :key="index">
                            <v-card 
                                class="h-100 pa-4 required-doc-card transition-swing"
                                :class="{'required-doc-missing': !uploadedFiles[req.id] && submittedOnce}"
                                flat
                            >
                                <div class="d-flex align-start mb-3">
                                  <v-icon color="blue-darken-3" class="mr-3 mt-1">mdi-file-document-outline</v-icon>
                                  <div class="flex-grow-1">
                                    <h4 class="section-title-document mb-1 lh-1">
                                        {{ req.label }} 
                                        <span class="text-red">*</span>
                                    </h4>
                                    <div class="text-caption text-grey-darken-1">{{ req.copies }}</div>
                                  </div>
                                </div>

                                <div class="custom-file-upload mt-auto">
                                    <v-file-input
                                        v-model="uploadedFiles[req.id]"
                                        :rules="[rules.requiredFile, rules.fileSize, rules.fileFormat]"
                                        accept=".pdf,.jpg,.jpeg"
                                        variant="solo"
                                        density="compact"
                                        hide-details
                                        flat
                                        class="upload-input"
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon size="18" color="grey-darken-1">mdi-upload</v-icon>
                                        </template>
                                        <template v-slot:selection="{ fileNames }">
                                            <v-chip
                                                v-for="fileName in fileNames"
                                                :key="fileName"
                                                label
                                                size="small"
                                                color="blue-darken-3"
                                                class="mr-2"
                                            >
                                                {{ fileName }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:label>
                                            <div class="text-center w-100">Click to upload or drag & drop</div>
                                        </template>
                                    </v-file-input>
                                </div>
                                <v-expand-transition>
                                  <div v-if="!uploadedFiles[req.id] && submittedOnce" class="mt-2">
                                    <v-alert
                                        type="error"
                                        variant="tonal"
                                        class="py-1 px-3 text-caption"
                                        icon="mdi-alert-circle-outline"
                                        density="compact"
                                    >
                                        Missing required document
                                    </v-alert>
                                  </div>
                                </v-expand-transition>
                            </v-card>
                          </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Optional Documents Section -->
                <v-card class="mb-6 pa-0 card-shadow" flat>
                    <v-card-title class="bg-grey-lighten-4 border-bottom px-5 py-3 d-flex align-center">
                        <v-icon color="blue-darken-3" size="small" class="mr-2">mdi-file-plus-outline</v-icon>
                        <span class="text-blue-darken-3 font-weight-bold text-subtitle-1">Optional Documents</span>
                        <span class="text-caption text-medium-emphasis ml-3 d-none d-sm-inline">(Additional supporting documents)</span>
                    </v-card-title>
                    <v-card-text class="pa-5 bg-white">
                        <v-row>
                          <v-col cols="12" md="6" v-for="(req, index) in optionalList" :key="index">
                            <v-card 
                                class="h-100 pa-4 optional-doc-card transition-swing" 
                                flat
                            >
                                <div class="d-flex align-start mb-3">
                                  <v-icon color="blue-darken-3" class="mr-3 mt-1">mdi-file-document-outline</v-icon>
                                  <div class="flex-grow-1">
                                    <h4 class="section-title-document mb-1 lh-1">
                                        {{ req.label }} 
                                    </h4>
                                    <div class="text-caption text-grey-darken-1">{{ req.copies }}</div>
                                  </div>
                                </div>

                                <div class="custom-file-upload mt-auto">
                                    <v-file-input
                                        v-model="uploadedFiles[req.id]"
                                        :rules="[rules.fileSize, rules.fileFormat]"
                                        accept=".pdf,.jpg,.jpeg"
                                        variant="solo"
                                        density="compact"
                                        hide-details
                                        flat
                                        class="upload-input"
                                    >
                                        <template v-slot:prepend-inner>
                                            <v-icon size="18" color="grey-darken-1">mdi-upload</v-icon>
                                        </template>
                                        <template v-slot:selection="{ fileNames }">
                                            <v-chip
                                                v-for="fileName in fileNames"
                                                :key="fileName"
                                                label
                                                size="small"
                                                color="blue-darken-3"
                                                class="mr-2"
                                            >
                                                {{ fileName }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:label>
                                            <div class="text-center w-100">Click to upload or drag & drop</div>
                                        </template>
                                    </v-file-input>
                                </div>
                            </v-card>
                          </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                
                <!-- Submit Section -->
                <v-card flat class="pa-5 mb-6 card-shadow d-flex flex-column flex-sm-row align-center justify-space-between bg-white rounded-lg">
                    <div class="text-center text-sm-left mb-4 mb-sm-0">
                        <div class="text-h6 text-blue-darken-3 font-weight-bold mb-1">
                            Ready to submit?
                        </div>
                        <div class="text-body-2 text-medium-emphasis">
                            Ensure all required documents are uploaded before proceeding.
                        </div>
                    </div>
                    <v-btn
                        type="submit"
                        color="blue-darken-3"
                        class="btn-rounded py-6 px-8 elevation-2"
                        :loading="isSubmitting"
                    >
                        Submit Application
                        <v-icon right class="ml-2">mdi-send-check</v-icon>
                    </v-btn>
                </v-card>
            </v-form>
            
          </v-col>

          <!-- Sidebar Area -->
          <v-col cols="12" md="4" lg="3">
            <div class="sticky-sidebar">
              
              <v-card class="mb-5 pa-0 card-shadow sidebar-card overflow-hidden">
                <div class="bg-blue-lighten-5 px-4 py-3 border-bottom d-flex align-center">
                  <v-icon color="blue-darken-3" size="small" class="mr-2">mdi-account-circle</v-icon>
                  <span class="section-title-sidebar mb-0">Applicant Info</span>
                </div>
                <div class="pa-4">
                  <v-list dense class="py-0 transparent-list">
                    <v-list-item class="px-0 pb-3">
                      <div class="text-caption-sidebar font-weight-bold mb-1">FULL NAME</div>
                      <div class="text-body-2 font-weight-medium text-grey-darken-4">{{ applicantInfo.name }}</div>
                    </v-list-item>
                    <v-divider class="my-1"></v-divider>
                    <v-list-item class="px-0 py-3">
                      <div class="text-caption-sidebar font-weight-bold mb-1">APPLICATION TYPE</div>
                      <div>
                        <v-chip size="small" color="blue-lighten-4" text-color="blue-darken-3" class="font-weight-bold px-3">
                          {{ applicantInfo.type }}
                        </v-chip>
                      </div>
                    </v-list-item>
                    <v-divider class="my-1"></v-divider>
                    <v-list-item class="px-0 pt-3">
                      <div class="text-caption-sidebar font-weight-bold mb-1">PROJECT TITLE</div>
                      <div class="text-body-2 font-weight-medium text-grey-darken-4 text-wrap lh-1-4">
                        {{ applicantInfo.projectTitle }}
                      </div>
                    </v-list-item>
                  </v-list>
                </div>
              </v-card>
              
              <v-card class="mb-5 pa-0 card-shadow sidebar-card overflow-hidden">
                <div class="bg-blue-lighten-5 px-4 py-3 border-bottom d-flex align-center">
                  <v-icon color="blue-darken-3" size="small" class="mr-2">mdi-progress-check</v-icon>
                  <span class="section-title-sidebar mb-0">Application Status</span>
                </div>
                <div class="pa-4 pt-5">
                  <v-timeline 
                    :side-aligned="false" 
                    density="compact"
                    class="timeline-custom"
                  >
                    <v-timeline-item
                      v-for="(item, index) in timelineSteps"
                      :key="index"
                      :dot-color="getTimelineColor(item.step)"
                      :icon="getTimelineIcon(item.step)"
                      size="small"
                      class="timeline-item-custom"
                    >
                      <v-card class="timeline-card" :elevation="item.step <= timelineStatus ? 2 : 0" :class="{'bg-grey-lighten-4 border-none': item.step > timelineStatus}">
                        <v-card-text 
                          :class="{'font-weight-bold text-blue-darken-4': item.step <= timelineStatus, 'text-grey': item.step > timelineStatus}"
                          class="py-2 px-3 text-caption"
                        >
                          {{ item.title }}
                          <div v-if="item.step === timelineStatus && item.step === 1" class="text-caption text-green-darken-1 mt-1 font-weight-bold d-flex align-center">
                            <v-icon size="x-small" class="mr-1">mdi-check-circle</v-icon> Completed
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </div>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        :multi-line="snackbar.multiline"
        location="top right"
        elevation="24"
      >
        <div class="d-flex align-center">
          <v-icon color="white" class="mr-3">{{ snackbar.color.includes('green') ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon>
          {{ snackbar.text }}
        </div>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NagaLocationalClearanceSubmission',
  data() {
    // Combine all requirements into one list and filter them for display
    const allRequirements = [
        { id: 'plans', label: 'Building Plans', copies: '1 set (Minimum required: 1)', required: true },
        { id: 'lot_plan', label: 'Lot Plan (TCT/OCT)', copies: '1 copy', required: true },
        { id: 'tax_dec', label: 'Tax Declaration', copies: '1 copy', required: true },
        { id: 'tax_pay', label: 'Updated Tax Payment', copies: '1 copy', required: true },
        { id: 'bom', label: 'Bill of Materials', copies: '1 copy', required: false },
        { id: 'specs', label: 'Specifications', copies: '1 copy', required: false },
    ];

    return {
      isSubmitting: false,
      submittedOnce: false, // Track if the user has attempted to submit
      uploadedFiles: {
        plans: null,
        lot_plan: null,
        bom: null,
        specs: null,
        tax_dec: null,
        tax_pay: null,
      },
      applicantInfo: {
        name: 'Maria S. Dela Cruz',
        type: 'Individual',
        projectTitle: 'Proposed 2-Storey Residential Building',
      },
      requirementsList: allRequirements,
      timelineStatus: 1, 
      timelineSteps: [
        { step: 1, title: 'Form Printed (Awaiting Upload)' },
        { step: 2, title: 'Documents Submitted & Under Review' },
        { step: 3, title: 'Payment Processing' },
      ],
      // Validation Rules
      rules: {
        requiredFile: (v) => (v && v.length > 0) || 'Missing required document.',
        fileSize: (v) => !v || !v.length || v[0].size < 5 * 1024 * 1024 || 'File size should be less than 5 MB.',
        fileFormat: (v) => {
            if (!v || !v.length) return true;
            const file = v[0];
            const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
            return allowedTypes.includes(file.type) || 'Only PDF, JPG, and JPEG files are allowed.';
        },
      },
      snackbar: {
        show: false,
        text: '',
        color: '',
        timeout: 4000,
        multiline: true,
      },
    };
  },
  computed: {
    requiredList() {
      return this.requirementsList.filter(req => req.required);
    },
    optionalList() {
      return this.requirementsList.filter(req => !req.required);
    },
    totalRequired() {
      return this.requiredList.length;
    },
    requiredCount() {
      // Count how many required files have an object (a file has been uploaded)
      return this.requiredList.filter(req => this.uploadedFiles[req.id] && this.uploadedFiles[req.id].length > 0).length;
    }
  },
  methods: {
    getTimelineColor(step) {
      if (step === this.timelineStatus) {
        return 'blue-darken-3';
      } else if (step < this.timelineStatus) {
        return 'green-darken-1';
      } else {
        return 'grey-lighten-1';
      }
    },
    getTimelineIcon(step) {
      if (step === this.timelineStatus) {
        return 'mdi-circle-medium';
      } else if (step < this.timelineStatus) {
        return 'mdi-check';
      } else {
        return 'mdi-circle-outline';
      }
    },
    async handleConfirmSubmission() {
      this.submittedOnce = true; // Mark that user has attempted submission

      // Vuetify 3's validate will run all rules on all inputs
      const { valid } = await this.$refs.submissionForm.validate();
      
      if (!valid) {
        this.snackbar.text = 'Please fix the errors and ensure all required documents are uploaded.';
        this.snackbar.color = 'red-darken-1';
        this.snackbar.show = true;
        return;
      }

      this.isSubmitting = true;

      // Simulate API upload
      console.log("Submitting files:", this.uploadedFiles);

      setTimeout(() => {
        // Update status and show success message
        this.timelineStatus = 2; // Move to 'Documents Submitted & Under Review'
        this.snackbar.text = 'Requirements successfully submitted! Your application is now in the "Under Review" stage.';
        this.snackbar.color = 'green-darken-1';
        this.snackbar.show = true;
        this.isSubmitting = false;

        console.log("Application documents submitted online.");
      }, 2000); // Simulate network delay
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

/* Page Header */
.page-header-card {
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  height: 70px;
}

/* --- Overall Card Styles --- */
.card-shadow {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.04) !important;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

/* Gradient Header Card (Required Documents) */
.card-shadow-gradient {
  border-radius: 12px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.04) !important;
  border: 1px solid #e2e8f0;
}

.required-header {
  background: linear-gradient(90deg, #00458C, #1565C0);
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
  font-weight: 600;
  font-size: 1.1rem;
}

.border-bottom {
  border-bottom: 1px solid #e2e8f0;
}

.border-none {
  border: none !important;
}

.sidebar-card {
  background-color: #ffffff;
}

.sticky-sidebar {
  position: sticky;
  top: 24px;
}

.section-title-document {
  color: #1976d2;
  font-weight: 700;
  font-size: 0.95rem;
}

.section-title-sidebar {
  color: #0000CC;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.text-caption-sidebar {
  font-size: 0.7rem !important;
  color: #64748b !important;
  letter-spacing: 0.05em;
}

.transparent-list {
  background-color: transparent !important;
}

.lh-1 {
  line-height: 1.2;
}

.lh-1-4 {
  line-height: 1.4;
}

/* --- Document Card Styles --- */
.required-doc-card, .optional-doc-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
}

.required-doc-card:hover, .optional-doc-card:hover {
  background-color: #ffffff;
  border-color: #bbdefb;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.08) !important;
}

.required-doc-missing {
  border: 1px solid #ef4444 !important; /* Red border for missing required docs */
  background-color: #fef2f2 !important;
}

/* Custom File Upload Area (Dashed Border) */
.custom-file-upload {
  position: relative;
  border: 2px dashed #cbd5e1;
  border-radius: 6px;
  padding: 0px;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.custom-file-upload:hover {
  border-color: #1565C0;
  background-color: #f0f7ff;
}

/* Hiding the standard v-file-input elements to show the custom area */
.upload-input :deep(.v-input__control) {
  min-height: 48px;
}
.upload-input :deep(.v-field__input) {
  opacity: 0;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-input :deep(.v-field__field) {
  background: transparent !important;
  padding: 0 !important;
}
.upload-input :deep(.v-label) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  font-weight: 500;
  color: #64748b !important;
  transition: none;
  font-size: 0.85rem;
}
.upload-input :deep(.v-input__prepend-inner) {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  margin-top: 0 !important;
}
.upload-input :deep(.v-chip) {
  position: absolute;
  top: 50%;
  left: 38px;
  transform: translateY(-50%);
  opacity: 1;
  z-index: 10;
  max-width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* --- Timeline Customization --- */
.timeline-custom {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-top: -10px;
}

.timeline-item-custom {
  padding-bottom: 16px !important;
}

.timeline-card {
  border-radius: 6px;
  background-color: white;
  border: 1px solid #e2e8f0;
}

/* Button Styles */
.btn-rounded {
  border-radius: 8px !important;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-size: 0.95rem;
}

.v-main {
  padding-bottom: 32px !important;
}

/* Responsive Styles */
.page-title-responsive {
  font-size: 1.3rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.2rem !important;
  }
}

@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1.1rem !important;
  }
  .sticky-sidebar {
    position: static;
  }
}

@media (max-width: 600px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
  .instructions-banner {
    padding: 12px !important;
  }
}
</style>