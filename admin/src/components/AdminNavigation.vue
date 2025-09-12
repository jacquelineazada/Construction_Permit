<template>
  <v-navigation-drawer app permanent>
    <div class="d-flex align-center px-4" style="height: 57px">
      <v-icon size="36" class="me-2" color="#007bff">mdi-office-building</v-icon>
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
        <v-list-item link to="/opapplicants" class="py-1">
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
        <v-list-item link class="py-1">
          <div class="d-flex align-center">
            <v-icon class="me-3">mdi-logout</v-icon>
            <span>Logout</span>
          </div>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>
