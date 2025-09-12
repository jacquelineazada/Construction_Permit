<template>
  <v-app>
    <!-- Top App Bar -->
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
        style="max-width: 1600px"
      >
        <!-- Logo and Titles -->
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

        <!-- Navigation Links -->
        <div class="d-none d-md-flex nav-links">
          <v-btn text class="mx-2" style="color: white" to="/home">Home</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/services">Services</v-btn>
          <v-btn text class="mx-2" style="color: white" to="/about">About</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-3">
      <v-container fluid style="max-width: 1600px" class="pa-6">
        <v-row>
          <v-col cols="12">
            <v-card class="pa-6 rounded-lg" style="height: 510px">
              <v-row>
                <v-col v-for="(plan, i) in planUploads" :key="i" cols="12" sm="6" lg="4">
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

                    <!-- File Upload Box -->
                    <div
                      class="mt-4 pa-4 rounded-lg d-flex flex-column align-center"
                      :style="{
                        border: plan.file ? '2px solid #4CAF50' : '2px dashed #e0e0e0',
                        cursor: 'pointer',
                      }"
                      @click="triggerFileUpload(i)"
                    >
                      <v-icon v-if="!plan.file" size="36" color="grey">
                        mdi-cloud-upload-outline
                      </v-icon>
                      <v-icon v-else size="36" color="#4CAF50">
                        mdi-check-circle-outline
                      </v-icon>

                      <v-card-text class="pa-1 text-caption font-weight-medium text-wrap">
                        {{
                          plan.file
                            ? "File uploaded: " + plan.file.name
                            : "Drop files here or click to browse"
                        }}
                      </v-card-text>
                      <v-card-text
                        class="pa-0 text-caption font-weight-regular text-grey-darken-1 text-wrap"
                      >
                        PDF files only • Maximum file size:
                      </v-card-text>

                      <!-- Hidden File Input -->
                      <input
                        type="file"
                        :ref="(el) => (fileInputRefs[i] = el)"
                        style="display: none"
                        accept=".pdf"
                        @change="handleFileUpload($event, i)"
                      />
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>

            <!-- Action Buttons -->
            <v-row justify="end" class="mt-4">
              <v-col cols="auto" class="d-flex align-center">
                <v-btn
                  text
                  color="black"
                  class="text-none rounded-lg"
                  @click="clearAllFiles"
                >
                  <v-icon start>mdi-delete</v-icon>
                  Clear All
                </v-btn>
                <v-btn color="#0000CC" dark class="rounded-lg ml-4 text-none">
                  <v-icon start>mdi-upload</v-icon>
                  Submit
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

// File input references
const fileInputRefs = ref([]);

// File upload plans
const planUploads = ref([
  {
    title: "Construction Logbook",
    description:
      "This must be signed by the contractor and the supervising professional as proof of actual construction activities.",
    icon: "mdi-home-outline",
    file: null,
  },
  {
    title: "As-built Plans",
    description:
      "Required only for projects with major changes or deviations from the approved building plans.",
    icon: "mdi-domain",
    file: null,
  },
  {
    title: "Sketch of Location",
    description:
      "A simple drawing showing the project's location, nearby streets, and major landmarks.",
    icon: "mdi-cog-outline",
    file: null,
  },
]);

// Trigger hidden file input
const triggerFileUpload = (index) => {
  if (fileInputRefs.value[index]) {
    fileInputRefs.value[index].click();
  }
};

// Handle file selection
const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    planUploads.value[index].file = file;
    console.log(`File selected for ${planUploads.value[index].title}:`, file.name);
  }
};

// Clear all uploaded files
const clearAllFiles = () => {
  planUploads.value.forEach((plan) => {
    plan.file = null;
  });
  console.log("All files cleared.");
};
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}
</style>
