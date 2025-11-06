<template>
  <v-app>
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
      </v-container>
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
            >mdi-upload-multiple</v-icon
          >
          <h2 class="mb-0 font-weight-bold page-title-responsive gradient-text">
            Locational Clearance Requirements Submission
          </h2>
        </div>
      </v-card>

      <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
        <v-row class="mt-2">
          
          <v-col cols="12" md="9">

            <v-form ref="submissionForm" @submit.prevent="handleConfirmSubmission">
                <v-card class="mb-4 pa-4 card-shadow" flat>
                    <v-card-title class="pa-0 section-title-upload mb-2">
                        <v-icon color="blue-darken-3" class="mr-2">mdi-cloud-upload-outline</v-icon>
                        Upload Requirements:
                    </v-card-title>
                    <v-card-text class="text-caption pa-0 text-medium-emphasis">
                        <p class="mb-1">Please upload all required documents marked with <span class="text-red font-weight-bold">*</span>.</p>
                        <p class="mb-1">Accepted formats: <span class="font-weight-bold text-blue-darken-3">PDF</span> and <span class="font-weight-bold text-blue-darken-3">JPEG/JPG</span> (Max 5MB each).</p>
                    </v-card-text>
                </v-card>

                <v-card class="mb-4 pa-0 card-shadow-gradient" flat>
                    <v-card-title class="required-header text-white px-4 py-3">
                        Required Documents
                    </v-card-title>
                    <v-card-text class="pa-4 pt-3">
                        <p class="font-weight-medium mb-4 text-body-2">{{ requiredCount }} of {{ totalRequired }} required documents uploaded</p>
                        
                        <v-card 
                            v-for="(req, index) in requiredList" 
                            :key="index" 
                            class="mb-3 required-doc-card pa-3"
                            :class="{'required-doc-missing': !uploadedFiles[req.id] && submittedOnce}"
                            flat
                        >
                            <h4 class="section-title-document mb-1">
                                <v-icon left color="blue-darken-3" class="mr-2" size="20">mdi-file-document-outline</v-icon>
                                {{ req.label }} 
                                <span class="text-red"> *</span>
                            </h4>
                            <p class="text-caption text-medium-emphasis mb-2 ml-7">{{ req.copies }}</p>

                            <div class="custom-file-upload">
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
                            <v-alert
                                v-if="!uploadedFiles[req.id] && submittedOnce"
                                type="error"
                                variant="tonal"
                                class="mt-2 py-1 px-3 text-caption"
                                icon="mdi-alert-circle-outline"
                                density="compact"
                            >
                                This required document is missing.
                            </v-alert>

                        </v-card>
                    </v-card-text>
                </v-card>

                <v-card class="mb-4 pa-4 card-shadow" flat>
                    <v-card-title class="pa-0 section-title-upload mb-2">
                        Optional Documents
                    </v-card-title>
                    <v-card-text class="text-caption pa-0 text-medium-emphasis mb-3">
                        Additional supporting documents
                    </v-card-text>
                    
                    <v-card 
                        v-for="(req, index) in optionalList" 
                        :key="index" 
                        class="mb-3 optional-doc-card pa-3" 
                        flat
                    >
                        <h4 class="section-title-document mb-1">
                            <v-icon left color="blue-darken-3" class="mr-2" size="20">mdi-file-document-outline</v-icon>
                            {{ req.label }} 
                        </h4>
                        <p class="text-caption text-medium-emphasis mb-2 ml-7">{{ req.copies }}</p>

                        <div class="custom-file-upload">
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
                </v-card>
                
                <v-card flat class="pa-4 my-6 d-flex align-center justify-space-between card-shadow">
                    <div class="text-body-1 text-medium-emphasis font-weight-medium">
                        Ready to submit your application?
                        <div class="text-caption">Ensure all required documents are uploaded</div>
                    </div>
                    <v-btn
                        type="submit"
                        color="blue-darken-3"
                        class="btn-rounded"
                        elevation="4"
                        variant="elevated"
                        :loading="isSubmitting"
                    >
                        Submit Application<v-icon right>mdi-upload-network</v-icon>
                    </v-btn>
                </v-card>
            </v-form>
            
          </v-col>

          <v-col cols="12" md="3">
            
            <v-card class="mb-4 pa-4 card-shadow sidebar-card">
              <v-card-title class="section-title-sidebar mb-2">
                <v-icon color="blue-darken-3" class="mr-2">mdi-account-circle-outline</v-icon>
                Applicant Information
              </v-card-title>
              <v-divider class="mb-3"></v-divider>
              <v-list dense class="py-0 transparent-list">
                <v-list-item class="px-0">
                  <v-list-item-title class="font-weight-medium text-caption-sidebar">FULL NAME</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-bold text-wrap">{{ applicantInfo.name }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item class="px-0 mt-2">
                  <v-list-item-title class="font-weight-medium text-caption-sidebar">APPLICATION TYPE</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-bold">
                    <v-chip size="small" color="blue-lighten-4" text-color="blue-darken-3" class="font-weight-medium">{{ applicantInfo.type }}</v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item class="px-0 mt-2">
                  <v-list-item-title class="font-weight-medium text-caption-sidebar">PROJECT TITLE</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-bold text-wrap">{{ applicantInfo.projectTitle }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card>
            
            <v-card class="mb-4 pa-4 card-shadow sidebar-card">
              <v-card-title class="section-title-sidebar mb-2">
                <v-icon color="blue-darken-3" class="mr-2">mdi-progress-check</v-icon>
                Application Status
              </v-card-title>
              <v-divider class="mb-4"></v-divider>
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
                  <v-card class="timeline-card" :elevation="item.step <= timelineStatus ? 4 : 0">
                    <v-card-text 
                      :class="{'font-weight-bold': item.step <= timelineStatus, 'text-blue-darken-4': item.step <= timelineStatus}"
                      class="py-2 px-3 text-caption text-grey-darken-1"
                    >
                      {{ item.title }}
                      <span v-if="item.step === timelineStatus && item.step === 1" class="text-caption text-green-darken-1 ml-1 font-weight-bold">Completed</span>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card>

            <v-card class="pa-4 card-shadow sidebar-card" color="orange-lighten-5">
              <v-card-title class="section-title-sidebar mb-2 text-orange-darken-3">
                <v-icon color="orange-darken-3" class="mr-2">mdi-folder-open-outline</v-icon>
                Additional Permits
              </v-card-title>
              <v-card-text class="py-0 text-caption text-medium-emphasis mb-3">
                Apply for additional permits related to your project
              </v-card-text>
              <v-btn
                color="blue-darken-3"
                variant="elevated"
                block
                size="large" 
                class="btn-rounded-small mb-3"
                to="/applicant/Excavation"
                elevation="3"
              >
                Apply for Excavation Permit
              </v-btn>

              <v-btn
                color="blue-darken-3"
                variant="elevated"
                block
                size="large" 
                class="btn-rounded-small"
                to="/applicant/NOC"
                elevation="3"
              >
                Apply for NOC
              </v-btn>
            </v-card>

          </v-col>
        </v-row>
      </v-container>

      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        :multi-line="snackbar.multiline"
        location="top right"
      >
        {{ snackbar.text }}
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

/* --- Overall Card Styles --- */
.card-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05); /* Softer, modern shadow */
  border-radius: 12px;
  border: 1px solid #e0eeef;
}

/* Gradient Header Card (Required Documents) */
.card-shadow-gradient {
    border-radius: 12px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
}

.required-header {
    background: linear-gradient(90deg, #00458C, #1565C0);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
}

.sidebar-card {
    background-color: #f7fafd;
    box-shadow: 0 2px 4px 0 rgba(25, 118, 210, 0.05);
}

.section-title-upload {
    color: #1976d2;
    font-weight: 700;
    font-size: 1rem;
}

.section-title-document {
  color: #1976d2;
  font-weight: 700;
  font-size: 0.95rem;
}

.section-title-sidebar {
  color: #0000CC;
  font-weight: 700;
  font-size: 1rem;
}

.text-caption-sidebar {
    font-size: 0.75rem !important;
    color: #666 !important;
}

.transparent-list {
    background-color: transparent !important;
}

/* --- Document Card Styles --- */
.required-doc-card, .optional-doc-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
}
.required-doc-missing {
    border: 1px solid #F44336 !important; /* Red border for missing required docs */
}

/* Custom File Upload Area (Dashed Border) */
.custom-file-upload {
    position: relative;
    border: 2px dashed #bbdefb; /* Light blue dashed border */
    border-radius: 6px;
    padding: 0px;
    text-align: center;
    cursor: pointer;
    background-color: #fafcfe; /* Very light blue background */
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
    /* Hide the default input text */
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
    /* Center the custom "Click to upload" label */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    font-weight: 500;
    color: #616161 !important;
    transition: none;
}
.upload-input :deep(.v-input__prepend-inner) {
    /* Position the upload icon */
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    margin-top: 0 !important;
}
.upload-input :deep(.v-chip) {
    /* Position chips over the input */
    position: absolute;
    top: 50%;
    left: 35px; /* Offset from icon */
    transform: translateY(-50%);
    opacity: 1;
    z-index: 10;
    max-width: 85%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.upload-input :deep(.v-field__field) {
    /* Clear the background of the filled variant */
    background: transparent !important;
}

/* --- Timeline Customization --- */
.timeline-custom {
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-top: -10px;
}

.timeline-item-custom {
    padding-bottom: 18px !important;
}

.timeline-card {
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    border: 1px solid #e0e0e0;
}

/* Button Styles */
.btn-rounded {
  border-radius: 30px !important;
  min-width: 140px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

/* Small Sidebar Button Style */
.btn-rounded-small {
  border-radius: 8px !important;
  min-height: 40px !important;
  font-size: 0.85rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: white !important;
  background-color: #1976d2 !important; /* Force solid blue */
}

/* Remove fixed style and unnecessary padding */
.v-main {
    padding-bottom: 24px !important; /* Reset to default bottom padding */
}

/* Responsive Styles */
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
@media (max-width: 600px) {
  .page-title-responsive {
    font-size: 0.95rem !important;
  }
  /* Ensure the submit card stacks properly on mobile */
  .v-col .card-shadow.d-flex.align-center {
    flex-direction: column;
    align-items: stretch !important;
  }
  .v-col .card-shadow.d-flex.align-center div:first-child {
    text-align: center;
    margin-bottom: 8px;
  }
  .v-col .card-shadow.d-flex.align-center .btn-rounded {
    width: 100%;
  }
}
</style>