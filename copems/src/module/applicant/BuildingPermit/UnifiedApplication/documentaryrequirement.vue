<template>
  <v-app>
    <v-app-bar flat color="#0D47A1" dark height="88" app>
      <v-toolbar-title class="ml-2 font-weight-bold text-h5">
        <v-icon left>mdi-file-document-multiple-outline</v-icon> E-Permit Portal
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon><v-icon>mdi-help-circle-outline</v-icon></v-btn>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6 page-header-card"
        style="
          background-color: white;
          border-bottom: 2px solid #e0e0e0;
          height: 72px; /* Increased height */
        "
      >
        <div class="d-flex align-center">
          <v-icon color="blue-darken-3" class="mr-3" size="36"
            >mdi-office-building-cog-outline</v-icon
          >
          <h2
            class="mb-0 text-h5 font-weight-bold page-title-responsive gradient-text"
          >
            Building Permit Application Checklist
          </h2>
        </div>
      </v-card>

      <v-container fluid class="d-flex justify-center py-10">
        <v-card class="checklist-card elevation-6" max-width="900" rounded="lg">
          <v-card-text class="pa-6">
            <div class="text-h6 text-center mb-1 mt-2 font-weight-bold">
              DOCUMENTARY REQUIREMENTS
            </div>
            <div
              class="text-body-2 text-center text-medium-emphasis mb-6 font-italic"
            >
              (For Single Dwelling Residential / Commercial / Industrial /
              Others)
            </div>

            <div
              v-for="(section, sectionIndex) in requirements"
              :key="sectionIndex"
              class="mb-6"
            >
              <div
                class="section-header pa-3 mb-2 rounded-sm d-flex align-center"
              >
                <v-icon class="mr-3" color="blue-darken-3" size="20">{{
                  section.icon
                }}</v-icon>
                <div
                  class="text-subtitle-1 font-weight-bold text-blue-darken-3 text-uppercase"
                >
                  {{ section.title }}
                </div>
              </div>

              <v-list density="comfortable" class="py-0 checklist-list">
                <v-list-item
                  v-for="(item, itemIndex) in section.items"
                  :key="itemIndex"
                  class="px-2"
                  :class="{ 'alt-row': itemIndex % 2 !== 0 }"
                >
                  <v-row align="center" dense class="py-1">
                    <v-col cols="auto" class="d-flex justify-center pr-0">
                      <v-checkbox-btn
                        v-model="item.checked"
                        density="compact"
                        color="success"
                        class="check-btn"
                        :ripple="false"
                      ></v-checkbox-btn>
                    </v-col>

                    <v-col class="py-1">
                      <span class="text-body-2 requirement-description"
                        >{{ item.description }}
                        <v-chip
                          v-if="item.note"
                          label
                          size="x-small"
                          color="blue-grey"
                          variant="tonal"
                          class="ml-2 font-weight-medium"
                        >
                          {{ item.note }}
                        </v-chip>
                      </span>
                    </v-col>

                    <v-col cols="auto" class="text-right py-1 pl-0">
                      <v-chip
                        v-if="item.copies"
                        label
                        size="small"
                        color="blue-darken-3"
                        variant="flat"
                        class="font-weight-bold copies-chip"
                        >{{ item.copies }}</v-chip
                      >
                    </v-col>
                  </v-row>
                  <v-divider
                    v-if="itemIndex < section.items.length - 1"
                    class="ml-2 mr-2"
                  ></v-divider>
                </v-list-item>
              </v-list>
            </div>

            <v-alert
              type="info"
              title="IMPORTANT NOTES"
              variant="flat"
              color="blue-lighten-5"
              border="start"
              border-color="blue-darken-3"
              class="mt-8 text-caption pa-4"
              icon="mdi-lightbulb-on-outline"
            >
              <ul class="ml-2 mt-2">
                <li>
                  All the fully accomplished forms and requirements must be
                  fastened in a **LONG FOLDER** except for the Drawing plans and
                  Reports.
                </li>
                <li>
                  **ONLY A COMPLETE APPLICATION WILL BE ACCEPTED** for
                  processing.
                </li>
                <li>
                  Bring this checklist with detachable claim stub when
                  submitting your application.
                </li>
                <li>
                  Keep your **CLAIM STUB** at all times; "**NO CLAIM STUB, NO
                  RELEASE**".
                </li>
                <li>
                  For updates and inquiries, please call CEO/OBO at
                  <v-chip
                    size="small"
                    color="blue-darken-3"
                    variant="outlined"
                    class="font-weight-bold"
                    >Tel Nos. (054) 205-2980 Local 1060</v-chip
                  >
                  within four (4) working days.
                </li>
              </ul>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

// Placeholder for the image source
const sealImage = ref(
  "data:image/png;base64, (Insert base64 of City of Naga Official Seal here or a relevant URL)"
);

// Added an icon property to the section data for visual identification
const requirements = ref([
  {
    title: "TECHNICAL DOCUMENTS",
    icon: "mdi-file-chart-outline",
    items: [
      {
        description: "Filled-up Unified Application Form for Building Permit",
        copies: "4 copies",
        checked: false,
      },
      {
        description:
          "Duly Accomplished Ancillary Permit Forms (Signed & Sealed by respective Design Professionals)",
        copies: "4 copies",
        checked: false,
      },
      {
        description:
          "Design Plans and Other Related Documents (Signed & Sealed by respective Design Professionals)",
        copies: "4 sets",
        checked: false,
      },
      {
        description: "Architectural Documents",
        copies: "4 sets",
        checked: false,
      },
      {
        description: "Civil/Structural Documents",
        copies: "4 sets",
        checked: false,
      },
      { description: "Electrical Documents", copies: "4 sets", checked: false },
      { description: "Sanitary Documents", copies: "4 sets", checked: false },
      { description: "Plumbing Documents", copies: "3 sets", checked: false },
      { description: "Mechanical Documents", copies: "4 sets", checked: false },
      {
        description: "Electronics Documents",
        copies: "4 sets",
        checked: false,
      },
      { description: "Geodetic Documents", copies: "4 sets", checked: false },
      {
        description: "Fire Protection Documents",
        copies: "4 sets",
        note: "If applicable",
        checked: false,
      },
      {
        description:
          "Lot Plan with Certification of Non-Encroachment (Signed & Sealed by a Geodetic Engineer)",
        copies: "3 copies",
        checked: false,
      },
      {
        description:
          "Photocopies of Valid Licenses (PRC ID) of all involved Professionals",
        copies: "3 copies",
        checked: false,
      },
      {
        description:
          "Notarized estimated value of the building/structure to be erected as declared by the owner (Signed & Sealed by an Architect or Civil Engineer)",
        copies: "3 copies",
        checked: false,
      },
      {
        description:
          "Technical Specifications (Signed & Sealed by an Architect or Civil Engineer)",
        copies: "3 copies",
        checked: false,
      },
      {
        description: "Structural Design and Seismic Analysis",
        copies: "2 copies",
        checked: false,
      },
      {
        description: "Soil Test (Signed & Sealed by a Civil Engineer)",
        copies: "2 copies",
        checked: false,
      },
      {
        description: "Soil Boring Test Result",
        copies: "2 copies",
        note: "For 3-storeys and above",
        checked: false,
      },
      {
        description: "Plate Load Test Result",
        copies: "2 copies",
        note: "For 2-storeys with roof deck",
        checked: false,
      },
      {
        description: "Electrical Design Analysis",
        copies: "2 copies",
        checked: false,
      },
    ],
  },
  {
    title: "LOT DOCUMENTS & PROOF OF OWNERSHIP",
    icon: "mdi-home-city-outline",
    items: [
      {
        description:
          "Original Certificate of Title (OCT) / Transfer Certificate Title (TCT), Deed of Absolute Sale or Locational Plan from LRA",
        copies: "2 copies",
        note: "If lessee, Contract of Lease",
        checked: false,
      },
      { description: "Tax Declaration", copies: "2 copies", checked: false },
      { description: "Tax Receipt", copies: "2 copies", checked: false },
    ],
  },
  {
    title: "CLEARANCES",
    icon: "mdi-check-decagram-outline",
    items: [
      {
        description: "Construction Safety and Health Program approved by DOLE",
        copies: "2 copies",
        note: "Original",
        checked: false,
      },
      {
        description: "Fire Safety Evaluation Clearance from BFP",
        copies: "2 copies",
        note: "Original",
        checked: false,
      },
      {
        description: "Locational Clearance from CPDO",
        copies: "2 copies",
        note: "Original",
        checked: false,
      },
      {
        description: "DPWH Clearance",
        copies: "2 copies",
        note: "If project is along National Highway",
        checked: false,
      },
      {
        description: "ECC from DENR or ENRO Clearance from CENRO",
        copies: "2 copies",
        note: "For Commercial and Industrial",
        checked: false,
      },
      { description: "Barangay Clearance", copies: "2 copies", checked: false },
      { description: "Other Clearances", copies: "2 copies", checked: false },
    ],
  },
]);
</script>

<style scoped>
/* GENERAL STYLES */
.checklist-card {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1); /* Stronger shadow */
  width: 100%;
}

/* HEADER STYLES */
/* Naga Details Header - Darker, more authoritative blue */
.header-naga-details {
  background-color: #1565c0; /* Darker blue */
  color: white;
}

/* Secondary Application Header - Text Gradient */
.gradient-text {
  background: linear-gradient(
    to right,
    #1565c0,
    #42a5f5
  ); /* Deeper blue gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

/* SECTION STYLES */
/* Section Header Bar - Lighter background with a subtle border for separation */
.section-header {
  background-color: #e3f2fd; /* Very light blue */
  border: 1px solid #bbdefb; /* Subtle blue border */
  border-left: 5px solid #1976d2; /* Accent bar on the left */
}

/* LIST ITEM STYLES */
.checklist-list {
  background-color: transparent !important; /* Ensure list background is clear */
}

/* Alternating row color is now handled by a custom class for consistency */
.alt-row {
  background-color: #fcfcfc; /* Slightly off-white for subtle contrast */
}

/* Ensure the checkbox does not have a large margin, keeping the text closer */
.check-btn {
  /* This style is handled by the pr-0 class and density="compact" in the template */
}

/* Copies Chip - High contrast to easily spot the required quantity */
.copies-chip {
  min-width: 60px;
  justify-content: center;
}

/* Media Query for Responsive Titles */
@media (max-width: 600px) {
  .page-title-responsive {
    font-size: 1.25rem !important; /* Smaller title on mobile */
  }
}
</style>