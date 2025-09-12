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

    <v-main class="grey-background">
      <v-container fluid class="pa-4" style="max-width: 1000px">
        <v-card class="pa-6 printable-form">
          <div class="text-center mb-6">
            <div class="text-subtitle-1">Republic of the Philippines</div>
            <div class="text-subtitle-1">City/Municipality of Naga</div>
            <div class="text-subtitle-1 mb-4">Province of Camarines Sur</div>
            <div class="text-h5 font-weight-bold">CERTIFICATE OF COMPLETION</div>
          </div>
        </v-card>

        <v-row no-gutters class="d-flex justify-space-between mt-4 no-print">
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
