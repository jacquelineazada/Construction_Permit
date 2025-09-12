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

        <div class="d-none d-md-flex nav-links">
          <v-btn text class="mx-2" style="color: white" to="/home">Home</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/services">Services</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/about">About</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-card class="pa-6 printable-form">
          <div class="text-center mb-6">
            <div class="text-subtitle-1">Republic of the Philippines</div>
            <div class="text-subtitle-1">City/Municipality of Naga</div>
            <div class="text-subtitle-1 mb-4">Province of Camarines Sur</div>
            <div class="text-h5 font-weight-bold">
              UNIFIED APPLICATION FORM FOR CERTIFICATE OF OCCUPANCY
            </div>
          </div>

          <v-row no-gutters class="d-flex justify-center mb-4">
            <v-col cols="12" class="d-flex justify-center flex-wrap">
              <v-checkbox label="FULL" hide-details readonly class="mx-4"></v-checkbox>
              <v-checkbox label="PARTIAL" hide-details readonly class="mx-4"></v-checkbox>
            </v-col>
          </v-row>

          <v-row no-gutters class="d-flex align-center mb-4">
            <div class="text-body-1 font-weight-bold">THIS ALSO APPLIES FOR:</div>
            <v-checkbox
              label="FIRE SAFETY INSPECTION CERTIFICATE"
              hide-details
              readonly
              class="ms-4"
            ></v-checkbox>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <div class="line-label">BUILDING PERMIT NO.:</div>
              <div class="line-container flex-grow-1"><div class="line"></div></div>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <div class="line-label">DATE ISSUED:</div>
              <div class="line-container flex-grow-1"><div class="line"></div></div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <div class="line-label">FSEC NO.:</div>
              <div class="line-container flex-grow-1"><div class="line"></div></div>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex align-center">
              <div class="line-label">DATE ISSUED:</div>
              <div class="line-container flex-grow-1"><div class="line"></div></div>
            </v-col>
          </v-row>

          <v-row dense class="mb-4">
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label d-flex justify-space-between w-100">
                  <span>Name of Applicant/Owner:</span>
                  <span class="ms-10">(Last Name)</span>
                  <span class="ms-10">(Given Name)</span>
                  <span class="ms-10">(Middle Initial)</span>
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label d-flex justify-space-between w-100">
                  <span>Address of Applicant/Owner:</span>
                  <span class="ms-10">ZIP Code</span>
                  <span class="ms-10">Contact No.</span>
                </div>
              </div>
            </v-col>
          </v-row>

          <div class="text-h6 font-weight-bold text-center mb-2">
            Requirements submitted:
          </div>
          <div class="d-flex flex-column">
            <v-checkbox
              label="Two (2) copies of accomplished Unified Application form for Certificate of Occupancy, duly notarized;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Two (2) copies of Certificate of Completion, duly notarized;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Construction Logbook, signed and sealed by the Owner's Architect or Civil Engineer who undertook full-time inspection and supervision;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Two (2) photocopies of the valid licenses of all involved professionals;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Photograph of the structure with substantial completion showing front, sides, and rear areas;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Two (2) sets of As-Built Plans, if there are changes in the building plans covered by the issued Building Permit;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Two (2) copies of Certificate of Final Electrical Inspection;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Two (2) copies of Fire Safety Inspection Certificate from the Bureau of Fire and Protection;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox
              label="Sketch map indicating the location of the project;"
              hide-details
              readonly
            ></v-checkbox>
            <v-checkbox label="Others: " hide-details readonly></v-checkbox>
          </div>

          <v-row dense class="mb-4 mt-4">
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label">Name of Project:</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label">Location of Project:</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label">Use/Character of Occupancy:</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label">No. of Storey/s:</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label">Type of Use:</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label">Total Gross Floor Area (Square Meters):</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="form-field-line">
                <div class="line"></div>
                <div class="line-label">Date of Completion:</div>
              </div>
            </v-col>
          </v-row>
        </v-card>

        <v-row no-gutters class="d-flex justify-space-between mb-4 no-print">
          <v-btn color="success" @click="downloadPDF">Download Form</v-btn>
          <div>
            <v-btn color="grey" class="mr-2" to="/cost">Back</v-btn>
            <v-btn color="primary" to="/forms">Submit</v-btn>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "BuildingPermitPDF",
  methods: {
    downloadPDF() {
      const element = this.$el.querySelector(".printable-form");
      const opt = {
        margin: 10,
        filename: "Certificate_of_Completion.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    },
  },
};
</script>

<style scoped>
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

/* Print Styles */
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
}
</style>
