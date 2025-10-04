<template>
  <v-app>
    <v-app-bar flat color="blue-darken-3" dark height="88" app> </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6"
        style="
          background-color: white;
          border-bottom: 1px solid #e0e0e0;
          height: 50px;
        "
      >
        <div class="d-flex align-center">
          <v-icon color="blue-darken-3" class="mr-3"
            >mdi-office-building-outline</v-icon
          >
          <h3 class="mb-0 font-weight-bold page-title-responsive">
            Building Permit Application
          </h3>
        </div>
      </v-card>

      <v-container fluid class="px-4 mx-auto a4-container print-content">
        <v-stepper v-model="currentStep" alt-labels flat class="mb-4 no-print">
          <v-stepper-header>
            <template v-for="(step, index) in steps" :key="index">
              <v-stepper-item
                :title="step.title"
                :value="step.value"
                :complete="currentStep > step.value"
                :color="currentStep >= step.value ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                v-if="index < steps.length - 1"
                :thickness="3"
                :style="{
                  'border-color':
                    currentStep > step.value ? '#2196F3' : 'lightgrey',
                }"
              ></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>

        <v-card class="my-2 pa-4 print-form-card">
          <v-card-text>
            <div class="review-section" id="form-to-download">
              <div class="mb-4 text-center">
                <p class="text-caption mb-0">Republic of the Philippines</p>
                <p class="text-caption mb-0">City/Municipality of Naga</p>
                <p class="text-caption font-italic">
                  Province of Camarines Sur
                </p>
                <h4 class="text-h6 font-weight-bold mt-2">
                  UNIFIED APPLICATION FORM FOR BUILDING PERMIT
                </h4>
              </div>

              <div class="centered-checkbox-group mx-auto">
                <div class="d-flex justify-space-between">
                  <v-checkbox
                    v-model="reviewData.isSimple"
                    label="SIMPLE"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="reviewData.isComplex"
                    label="COMPLEX*"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                </div>
                <div class="d-flex">
                  <v-checkbox
                    v-model="reviewData.isNew"
                    label="NEW"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-model="reviewData.isRenewal"
                    label="RENEWAL"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-model="reviewData.isAmendatory"
                    label="AMENDATORY"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                </div>
                <div class="d-flex align-center">
                  <p
                    class="text-caption text-uppercase mb-0 mr-2 flex-shrink-0"
                  >
                    THIS APPLIES ALSO FOR:
                  </p>
                  <v-checkbox
                    v-model="reviewData.hasLocationalClearance"
                    label="LOCATIONAL CLEARANCE"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-model="reviewData.hasFireSafetyEvaluationClearance"
                    label="FIRE SAFETY EVALUATION CLEARANCE"
                    hide-details
                    density="compact"
                  ></v-checkbox>
                </div>
              </div>

              <v-row dense class="mt-4 align-center">
                <v-col cols="12" sm="8" class="pa-0 pl-3">
                  <v-col cols="auto" class="d-flex flex-column pa-0">
                    <p class="application-label">APPLICATION NO.</p>
                    <div
                      class="application-no-box-container application-no-layout"
                    >
                      <input
                        v-for="index in 8"
                        :key="`app-no-${index}`"
                        v-model="reviewData.applicationNo[index - 1]"
                        type="text"
                        class="app-no-input application-no-size"
                        maxlength="1"
                      />
                    </div>
                  </v-col>
                </v-col>
                <v-col cols="12" sm="4" class="pa-0 pr-3 d-flex justify-end">
                  <v-col cols="auto" class="d-flex flex-column pa-0">
                    <p class="application-label">AREA NO.</p>
                    <div
                      class="application-no-box-container application-no-layout box-2-ref-width"
                    >
                      <input
                        v-for="index in 10"
                        :key="`area-no-${index}`"
                        v-model="reviewData.areaNo[index - 1]"
                        type="text"
                        class="app-no-input application-no-size"
                        maxlength="1"
                      />
                    </div>
                  </v-col>
                </v-col>
              </v-row>

              <div class="px-3 mt-4">
                <p class="box-label text-uppercase mb-0">
                  BOX 1 (TO BE ACCOMPLISHED IN PRINT BY THE APPLICANT)
                </p>
                <div class="box-1-container full-width-box">
                  <div class="box-1-cell owner-cell applicant-name-cell">
                    <p class="text-caption text-uppercase mb-0">
                      Owner/Applicant
                    </p>
                  </div>
                  <div class="box-1-cell name-cell last-name-cell">
                    <p class="text-caption text-uppercase mb-0">LAST NAME</p>
                  </div>
                  <div class="box-1-cell name-cell first-name-cell">
                    <p class="text-caption text-uppercase mb-0">FIRST NAME</p>
                  </div>
                  <div class="box-1-cell mi-cell">
                    <p class="text-caption text-uppercase mb-0">M.I.</p>
                  </div>
                  <div class="box-1-cell tin-cell">
                    <p class="text-caption text-uppercase mb-0">TIN</p>
                  </div>
                </div>

                <div class="box-1-container full-width-box">
                  <div
                    class="box-1-cell construction-cell enterprise-name-cell"
                  >
                    <p class="text-caption text-uppercase mb-0">
                      FOR CONSTRUCTION OWNED BY AN ENTERPRISE
                    </p>
                  </div>
                  <div class="box-1-cell ownership-cell">
                    <p class="text-caption text-uppercase mb-0">
                      FORM OF OWNERSHIP
                    </p>
                  </div>
                </div>

                <div class="box-1-container full-width-box last-box-1-row">
                  <div class="box-1-cell address-cell add-name-cell">
                    <p class="text-caption text-uppercase mb-0">ADDRESS</p>
                  </div>
                  <div class="box-1-cell number-cell no-name-cell">
                    <p class="text-caption text-uppercase mb-0">NO</p>
                  </div>
                  <div class="box-1-cell str-cell eet-name-cell">
                    <p class="text-caption text-uppercase mb-0">STREET</p>
                  </div>
                  <div class="box-1-cell bara-cell ngay-name-cell">
                    <p class="text-caption text-uppercase mb-0">BARANGAY</p>
                  </div>
                  <div class="box-1-cell city-cell municipal-name-cell">
                    <p class="text-caption text-uppercase mb-0">
                      CITY/MINICIPALITY
                    </p>
                  </div>
                  <div class="box-1-cell zip-cell code-name-cell">
                    <p class="text-caption text-uppercase mb-0">ZIP CODE</p>
                  </div>
                  <div class="box-1-cell contact-cell">
                    <p class="text-caption text-uppercase mb-0">CONTACT NO.</p>
                  </div>
                </div>

                <div class="box-1-container full-width-box location-section">
                  <div class="location-label-col">
                    <p class="text-caption text-uppercase mb-0">
                      LOCATION OF CONSTRUCTION:
                    </p>
                  </div>
                  <div class="location-content-col">
                    <div class="content-row">
                      <div class="field-group">
                        <span class="text-caption text-uppercase">LOT NO.</span>
                        <span class="underline short"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption text-uppercase">BLK NO.</span>
                        <span class="underline short"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption text-uppercase">TCT NO.</span>
                        <span class="underline short"></span>
                      </div>
                      <div class="field-group tax-dec">
                        <span class="text-caption text-uppercase"
                          >CURRENT TAX DEC. NO.</span
                        >
                        <span class="underline long"></span>
                      </div>
                    </div>
                    <div class="content-row">
                      <div class="field-group street">
                        <span class="text-caption text-uppercase">STREET</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group barangay">
                        <span class="text-caption text-uppercase"
                          >BARANGAY</span
                        >
                        <span class="underline"></span>
                      </div>
                      <div class="field-group city">
                        <span class="text-caption text-uppercase"
                          >CITY/MUNICIPALITY OF CEBU</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="scope-of-work-container full-width-box stacked-box">
                  <div class="scope-of-work-header">
                    <p class="text-caption text-uppercase mb-0">
                      SCOPE OF WORK
                    </p>
                  </div>
                  <div class="scope-of-work-grid-container">
                    <div class="scope-of-work-grid">
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.newConstruction"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >NEW CONSTRUCTION</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.renovation"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >RENOVATION</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.raising"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption">RAISING</span></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.erection"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >ERECTION</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.conversion"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >CONVERSION</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.accessoryBuilding"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >ACCESSORY BUILDING/STRUCTURE</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.addition"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >ADDITION</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.repair"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption">REPAIR</span></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.legalization"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >LEGALIZATION OF EXISTING BUILDING</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.alteration"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption"
                              >ALTERATION</span
                            ></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.moving"
                          hide-details
                          density="compact"
                          class="mt-0"
                        >
                          <template v-slot:label
                            ><span class="text-caption">MOVING</span></template
                          >
                        </v-checkbox>
                      </div>
                      <div class="scope-item others-item">
                        <v-checkbox
                          v-model="reviewData.scopeOfWork.others"
                          hide-details
                          density="compact"
                          class="mt-0"
                        ></v-checkbox>
                        <span class="text-caption text-uppercase others-label"
                          >OTHERS (Specify)</span
                        >
                        <div class="input-line"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="use-of-occupancy-container full-width-box stacked-box"
                >
                  <div class="occupancy-header">
                    <p
                      class="text-caption text-uppercase mb-0 font-weight-bold"
                    >
                      USE OR CHARACTER OF OCCUPANCY
                    </p>
                  </div>
                  <div class="occupancy-columns-container">
                    <div class="occupancy-column">
                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupA.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP A : RESIDENTIAL (DWELLINGS)</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <div class="sub-options-grid grid-cols-3">
                            <v-checkbox
                              v-model="reviewData.occupancy.groupA.single"
                              label="SINGLE"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupA.duplex"
                              label="DUPLEX"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="
                                reviewData.occupancy.groupA.residential_r1_r2
                              "
                              label="RESIDENTIAL R-1, R-2"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                          </div>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupA.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupB.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP B : RESIDENTIAL</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <div class="sub-options-grid grid-cols-3">
                            <v-checkbox
                              v-model="reviewData.occupancy.groupB.hotel"
                              label="HOTEL"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupB.motel"
                              label="MOTEL"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupB.townhouse"
                              label="TOWNHOUSE"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupB.dormitory"
                              label="DORMITORY"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="
                                reviewData.occupancy.groupB.boardingHouse
                              "
                              label="BOARDING HOUSE"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupB.lodgingHouse"
                              label="LODGING HOUSE"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                          </div>
                          <v-checkbox
                            v-model="
                              reviewData.occupancy.groupB.residential_r3_r4_r5
                            "
                            label="RESIDENTIAL R-3, R-4, R-5"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupB.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupC.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP C : EDUCATIONAL & RECREATIONAL</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <div class="sub-options-grid grid-cols-2">
                            <v-checkbox
                              v-model="
                                reviewData.occupancy.groupC.schoolBuilding
                              "
                              label="SCHOOL BUILDING"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="
                                reviewData.occupancy.groupC.schoolAuditorium
                              "
                              label="SCHOOL AUDITORIUM"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupC.civicCenter"
                              label="CIVIC CENTER"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupC.gymnasium"
                              label="GYMNASIUM"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupC.clubhouse"
                              label="CLUBHOUSE"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupC.church"
                              label="CHURCH, MOSQUE, TEMPLE, CHAPEL"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                          </div>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupC.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupD.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP D : INSTITUTIONAL</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <v-checkbox
                            v-model="reviewData.occupancy.groupD.hospital"
                            label="HOSPITAL OR SIMILAR STRUCTURE"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupD.homeForAged"
                            label="HOME FOR THE AGED"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="
                              reviewData.occupancy.groupD.governmentOffice
                            "
                            label="GOVERNMENT OFFICE"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupD.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>
                    </div>

                    <div class="occupancy-column">
                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupE.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP E : COMMERCIAL</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <div class="sub-options-grid grid-cols-3">
                            <v-checkbox
                              v-model="reviewData.occupancy.groupE.bank"
                              label="BANK"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="reviewData.occupancy.groupE.store"
                              label="STORE"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="
                                reviewData.occupancy.groupE.shoppingCenter
                              "
                              label="SHOPPING CENTER/MALL"
                              hide-details
                              density="compact"
                            ></v-checkbox>
                          </div>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupE.drinkingDining"
                            label="DRINKING/DINING ESTABLISHMENT"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupE.shop"
                            label="SHOP (i.e. DRESS SHOP, etc.)"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupE.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupF.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP F : LIGHT INDUSTRIAL</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <v-checkbox
                            v-model="reviewData.occupancy.groupF.factory"
                            label="FACTORY/PLANT (INCOMBUSTIBLE)"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupF.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupG.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP G : MEDIUM INDUSTRIAL</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <v-checkbox
                            v-model="reviewData.occupancy.groupG.storage"
                            label="STORAGE/WAREHOUSE (HAZARDOUS)"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupG.factory"
                            label="FACTORY (HAZARDOUS)"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupG.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>
                    </div>

                    <div class="occupancy-column">
                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupH.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP H : ASSEMBLY (1,000)</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <v-checkbox
                            v-model="reviewData.occupancy.groupH.theater"
                            label="THEATER, AUDITORIUM, etc."
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupH.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupI.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP I : ASSEMBLY (≥ 1,000)</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <v-checkbox
                            v-model="reviewData.occupancy.groupI.coliseum"
                            label="COLISEUM, SPORTS COMPLEX, etc."
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupI.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupJ1.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP J : (J-1) AGRICULTURAL</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <v-checkbox
                            v-model="reviewData.occupancy.groupJ1.barn"
                            label="BARN, GRANARY, POULTRY HOUSE"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupJ1.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>

                      <div class="occupancy-group">
                        <v-checkbox
                          v-model="reviewData.occupancy.groupJ2.main"
                          hide-details
                          density="compact"
                          class="group-checkbox"
                        >
                          <template v-slot:label
                            ><span class="group-title"
                              >GROUP J : (J-2) ACCESSORIES</span
                            ></template
                          >
                        </v-checkbox>
                        <div class="sub-options">
                          <v-checkbox
                            v-model="
                              reviewData.occupancy.groupJ2.privateCarport
                            "
                            label="PRIVATE CARPORT/GARAGE"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                          <v-checkbox
                            v-model="reviewData.occupancy.groupJ2.others"
                            label="OTHERS"
                            hide-details
                            density="compact"
                          ></v-checkbox>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="box-1-container full-width-box project-details-section"
                >
                  <div class="project-details-grid">
                    <div class="details-col">
                      <div class="field-group">
                        <span class="text-caption">OCCUPANCY CLASSIFIED</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">NUMBER OF UNITS</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">NUMBER OF STOREY</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group with-suffix">
                        <span class="text-caption">TOTAL FLOOR AREA</span>
                        <span class="underline"></span>
                        <span class="text-caption suffix">SQ. M.</span>
                      </div>
                      <div class="field-group with-suffix">
                        <span class="text-caption">LOT AREA</span>
                        <span class="underline"></span>
                        <span class="text-caption suffix">SQ. M.</span>
                      </div>
                      <div class="field-group-spacer"></div>
                    </div>
                    <div class="details-col">
                      <div class="field-group">
                        <span class="text-caption"
                          >TOTAL ESTIMATED COST: P</span
                        >
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">BUILDING</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">ELECTRICAL</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">MECHANICAL</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">ELECTRONICS</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">PLUMBING</span>
                        <span class="underline"></span>
                      </div>
                    </div>
                    <div class="details-col">
                      <div class="field-group-spacer"></div>
                      <div class="field-group cost-label">
                        <span class="text-caption"
                          >COST OF EQUIPMENT INSTALLED:</span
                        >
                      </div>
                      <div class="field-group">
                        <span class="text-caption">P</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">P</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">P</span>
                        <span class="underline"></span>
                      </div>
                      <div class="field-group">
                        <span class="text-caption">P</span>
                        <span class="underline"></span>
                      </div>
                    </div>
                  </div>
                  <div class="project-dates-row">
                    <div class="field-group">
                      <span class="text-caption"
                        >PROPOSED DATE OF CONSTRUCTION:</span
                      >
                      <span class="underline"></span>
                    </div>
                    <div class="field-group">
                      <span class="text-caption"
                        >EXPECTED DATE OF COMPLETION:</span
                      >
                      <span class="underline"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="final-boxes-section px-3">
                <div class="box-wrapper">
                  <p class="box-label-outside text-caption font-weight-bold">
                    BOX 2
                  </p>
                  <div class="box-container box-2">
                    <div class="full-width-title">
                      <span class="text-caption font-weight-bold"
                        >FULL-TIME INSPECTOR AND SUPERVISOR OF CONSTRUCTION
                        WORKS (REPRESENTING THE OWNER)</span
                      >
                    </div>
                    <div class="box-content-flex">
                      <div class="signature-col">
                        <div class="signature-line-group">
                          <div class="underline-box"></div>
                          <div class="signature-label text-center">
                            <span class="text-caption font-weight-bold"
                              >ARCHITECT OR CIVIL ENGINEER</span
                            ><br />
                            <span class="text-caption"
                              >(Signed and Sealed Over Printed Name)</span
                            >
                          </div>
                        </div>
                        <div class="field-group date-group-box2">
                          <span class="text-caption">Date</span>
                          <span class="underline"></span>
                        </div>
                      </div>
                      <div class="details-col-box-2">
                        <div class="details-field address">
                          <span class="text-caption">Address</span>
                        </div>
                        <div class="details-grid">
                          <div class="details-field"><span>PRC No.</span></div>
                          <div class="details-field"><span>Validity</span></div>
                          <div class="details-field"><span>PTR No.</span></div>
                          <div class="details-field">
                            <span>Date Issued</span>
                          </div>
                          <div class="details-field">
                            <span>Issued at</span>
                          </div>
                          <div class="details-field"><span>TIN</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="box-wrapper">
                  <div class="box-labels-3-4">
                    <p class="box-label-outside text-caption font-weight-bold">
                      BOX 3
                    </p>
                    <p class="box-label-outside text-caption font-weight-bold">
                      BOX 4
                    </p>
                  </div>
                  <div class="box-3-4-wrapper">
                    <div class="box-container box-3">
                      <div class="box-content-col">
                        <div class="signature-address-section">
                          <p class="text-caption font-weight-bold title">
                            APPLICANT:
                          </p>
                          <div class="signature-group-3-4">
                            <div class="main-signature">
                              <div class="underline-box"></div>
                              <div class="signature-label text-center">
                                (Signature Over Printed Name)
                              </div>
                            </div>
                            <div class="field-group date-signature">
                              <span class="text-caption">Date</span>
                              <span class="underline"></span>
                            </div>
                          </div>
                          <div class="address-field-3-4">
                            <span class="text-caption">Address</span>
                          </div>
                        </div>
                        <div class="id-row">
                          <div class="id-field">
                            <span>Gov't Issued ID No.</span>
                          </div>
                          <div class="id-field"><span>Date Issued</span></div>
                          <div class="id-field"><span>Place Issued</span></div>
                        </div>
                      </div>
                    </div>
                    <div class="box-container box-4">
                      <div class="box-content-col">
                        <div class="signature-address-section">
                          <p class="text-caption font-weight-bold title">
                            WITH MY CONSENT: LOT OWNER / AUTHORIZED
                            REPRESENTATIVE
                          </p>
                          <div class="signature-group-3-4">
                            <div class="main-signature">
                              <div class="underline-box"></div>
                              <div class="signature-label text-center">
                                (Signature Over Printed Name)
                              </div>
                            </div>
                            <div class="field-group date-signature">
                              <span class="text-caption">Date</span>
                              <span class="underline"></span>
                            </div>
                          </div>
                          <div class="address-field-3-4">
                            <span class="text-caption">Address</span>
                          </div>
                        </div>
                        <div class="id-row">
                          <div class="id-field">
                            <span>Gov't Issued ID No.</span>
                          </div>
                          <div class="id-field"><span>Date Issued</span></div>
                          <div class="id-field"><span>Place Issued</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="box-wrapper">
                  <p class="box-label-outside text-caption font-weight-bold">
                    BOX 5
                  </p>
                  <div class="box-container box-5">
                    <div class="box-content-col notary-box">
                      <p class="text-caption">
                        REPUBLIC OF THE PHILIPPINES}<br />CITY/MUNICIPALITY OF
                        <span class="underline small"></span>) S.S
                      </p>
                      <p class="text-caption">
                        BEFORE ME, at the City/Municipality of
                        <span class="underline medium"></span>, on
                        <span class="underline medium"></span> personally
                        appeared the following:
                      </p>

                      <div class="notary-person-block">
                        <div class="notary-signer">
                          <div class="underline-box"></div>
                          <div class="signature-label text-center">
                            <span class="text-caption font-weight-bold"
                              >APPLICANT</span
                            >
                          </div>
                        </div>
                        <div class="id-row-notary">
                          <div class="signature-line-group">
                            <div class="underline-box"></div>
                            <div class="signature-label text-center">
                              <span>Gov't Issued ID No.</span>
                            </div>
                          </div>
                          <div class="signature-line-group">
                            <div class="underline-box"></div>
                            <div class="signature-label text-center">
                              <span>Date Issued</span>
                            </div>
                          </div>
                          <div class="signature-line-group">
                            <div class="underline-box"></div>
                            <div class="signature-label text-center">
                              <span>Place Issued</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="notary-person-block">
                        <div class="notary-signer">
                          <div class="underline-box"></div>
                          <div class="signature-label text-center">
                            <span class="text-caption font-weight-bold"
                              >LICENSED ARCHITECT OR CIVIL ENGINEER</span
                            ><br /><span class="text-caption"
                              >(Full-Time Inspector and Supervisor of
                              Construction Works)</span
                            >
                          </div>
                        </div>
                        <div class="id-row-notary">
                          <div class="signature-line-group">
                            <div class="underline-box"></div>
                            <div class="signature-label text-center">
                              <span>Gov't Issued ID No.</span>
                            </div>
                          </div>
                          <div class="signature-line-group">
                            <div class="underline-box"></div>
                            <div class="signature-label text-center">
                              <span>Date Issued</span>
                            </div>
                          </div>
                          <div class="signature-line-group">
                            <div class="underline-box"></div>
                            <div class="signature-label text-center">
                              <span>Place Issued</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p class="text-caption">
                        whose signatures appear hereinabove, known to me to be
                        the same persons who executed this standard prescribed
                        form and acknowledged to me that the same is their free
                        and voluntary act and deed.
                      </p>
                      <p class="text-caption">
                        WITNESS MY HAND AND SEAL on the date and place above
                        written.
                      </p>
                      <div class="notary-final-row">
                        <div class="doc-details">
                          <span class="text-caption"
                            >Doc. No. <span class="underline short"></span
                          ></span>
                          <span class="text-caption"
                            >Page No. <span class="underline short"></span
                          ></span>
                          <span class="text-caption"
                            >Book No. <span class="underline short"></span
                          ></span>
                          <span class="text-caption"
                            >Series of <span class="underline short"></span
                          ></span>
                        </div>
                        <div class="notary-signature">
                          <div class="underline-box"></div>
                          <div class="signature-label text-center">
                            <span class="text-caption font-weight-bold"
                              >NOTARY PUBLIC (Until December
                              <span class="underline short"></span>)</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-footer">
                  <div class="footer-copies">
                    <span>Copy 1: Owner</span>
                    <span>Copy 2: OBO</span>
                    <span>Copy 3: BFP</span>
                    <span>Copy 4: Philippine Statistics Authority</span>
                  </div>
                  <div class="footer-note">
                    <span>**May require additional requirements</span>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <div class="d-flex justify-space-between align-center no-print">
          <v-btn color="green" dark class="mt-4" @click="downloadPDF">
            Download PDF
          </v-btn>
          <div class="d-flex">
            <v-btn
              color="blue-grey-lighten-4"
              dark
              class="mt-4 mr-2"
              @click="back"
              >Back</v-btn
            >
            <v-btn color="blue" dark class="mt-4" @click="submit">Submit</v-btn>
          </div>
        </div>
      </v-container>
    </v-main>

    <v-dialog v-model="showSuccessDialog" persistent width="auto">
      <v-card
        class="d-flex flex-column align-center text-center pa-6"
        rounded="xl"
      >
        <v-icon color="green" size="64" class="mb-4">mdi-check-circle</v-icon>
        <v-card-title class="text-h5 font-weight-bold"
          >Application Completed</v-card-title
        >
        <v-card-text class="pb-2">Your Application Number is</v-card-text>
        <div class="application-number-box my-4 px-6 py-3">
          <span class="font-weight-bold">{{ applicationNumber }}</span>
        </div>
        <v-card-actions class="w-100">
          <v-btn
            color="primary"
            variant="flat"
            block
            @click="handleContinue"
            class="text-capitalize"
            size="large"
            >Continue</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ReviewApplication",
  setup() {
    const router = useRouter();

    const currentStep = ref(5);
    const steps = [
      { title: "Building Owner Information", value: 1 },
      { title: "Construction Information", value: 2 },
      { title: "Use or Character of Occupancy", value: 3 },
      { title: "Engineer's Information", value: 4 },
      { title: "Review Application", value: 5 },
    ];

    const reviewData = reactive({
      isSimple: false,
      isComplex: false,
      isNew: true, // Default to New for demonstration
      isRenewal: false,
      isAmendatory: false,
      hasLocationalClearance: true, // Default to checked for demonstration
      hasFireSafetyEvaluationClearance: false,
      applicationNo: Array(8).fill(""),
      areaNo: Array(10).fill(""),
      lastName: "",
      firstName: "",
      mi: "",
      tinInput: "",
      scopeOfWork: {
        newConstruction: true,
        renovation: false,
        raising: false,
        erection: false,
        conversion: false,
        accessoryBuilding: false,
        addition: false,
        repair: false,
        legalization: false,
        alteration: false,
        moving: false,
        others: false,
        othersDetails: "",
      },
      occupancy: {
        groupA: {
          main: true,
          single: true,
          duplex: false,
          residential_r1_r2: false,
          others: false,
        },
        groupB: {
          main: false,
          hotel: false,
          motel: false,
          townhouse: false,
          dormitory: false,
          boardingHouse: false,
          residential_r3_r4_r5: false,
          lodgingHouse: false,
          others: false,
        },
        groupC: {
          main: false,
          schoolBuilding: false,
          schoolAuditorium: false,
          civicCenter: false,
          gymnasium: false,
          clubhouse: false,
          church: false,
          others: false,
        },
        groupD: {
          main: false,
          hospital: false,
          homeForAged: false,
          governmentOffice: false,
          others: false,
        },
        groupE: {
          main: false,
          bank: false,
          store: false,
          shoppingCenter: false,
          drinkingDining: false,
          shop: false,
          others: false,
        },
        groupF: { main: false, factory: false, others: false },
        groupG: { main: false, storage: false, factory: false, others: false },
        groupH: { main: false, theater: false, others: false },
        groupI: { main: false, coliseum: false, others: false },
        groupJ1: { main: false, barn: false, others: false },
        groupJ2: { main: false, privateCarport: false, others: false },
      },
    });

    const showSuccessDialog = ref(false);
    const applicationNumber = ref("");

    const back = () => {
      router.go(-1);
    };

    const submit = () => {
      applicationNumber.value = "BP-2025-000-001";
      showSuccessDialog.value = true;
    };

    const handleContinue = () => {
      showSuccessDialog.value = false;
      router.push("/applicant/uploadingofplans");
    };

    const downloadPDF = () => {
      alert("Downloading the form as a PDF...");
    };

    return {
      currentStep,
      steps,
      reviewData,
      back,
      submit,
      downloadPDF,
      showSuccessDialog,
      applicationNumber,
      handleContinue,
    };
  },
});
</script>

<style scoped>
.application-number-box {
  background-color: #f0f4ff;
  border-radius: 8px;
  color: #333;
}

.centered-checkbox-group {
  max-width: 680px;
  padding: 0 1rem;
}

.centered-checkbox-group .v-checkbox {
  flex-grow: 0;
}

.sub-options .v-checkbox {
  margin-top: -4px;
  margin-bottom: -4px;
}
.sub-options :deep(.v-selection-control) {
  min-height: 22px !important;
}
.group-checkbox :deep(.v-selection-control) {
  min-height: 30px !important;
}
.sub-options-grid {
  display: grid;
  width: 100%;
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.a4-container {
  max-width: 1100px;
}
.application-no-box-container {
  display: flex;
  padding: 0;
  margin: 0;
  border: 1px solid black;
  border-radius: 0;
  overflow: hidden;
  width: fit-content;
}
.app-no-input {
  width: 30px;
  height: 25px;
  font-size: 0.7rem;
  text-align: center;
  border: none;
  background-color: transparent;
  outline: none;
  border-right: 1px solid black;
  padding: 0;
  box-sizing: border-box;
}
.application-no-box-container .app-no-input:last-child {
  border-right: none;
}
.application-no-size {
  width: 30px !important;
  height: 25px !important;
}
.application-label {
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 2px;
  height: 1.25rem;
  display: block;
  white-space: nowrap;
}
.text-caption,
.group-title,
:deep(.v-checkbox .v-label) {
  font-size: 0.65rem !important;
}
.box-label {
  font-size: 0.8rem;
  font-weight: 500;
}
.full-width-box {
  width: 100%;
}
.box-1-container {
  display: flex;
  border: 1px solid black;
  border-radius: 0;
  min-height: 45px;
}
.box-1-cell {
  display: flex;
  flex-direction: column;
  padding: 3px 5px;
  justify-content: flex-start;
}
.owner-cell {
  flex: 0 0 100px;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 3px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.name-cell,
.tin-cell {
  flex-grow: 1;
  min-width: 100px;
}
.last-name-cell,
.tin-cell,
.ownership-cell,
.contact-cell {
  border-left: 1px solid black;
}
.mi-cell {
  flex: 0 0 50px;
}
.construction-cell {
  flex: 2 1 100px;
}
.ownership-cell {
  flex: 1 1 150px;
  min-width: 150px;
}
.address-cell {
  flex: 0 0 100px;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3px;
  padding-bottom: 3px;
}
.number-cell {
  flex: 0 0 50px;
}
.str-cell {
  flex: 1.5;
}
.bara-cell {
  flex: 1;
}
.city-cell {
  flex: 1.5;
}
.zip-cell {
  flex: 0.5;
  min-width: 50px;
}
.contact-cell {
  flex: 84px;
  min-width: 100px;
}

.box-2-ref-width {
  width: 300px;
}

.app-container,
.main-content-container {
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
.stacked-box {
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.scope-of-work-container {
  border-top: 1px solid black !important;
}
.scope-of-work-header {
  padding: 3px 5px;
}
.scope-of-work-grid-container {
  border: none;
  display: flex;
  flex-direction: column;
}
.scope-of-work-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 10px;
  padding: 5px;
}
.scope-item {
  display: flex;
  align-items: center;
  position: relative;
}
.scope-item .v-checkbox {
  flex-shrink: 0;
  margin-right: 5px;
  margin: 0 !important;
}
.scope-item.others-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0px !important;
}
.scope-item .others-label {
  margin-right: 5px;
  flex-shrink: 0;
}
.input-line {
  height: 1px;
  background-color: black;
  flex-grow: 1;
  min-width: 50px;
  align-self: flex-end;
  margin-bottom: 6px;
}
.use-of-occupancy-container {
  border-top: 1px solid black !important;
}
.occupancy-header {
  padding: 3px 5px;
}
.occupancy-columns-container {
  display: flex;
  flex-wrap: wrap;
}
.occupancy-column {
  flex: 1;
  min-width: 200px;
  padding: 5px;
  box-sizing: border-box;
}
.occupancy-column:not(:last-child) {
  border-right: 1px solid #ccc;
}
.occupancy-group {
  margin-bottom: 10px;
}
.group-title {
  font-weight: bold;
  text-transform: uppercase;
}
.sub-options {
  padding-left: 20px;
}

.location-section {
  align-items: stretch;
}
.location-label-col {
  flex: 0 0 100px;
  display: flex;
  align-items: center;
  padding-right: 5px;
}
.location-content-col {
  flex: 1;
  border-left: 1px solid black;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.content-row {
  display: flex;
  align-items: baseline;
  width: 100%;
}
.field-group {
  display: flex;
  align-items: baseline;
  margin-right: 15px;
  white-space: nowrap;
}
.field-group:last-child {
  margin-right: 0;
}
.field-group .underline {
  border-bottom: 1px solid black;
  flex-grow: 1;
  margin-left: 5px;
}
.field-group .underline.short {
  min-width: 40px;
}
.field-group .underline.long {
  min-width: 120px;
}
.field-group.tax-dec {
  flex-grow: 1;
}
.field-group.street {
  flex: 2;
}
.field-group.barangay {
  flex: 2;
}
.field-group.city {
  flex: 1.5;
}

.project-details-section {
  flex-direction: column;
  border-top: none !important;
  padding: 8px;
}
.project-details-grid {
  display: flex;
  gap: 20px;
  width: 100%;
}
.details-col {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.details-col .field-group {
  width: 100%;
  margin-bottom: 12px;
}
.details-col .field-group:last-child {
  margin-bottom: 0;
}
.field-group.with-suffix .underline {
  margin-right: 5px;
}
.field-group .suffix {
  white-space: nowrap;
}
.field-group.cost-label {
  justify-content: flex-end;
}
.field-group-spacer {
  flex-grow: 1;
}
.project-dates-row {
  display: flex;
  gap: 20px;
  border-top: 1px solid black;
  margin-top: 10px;
  padding-top: 8px;
}
.project-dates-row .field-group {
  flex: 1;
  margin-right: 0;
}

.final-boxes-section {
  margin-top: 16px;
}
.box-wrapper {
  margin-bottom: 8px;
}
.box-label-outside {
  margin-bottom: 2px;
  padding-left: 5px;
  font-size: 0.7rem !important;
}
.final-boxes-section .text-caption {
  line-height: 1.2;
}
.box-container {
  border: 1px solid black;
  position: relative;
}
.box-container.box-2 {
  padding: 0;
}

.box-title {
  font-size: 0.7rem !important;
  font-weight: bold;
}
.full-width-title {
  border-bottom: 1px solid black;
  padding: 4px 8px;
  margin-bottom: 8px;
}
.box-content-flex {
  display: flex;
}
.signature-col {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
}
.signature-line-group {
  width: 100%;
}
.field-group.date-group-box2 {
  width: 60%;
}
.underline-box {
  border-bottom: 1px solid black;
  flex-grow: 1;
  height: 1px;
  margin-top: 15px;
}
.signature-label {
  text-align: center;
  width: 100%;
  margin-top: 2px;
}
.details-col-box-2 {
  flex: 1;
  border-left: 1px solid black;
}
.details-field {
  border-bottom: 1px solid black;
  padding: 4px;
  font-size: 0.65rem !important;
}
.details-field.address {
  min-height: 48px;
}
.details-field:last-child {
  border-bottom: none;
}
.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.details-grid .details-field:nth-child(odd) {
  border-right: 1px solid black;
}

.box-labels-3-4 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.box-3-4-wrapper {
  display: flex;
}
.box-3-4-wrapper .box-container {
  flex: 1;
  border-top: none;
  padding: 0;
}
.box-3-4-wrapper .box-container.box-3 {
  border-right: none;
}
.box-content-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.signature-address-section {
  flex-grow: 1;
  border-bottom: 1px solid black;
  padding: 8px;
}
.signature-address-section .title {
  margin-bottom: 8px;
  font-size: 0.7rem !important;
}
.signature-group-3-4 {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  margin-top: 8px;
}
.main-signature {
  flex-grow: 1;
}
.date-signature {
  flex: 0 0 100px;
  margin-bottom: -4px;
}
.address-field-3-4 {
  border-top: 1px solid black;
  margin: 12px -8px -8px -8px;
  padding: 4px 8px;
}
.id-row {
  display: flex;
}
.id-field {
  flex: 1;
  padding: 4px 8px;
  border-right: 1px solid black;
}
.id-field:last-child {
  border-right: none;
}

.box-5 {
  padding: 8px;
  border-top: none;
}
.notary-box p {
  margin-bottom: 8px;
}
.notary-box .underline {
  display: inline-block;
  border-bottom: 1px solid black;
  vertical-align: bottom;
}
.notary-box .underline.small {
  width: 100px;
}
.notary-box .underline.medium {
  width: 200px;
}
.notary-person-block {
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.notary-person-block:last-of-type {
  margin-bottom: 0;
}
.notary-signer {
  margin-bottom: 8px;
}
.id-row-notary {
  display: flex;
  gap: 20px;
}
.id-row-notary .signature-line-group {
  flex: 1;
}
.notary-final-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 15px;
}
.doc-details {
  display: flex;
  flex-direction: column;
}
.notary-signature {
  flex: 0 0 40%;
}
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
}
.footer-copies {
  display: flex;
  gap: 20px;
  font-size: 0.7rem !important;
  font-weight: bold;
}
.footer-note {
  font-weight: normal;
  font-size: 0.65rem !important;
}

@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
  .scope-of-work-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .occupancy-columns-container {
    flex-direction: column;
  }
  .occupancy-column {
    min-width: 100%;
    border-right: none !important;
    border-bottom: 1px solid #ccc;
  }
  .occupancy-column:last-child {
    border-bottom: none;
  }
  .sub-options-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .pl-3 {
    padding-left: 12px !important;
  }
  .pr-3 {
    padding-right: 12px !important;
  }
  .full-width-box {
    width: 100%;
  }

  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .box-1-container,
  .box-container {
    min-height: 40px;
  }
  .owner-cell {
    flex: 0 0 70px;
  }
  .address-cell {
    flex: 0 0 0px;
  }
  .name-cell,
  .mi-cell,
  .tin-cell {
    flex: 1 1 50px;
    min-width: 50px;
  }
  .number-cell,
  .str-cell,
  .bara-cell,
  .city-cell,
  .zip-cell,
  .contact-cell {
    flex: 1 1 50px;
    min-width: 50px;
    border-left: 1px solid black;
  }
  .address-cell + .number-cell {
    border-left: none;
  }
  .scope-of-work-grid,
  .sub-options-grid {
    grid-template-columns: 1fr;
  }
  .stacked-box {
    border-top: 1px solid black !important;
  }
  .box-3-4-wrapper {
    flex-direction: column;
  }
  .box-3-4-wrapper .box-container:first-child {
    border-right: 1px solid black;
    border-bottom: none;
  }
}

@media print {
  .no-print,
  .app-container,
  .main-content-container {
    display: none !important;
  }
  .print-content {
    display: block !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
  }
  body,
  html,
  #app,
  .app-container {
    background-color: white !important;
    color: black !important;
    height: auto !important;
    overflow: visible !important;
  }
  .print-form-card {
    box-shadow: none !important;
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
  }
  .pa-4,
  .v-card__text {
    padding: 0 !important;
  }
  * {
    font-family: Arial, sans-serif !important;
    font-size: 10pt !important;
  }
  .text-h6 {
    font-size: 12pt !important;
  }
  .text-caption {
    font-size: 8pt !important;
  }
  .v-checkbox {
    margin: 0 !important;
    padding: 0 !important;
  }
  .a4-container {
    width: 100% !important;
    max-width: 7.5in !important;
    margin: 0.5in auto !important;
    box-sizing: border-box;
  }
  .v-row {
    flex-wrap: nowrap !important;
    margin: 0 !important;
  }
  .v-col {
    padding: 2px !important;
  }

  .application-no-box-container {
    border: 1px solid black;
  }
  .app-no-input {
    border-right: 1px solid black !important;
  }
  .owner-cell,
  .address-cell {
    background-color: white !important;
    -webkit-print-color-adjust: exact;
  }
  .stacked-box {
    border-top: 1px solid black !important;
  }
  .scope-of-work-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
  .occupancy-columns-container {
    flex-wrap: nowrap !important;
  }
}
</style>