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

      <v-container fluid>
        <v-card class="main-content-card card-shadow mx-auto" max-width="1300">
          <v-row>
            <v-col
              v-for="(plan, i) in planUploads"
              :key="i"
              cols="12"
              sm="6"
              md="4"
              class="d-flex"
            >
              <v-card
                class="pa-2 rounded-xl plan-upload-card flex-grow-1"
                elevation="3"
              >
                <div class="d-flex align-start ga-2 mb-1">
                  <div
                    class="plan-icon-bg d-flex align-center justify-center mr-3"
                  >
                    <v-icon size="30" color="#0000CC">{{ plan.icon }}</v-icon>
                  </div>
                  <div class="text-left">
                    <v-card-title
                      class="pa-0 font-weight-bold text-wrap text-subtitle-1 plan-title"
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
                <v-divider class="my-divider"></v-divider>
                <v-card
                  flat
                  class="pa-2 rounded-lg d-flex flex-column align-center plan-dropzone"
                  elevation="0"
                  @click="triggerFileInput(i)"
                  :class="{ 'has-file': uploadedFiles[i] }"
                >
                  <template v-if="!uploadedFiles[i]">
                    <v-icon size="30" color="#c0c0c0"
                      >mdi-cloud-upload-outline</v-icon
                    >
                    <v-card-text
                      class="pa-1 text-caption font-weight-bold text-wrap text-center"
                      style="margin-bottom: 3px"
                    >
                      Drop files here or click to browse
                    </v-card-text>
                    <v-card-text
                      class="pa-0 text-caption font-weight-regular text-grey-darken-1 text-wrap text-center"
                      style="margin-bottom: 0"
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
                    ref="fileInputs"
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
          <v-row justify="end" class="mt-2">
            <v-col cols="auto" class="d-flex align-center ga-2">
              <v-btn
                variant="text"
                color="red-darken-1"
                class="text-none rounded-pill font-weight-bold"
                @click="clearAllFiles"
              >
                <v-icon start>mdi-delete</v-icon>
                Clear All
              </v-btn>
              <v-btn
                color="#0000CC"
                dark
                class="rounded-pill text-none font-weight-bold"
                elevation="2"
                @click="submitAllPlans"
              >
                <v-icon start>mdi-upload</v-icon>
                Submit All Plans
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>

    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card class="pa-4 text-center rounded-xl" elevation="10">
        <div class="d-flex justify-center my-4">
          <v-icon color="green-lighten-1" size="80">
            mdi-check-circle-outline
          </v-icon>
        </div>

        <v-card-title class="text-h5 font-weight-bold text-wrap mb-2">
          Submitted Successfully
        </v-card-title>
        <v-card-text class="text-subtitle-1 text-grey-darken-1">
          Your building plans have been submitted for review. You will be
          notified of the next steps.
        </v-card-text>
        <v-card-actions class="justify-center pt-4 pb-2">
          <v-btn
            color="#0000CC"
            class="text-none rounded-pill px-8"
            @click="closeSuccessDialog"
            to="/applicant/selectancillary"
            elevation="2"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, nextTick } from "vue";

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
const showSuccessDialog = ref(false);
const fileInputs = ref([]); // for programmatically triggering

const handleFileUpload = (index, file) => {
  if (file && file[0]) {
    uploadedFiles.value[index] = file[0];
  } else {
    uploadedFiles.value[index] = null;
  }
};

const clearAllFiles = () => {
  uploadedFiles.value = new Array(planUploads.value.length).fill(null);
};

const submitAllPlans = () => {
  const plansToSubmit = uploadedFiles.value.filter((file) => file !== null);
  // In real application, you would make an API call here
  showSuccessDialog.value = true;
};

const closeSuccessDialog = () => {
  showSuccessDialog.value = false;
  clearAllFiles();
};

// Programmatic file input trigger for click-to-browse
const triggerFileInput = (i) => {
  nextTick(() => {
    const fileInputsEl = Array.isArray(fileInputs.value)
      ? fileInputs.value
      : [fileInputs.value];
    if (fileInputsEl[i] && fileInputsEl[i].$el) {
      fileInputsEl[i].$el.querySelector("input[type='file']").click();
    }
  });
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #1976d2 10%, #0000cc 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-shadow {
  box-shadow: 0 2px 14px 0 rgba(25, 118, 210, 0.11);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}
.main-content-card {
  padding: 12px 6px 6px 6px;
  margin: 16px auto 16px auto;
  border-radius: 18px;
  background: #fafdff;
}
.plan-upload-card {
  min-height: 225px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 20, 0.07);
  border: 1px solid #e3eafc;
  transition: box-shadow 0.18s, border-color 0.18s;
  padding: 10px 8px 8px 8px !important;
}
.plan-upload-card:hover {
  border-color: #0000cc;
  box-shadow: 0 8px 28px 4px rgba(25, 118, 210, 0.11);
}
.plan-icon-bg {
  background: linear-gradient(180deg, #e3eaff 70%, #fff 100%);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  margin-right: 10px;
}
.plan-title {
  color: #00145a;
  font-size: 1rem;
  line-height: 1.1;
}
.text-subtitle-1 {
  font-size: 0.95rem;
}
.v-card-title.pa-0 {
  margin-bottom: 0px;
}
.my-divider {
  margin-top: 6px !important;
  margin-bottom: 6px !important;
}
.plan-dropzone {
  border: 2px dashed #e0e0e0;
  background: #f6fafd;
  min-height: 54px;
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
  position: relative;
  justify-content: center;
  padding: 8px 4px !important;
}
.plan-dropzone .v-icon {
  margin-bottom: 2px;
}
.plan-dropzone.has-file {
  border-color: #4caf50;
  background: #f2fff4;
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
@media (max-width: 1200px) {
  .main-content-card {
    padding: 8px !important;
    margin: 10px 0 10px 0 !important;
  }
  .plan-upload-card {
    padding: 6px 3px 6px 3px !important;
    min-height: 170px;
  }
}
@media (max-width: 900px) {
  .plan-upload-card {
    min-height: 140px;
    padding: 6px 2px 5px 2px !important;
  }
}
@media (max-width: 600px) {
  .main-content-card {
    padding: 2px !important;
    margin: 2px 0 2px 0 !important;
    border-radius: 10px !important;
  }
  .plan-upload-card {
    min-height: 95px;
    border-radius: 8px;
    padding: 3px 1px !important;
  }
  .plan-icon-bg {
    width: 26px;
    height: 26px;
  }
  .plan-dropzone {
    min-height: 36px;
    padding: 4px 1px !important;
  }
}
.page-title-responsive {
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}
@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
}
</style>