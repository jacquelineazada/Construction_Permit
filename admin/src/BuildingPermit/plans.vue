<template>
  <v-app>
    <!-- Your provided header code -->
    <v-app-bar flat color="#0000CC" dark height="88">
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

    <!-- Main content area for the plan upload cards -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid style="max-width: 1600px" class="pa-6">
        <v-row>
          <!-- Plan Upload Cards section -->
          <v-col cols="12">
            <v-card class="pa-6 rounded-lg">
              <v-row>
                <!-- Single loop for all 6 unique cards -->
                <v-col
                  v-for="(plan, i) in planUploads"
                  :key="i"
                  cols="12"
                  sm="6"
                  lg="4"
                >
                  <v-card flat class="pa-4 rounded-lg">
                    <div class="d-flex align-start">
                      <v-icon size="48" color="#0000CC" class="mr-4">{{
                        plan.icon
                      }}</v-icon>
                      <div class="text-left">
                        <v-card-title class="pa-0 text-wrap font-weight-medium">
                          {{ plan.title }}
                        </v-card-title>
                        <v-card-text
                          class="pa-0 text-caption text-grey-darken-1 text-wrap"
                        >
                          {{ plan.description }}
                        </v-card-text>
                      </div>
                    </div>
                    <v-divider class="my-4"></v-divider>
                    <v-card
                      flat
                      class="mt-4 pa-4 rounded-lg d-flex flex-column align-center"
                      style="border: 2px dashed #e0e0e0; cursor: pointer"
                    >
                      <v-icon size="36" color="grey"
                        >mdi-cloud-upload-outline</v-icon
                      >
                      <v-card-text
                        class="pa-1 text-caption font-weight-medium text-wrap"
                      >
                        Drop files here or click to browse
                      </v-card-text>
                      <v-card-text
                        class="pa-0 text-caption font-weight-regular text-grey-darken-1 text-wrap"
                      >
                        PDF files only • Maximum file size: 50MB
                      </v-card-text>
                    </v-card>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <!-- Action buttons at the bottom -->
            <v-row justify="end" class="mt-4">
              <v-col cols="auto" class="d-flex align-center">
                <v-btn text color="black" class="text-none rounded-lg">
                  <v-icon start>mdi-delete</v-icon>
                  Clear All
                </v-btn>
                <v-btn color="#0000CC" dark class="rounded-lg ml-4 text-none">
                  <v-icon start>mdi-upload</v-icon>
                  Submit All Plans
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

const planUploads = ref([
  {
    title: "Architectural Plans",
    description: "Floor plans, elevations, sections, and details",
    icon: "mdi-home-outline",
  },
  {
    title: "Civil/Structural Plans",
    description: "Foundation, framing, and structural details",
    icon: "mdi-domain",
  },
  {
    title: "Mechanical Plan",
    description: "HVAC, ventilation, and mechanical systems",
    icon: "mdi-cog-outline",
  },
  {
    title: "Electrical Plans",
    description: "Wiring, lighting, and electrical systems",
    icon: "mdi-flash-outline",
  },
  {
    title: "Plumbing Plans",
    description: "Water supply, drainage, and plumbing fixtures",
    icon: "mdi-pipe-wrench",
  },
  {
    title: "Other Plans",
    description: "Site plans, landscape, and miscellaneous",
    icon: "mdi-file-document-outline",
  },
]);
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}
</style>
