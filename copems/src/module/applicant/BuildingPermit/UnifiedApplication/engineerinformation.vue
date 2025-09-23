<template>
  <v-app class="app-container">
    <v-main class="main-content-container">
      <v-container fluid class="pa-0">
        <v-card
          flat
          class="d-flex align-center pl-6 mb-4"
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
          <v-stepper v-model="currentStep" alt-labels flat class="mb-4">
            <v-stepper-header>
              <v-stepper-item
                title="Building Owner Information"
                value="1"
                :complete="currentStep > 1"
                :color="currentStep >= 1 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 1 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Construction Information"
                value="2"
                :complete="currentStep > 2"
                :color="currentStep >= 2 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 2 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Use or Character of Occupancy"
                value="3"
                :complete="currentStep > 3"
                :color="currentStep >= 3 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 3 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Signatories Details"
                value="4"
                :complete="currentStep > 4"
                :color="currentStep >= 4 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
              <v-divider
                :thickness="3"
                :style="{
                  'border-color': currentStep > 4 ? 'blue' : 'lightgrey',
                }"
              ></v-divider>

              <v-stepper-item
                title="Review Application"
                value="5"
                :complete="currentStep > 5"
                :color="currentStep >= 5 ? 'blue' : 'lightgrey'"
              ></v-stepper-item>
            </v-stepper-header>
          </v-stepper>

          <v-card class="my-2 pa-4">
            <v-card-text>
              <v-form ref="form">
                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive">
                    ENGINEER'S INFORMATION
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="4">
                        <div class="input-label">First Name</div>
                        <v-text-field
                          v-model="engineerFirstName"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Last Name</div>
                        <v-text-field
                          v-model="engineerLastName"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">M.I.</div>
                        <v-text-field
                          v-model="engineerMiddleInitial"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive">
                    PROFESSIONAL'S VALID ID
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="6">
                        <div class="input-label">PRC No.</div>
                        <v-text-field
                          v-model="prcNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required, rules.prcNo]"
                          :maxlength="7"
                          @input="limitPrcNo"
                          style="height: 50px; min-height: 50px"
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
                              density="compact"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="props"
                              style="height: 50px; min-height: 50px"
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
                          density="compact"
                          :rules="[rules.required, rules.ptrNo]"
                          :maxlength="8"
                          @input="limitPtrNo"
                          style="height: 50px; min-height: 50px"
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
                              density="compact"
                              :rules="[rules.required]"
                              prepend-inner-icon="mdi-calendar"
                              readonly
                              v-bind="props"
                              style="height: 50px; min-height: 50px"
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
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="input-label">TIN</div>
                        <v-text-field
                          v-model="tin"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required, rules.tin]"
                          :maxlength="15"
                          @input="formatTin"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive">
                    ADDRESS
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Province</div>
                        <v-select
                          v-model="province"
                          :items="provinces"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Municipality</div>
                        <v-text-field
                          v-model="municipality"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Barangay</div>
                        <v-select
                          v-model="barangay"
                          :items="barangays"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Block No.</div>
                        <v-text-field
                          v-model="blkNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8">
                        <div class="input-label">Street</div>
                        <v-text-field
                          v-model="street"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mb-4">
                  <v-card-title class="text-h6 card-title-responsive">
                    APPLICANT'S INFORMATION
                  </v-card-title>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Last Name</div>
                        <v-text-field
                          v-model="applicantLastName"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">First Name</div>
                        <v-text-field
                          v-model="applicantFirstName"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">M.I.</div>
                        <v-text-field
                          v-model="applicantMiddleInitial"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
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
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">City/Municipality</div>
                        <v-text-field
                          v-model="applicantMunicipality"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Barangay</div>
                        <v-select
                          v-model="applicantBarangay"
                          :items="barangays"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">House No.</div>
                        <v-text-field
                          v-model="applicantHouseNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="8">
                        <div class="input-label">Street</div>
                        <v-text-field
                          v-model="applicantStreet"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                          readonly
                          disabled
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Gov't Issued ID No.</div>
                        <v-text-field
                          v-model="applicantGovIdNo"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Date Issued</div>
                        <v-text-field
                          v-model="applicantIdDateIssued"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4">
                        <div class="input-label">Place Issued</div>
                        <v-text-field
                          v-model="applicantIdPlaceIssued"
                          variant="outlined"
                          density="compact"
                          :rules="[rules.required]"
                          style="height: 50px; min-height: 50px"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card>
                  <v-card-title class="text-h6 card-title-responsive">
                    WITH CONSENT LOT OWNER/AUTHORIZED REPRESENTATIVE
                  </v-card-title>
                  <v-card-text>
                    <v-checkbox
                      v-model="lotOwnerConsent"
                      label="Check if with consent from lot owner"
                      density="compact"
                    ></v-checkbox>
                    <v-expand-transition>
                      <div v-show="lotOwnerConsent">
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Last Name</div>
                            <v-text-field
                              v-model="lotOwnerLastName"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">First Name</div>
                            <v-text-field
                              v-model="lotOwnerFirstName"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">M.I.</div>
                            <v-text-field
                              v-model="lotOwnerMiddleInitial"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
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
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">City/Municipality</div>
                            <v-text-field
                              v-model="lotOwnerMunicipality"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Barangay</div>
                            <v-select
                              v-model="lotOwnerBarangay"
                              :items="barangays"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">House No.</div>
                            <v-text-field
                              v-model="lotOwnerHouseNo"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8">
                            <div class="input-label">Street</div>
                            <v-text-field
                              v-model="lotOwnerStreet"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row dense>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Gov't Issued ID No.</div>
                            <v-text-field
                              v-model="lotOwnerGovIdNo"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Date Issued</div>
                            <v-text-field
                              v-model="lotOwnerIdDateIssued"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="input-label">Place Issued</div>
                            <v-text-field
                              v-model="lotOwnerIdPlaceIssued"
                              variant="outlined"
                              density="compact"
                              :rules="lotOwnerConsent ? [rules.required] : []"
                              style="height: 50px; min-height: 50px"
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

          <div class="d-flex justify-end">
            <v-btn
              color="blue-grey-lighten-4"
              dark
              class="mt-4 mr-2"
              to="/applicant/usecharacterofoccupancy"
              >Back</v-btn
            >
            <v-btn color="blue" dark class="mt-4" @click="nextStep">Next</v-btn>
          </div>
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
      currentStep: "4",
      // Engineer's Information data
      engineerFirstName: "",
      engineerLastName: "",
      engineerMiddleInitial: "",

      // Professional's Valid ID data
      prcNo: "",
      validity: null, // Use null for date models
      validityMenu: false,
      ptrNo: "",
      dateIssued: null, // Use null for date models
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

.input-label {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}

/* Responsive styles */
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
}
</style>