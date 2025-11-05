<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" class="no-print">
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
     
      <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
        <div class="d-flex align-center my-4 no-print">
          <v-icon color="blue-darken-3" size="40" class="mr-2">mdi-home-city</v-icon>
          <h1 class="page-title-responsive gradient-text font-weight-bold">
            Excavation Permit Application
          </h1>
        </div>

        <v-stepper
          v-model="currentStep"
          alt-labels
          flat
          class="mb-4 mt-2 stepper-elevated no-print"
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
        
        <v-card
          v-if="currentStep === 4"
          class="my-2 pa-4 card-shadow no-print"
          color="blue-lighten-5"
          elevation="0"
        >
          <v-card-title class="text-h6 card-title-responsive text-blue-darken-3"
            >FINAL REVIEW: EXCAVATION PERMIT APPLICATION</v-card-title
          >
          <v-card-text>
            <div class="text-subtitle-1 text-blue-darken-3 font-weight-medium">
              Review the complete application below. **All fields are locked (read-only)** to maintain the original form UI for verification.
            </div>
          </v-card-text>
        </v-card>

        <div id="print-area">
          
          <v-card 
            v-if="currentStep === 4" 
            class="print-header mb-4 elevation-0"
          >
            <div class="text-center" style="font-size: 10pt; line-height: 1.2;">
              <div class="text-right" style="margin-right: 20px;">NBC FORM NO. B-02</div>
              <div>Republic of the Philippines</div>
              <div class="font-weight-bold">CITY OF NAGA</div>
              <div>Province of Camarines Sur</div>
              <div class="mt-2 font-weight-bold">OFFICE OF THE BUILDING OFFICIAL</div>
              <div class="text-h6 font-weight-bold mt-2 text-uppercase">EXCAVATION AND GROUND PREPARATION PERMIT</div>
            </div>
            
            <v-row dense class="mt-4 permit-info-row">
              <v-col cols="4">
                <v-text-field
                  v-model="permit.applicationNo"
                  label="APPLICATION NO."
                  readonly
                  variant="underlined"
                  density="compact"
                  hide-details
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="permit.egppNo"
                  label="EGPP NO."
                  readonly
                  variant="underlined"
                  density="compact"
                  hide-details
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="permit.buildingPermitNo"
                  label="BUILDING PERMIT NO."
                  readonly
                  variant="underlined"
                  density="compact"
                  hide-details
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
          
          <v-form
            :ref="`form${currentStep}`"
            @submit.prevent="validateAndProceed"
          >
            <v-card
              v-if="currentStep === 1 || currentStep === 4"
              class="my-2 pa-4 card-shadow elevation-0"
              :class="{ 'print-card-border': currentStep === 4 }"
            >
              <v-card-title class="text-h6 card-title-responsive mb-2 font-weight-bold print-box-title"
                >BOX 1 (TO BE ACCOMPLISHED BY THE OWNER/APPLICANT)</v-card-title
              >
              <v-divider class="mb-4"></v-divider>
              <v-card-text>
                <v-card class="mb-4 card-section elevation-0">
                  <v-card-title
                    class="text-h6 card-title-responsive section-title"
                  >
                    1.1 Owner/Applicant Details
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="applicant.lastName"
                          label="Last Name"
                          :rules="currentStep === 1 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="applicant.firstName"
                          label="First Name"
                          :rules="currentStep === 1 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="applicant.mi"
                          label="M.I."
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3">
                        <v-text-field
                          v-model="applicant.tin"
                          label="TIN"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense class="mt-3">
                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="applicant.formOfOwnership"
                          label="Form of Ownership"
                          :rules="currentStep === 1 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="applicant.useOrCharacterOfOccupancy"
                          label="Use or Character of Occupancy"
                          :rules="currentStep === 1 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <v-text-field
                          v-model="applicant.telephoneNo"
                          label="Telephone No."
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="applicant.enterpriseName"
                      label="For Construction Owned by an Enterprise: Name, Address, Zipcode"
                      :readonly="readonly"
                      variant="outlined"
                      class="mt-3"
                      density="comfortable"
                      color="blue-darken-3"
                      prepend-inner-icon="mdi-domain"
                      hide-details="auto"
                    ></v-text-field>
                  </v-card-text>
                </v-card>

                <v-card class="mt-4 card-section elevation-0">
                  <v-card-title
                    class="text-h6 card-title-responsive section-title"
                  >
                    1.2 Location of Excavation
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="project.lotNo"
                          label="Lot No."
                          :rules="currentStep === 1 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="project.blkNo"
                          label="Blk No."
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense class="mt-3">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="project.tctNo"
                          label="TCT No."
                          :rules="currentStep === 1 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="project.taxDecNo"
                          label="Tax Dec. No."
                          :rules="currentStep === 1 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="project.address"
                      label="Street, Barangay, City/Municipality"
                      :rules="currentStep === 1 ? [rules.required] : []"
                      :readonly="readonly"
                      variant="outlined"
                      class="mt-3"
                      density="comfortable"
                      color="blue-darken-3"
                      prepend-inner-icon="mdi-crosshairs-gps"
                      hide-details="auto"
                      required
                    ></v-text-field>
                  </v-card-text>
                </v-card>

                <v-card class="mt-4 card-section elevation-0">
                  <v-card-title
                    class="text-h6 card-title-responsive section-title"
                  >
                    1.3 Scope of Excavation Work
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense>
                      <v-col
                        v-for="(label, value) in scopeOfWorkOptions"
                        :key="value"
                        cols="12"
                        sm="4"
                      >
                        <v-checkbox
                          v-model="project.scopeOfWork"
                          :label="label"
                          :value="value"
                          :readonly="readonly"
                          color="blue-darken-3"
                          hide-details="auto"
                          class="my-0 py-0"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-if="project.scopeOfWork.includes('OTHERS')"
                      v-model="project.scopeOther"
                      label="Specify Other Scope of Work"
                      :rules="
                        project.scopeOfWork.includes('OTHERS') && !readonly
                          ? [rules.required]
                          : []
                      "
                      :readonly="readonly"
                      variant="outlined"
                      class="mt-3"
                      density="comfortable"
                      color="blue-darken-3"
                      hide-details="auto"
                    ></v-text-field>
                  </v-card-text>
                </v-card>

                <v-card class="mt-4 card-section elevation-0">
                  <v-card-title
                    class="text-h6 card-title-responsive section-title"
                  >
                    1.4 Use or Character of Occupancy (of the adjacent/planned structure)
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense>
                      <v-col
                        v-for="(label, value) in occupancyOptions"
                        :key="value"
                        cols="12"
                        sm="6"
                      >
                        <v-checkbox
                          v-model="project.occupancy"
                          :label="`${value} : ${label}`"
                          :value="value"
                          :readonly="readonly"
                          color="blue-darken-3"
                          hide-details="auto"
                          class="my-0 py-0"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-if="project.occupancy.includes('OTHERS')"
                      v-model="project.occupancyOther"
                      label="Specify Other Use or Character of Occupancy"
                      :rules="
                        project.occupancy.includes('OTHERS') && !readonly
                          ? [rules.required]
                          : []
                      "
                      :readonly="readonly"
                      variant="outlined"
                      class="mt-3"
                      density="comfortable"
                      color="blue-darken-3"
                      hide-details="auto"
                    ></v-text-field>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>

            <v-card
              v-if="currentStep === 2 || currentStep === 4"
              class="my-2 pa-4 card-shadow elevation-0"
              :class="{ 'print-card-border': currentStep === 4 }"
            >
              <v-card-title class="text-h6 card-title-responsive mb-2 font-weight-bold"
                >Construction Information</v-card-title
              >
              <v-divider class="mb-4"></v-divider>
              <v-card-text>
                <v-card class="mb-6 card-section elevation-0">
                  <v-card-title
                    class="text-h6 card-title-responsive section-title"
                  >
                    <v-icon left color="blue-darken-3" class="mr-2"
                      >mdi-palette-outline</v-icon
                    >
                    BOX 2: DESIGN PROFESSIONAL, PLANS AND SPECIFICATIONS
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-text-field
                      v-model="designProf.designerName"
                      label="Architect or Civil Engineer (Signed and Sealed Over Printed Name)"
                      :rules="currentStep === 2 ? [rules.required] : []"
                      :readonly="readonly"
                      variant="outlined"
                      class="textfield-50"
                      density="comfortable"
                      color="blue-darken-3"
                      prepend-inner-icon="mdi-badge-account-outline"
                      hide-details="auto"
                      required
                    ></v-text-field>
                    <v-row dense class="mt-3">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="designProf.prcNo"
                          label="PRC No."
                          :rules="currentStep === 2 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="designProf.validity"
                          label="Validity"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense class="mt-3">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="designProf.ptrNo"
                          label="PTR No."
                          :rules="currentStep === 2 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="designProf.dateIssued"
                          label="Date Issued"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="designProf.issuedAt"
                      label="Issued at (TIN)"
                      :readonly="readonly"
                      variant="outlined"
                      class="mt-3"
                      density="comfortable"
                      color="blue-darken-3"
                      hide-details="auto"
                    ></v-text-field>
                  </v-card-text>
                </v-card>

                <v-card class="mt-6 card-section elevation-0">
                  <v-card-title
                    class="text-h6 card-title-responsive section-title"
                  >
                    <v-icon left color="blue-darken-3" class="mr-2"
                      >mdi-account-hard-hat</v-icon
                    >
                    BOX 3: FULL-TIME INSPECTOR AND SUPERVISOR OF CONSTRUCTION WORKS
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-text-field
                      v-model="inspector.inspectorName"
                      label="Architect or Civil Engineer (Signed and Sealed Over Printed Name)"
                      :rules="currentStep === 2 ? [rules.required] : []"
                      :readonly="readonly"
                      variant="outlined"
                      class="textfield-50"
                      density="comfortable"
                      color="blue-darken-3"
                      prepend-inner-icon="mdi-badge-account-check-outline"
                      hide-details="auto"
                      required
                    ></v-text-field>
                    <v-row dense class="mt-3">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="inspector.prcNo"
                          label="PRC No."
                          :rules="currentStep === 2 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="inspector.validity"
                          label="Validity"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense class="mt-3">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="inspector.ptrNo"
                          label="PTR No."
                          :rules="currentStep === 2 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="inspector.dateIssued"
                          label="Date Issued"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="inspector.issuedAt"
                      label="Issued at (TIN)"
                      :readonly="readonly"
                      variant="outlined"
                      class="mt-3"
                      density="comfortable"
                      color="blue-darken-3"
                      hide-details="auto"
                    ></v-text-field>
                  </v-card-text>
                </v-card>

                <v-card class="mt-6 card-section elevation-0">
                  <v-card-title
                    class="text-h6 card-title-responsive section-title"
                  >
                    <v-icon left color="blue-darken-3" class="mr-2"
                      >mdi-format-list-checks</v-icon
                    >
                    BOX 6: Scope of Work (TO BE ACCOMPLISHED BY THE DESIGN PROFESSIONAL)
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                          v-model="boxSix.scope"
                          :label="boxSixOptions.EXCAVATION_AND_FILLS"
                          value="EXCAVATION_AND_FILLS"
                          :readonly="readonly"
                          color="blue-darken-3"
                          hide-details="auto"
                          class="my-0 py-0"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                          v-model="boxSix.scope"
                          :label="boxSixOptions.FOUNDATION_AND_RETAINING_WALLS"
                          value="FOUNDATION_AND_RETAINING_WALLS"
                          :readonly="readonly"
                          color="blue-darken-3"
                          hide-details="auto"
                          class="my-0 py-0"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                          v-model="boxSix.scope"
                          :label="boxSixOptions.PILE_FOUNDATIONS"
                          value="PILE_FOUNDATIONS"
                          :readonly="readonly"
                          color="blue-darken-3"
                          hide-details="auto"
                          class="my-0 py-0"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                        <v-checkbox
                          v-model="boxSix.scope"
                          :label="boxSixOptions.GRADING_AND_EARTHWORKS"
                          value="GRADING_AND_EARTHWORKS"
                          :readonly="readonly"
                          color="blue-darken-3"
                          hide-details="auto"
                          class="my-0 py-0"
                        ></v-checkbox>
                      </v-col>
                      
                      <v-col cols="12" sm="6" md="3">
                        <v-text-field
                          v-model="boxSix.otherScope"
                          label="OTHERS (Specify)"
                          :readonly="readonly"
                          variant="outlined"
                          density="comfortable"
                          color="blue-darken-3"
                          hide-details="auto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label=" "
                            readonly
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                            class="no-pointer-events"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label=" "
                            readonly
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                            class="no-pointer-events"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            label=" "
                            readonly
                            variant="outlined"
                            density="comfortable"
                            hide-details="auto"
                            class="no-pointer-events"
                          ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>

            <v-card
              v-if="currentStep === 3 || currentStep === 4"
              class="my-2 pa-4 card-shadow elevation-0"
              :class="{ 'print-card-border': currentStep === 4 }"
            >
              <v-card-title class="text-h6 card-title-responsive mb-2 font-weight-bold"
                >PROJECT OWNER AND LOT OWNER SIGNATURES</v-card-title
              >
              <v-divider class="mb-4"></v-divider>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="6">
                    <v-card class="mb-6 card-section elevation-0">
                      <v-card-title
                        class="text-h6 card-title-responsive section-title"
                      >
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-home-account</v-icon
                        >
                        BOX 4: Project Owner
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-text-field
                          v-model="owner.signatureName"
                          label="Project Owner (Signature Over Printed Name)"
                          :rules="currentStep === 3 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          class="textfield-50"
                          density="comfortable"
                          color="blue-darken-3"
                          prepend-inner-icon="mdi-signature-text"
                          hide-details="auto"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="owner.address"
                          label="Address"
                          :rules="currentStep === 3 ? [rules.required] : []"
                          :readonly="readonly"
                          variant="outlined"
                          class="mt-3"
                          density="comfortable"
                          color="blue-darken-3"
                          prepend-inner-icon="mdi-map-marker-account-outline"
                          hide-details="auto"
                          required
                        ></v-text-field>
                        <v-row dense class="mt-3">
                          <v-col cols="12" sm="4">
                            <v-text-field
                              v-model="owner.ctcNo"
                              label="C.T.C. No."
                              :rules="currentStep === 3 ? [rules.required] : []"
                              :readonly="readonly"
                              variant="outlined"
                              density="comfortable"
                              color="blue-darken-3"
                              hide-details="auto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field
                              v-model="owner.dateIssued"
                              label="Date Issued"
                              :readonly="readonly"
                              variant="outlined"
                              density="comfortable"
                              color="blue-darken-3"
                              hide-details="auto"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field
                              v-model="owner.placeIssued"
                              label="Place Issued"
                              :readonly="readonly"
                              variant="outlined"
                              density="comfortable"
                              color="blue-darken-3"
                              hide-details="auto"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card class="mt-md-0 mt-6 card-section elevation-0">
                      <v-card-title
                        class="text-h6 card-title-responsive section-title"
                      >
                        <v-icon left color="blue-darken-3" class="mr-2"
                          >mdi-sign-text-outline</v-icon
                        >
                        BOX 5: WITH MY CONSENT: LOT OWNER
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-text-field
                          v-model="lotOwner.signatureName"
                          label="Lot Owner (Signature Over Printed Name)"
                          :readonly="readonly"
                          variant="outlined"
                          class="textfield-50"
                          density="comfortable"
                          color="blue-darken-3"
                          prepend-inner-icon="mdi-signature-text"
                          hide-details="auto"
                        ></v-text-field>
                        <v-text-field
                          v-model="lotOwner.address"
                          label="Address"
                          :readonly="readonly"
                          variant="outlined"
                          class="mt-3"
                          density="comfortable"
                          color="blue-darken-3"
                          prepend-inner-icon="mdi-map-marker-account-outline"
                          hide-details="auto"
                        ></v-text-field>
                        <v-row dense class="mt-3">
                          <v-col cols="12" sm="4">
                            <v-text-field
                              v-model="lotOwner.ctcNo"
                              label="C.T.C. No."
                              :readonly="readonly"
                              variant="outlined"
                              density="comfortable"
                              color="blue-darken-3"
                              hide-details="auto"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field
                              v-model="lotOwner.dateIssued"
                              label="Date Issued"
                              :readonly="readonly"
                              variant="outlined"
                              density="comfortable"
                              color="blue-darken-3"
                              hide-details="auto"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <v-text-field
                              v-model="lotOwner.placeIssued"
                              label="Place Issued"
                              :readonly="readonly"
                              variant="outlined"
                              density="comfortable"
                              color="blue-darken-3"
                              hide-details="auto"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-form>

          <v-card 
            v-if="currentStep === 4" 
            class="my-4 pa-4 card-shadow elevation-0 print-card-border"
          >
              <v-card-title class="text-h6 card-title-responsive section-title text-uppercase">
                BOX 7 (TO BE ACCOMPLISHED BY THE BUILDING OFFICIAL)
              </v-card-title>
              <v-card-text>
                <div class="font-weight-bold mb-3" style="font-size: 0.95rem;">
                  ACTION TAKEN: PERMIT IS HEREBY ISSUED/GRANTED SUBJECT TO THE FOLLOWING CONDITIONS:
                </div>
                <ol style="font-size: 0.9rem; padding-left: 20px;">
                  <li class="mb-2">That under Article 1723 of the Civil Code of the Philippines, the engineer or architect who drew up the plans and specifications for a building/structure is liable for damages if within fifteen (15) years from the completion of the building/structure, the same should collapse due to defect in the plans or specifications or defects in the ground. The engineer or architect who supervises the construction shall be solidarily liable with the contractor should the edifice collapse due to defect in the construction or the use of inferior materials.</li>
                  <li class="mb-2">That the proposed excavation and ground preparation of the project site shall be in conformity with the zoning ordinance and the provisions of the "National Building Code" (P.D. 1096), the National Structural Code of the Philippines and its Implementing Rules and Regulations.
                    <ol style="list-style-type: lower-alpha; padding-left: 20px;">
                      <li>That prior to commencement of the proposed projects and construction an actual relocation survey shall be conducted by responsible licensed Geodetic Engineer.</li>
                      <li>That before commencing the excavation the person making or causing the excavation to be made shall verify in writing the owner of adjoining building not less than ten (10) days before such excavation is to be made and show how the adjoining building should be protected.</li>
                      <li>That the owner of the building shall engage the services of a responsible licensed Architect or Civil Engineer to undertake the full-time inspection and supervision of the construction work.</li>
                      <li>That there shall be kept at the jobsite at all times a logbook of daily construction activities wherein the actual daily progress of construction including test conducted, weather condition and other pertinent data are to be recorded, same shall be made available for scrutiny and comments by the OBO representative during the conduct of his/her inspection pursuant to Section 207 of the National Building Code.</li>
                      <li>That upon completion of the excavation and ground preparation of the project site the said responsible licensed supervising Architect or Civil Engineer shall prepare and submit a Certificate of Completion of the project stating that the excavation and ground preparation of the project site conforms to the provision of the "National Building Code" (P.D. 1096).</li>
                    </ol>
                  </li>
                  <li class="mb-2">All public facilities and utilities such as streets, sidewalks, curbs, gutters, electric posts, power and communication lines, water, sewer and drainage lines and the like shall be properly protected against any damage and obstruction. Any facility and/or utility damaged shall be properly repaired and restored to its original condition by the owner/applicant subject to the approval of the Building Official and the proper authorities concerned.</li>
                  <li class="mb-2">The owner and contractor shall be jointly responsible for the safety, protection, security and convenience of the general public and his/her personnel, third parties, the works, equipment and the like. All wastes or discarded materials from the project shall be properly stored and disposed of. Water wastes shall be discharged directly into drainage lines. Pertinent provisions of the National Building Code (P.D. 1096) shall be complied with.</li>
                  <li class="mb-2">That this permit does not guarantee the subsequent granting of the principal building permit under process and that the owner/applicant undertakes the work or project at his/her own risk.</li>
                  <li class="mb-2">That this permit shall not serve as an exemption from securing permits/written clearances from various government authorities exercising regulatory function affecting buildings and other related structures.</li>
                  <li class="mb-2">For excavations more than fifty (50) cubic meters and more than two (2) meters in depth, the owner/permittee shall post a cash bond of fifty thousand pesos (P 50, 000.00) for the first fifty (50) cubic meters and three hundred pesos (P 300.00) for every cubic meter thereafter to be deposited with the O.B.O. Said excavations shall not exceed one hundred (100) cubic meters or three (3) meters in depth until the building permit is issued and shall not be left open without any work being done in the site for more than one hundred twenty (120) days, otherwise, the cash bond shall be forfeited in favor of the government to cover the expense for the necessary restoration should the owner/permittee fail to restore the same. If the bond is insufficient to effect the necessary restoration, additional cost to be incurred to complete the restoration shall be charged to the account of the owner/permittee or to whoever shall assume ownership of the property.</li>
                </ol>
                
                <div class="mt-6">
                  <div class="text-uppercase font-weight-bold mb-1">PERMIT ISSUED BY:</div>
                  <div class="text-center mt-6" style="font-size: 1.1rem;">
                    <div class="font-weight-bold">{{ permit.issuedBy }}</div>
                    <div class="signature-line"></div>
                    <div>BUILDING OFFICIAL</div>
                    <div style="font-size: 0.85rem;">(Signature Over Printed Name)</div>
                    <v-text-field
                      v-model="permit.dateIssued"
                      label="Date"
                      readonly
                      variant="underlined"
                      density="compact"
                      hide-details
                      class="date-issued-field"
                    ></v-text-field>
                  </div>
                </div>
              </v-card-text>
          </v-card>
          </div>
        <div class="d-flex justify-end mt-6 mb-8 no-print">
          <v-btn
            v-if="currentStep > 1"
            color="blue-grey-lighten-4"
            class="mr-2 btn-rounded"
            elevation="2"
            @click="currentStep--"
            variant="tonal"
          >
            <v-icon left>mdi-arrow-left</v-icon>Back
          </v-btn>
          <v-spacer v-if="currentStep > 1" />
          <v-btn
            v-if="currentStep < 4"
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
  name: 'NagaExcavationPermitForm',
  data() {
    return {
      currentStep: 1,
      steps: [
        { title: 'Applicant Details', value: 1 },
        { title: 'Construction Information', value: 2 },
        { title: 'Signatories', value: 3 },
        { title: 'Review & Print', value: 4 },
      ],

      // --- Data Models (Aligned with Excavation Permit Form) ---
      applicant: {
        lastName: 'Dela Cruz',
        firstName: 'Juan',
        mi: 'P',
        tin: '123-456-789-000',
        enterpriseName: 'JPDC Construction Services, 123 Main St, Naga City, 4400',
        formOfOwnership: 'Individual',
        useOrCharacterOfOccupancy: 'Single Family Dwelling',
        telephoneNo: '0917-123-4567',
      },
      project: {
        lotNo: '15',
        blkNo: '4',
        tctNo: 'T-123456',
        taxDecNo: 'TD-001-98765',
        address: 'Blk 4, Lot 15, P. Burgos St., Barangay San Roque, Naga City',
        scopeOfWork: ['NEW_CONSTRUCTION', 'OTHERS'],
        scopeOther: 'Temporary shoring for adjacent fence',
        occupancy: ['GROUP A'],
        occupancyOther: '',
      },
      designProf: {
        designerName: 'Engr. Pedro S. Reyes',
        prcNo: '0012345',
        validity: '12/31/2026',
        ptrNo: '1234567',
        dateIssued: '01/05/2025',
        issuedAt: 'Naga City (TIN: 999-888-777-000)',
      },
      inspector: {
        inspectorName: 'Engr. Maria C. Santos',
        prcNo: '0054321',
        validity: '11/30/2027',
        ptrNo: '7654321',
        dateIssued: '01/05/2025',
        issuedAt: 'Manila (TIN: 111-222-333-000)',
      },
      owner: {
        signatureName: 'Juan P. Dela Cruz',
        address: '123 Main St, Naga City',
        ctcNo: '12345678',
        dateIssued: '01/01/2025',
        placeIssued: 'Naga City',
      },
      lotOwner: {
        signatureName: 'Maria T. Garcia',
        address: '456 Secondary St, Naga City',
        ctcNo: '87654321',
        dateIssued: '01/01/2025',
        placeIssued: 'Naga City',
      },
      // --- Data Model for BOX 6 ---
      boxSix: {
        scope: ['EXCAVATION_AND_FILLS'],
        otherScope: 'Soil testing and analysis',
      },
      // --- Data Model for Permit Header/Footer ---
      permit: {
        applicationNo: '112-2025',
        egppNo: 'EGPP-003-2025',
        buildingPermitNo: 'BP-01-2025',
        issuedBy: 'ELMER T. ALBO',
        dateIssued: '02/10/2025',
      },

      // --- Options for Checkboxes (Kept the original options for structure compatibility) ---
      scopeOfWorkOptions: {
        NEW_CONSTRUCTION: 'New Construction/Foundation',
        RENOVATION: 'Underpinning/Deepening',
        ERECTION: 'Earth Moving/Dredging',
        REPAIR: 'Utility Trenching',
        ADDITION: 'Drainage/Septic Installation',
        OTHERS: 'Others (Specify)',
      },
      occupancyOptions: {
        'GROUP A': 'RESIDENTIAL: DWELLINGS',
        'GROUP B': 'RESIDENTIAL: HOTEL, APARTMENT',
        'GROUP C': 'EDUCATIONAL, RECREATIONAL',
        'GROUP D': 'INSTITUTIONAL',
        'GROUP E': 'BUSINESS AND MERCANTILE',
        'GROUP F': 'INDUSTRIAL',
        'GROUP G': 'INDUSTRIAL: STORAGE AND HAZARDOUS',
        'GROUP H': 'RECREATIONAL: ASSEMBLY OCCUPANT LOAD LESS THAN 1000',
        'GROUP I': 'RECREATIONAL: ASSEMBLY OCCUPANT LOAD 1000 OR MORE',
        'GROUP J': 'AGRICULTURAL: ACCESSORY',
        'OTHERS': 'OTHERS (Specify)',
      },
      // --- Options for BOX 6 ---
      boxSixOptions: {
        EXCAVATION_AND_FILLS: 'EXCAVATION AND FILLS',
        FOUNDATION_AND_RETAINING_WALLS: 'FOUNDATION AND RETAINING WALLS',
        PILE_FOUNDATIONS: 'PILE FOUNDATIONS',
        GRADING_AND_EARTHWORKS: 'GRADING AND EARTHWORKS (Including fills and embankment.)',
      },

      // --- Validation Rules ---
      rules: {
        required: (value) => !!value || 'This field is required.',
        number: (value) =>
          (value !== null && value !== '' && !isNaN(value) && value >= 0) ||
          'Must be a valid non-negative number.',
      },

      // --- Snackbar for messages ---
      snackbar: {
        show: false,
        text: '',
        color: '',
        timeout: 3000,
        multiline: false,
      },
    };
  },
  computed: {
    // Determines if fields should be read-only (used in Step 4)
    readonly() {
      return this.currentStep === 4;
    },
  },
  methods: {
    async validateAndProceed() {
      // Validation is only for input steps (1, 2, 3)
      if (this.currentStep === 4) {
        return;
      }
      
      const formRef = this.$refs[`form${this.currentStep}`];

      if (formRef) {
        // We only perform validation if we are NOT in the review step (currentStep !== 4)
        if (this.currentStep < 4) {
             const { valid } = await formRef.validate();
            if (valid) {
              this.currentStep++; // Move to the next step
            } else {
              // Show a hint if validation fails
              this.snackbar.text = 'Please complete all required fields in this section.';
              this.snackbar.color = 'red-darken-1';
              this.snackbar.show = true;
            }
        }
      }
    },
    printApplication() {
      // Use the browser's native print function, specifically targeting the print-area
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

/* Print-Specific Styles (Only apply when printing) */
.print-card-border {
  border: 1px solid black !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  margin-bottom: 0 !important;
}

.print-box-title {
    background-color: #f0f0f0;
    padding: 8px !important;
    border-bottom: 1px solid black;
    font-size: 1rem !important;
    color: black !important;
}

.permit-info-row .v-text-field {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

.permit-info-row .v-text-field label {
  font-size: 0.8rem;
  color: black !important;
}

.signature-line {
  height: 1px;
  background-color: black;
  width: 250px;
  margin: 0 auto 5px auto;
}

.date-issued-field {
  width: 250px;
  margin: 0 auto;
}

/* Hide placeholder text for visually empty fields in BOX 6 on print */
.no-pointer-events .v-field__input {
  visibility: hidden;
}


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
    font-size: 1.02rem !important;
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

/* --- PRINT MEDIA QUERY: Hides non-printable elements and resets styles for an A4 page look --- */
@media print {
  /* Hide all elements not directly part of the application content */
  body > :not(#app) { display: none; }
  .no-print, .v-snackbar, .v-app-bar, .v-stepper, .v-main > .v-container > .d-flex.align-center.my-4, .d-flex.justify-end.mt-6.mb-8 {
    display: none !important;
  }

  /* Make the print area take over the full screen */
  html, body, #app, .v-application, .v-main, .v-main > .v-container {
    padding: 0 !important;
    margin: 0 !important;
    max-width: none !important;
    height: auto;
    min-height: auto;
    overflow: visible;
  }
  
  /* Apply border/style resets for a clean form look */
  #print-area {
    margin: 0;
    padding: 10mm; /* A little padding for A4 margin effect */
    width: 100%;
    box-shadow: none;
  }

  /* Reset card/section styling for a paper form look */
  .v-card, .v-sheet, .card-shadow, .card-section {
    box-shadow: none !important;
    border-radius: 0 !important;
    background-color: white !important;
    border: 0 !important; /* Remove individual card borders */
  }

  /* Force borders where needed on the final printout */
  .print-card-border {
    border: 1px solid black !important;
    margin-bottom: 8px !important;
  }

  /* Adjust field/label density for printing */
  .v-text-field {
    font-size: 0.8rem;
  }
  .v-text-field .v-field__input {
    min-height: 20px;
    padding-top: 0 !important;
    font-size: 0.9rem !important;
    color: black !important;
  }
  .v-field--variant-outlined {
    border: 1px solid black !important;
  }
  .v-field--variant-outlined .v-field__outline {
    border-color: black !important;
  }
  .v-field--variant-underlined .v-field__input {
    border-bottom: 1px solid black !important;
  }

  /* Checkbox styling adjustments */
  .v-checkbox {
    font-size: 0.9rem;
    height: auto !important;
    min-height: 0 !important;
  }
  .v-checkbox .v-selection-control__input {
    border: 1px solid black;
    border-radius: 0;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
  .v-checkbox .v-label {
    opacity: 1; /* Ensure labels are visible */
  }

  .print-header {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
}
</style>