I understand\! You want to return to the structure where **Step 1 is exclusively for the Applicant Type**, and the **Applicant Name, Address, and Representative details are moved back to the beginning of Step 2**, while keeping the beautiful new "Review & Print" design.

I have adjusted the code to implement this change and renumbered all subsequent sections in Steps 2 and 3 for a clean, logical flow.

Here is the complete, rewritten `locational.vue` code:

```vue
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
            >mdi-office-building-outline</v-icon
          >
          <h2 class="mb-0 font-weight-bold page-title-responsive gradient-text">
            Locational Clearance Application
          </h2>
        </div>
      </v-card>

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

        <v-form
          v-if="currentStep === 1"
          ref="form1"
          @submit.prevent="validateAndProceed"
        >
          <v-card class="my-2 pa-4 card-shadow">
            <v-card-title class="text-h6 card-title-responsive mb-2"
              >1. APPLICATION TYPE</v-card-title
            >
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account</v-icon
                  >
                  1.1 Type
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-radio-group
                    v-model="applicant.type"
                    :rules="[(v) => !!v || 'Please select applicant type.']"
                    mandatory
                    row 
                    color="blue-darken-3"
                    class="pt-0 mt-0"
                    density="comfortable"
                  >
                    <v-radio
                      label="Individual"
                      value="Individual"
                      class="mr-4"
                    ></v-radio>
                    <v-radio
                      label="Corporation"
                      value="Corporation"
                      class="mr-4"
                    ></v-radio>
                    <v-radio label="Others" value="Others_ApplicantType"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-form>

        <v-form
          v-else-if="currentStep === 2"
          ref="form2"
          @submit.prevent="validateAndProceed"
        >
          <v-card class="my-2 pa-4 card-shadow">
            <v-card-title class="text-h6 card-title-responsive mb-2"
              >2. PROJECT DESCRIPTION</v-card-title
            >
            <v-divider class="mb-4"></v-divider>
            <v-card-text>
              
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account-group-outline</v-icon
                  >
                  2.1 Applicant Information
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-text-field
                    v-model="applicant.name"
                    label="Applicant Name"
                    :rules="[rules.required]"
                    variant="outlined"
                    class="textfield-50"
                    density="comfortable"
                    color="blue-darken-3"
                    prepend-inner-icon="mdi-account-circle-outline"
                    hide-details="auto"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="applicant.address"
                    label="Address/Tel No."
                    :rules="[rules.required]"
                    variant="outlined"
                    class="textfield-50 mt-3"
                    density="comfortable"
                    color="blue-darken-3"
                    prepend-inner-icon="mdi-map-marker-outline"
                    hide-details="auto"
                    required
                  ></v-text-field>
                </v-card-text>
              </v-card>
              
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-card-account-details-outline</v-icon
                  >
                  2.2 Authorized Representative
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-text-field
                    v-model="applicant.authorizedRepresentative"
                    label="Authorized Representative Name (Optional)"
                    variant="outlined"
                    class="textfield-50"
                    density="comfortable"
                    color="blue-darken-3"
                    prepend-inner-icon="mdi-account-tie"
                    hide-details="auto"
                  ></v-text-field>
                  <v-text-field
                    v-model="applicant.authorizedRepresentativeAddress"
                    label="Address/Tel No. of Representative (Optional)"
                    variant="outlined"
                    class="textfield-50 mt-3"
                    density="comfortable"
                    color="blue-darken-3"
                    prepend-inner-icon="mdi-map-marker-radius-outline"
                    hide-details="auto"
                  ></v-text-field>
                </v-card-text>
              </v-card>

              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-file-document-outline</v-icon
                  >
                  2.3 Nature of Application
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-radio-group
                    v-model="project.natureOfApplication"
                    :rules="[rules.required]"
                    mandatory
                    row
                    color="blue-darken-3"
                    class="pt-0 mt-0"
                    density="comfortable"
                  >
                    <v-radio
                      label="New Development"
                      value="New Development"
                      class="mr-4"
                    ></v-radio>
                    <v-radio
                      label="Improvement / Renovation"
                      value="Improvement / Renovation"
                      class="mr-4"
                    ></v-radio>
                    <v-radio label="Others (Specify)" value="Others_Nature"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-if="project.natureOfApplication === 'Others_Nature'"
                    v-model="project.natureOfApplicationOther"
                    label="Specify Nature of Application"
                    :rules="[
                      project.natureOfApplication === 'Others_Nature'
                        ? rules.required
                        : true,
                    ]"
                    variant="outlined"
                    class="textfield-50"
                    density="comfortable"
                    color="blue-darken-3"
                    prepend-inner-icon="mdi-format-list-bulleted"
                    hide-details="auto"
                    required
                  ></v-text-field>
                </v-card-text>
              </v-card>

              <v-card class="mb-4 card-section pa-4">
                  <v-text-field
                    v-model="project.projectTitle"
                    label="2.4 Project Title"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    class="textfield-50"
                    density="comfortable"
                    color="blue-darken-3"
                    prepend-inner-icon="mdi-text-box-outline"
                    hide-details="auto"
                  ></v-text-field>

                  <v-text-field
                    v-model="project.locational"
                    label="2.5 Locational of Project"
                    :rules="[rules.required]"
                    required
                    variant="outlined"
                    class="textfield-50 mt-3"
                    density="comfortable"
                    color="blue-darken-3"
                    prepend-inner-icon="mdi-crosshairs-gps"
                    hide-details="auto"
                  ></v-text-field>
              </v-card>
              
              <v-card class="mt-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-ruler-square</v-icon
                  >
                  2.6 Building Information (sq.m. / m)
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model.number="project.floorArea"
                        label="Floor Area (sq.m.)"
                        type="number"
                        :rules="[rules.required, rules.number]"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-floor-plan"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model.number="project.height"
                        label="Height (m)"
                        type="number"
                        :rules="[rules.required, rules.number]"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-arrow-up-down"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model.number="project.numberOfStoreys"
                        label="No. of Storey(s)"
                        type="number"
                        :rules="[rules.required, rules.number]"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-layers-outline"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mt-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-map-search-outline</v-icon
                  >
                  2.7 Lot Information
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model.number="project.lotArea"
                        label="Area (sq.m.)"
                        type="number"
                        :rules="[rules.required, rules.number]"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-texture-box"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="project.tctOctNo"
                        label="TCT (OCT) No."
                        :rules="[rules.required]"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-numeric"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="project.lotOthers"
                        label="Others (Optional)"
                        variant="outlined"
                        class="textfield-50"
                        density="comfortable"
                        color="blue-darken-3"
                        prepend-inner-icon="mdi-dots-horizontal"
                        hide-details="auto"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="mt-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-handshake-outline</v-icon
                  >
                  2.8 Right Over Land
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-radio-group
                    v-model="project.rightOverLand"
                    :rules="[rules.required]"
                    mandatory
                    row
                    color="blue-darken-3"
                    class="pt-0 mt-0"
                    density="comfortable"
                  >
                    <v-radio
                      label="Land Owner"
                      value="Land Owner"
                      class="mr-4"
                    ></v-radio>
                    <v-radio label="Lessee" value="Lessee" class="mr-4"></v-radio>
                    <v-radio label="Others" value="Others_ROL"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>

              <v-card class="mt-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-clock-outline</v-icon
                  >
                  2.9 Project Tenure
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-radio-group
                    v-model="project.projectTenure"
                    :rules="[rules.required]"
                    mandatory
                    row
                    color="blue-darken-3"
                    class="pt-0 mt-0"
                    density="comfortable"
                  >
                    <v-radio
                      label="Permanent"
                      value="Permanent"
                      class="mr-4"
                    ></v-radio>
                    <v-radio
                      label="Temporary"
                      value="Temporary"
                      class="mr-4"
                    ></v-radio>
                    <v-radio label="Others" value="Others_Tenure"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>

              <v-card class="mt-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-chart-areaspline</v-icon
                  >
                  2.10 Land Use/Zoning Classification of Project Site
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-radio-group
                    v-model="project.landUseClassification"
                    :rules="[rules.required]"
                    mandatory
                    column
                    color="blue-darken-3"
                    class="pt-0 mt-0"
                    density="comfortable"
                  >
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-radio
                          label="Residential"
                          value="Residential"
                        ></v-radio>
                        <v-radio
                          label="Commercial"
                          value="Commercial"
                        ></v-radio>
                        <v-radio
                          label="Institutional"
                          value="Institutional"
                        ></v-radio>
                        <v-radio label="Others" value="Others_LandUse"></v-radio>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-radio
                          label="Agricultural"
                          value="Agricultural"
                        ></v-radio>
                        <v-radio label="Open Space" value="Open Space"></v-radio>
                        <v-radio
                          label="Industrial"
                          value="Industrial"
                        ></v-radio>
                        <v-radio label="Forestry" value="Forestry"></v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-form>

        <v-card v-else-if="currentStep === 3" class="my-2 pa-6 card-shadow">
          <v-card-title class="text-h5 font-weight-bold mb-4 text-center" style="color: #0000CC;">
            Review and Print Application Form
          </v-card-title>
          <v-divider class="mb-6"></v-divider>

          <div class="pa-4 review-document">
            
            <h3 class="text-h6 font-weight-bold mb-3 section-title-print">
              <v-icon left color="blue-darken-3" class="mr-2">mdi-account-details</v-icon>
              1. APPLICATION TYPE
            </h3>
            <v-divider class="my-2"></v-divider>
            
            <v-row dense class="review-row">
              <v-col cols="12">
                <p class="review-item">
                  <strong>1.1 Type:</strong>
                  <span class="review-value">{{ applicant.type }}</span>
                </p>
              </v-col>
            </v-row>

            <v-divider class="mt-6 mb-5"></v-divider>

            <h3 class="text-h6 font-weight-bold mb-3 section-title-print">
              <v-icon left color="blue-darken-3" class="mr-2">mdi-office-building</v-icon>
              2. PROJECT DESCRIPTION
            </h3>
            <v-divider class="my-2"></v-divider>
            
            <h4 class="font-weight-bold mt-2 mb-2 review-subtitle">2.1 Applicant Information</h4>
            <v-row dense class="review-row">
              <v-col cols="12">
                <p class="review-item">
                  <strong>Name:</strong>
                  <span class="review-value">{{ applicant.name }}</span>
                </p>
              </v-col>
              <v-col cols="12">
                <p class="review-item">
                  <strong>Address/Tel No.:</strong>
                  <span class="review-value">{{ applicant.address }}</span>
                </p>
              </v-col>
            </v-row>
            
            <h4 class="font-weight-bold mt-4 mb-2 review-subtitle">2.2 Authorized Representative (if applicable)</h4>
            <v-row dense class="review-row">
              <v-col cols="12">
                <p class="review-item">
                  <strong>Name:</strong>
                  <span class="review-value">{{ applicant.authorizedRepresentative || 'N/A' }}</span>
                </p>
              </v-col>
              <v-col cols="12">
                <p class="review-item">
                  <strong>Address/Tel No.:</strong>
                  <span class="review-value">{{ applicant.authorizedRepresentativeAddress || 'N/A' }}</span>
                </p>
              </v-col>
            </v-row>
            
            <h4 class="font-weight-bold mt-4 mb-2 review-subtitle">Project Details</h4>
            <v-row dense class="review-row">
              <v-col cols="12">
                <p class="review-item">
                  <strong>2.3 Nature of Application:</strong>
                  <span class="review-value">
                    {{
                      project.natureOfApplication === 'Others_Nature'
                        ? 'Others: ' + project.natureOfApplicationOther
                        : project.natureOfApplication
                    }}
                  </span>
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <p class="review-item">
                  <strong>2.4 Project Title:</strong>
                  <span class="review-value">{{ project.projectTitle }}</span>
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <p class="review-item">
                  <strong>2.5 Locational of Project:</strong>
                  <span class="review-value">{{ project.locational }}</span>
                </p>
              </v-col>
            </v-row>

            <h4 class="font-weight-bold mt-4 mb-2 review-subtitle">2.6 Building Information (sq.m. / m)</h4>
            <v-row dense class="review-row">
              <v-col cols="12" md="4">
                <p class="review-item inline-fill">
                  <strong>Floor Area:</strong>
                  <span class="review-value-inline">{{ project.floorArea }}</span>
                  <span class="unit-label">sq.m.</span>
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="review-item inline-fill">
                  <strong>Height:</strong>
                  <span class="review-value-inline">{{ project.height }}</span>
                  <span class="unit-label">m.</span>
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="review-item inline-fill">
                  <strong>No. of Storey(s):</strong>
                  <span class="review-value-inline">{{ project.numberOfStoreys }}</span>
                  <span class="unit-label"></span>
                </p>
              </v-col>
            </v-row>
            
            <h4 class="font-weight-bold mt-4 mb-2 review-subtitle">2.7 Lot Information</h4>
            <v-row dense class="review-row">
              <v-col cols="12" md="4">
                <p class="review-item inline-fill">
                  <strong>Area:</strong>
                  <span class="review-value-inline">{{ project.lotArea }}</span>
                  <span class="unit-label">sq.m.</span>
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="review-item inline-fill">
                  <strong>TCT (OCT) No.:</strong>
                  <span class="review-value-inline">{{ project.tctOctNo }}</span>
                  <span class="unit-label"></span>
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <p class="review-item inline-fill">
                  <strong>Others:</strong>
                  <span class="review-value-inline">{{ project.lotOthers || 'N/A' }}</span>
                  <span class="unit-label"></span>
                </p>
              </v-col>
            </v-row>

            <h4 class="font-weight-bold mt-4 mb-2 review-subtitle">Other Details</h4>
            <v-row dense class="review-row">
              <v-col cols="12" sm="6">
                <p class="review-item">
                  <strong>2.8 Right Over Land:</strong>
                  <span class="review-value">{{ project.rightOverLand }}</span>
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p class="review-item">
                  <strong>2.9 Project Tenure:</strong>
                  <span class="review-value">{{ project.projectTenure }}</span>
                </p>
              </v-col>
              <v-col cols="12">
                <p class="review-item">
                  <strong>2.10 Land Use/Zoning Classification:</strong>
                  <span class="review-value">{{ project.landUseClassification }}</span>
                </p>
              </v-col>
            </v-row>
            
            <div class="signature-block mt-10">
              <v-row dense>
                <v-col cols="6" class="text-center">
                  <div class="signature-line"></div>
                  <p class="font-weight-bold mt-2">(Authorized Representative)</p>
                  <p class="form-instruction">(signature over printed name)</p>
                </v-col>
                <v-col cols="6" class="text-center">
                  <div class="signature-line"></div>
                  <p class="font-weight-bold mt-2">(Applicant)</p>
                  <p class="form-instruction">(signature over printed name)</p>
                </v-col>
              </v-row>
            </div>
            
            <div class="notary-block mt-8 pt-4">
                <div class="text-left font-weight-medium">
                  Republic of the Philippines<br>
                  City of Naga
                  <span class="dotted-line"></span>s.s
                </div>
                <div class="subscribed-sworn-text mt-4">
                  SUBSCRIBED AND SWORN to before me this
                  <span class="review-value-inline-small"></span>
                  day of
                  <span class="review-value-inline-small"></span> 20
                  <span class="review-value-inline-small"></span>
                  affiant exhibiting his/her Community Tax Certificate No.
                  <span class="review-value-inline-small"></span> issued at
                  <span class="review-value-inline-long"></span>
                  on
                  <span class="review-value-inline-long"></span>
                </div>
                
                <div class="notary-details mt-8">
                  <v-row dense>
                      <v-col cols="4">
                          <div class="notary-line mt-5"></div>
                          <p class="form-instruction">Doc. No.</p>
                      </v-col>
                      <v-col cols="4">
                          <div class="notary-line mt-5"></div>
                          <p class="form-instruction">Book No.</p>
                      </v-col>
                      <v-col cols="4">
                          <div class="notary-line mt-5"></div>
                          <p class="form-instruction">Page No.</p>
                      </v-col>
                      <v-col cols="12">
                          <div class="notary-line mt-5"></div>
                          <p class="form-instruction">Series of 20</p>
                      </v-col>
                  </v-row>
                  <div class="text-center mt-6">
                      <div class="signature-line-thick"></div>
                      <p class="font-weight-bold mt-2">NOTARY PUBLIC</p>
                  </div>
                </div>
            </div>

          </div>

          <v-card-actions class="mt-6">
            <v-spacer></v-spacer>
            <v-btn
              color="blue-grey-lighten-4"
              class="mr-2 btn-rounded"
              elevation="2"
              @click="currentStep = 1"
              variant="tonal"
            >
              <v-icon left>mdi-pencil</v-icon>Edit Application Type
            </v-btn>
            <v-btn
              color="blue-grey-lighten-4"
              class="mr-2 btn-rounded"
              elevation="2"
              @click="currentStep = 2"
              variant="tonal"
            >
              <v-icon left>mdi-pencil</v-icon>Edit Project Info
            </v-btn>
          </v-card-actions>
        </v-card>

        <div class="d-flex justify-end mt-6 mb-8">
          <v-btn
            v-if="currentStep > 1 && currentStep < 3"
            color="blue-grey-lighten-4"
            class="mr-2 btn-rounded"
            elevation="2"
            @click="currentStep--"
            variant="tonal"
          >
            <v-icon left>mdi-arrow-left</v-icon>Back
          </v-btn>
          <v-spacer v-if="currentStep === 1" />
          <v-btn
            v-if="currentStep < 3"
            color="blue-darken-3"
            class="btn-rounded"
            elevation="2"
            @click="validateAndProceed"
            variant="elevated"
          >
            Next<v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            v-else
            color="blue-darken-3"
            class="btn-rounded"
            elevation="2"
            @click="printApplication"
            to="/applicant/LCRequirement"
            variant="elevated"
          >
            Print Application<v-icon right>mdi-printer</v-icon>
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
      // 1. Display snackbar message BEFORE printing
      this.snackbar.text = 'Printing application form... You will be redirected to the requirements page momentarily.';
      this.snackbar.color = 'blue-darken-1';
      this.snackbar.show = true;

      // 2. Open the browser print dialog
      window.print();
      
      // 3. Navigate to the next page (`/LCRequirement`) after a short delay
      // The delay allows the user time to initiate/cancel the print action.
      setTimeout(() => {
        // --- START NAVIGATION ---
        // IN A REAL VUE ROUTER APP:
        // this.$router.push('/LCRequirement'); 
        
        // FOR THIS STANDALONE EXAMPLE (Simulating Navigation):
        alert('Simulating navigation to: /LCRequirement (Next step: Submission of Requirements)');
        console.log('Navigating to: /LCRequirement');
        // If you were not using Vue Router and just wanted a standard redirect:
        // window.location.href = '/LCRequirement';
        
        // Since we are not actually navigating in this sandbox, we'll reset the form to step 1
        this.currentStep = 1;
        this.resetFormData();
        // --- END NAVIGATION ---
      }, 1500);
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
/* Gradient Title */
.gradient-text {
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Stepper Styles */
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

/* Card Styles */
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

/* --- Review & Print Styles (Kept the custom form style) --- */

.review-document {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
    font-family: 'Arial', sans-serif; 
    font-size: 14px;
}

.section-title-print {
  color: #1565c0;
  margin-top: 15px;
  padding-bottom: 5px;
  border-bottom: 1px dashed #cccccc;
}

.review-subtitle {
  color: #1976d2;
  font-size: 1rem;
  margin-left: 10px;
}

.review-row {
    padding: 0 10px;
}

.review-item {
  line-height: 1.4;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.review-item strong {
    white-space: nowrap;
    font-weight: 500;
    color: #444;
    padding-right: 5px;
}

.review-value {
    /* Style for multi-line fields (Name, Address, Project Title) */
    flex-grow: 1;
    min-height: 25px;
    padding: 0 5px;
    border-bottom: 1px dotted #000; /* Dotted line fill */
    font-weight: 600;
    color: #000;
    line-height: 1.2;
    overflow-wrap: break-word; /* Handle long text */
}

/* Inline fill style for grouped fields like Building/Lot Info */
.review-item.inline-fill {
    display: flex;
    align-items: baseline; /* Align value and unit label */
}

.review-value-inline {
    /* Style for single-line, numerical/short fields */
    flex-grow: 1;
    min-width: 30px; /* Ensure space for the dotted line */
    padding: 0 3px;
    border-bottom: 1px dotted #000;
    font-weight: 600;
    color: #000;
    text-align: center;
}

.unit-label {
    white-space: nowrap;
    padding-left: 3px;
    font-style: italic;
    color: #333;
}

.signature-line {
    border-bottom: 2px solid #000;
    width: 80%;
    margin: 0 auto;
    height: 1px;
}

.signature-line-thick {
    border-bottom: 3px solid #000;
    width: 60%;
    margin: 0 auto;
    height: 1px;
}

.form-instruction {
    font-size: 0.8em;
    font-style: italic;
    color: #666;
    margin-top: 2px;
}

.subscribed-sworn-text {
    line-height: 2.2; /* Increased line-height for dotted line spacing */
    font-weight: 500;
}

.review-value-inline-small {
    min-width: 40px; /* Shorter line for Day/Month/Year */
    border-bottom: 1px dotted #000;
    display: inline-block;
    padding: 0 5px;
    text-align: center;
}

.review-value-inline-long {
    min-width: 100px; /* Longer line for CTC No. and location */
    border-bottom: 1px dotted #000;
    display: inline-block;
    padding: 0 5px;
    text-align: center;
}

.dotted-line {
    border-bottom: 1px dotted #000;
    display: inline-block;
    width: 50px; /* Space for the "s.s" declaration */
    margin-left: 5px;
}

.notary-line {
    border-bottom: 1px solid #000;
    margin-bottom: 5px;
}

/* --- End Review & Print Styles --- */

/* Form Element Styles */
.textfield-50 .v-input__control {
  min-height: 50px;
  border-radius: 8px;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
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

/* Print-specific styles to ensure a clean document output */
@media print {
  /* Hide UI elements not meant for the printout */
  .v-app-bar,
  .v-stepper,
  .d-flex.justify-end, /* Hides the Next/Print buttons at the bottom */
  .v-card-actions, /* Hides the Edit buttons inside the review card */
  .v-snackbar {
    display: none !important;
  }

  /* Make the main content fill the page and remove shadows/backgrounds */
  .v-main, .v-container {
    padding: 0 !important;
    margin: 0 auto !important;
    max-width: 100% !important;
  }

  .card-shadow, .card-section {
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  .v-card-title {
    text-align: center;
  }

  /* Ensure text is black for printing */
  * {
    color: #000 !important;
    background: transparent !important;
  }

  /* Ensure the review document border shows up */
  .review-document {
    border: 1px solid #000 !important;
    padding: 15px !important;
  }
  
  /* Force dotted line to be a solid line on print, or keep dotted if supported */
  .review-value, .review-value-inline, .review-value-inline-small, .review-value-inline-long {
    border-bottom: 1px solid #000 !important; /* Use solid line for guaranteed print visibility */
    background-color: white !important;
    padding: 0 5px !important;
    font-weight: 600 !important;
  }
  
  .review-item strong {
      font-weight: bold !important;
  }
  
  /* Fix layout for print */
  .review-row {
    break-inside: avoid; /* Prevent a row from splitting across pages */
  }
  
  .signature-block, .notary-block {
      break-inside: avoid;
  }
}
</style>
```