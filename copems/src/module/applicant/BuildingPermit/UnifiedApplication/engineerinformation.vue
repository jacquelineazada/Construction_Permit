<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar flat color="blue-darken-3" dark height="88" app>
      <v-toolbar-title class="ml-2 font-weight-bold">
        <v-icon left>mdi-office-building-outline</v-icon>
        Building Permit Portal
      </v-toolbar-title>
    </v-app-bar>

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
            <v-stepper-item
              title="Building Owner Information"
              value="1"
              :complete="currentStep > 1"
              :color="currentStep >= 1 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 1 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>
            <v-stepper-item
              title="Construction Information"
              value="2"
              :complete="currentStep > 2"
              :color="currentStep >= 2 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 2 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>
            <v-stepper-item
              title="Use or Character of Occupancy"
              value="3"
              :complete="currentStep > 3"
              :color="currentStep >= 3 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 3 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>
            <v-stepper-item
              title="Signatories Details"
              value="4"
              :complete="currentStep > 4"
              :color="currentStep >= 4 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
            <v-divider
              :thickness="3"
              :style="{
                'border-color': currentStep > 4 ? '#1976D2' : '#e0e0e0',
              }"
              class="mx-2"
            ></v-divider>
            <v-stepper-item
              title="Review Application"
              value="5"
              :complete="currentStep > 5"
              :color="currentStep >= 5 ? 'blue-darken-1' : 'grey lighten-2'"
              class="stepper-item-custom"
            ></v-stepper-item>
          </v-stepper-header>
        </v-stepper>

        <v-card class="my-2 pa-4 card-shadow">
          <v-card-text>
            <v-form ref="form">
              <!-- Engineer's Information -->
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account-hard-hat</v-icon
                  >
                  ENGINEER'S INFORMATION
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <div class="input-label">First Name</div>
                      <v-text-field
                        v-model="engineerFirstName"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-account"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Last Name</div>
                      <v-text-field
                        v-model="engineerLastName"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-account"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">M.I.</div>
                      <v-text-field
                        v-model="engineerMiddleInitial"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-alpha-m-box-outline"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Professional's Valid ID -->
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-badge-account-outline</v-icon
                  >
                  PROFESSIONAL'S VALID ID
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <div class="input-label">PRC No.</div>
                      <v-text-field
                        v-model="prcNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required, rules.prcNo]"
                        :maxlength="7"
                        @input="limitPrcNo"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="input-label">Validity</div>
                      <v-menu
                        v-model="validityMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ props }">
                          <v-text-field
                            v-model="validity"
                            variant="outlined"
                            density="comfortable"
                            :rules="[rules.required]"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="props"
                            color="blue-darken-3"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="validity"
                          @update:model-value="validityMenu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">PTR No.</div>
                      <v-text-field
                        v-model="ptrNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required, rules.ptrNo]"
                        :maxlength="8"
                        @input="limitPtrNo"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Date Issued</div>
                      <v-menu
                        v-model="dateIssuedMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ props }">
                          <v-text-field
                            v-model="dateIssued"
                            variant="outlined"
                            density="comfortable"
                            :rules="[rules.required]"
                            prepend-inner-icon="mdi-calendar"
                            readonly
                            v-bind="props"
                            color="blue-darken-3"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="dateIssued"
                          @update:model-value="dateIssuedMenu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Issued At</div>
                      <v-text-field
                        v-model="issuedAt"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="input-label">TIN</div>
                      <v-text-field
                        v-model="tin"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required, rules.tin]"
                        :maxlength="15"
                        @input="formatTin"
                        prepend-inner-icon="mdi-card-account-details"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Address -->
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-home-map-marker</v-icon
                  >
                  ADDRESS
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Province</div>
                      <v-select
                        v-model="province"
                        :items="provinces"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map"
                        color="blue-darken-3"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Municipality</div>
                      <v-text-field
                        v-model="municipality"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-home-city"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Barangay</div>
                      <v-select
                        v-model="barangay"
                        :items="barangays"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-home-group"
                        color="blue-darken-3"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Block No.</div>
                      <v-text-field
                        v-model="blkNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <div class="input-label">Street</div>
                      <v-text-field
                        v-model="street"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-road-variant"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- Applicant's Information -->
              <v-card class="mb-4 card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account</v-icon
                  >
                  APPLICANT'S INFORMATION
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Last Name</div>
                      <v-text-field
                        v-model="applicantLastName"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-account"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">First Name</div>
                      <v-text-field
                        v-model="applicantFirstName"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-account"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">M.I.</div>
                      <v-text-field
                        v-model="applicantMiddleInitial"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-alpha-m-box-outline"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Province</div>
                      <v-select
                        v-model="applicantProvince"
                        :items="provinces"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">City/Municipality</div>
                      <v-text-field
                        v-model="applicantMunicipality"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-home-city"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Barangay</div>
                      <v-select
                        v-model="applicantBarangay"
                        :items="barangays"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-home-group"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">House No.</div>
                      <v-text-field
                        v-model="applicantHouseNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="8">
                      <div class="input-label">Street</div>
                      <v-text-field
                        v-model="applicantStreet"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-road-variant"
                        readonly
                        disabled
                        color="blue-grey lighten-4"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Gov't Issued ID No.</div>
                      <v-text-field
                        v-model="applicantGovIdNo"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-card-account-details"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Date Issued</div>
                      <v-text-field
                        v-model="applicantIdDateIssued"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-calendar"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <div class="input-label">Place Issued</div>
                      <v-text-field
                        v-model="applicantIdPlaceIssued"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker"
                        color="blue-darken-3"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <!-- With Consent Lot Owner/Authorized Representative -->
              <v-card class="card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account-check</v-icon
                  >
                  WITH CONSENT LOT OWNER/AUTHORIZED REPRESENTATIVE
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-checkbox
                    v-model="lotOwnerConsent"
                    label="Check if with consent from lot owner"
                    density="comfortable"
                    color="blue-darken-3"
                  ></v-checkbox>
                  <v-expand-transition>
                    <div v-show="lotOwnerConsent">
                      <v-row dense>
                        <v-col cols="12" sm="4">
                          <div class="input-label">Last Name</div>
                          <v-text-field
                            v-model="lotOwnerLastName"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-account"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <div class="input-label">First Name</div>
                          <v-text-field
                            v-model="lotOwnerFirstName"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-account"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <div class="input-label">M.I.</div>
                          <v-text-field
                            v-model="lotOwnerMiddleInitial"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-alpha-m-box-outline"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" sm="4">
                          <div class="input-label">Province</div>
                          <v-select
                            v-model="lotOwnerProvince"
                            :items="provinces"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-map"
                            color="blue-darken-3"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <div class="input-label">City/Municipality</div>
                          <v-text-field
                            v-model="lotOwnerMunicipality"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-home-city"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <div class="input-label">Barangay</div>
                          <v-select
                            v-model="lotOwnerBarangay"
                            :items="barangays"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-home-group"
                            color="blue-darken-3"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <div class="input-label">House No.</div>
                          <v-text-field
                            v-model="lotOwnerHouseNo"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-numeric"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="8">
                          <div class="input-label">Street</div>
                          <v-text-field
                            v-model="lotOwnerStreet"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-road-variant"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row dense>
                        <v-col cols="12" sm="4">
                          <div class="input-label">Gov't Issued ID No.</div>
                          <v-text-field
                            v-model="lotOwnerGovIdNo"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-card-account-details"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <div class="input-label">Date Issued</div>
                          <v-text-field
                            v-model="lotOwnerIdDateIssued"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-calendar"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <div class="input-label">Place Issued</div>
                          <v-text-field
                            v-model="lotOwnerIdPlaceIssued"
                            variant="outlined"
                            density="comfortable"
                            :rules="lotOwnerConsent ? [rules.required] : []"
                            prepend-inner-icon="mdi-map-marker"
                            color="blue-darken-3"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </v-expand-transition>
                </v-card-text>
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>
        <div class="d-flex justify-end mt-6 mb-8">
          <v-btn
            color="blue-grey-lighten-4"
            class="mr-2 btn-rounded"
            elevation="2"
            to="/applicant/usecharacterofoccupancy"
            variant="tonal"
          >
            <v-icon left>mdi-arrow-left</v-icon>Back
          </v-btn>
          <v-btn
            color="blue-darken-3"
            class="btn-rounded"
            elevation="2"
            @click="nextStep"
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
      currentStep: "4",
      // Engineer's Information data
      engineerFirstName: "",
      engineerLastName: "",
      engineerMiddleInitial: "",

      // Professional's Valid ID data
      prcNo: "",
      validity: null,
      validityMenu: false,
      ptrNo: "",
      dateIssued: null,
      dateIssuedMenu: false,
      issuedAt: "",
      tin: "",

      // Applicant's Information data
      applicantFirstName: "",
      applicantLastName: "",
      applicantMiddleInitial: "",
      applicantProvince: null,
      applicantMunicipality: "",
      applicantBarangay: null,
      applicantHouseNo: "",
      applicantStreet: "",
      applicantGovIdNo: "",
      applicantIdDateIssued: "",
      applicantIdPlaceIssued: "",

      // Lot Owner Consent data
      lotOwnerConsent: false,
      lotOwnerFirstName: "",
      lotOwnerLastName: "",
      lotOwnerMiddleInitial: "",
      lotOwnerProvince: null,
      lotOwnerMunicipality: "",
      lotOwnerBarangay: null,
      lotOwnerHouseNo: "",
      lotOwnerStreet: "",
      lotOwnerGovIdNo: "",
      lotOwnerIdDateIssued: "",
      lotOwnerIdPlaceIssued: "",

      // Original Address data
      province: null,
      municipality: "",
      barangay: null,
      blkNo: "",
      street: "",

      provinces: [
        "Albay",
        "Camarines Norte",
        "Camarines Sur",
        "Catanduanes",
        "Masbate",
        "Sorsogon",
      ],
      barangays: [
        "Abella",
        "Bagumbayan Norte",
        "Bagumbayan Sur",
        "Balatas",
        "Calauag",
        "Cararayan",
        "Carolina",
        "Concepcion Grande",
        "Concepcion Pequeña",
        "Dayangdang",
        "Del Rosario",
        "Dinaga",
        "Igualdad Interior",
        "Lerma",
        "Liboton",
        "Mabolo",
        "Pacol",
        "Panicuason",
        "Peñafrancia",
        "Sabang",
        "San Felipe",
        "San Francisco",
        "San Isidro",
        "Santa Cruz",
        "Tabuco",
        "Tinago",
        "Triangulo",
      ],
      rules: {
        required: (value) => !!value || "This field is required.",
        prcNo: (value) =>
          (value && /^\d{6,7}$/.test(value)) || "PRC No. should be 6-7 digits.",
        ptrNo: (value) =>
          (value && /^\d{6,8}$/.test(value)) || "PTR No. should be 6-8 digits.",
        tin: (value) =>
          (value && /^\d{3}-\d{3}-\d{3}-\d{3}$/.test(value)) ||
          "TIN should be in XXX-XXX-XXX-XXX format.",
      },
    };
  },
  methods: {
    async nextStep() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$router.push("/applicant/reviewapplication");
      }
    },
    limitPrcNo(event) {
      let value = event.target.value.replace(/\D/g, "");
      if (value.length > 7) {
        value = value.slice(0, 7);
      }
      this.prcNo = value;
    },
    limitPtrNo(event) {
      let value = event.target.value.replace(/\D/g, "");
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
      this.ptrNo = value;
    },
    formatTin(event) {
      let value = event.target.value.replace(/\D/g, "");
      if (value.length > 3) {
        value = value.slice(0, 3) + "-" + value.slice(3);
      }
      if (value.length > 7) {
        value = value.slice(0, 7) + "-" + value.slice(7);
      }
      if (value.length > 11) {
        value = value.slice(0, 11) + "-" + value.slice(11);
      }
      this.tin = value;
    },
  },
});
</script>

<style scoped>
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
  margin-bottom: 18px;
}
.section-title {
  color: #1976d2;
  font-weight: bold;
  font-size: 1.09rem;
  letter-spacing: 0.01em;
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