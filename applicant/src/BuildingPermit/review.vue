<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" class="no-print">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
        style="max-width: 1600px"
      >
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-3"
          />
          <div>
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
        <div class="d-none d-md-flex nav-links">
          <v-btn text class="mx-2" style="color: white" to="/home">Home</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/services"
            >Services</v-btn
          >
          <v-btn text class="mx-2" style="color: white" to="/about"
            >About</v-btn
          >
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="grey-background">
      <v-container fluid class="pa-4" style="max-width: 1000px">
        <v-row no-gutters class="d-flex justify-end mb-4 no-print">
          <v-btn color="success" @click="printForm">Download Form</v-btn>
        </v-row>

        <v-card class="pa-6 printable-form">
          <div class="text-center mb-6">
            <div class="text-h6 font-weight-bold">
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div class="text-subtitle-1">City/Municipality of Naga</div>
            <div class="text-subtitle-1 mb-4">Province of Camarines Sur</div>
            <div class="text-h5 font-weight-bold">
              UNIFIED APPLICATION FORM FOR BUILDING PERMIT
            </div>
          </div>
          <v-divider class="my-4"></v-divider>

          <v-row no-gutters class="mb-4 d-flex justify-center">
            <v-col cols="12" class="d-flex justify-center flex-wrap">
              <v-checkbox
                label="SIMPLE"
                hide-details
                readonly
                class="mx-4"
              ></v-checkbox>
              <v-checkbox
                label="COMPLEX"
                hide-details
                readonly
                class="mx-4"
              ></v-checkbox>
              <v-checkbox
                label="NEW"
                hide-details
                readonly
                class="mx-4"
              ></v-checkbox>
              <v-checkbox
                label="RENEWAL"
                hide-details
                readonly
                class="mx-4"
              ></v-checkbox>
              <v-checkbox
                label="AMENDATORY"
                hide-details
                readonly
                class="mx-4"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-card outlined class="pa-4 mb-4">
            <div class="box-title">
              BOX 1 (TO BE ACCOMPLISHED IN PRINT BY THE APPLICANT)
            </div>
            <v-row dense class="mt-2">
              <v-col cols="12" class="py-0">
                <div class="section-title">OWNER/APPLICANT</div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="form-field">
                  <span class="field-label">LAST NAME</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="form-field">
                  <span class="field-label">FIRST NAME</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="form-field">
                  <span class="field-label">M.I.</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <div class="form-field">
                  <span class="field-label">TIN</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="8">
                <div class="form-field">
                  <span class="field-label"
                    >ADDRESS: NO. STREET, BARANGAY, CITY/MUNICIPALITY</span
                  >
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="2">
                <div class="form-field">
                  <span class="field-label">ZIP CODE</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="2">
                <div class="form-field">
                  <span class="field-label">CONTACT NO.</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="4">
                <div class="form-field">
                  <span class="field-label">FORM OF OWNERSHIP</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <div class="form-field">
                  <span class="field-label"
                    >FOR CONSTRUCTION OWNED BY AN ENTERPRISE</span
                  >
                  <div class="field-value"></div>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <v-card outlined class="pa-4 mb-4">
            <div class="section-title">LOCATION OF CONSTRUCTION</div>
            <v-row dense>
              <v-col cols="12" md="3">
                <div class="form-field">
                  <span class="field-label">LOT NO.</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="3">
                <div class="form-field">
                  <span class="field-label">BLK NO.</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="3">
                <div class="form-field">
                  <span class="field-label">TCT NO.</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="3">
                <div class="form-field">
                  <span class="field-label">CURRENT TAX DEC. NO.</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" md="4">
                <div class="form-field">
                  <span class="field-label">STREET</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="form-field">
                  <span class="field-label">BARANGAY</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="form-field">
                  <span class="field-label">CITY/MUNICIPALITY</span>
                  <div class="field-value"></div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-card>

        <v-row no-gutters class="mt-6 d-flex justify-end no-print">
          <v-btn color="grey" class="mr-2">Back</v-btn>
          <v-btn color="primary">Submit</v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "BuildingPermitPDF",
  methods: {
    printForm() {
      window.print();
    },
  },
};
</script>

<style scoped>
/*
  This CSS section includes styles to match the PDF form's appearance,
  including custom styling for the signature and text fields.
*/

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.grey-background {
  background-color: #f5f5f5;
}

.printable-form {
  max-width: 1000px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  font-size: 12px;
}

.box-title {
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid black;
  padding-bottom: 4px;
}

.section-title {
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
}

.form-field {
  border: 1px solid #ccc;
  padding: 4px 8px;
  min-height: 40px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 10px;
  color: #555;
  text-transform: uppercase;
}

.field-value {
  font-size: 12px;
  font-weight: bold;
  word-wrap: break-word;
}

.form-field-line {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 8px;
  width: 100%;
}

.line {
  border: 0;
  border-bottom: 1px solid black;
  margin: 0 0 2px 0;
}

.line-label {
  font-size: 10px;
  text-transform: uppercase;
  color: #555;
}

.signature-line-box {
  margin-top: 2rem;
}

.signature-line {
  border: none;
  border-bottom: 1px solid black;
  width: 80%;
  margin: 0 auto;
}

.box-with-border {
  border: 1px solid black;
  padding: 10px;
  height: 100%;
}

.signature-section .v-row {
  margin-bottom: 0px !important;
}

.signature-section .v-col {
  padding: 5px !important;
}

/* Specific styling for printing to match a document */
@media print {
  .no-print {
    display: none !important;
  }
  .printable-form {
    margin: 0;
    padding: 0;
    box-shadow: none;
    max-width: none;
  }
  .v-main {
    padding: 0 !important;
  }
  .grey-background {
    background-color: white;
  }
  .v-card {
    border: 1px solid black !important;
    box-shadow: none !important;
  }
  .signature-section .v-col {
    flex-basis: 50% !important;
    max-width: 50% !important;
  }
}
</style>