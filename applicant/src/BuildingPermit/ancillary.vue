<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0 px-6"
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

    <v-main class="bg-grey-lighten-3">
      <v-container fluid style="max-width: 1600px" class="pa-6">
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4 rounded-lg">
              <v-card-title class="text-h6 font-weight-bold">
                Construction Type Guide
              </v-card-title>
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="(item, i) in constructionTypes"
                  :key="i"
                  class="bg-transparent"
                >
                  <v-expansion-panel-title>
                    {{ item.title }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <ul class="ml-4">
                      <li v-for="(form, j) in item.forms" :key="j">
                        {{ form }}
                      </li>
                    </ul>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card class="pa-6 rounded-lg">
              <v-card-title
                class="text-h6 font-weight-bold card-title-responsive"
              >
                ANCILLARY FORMS
              </v-card-title>
              <v-card-subtitle class="mt-2 text-wrap">
                Click on a document type to download its specific forms
              </v-card-subtitle>
              <v-row class="mt-4">
                <v-col
                  v-for="(form, i) in ancillaryForms"
                  :key="i"
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-card
                    flat
                    class="d-flex flex-column align-center pa-4 text-center rounded-lg"
                    style="border: 1px solid #e0e0e0; cursor: pointer"
                  >
                    <v-icon size="48" color="#0000CC" class="mb-2">{{
                      form.icon
                    }}</v-icon>
                    <v-card-text class="pa-0 font-weight-medium">
                      {{ form.title }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
            <v-row justify="end" class="mt-4">
              <v-col cols="auto">
                <v-btn
                  color="#0000CC"
                  dark
                  size="x-large"
                  class="rounded-lg"
                  to="/plans"
                >
                  NEXT
                </v-btn>
              </v-col>
            </v-row>
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
  { title: "LEGALIZATION", forms: ["Architectural", "Structual"] },
]);

const ancillaryForms = ref([
  { title: "Architectural Document", icon: "mdi-drawing" },
  { title: "Civil/Structural Document", icon: "mdi-hammer" },
  { title: "Electrical Document", icon: "mdi-lightning-bolt" },
  { title: "Sanitary Document", icon: "mdi-water-pump" },
  { title: "Mechanical Document", icon: "mdi-cog" },
  { title: "Electronics Document", icon: "mdi-chip" },
]);
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

/* Responsive adjustment for card titles */
@media (max-width: 960px) {
  .card-title-responsive {
    font-size: 1.25rem !important; /* Smaller title size for mobile */
  }
}
</style>