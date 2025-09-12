<template>
  <v-app>
    <!-- Header -->
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

    <v-navigation-drawer app permanent>
      <div class="d-flex align-center px-4" style="height: 57px">
        <v-icon size="36" class="me-2" color="#007bff"
          >mdi-office-building</v-icon
        >
        <div>
          <div class="text-h7 font-weight-bold" style="line-height: 1.2">
            Construction Permit
          </div>
          <div class="text-caption font-weight-regular" style="color: #6c757d">
            Management System
          </div>
        </div>
      </div>
      <div class="d-flex flex-column" style="height: calc(100vh - 88px - 57px)">
        <v-list
          nav
          dense
          class="py-0"
          style="font-size: 14px; flex-grow: 1; overflow-y: auto"
        >
          <v-list-item link to="/dashboard" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-home-outline</v-icon>
              <span>Dashboard</span>
            </div>
          </v-list-item>
          <v-list-item link to="/locational-clearance" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-map-marker-outline</v-icon>
              <span>Locational Clearance</span>
            </div>
          </v-list-item>
          <v-list-item link to="/bpapplicants" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-file-document-outline</v-icon>
              <span>Building Permit</span>
            </div>
          </v-list-item>
          <v-list-item link to="/occupancy-permit" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-file-certificate-outline</v-icon>
              <span>Occupancy Permit</span>
            </div>
          </v-list-item>
          <v-list-item link to="/compliance-monitoring" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-clipboard-list-outline</v-icon>
              <span>Compliance Monitoring</span>
            </div>
          </v-list-item>
        </v-list>
        <v-list nav dense class="py-0 mt-auto" style="font-size: 14px">
          <v-list-item link @click="logout" class="py-1">
            <div class="d-flex align-center">
              <v-icon class="me-3">mdi-logout</v-icon>
              <span>Logout</span>
            </div>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <!-- Main content area -->
    <v-main>
      <v-container fluid class="fill-height justify-center">
        <!-- Account Management Card -->
        <v-card class="pa-8" style="width: 100%; max-width: 1200px">
          <v-row>
            <!-- Left Column: Profile & Password -->
            <v-col cols="12" md="5" class="pa-5">
              <h3 class="text-h6 font-weight-bold mb-4 text-center">
                Account Management
              </h3>
              <div class="d-flex justify-center position-relative">
                <v-avatar size="150" class="mb-4">
                  <v-img
                    src="https://placehold.co/200x200/cccccc/333333?text=Profile"
                  ></v-img>
                </v-avatar>
                <v-btn icon small class="position-absolute top-0 right-0 ma-2">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-center">
                <v-btn
                  outlined
                  color="primary"
                  class="mt-4"
                  block
                  @click="handleUploadClick"
                >
                  <v-icon left>mdi-upload</v-icon>
                  Upload Photo
                </v-btn>
              </div>

              <v-divider class="my-6"></v-divider>
              <p class="input-label">Old Password</p>
              <v-text-field
                type="password"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-1"
              ></v-text-field>
              <p class="input-label">New Password</p>
              <v-text-field
                type="password"
                variant="outlined"
                density="compact"
                hide-details
                class="mt-1"
              ></v-text-field>
              <v-btn color="primary" block class="mt-4">
                Change Password
              </v-btn>
            </v-col>

            <!-- Right Column: Profile Information -->
            <v-col cols="12" md="7" class="pa-5">
              <h4 class="text-h6 font-weight-bold">Profile Information</h4>
              <v-divider class="my-4"></v-divider>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <p class="input-label">Username</p>
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mt-1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <p class="input-label">First Name</p>
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mt-1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <p class="input-label">Last Name</p>
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mt-1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <p class="input-label">Email</p>
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mt-1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <p class="input-label">Contact Number</p>
                  <v-text-field
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mt-1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <p class="input-label">Role</p>
                  <v-select
                    :items="[
                      'Administrative',
                      'Engineer',
                      'Civil Engineer',
                      'Mechanical Engineer',
                      'Electrical Engineer',
                      'Architect',
                      'electronics engineer',
                    ]"
                    variant="outlined"
                    density="compact"
                    hide-details
                    class="mt-1"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

// Create a ref for the file input element.
const fileInput = ref(null);

// Function to handle the button click and trigger the file input.
const handleUploadClick = () => {
  // Use the ref to click the hidden file input.
  fileInput.value.click();
};
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}
.input-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 4px;
}
</style>
