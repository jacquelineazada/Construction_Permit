<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app></v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6"
        style="
          background-color: white;
          border-bottom: 1px solid lightgrey;
          height: 50px;
        "
      >
        <div class="d-flex align-center">
          <v-icon color="blue" class="mr-2">mdi-office-building</v-icon>
          <h3 class="mb-0 font-weight-bold">Building Permit Application</h3>
        </div>
      </v-card>

      <v-card class="main-content-card" elevation="1">
        <v-row>
          <v-col
            v-for="(plan, i) in planUploads"
            :key="i"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card flat class="pa-4 rounded-xl" elevation="2">
              <div class="d-flex align-start ga-2">
                <v-icon size="36" color="#0000CC">{{ plan.icon }}</v-icon>
                <div class="text-left">
                  <v-card-title
                    class="pa-0 text-wrap font-weight-medium text-subtitle-1"
                  >
                    {{ plan.title }}
                  </v-card-title>
                  <v-card-text
                    class="pa-0 text-caption text-grey-darken-1 text-wrap mt-1"
                  >
                    {{ plan.description }}
                  </v-card-text>
                </div>
              </div>
              <v-divider class="my-4"></v-divider>
              <v-card
                flat
                class="pa-4 rounded-lg d-flex flex-column align-center"
                style="border: 2px dashed #e0e0e0; cursor: pointer"
                elevation="0"
              >
                <template v-if="!uploadedFiles[i]">
                  <v-icon size="30" color="grey"
                    >mdi-cloud-upload-outline</v-icon
                  >
                  <v-card-text
                    class="pa-1 text-caption font-weight-medium text-wrap mt-2 text-center"
                  >
                    Drop files here or click to browse
                  </v-card-text>
                  <v-card-text
                    class="pa-0 text-caption font-weight-regular text-grey-darken-1 text-wrap text-center"
                  >
                    PDF files only • Maximum file size: 50MB
                  </v-card-text>
                </template>
                <template v-else>
                  <div class="d-flex align-center justify-center">
                    <v-icon color="green" class="mr-2"
                      >mdi-check-circle-outline</v-icon
                    >
                    <v-card-text
                      class="pa-0 text-caption font-weight-medium text-wrap"
                    >
                      {{ uploadedFiles[i].name }} ({{
                        (uploadedFiles[i].size / 1024 / 1024).toFixed(2)
                      }}
                      MB)
                    </v-card-text>
                  </div>
                </template>
                <v-file-input
                  class="file-input-overlay"
                  v-model="uploadedFiles[i]"
                  :accept="['.pdf']"
                  :max-size="50 * 1024 * 1024"
                  hide-details
                  single-line
                  variant="plain"
                  @update:modelValue="handleFileUpload(i, $event)"
                ></v-file-input>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="end" class="mt-4">
          <v-col cols="auto" class="d-flex align-center ga-2">
            <v-btn
              variant="text"
              color="black"
              class="text-none rounded-pill"
              @click="clearAllFiles"
            >
              <v-icon start>mdi-delete</v-icon>
              Clear All
            </v-btn>
            <v-btn
              color="#0000CC"
              dark
              class="rounded-pill text-none"
              elevation="2"
              @click="submitAllPlans"
            >
              <v-icon start>mdi-upload</v-icon>
              Submit All Plans
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
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

const uploadedFiles = ref(new Array(planUploads.value.length).fill(null));

const handleFileUpload = (index, file) => {
  if (file && file[0]) {
    uploadedFiles.value[index] = file[0];
  } else {
    uploadedFiles.value[index] = null;
  }
};

const clearAllFiles = () => {
  uploadedFiles.value = new Array(planUploads.value.length).fill(null);
  console.log("All files cleared.");
};

const submitAllPlans = () => {
  const plansToSubmit = uploadedFiles.value.filter((file) => file !== null);
  console.log("Submitting the following files:", plansToSubmit);
  alert(`Submitting ${plansToSubmit.length} plan(s) for review.`);
};
</script>

<style scoped>
.app-container {
  background-color: #f5f5f5;
}

.main-content-card {
  /* This is the key change: a custom class to control spacing */
  padding: 16px; /* Top/bottom padding */
  margin: 16px 12px 16px 12px; /* A small horizontal margin for spacing */
  border-radius: 8px;
}

.file-input-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
</style>