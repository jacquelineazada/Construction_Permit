<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar flat color="#0000CC" dark height="88" app>
      <v-toolbar-title class="font-weight-bold">
        <v-icon left>mdi-office-building-outline</v-icon>
        Building Permit Portal
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <!-- Header -->
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
          <v-icon color="#0000CC" class="mr-2" size="30"
            >mdi-office-building</v-icon
          >
          <h2 class="mb-0 font-weight-bold page-title-responsive gradient-text">
            Building Permit Application
          </h2>
        </div>
      </v-card>

      <v-container fluid style="max-width: 1400px">
        <v-row class="mt-4" align="stretch">
          <!-- Construction Type Guide -->
          <v-col cols="12" md="4">
            <v-card class="pa-4 rounded-xl card-shadow">
              <v-card-title class="text-h6 font-weight-bold mb-2">
                <v-icon left color="#1565c0" class="mr-2"
                  >mdi-information-outline</v-icon
                >
                Construction Type Guide
              </v-card-title>
              <v-expansion-panels flat multiple>
                <v-expansion-panel
                  v-for="(item, i) in constructionTypes"
                  :key="i"
                  class="bg-transparent"
                  elevation="0"
                >
                  <v-expansion-panel-title
                    class="font-weight-medium text-primary"
                  >
                    <v-icon left small color="#0000CC" class="mr-2"
                      >mdi-domain</v-icon
                    >
                    {{ item.title }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <ul class="ml-4 mb-2">
                      <li
                        v-for="(form, j) in item.forms"
                        :key="j"
                        class="font-weight-regular text-grey-darken-2"
                      >
                        {{ form }}
                      </li>
                    </ul>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <!-- Ancillary Forms -->
          <v-col cols="12" md="8">
            <v-card class="pa-6 rounded-xl card-shadow">
              <v-card-title
                class="text-h5 font-weight-bold card-title-responsive mb-1 gradient-text"
              >
                <v-icon left color="#1565c0" class="mr-2"
                  >mdi-file-document-multiple-outline</v-icon
                >
                Ancillary Forms
              </v-card-title>
              <v-card-subtitle class="mt-1 text-wrap mb-4 text-grey-darken-1">
                Click on a document type to download its specific forms.
              </v-card-subtitle>
              <v-row class="mt-1" align="stretch" justify="center">
                <v-col
                  v-for="(form, i) in ancillaryForms"
                  :key="i"
                  cols="12"
                  sm="6"
                  md="4"
                  class="d-flex justify-center"
                >
                  <v-card
                    elevation="2"
                    class="d-flex flex-column align-center justify-center pa-4 text-center rounded-lg hoverable-card transition-ease doc-card"
                    @click="downloadForm(form.title)"
                  >
                    <div
                      class="icon-bg mb-2 d-flex align-center justify-center"
                    >
                      <v-icon size="44" color="#0000CC">{{ form.icon }}</v-icon>
                    </div>
                    <v-card-text
                      class="pa-0 font-weight-medium form-title-text"
                    >
                      {{ form.title }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row justify="end" class="mt-6">
                <v-col cols="auto">
                  <v-btn
                    color="#0000CC"
                    dark
                    elevation="2"
                    size="x-large"
                    class="rounded-pill font-weight-bold px-8"
                    to="/applicant/documentaryrequirements"
                  >
                    Next
                    <v-icon right>mdi-arrow-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const constructionTypes = ref([
  {
    title: "NEW CONSTRUCTION",
    forms: [
      "Architectural",
      "Civil/Structural",
      "Sanitary/Plumbing",
      "Mechanical",
      "Electrical",
      "Electronics",
    ],
  },
  {
    title: "ERECTION",
    forms: [
      "Civil/Structural",
      "Architectural",
      "Electrical",
      "Mechanical",
      "Electronics",
      "Sanitary",
    ],
  },
  {
    title: "ADDITION",
    forms: [
      "Civil/Structural",
      "Architectural",
      "Electrical",
      "Mechanical",
      "Electronics",
      "Sanitary",
    ],
  },
  {
    title: "ALTERATION",
    forms: ["Architectural", "Civil/Structural", "Electrical"],
  },
  { title: "RENOVATION", forms: ["Architectural", "Structural"] },
  {
    title: "CONVERSION",
    forms: ["Architectural", "Structural", "Electrical", "Electronics"],
  },
  { title: "REPAIR", forms: ["Architectural", "Structural"] },
  { title: "MOVING", forms: ["Architectural/Structural", "Mechanical"] },
  { title: "RAISING", forms: ["Architectural", "Structural"] },
  {
    title: "ACCESSORY BUILDING",
    forms: ["Architectural", "Structural", "Electrical", "Sanitary"],
  },
  { title: "LEGALIZATION", forms: ["Architectural", "Structural"] },
]);

const ancillaryForms = ref([
  { title: "Architectural Document", icon: "mdi-drawing" },
  { title: "Civil/Structural Document", icon: "mdi-hammer" },
  { title: "Electrical Document", icon: "mdi-lightning-bolt" },
  { title: "Sanitary Document", icon: "mdi-water-pump" },
  { title: "Mechanical Document", icon: "mdi-cog" },
  { title: "Electronics Document", icon: "mdi-chip" },
]);

function downloadForm(title) {
  // Place logic here to download the corresponding form (e.g., open a PDF, trigger a download, etc.)
  alert(`Downloading ${title}...`);
}
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #1976d2 10%, #0000cc 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-shadow {
  box-shadow: 0 2px 14px 0 rgba(25, 118, 210, 0.11);
  border-radius: 22px;
  border: 1.5px solid #e3eafc;
}
.icon-bg {
  background: linear-gradient(180deg, #e3eaff 70%, #fff 100%);
  border-radius: 50%;
  width: 64px;
  height: 64px;
}
.form-title-text {
  font-size: 1.13rem;
  color: #00145a;
}
.hoverable-card {
  transition: box-shadow 0.23s, border-color 0.23s, transform 0.12s;
}
.hoverable-card:hover {
  border-color: #0000cc;
  box-shadow: 0 4px 16px 2px rgba(0, 0, 100, 0.07);
  transform: translateY(-3px) scale(1.035);
}
.v-card.pa-6 {
  background: #f7fafd;
}

/* --- Ensures all ancillary cards are the same size --- */
.doc-card {
  width: 280px;
  height: 170px;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  justify-content: center !important;
  align-items: center !important;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow 0.22s, border-color 0.22s;
  display: flex;
}
@media (max-width: 900px) {
  .doc-card {
    width: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
    height: 170px !important;
  }
}
@media (max-width: 600px) {
  .v-card.pa-6,
  .v-card.pa-4 {
    padding: 12px !important;
  }
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
  .doc-card {
    min-width: 100% !important;
    width: 100% !important;
    height: 140px !important;
  }
}
.page-title-responsive {
  font-size: 1.35rem;
  letter-spacing: 0.02em;
}
@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.13rem !important;
  }
}
@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
  .card-title-responsive {
    font-size: 1.1rem !important;
  }
}
</style>