<template>
  <div style="min-height: 100vh; background-color: #f4f6f8;">
    <v-container fluid class="pa-6">
      <!-- Header Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card class="elevation-2 rounded-xl pa-6 d-flex justify-space-between align-center bg-white">
            <div class="d-flex align-center">
              <v-avatar color="primary" variant="tonal" size="64" class="mr-5">
                <v-icon size="36">mdi-shield-account</v-icon>
              </v-avatar>
              <div>
                <h1 class="text-h4 font-weight-bold text-primary mb-1">Admin Aide Dashboard</h1>
                <div class="d-flex align-center">
                  <v-icon size="small" color="grey-darken-1" class="mr-2">mdi-check-decagram-outline</v-icon>
                  <span class="text-subtitle-1 text-grey-darken-1">Review and verify applicant data securely</span>
                </div>
              </div>
            </div>
            <v-btn color="error" variant="tonal" prepend-icon="mdi-logout" class="text-none font-weight-bold px-6 rounded-lg" size="large" @click="logout">
              Logout
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Stats Section -->
      <v-row class="mb-8">
        <v-col cols="12" md="4" v-for="stat in stats" :key="stat.title">
          <v-card class="elevation-2 rounded-xl pa-6 h-100 transition-swing hover-card border-left-indicator" :style="{ borderLeftColor: `var(--v-${stat.color}-base)` }">
            <div class="d-flex align-center">
              <v-avatar :color="stat.color" variant="tonal" size="80" class="mr-6 rounded-lg">
                <v-icon size="40">{{ stat.icon }}</v-icon>
              </v-avatar>
              <div>
                <div class="text-overline text-grey-darken-1 font-weight-bold mb-1" style="letter-spacing: 1.5px !important;">{{ stat.title }}</div>
                <div class="text-h2 font-weight-black text-grey-darken-4">{{ stat.value }}</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Data Table Section -->
      <v-row class="mb-10">
        <v-col cols="12">
          <v-card class="elevation-2 rounded-xl overflow-hidden">
            <v-card-title class="pa-8 bg-white">
              <div class="d-flex align-center w-100 flex-wrap gap-6">
                <div class="d-flex align-center mr-auto">
                  <v-avatar color="primary" variant="tonal" size="56" class="mr-4">
                    <v-icon size="28">mdi-format-list-checks</v-icon>
                  </v-avatar>
                  <div>
                    <span class="text-h5 font-weight-bold text-grey-darken-4 d-block">Applicants Verification List</span>
                    <span class="text-caption text-grey-darken-1">Manage and track verification requests</span>
                  </div>
                </div>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="Search by reference, name, etc."
                  single-line
                  hide-details
                  density="comfortable"
                  variant="outlined"
                  class="search-input rounded-lg"
                  bg-color="grey-lighten-5"
                ></v-text-field>
              </div>
            </v-card-title>
            
            <v-data-table
              :headers="headers"
              :items="applicants"
              :search="search"
              class="elevation-0 data-table-custom"
              hover
            >
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                  class="text-uppercase font-weight-bold px-3 py-1"
                  variant="flat"
                >
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <div class="d-flex justify-center align-center">
                  <v-btn 
                    color="primary" 
                    variant="tonal" 
                    size="small" 
                    class="text-none font-weight-medium mr-2" 
                    prepend-icon="mdi-text-box-search-outline" 
                    @click="reviewApplicant(item)"
                  >
                    Review
                  </v-btn>
                  <v-btn 
                    color="success" 
                    variant="tonal" 
                    size="small" 
                    class="text-none font-weight-medium" 
                    prepend-icon="mdi-check-decagram" 
                    @click="verifyApplicant(item)"
                    :disabled="item.status === 'Verified'"
                  >
                    Verify
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Review Modal -->
    <v-dialog v-model="reviewDialog" max-width="1000" persistent scrollable>
      <v-card v-if="selectedApplicant" class="rounded-xl elevation-6 overflow-hidden">
        <!-- Modal Header -->
        <v-card-title class="d-flex justify-space-between align-center pa-8 bg-primary text-white">
          <div class="d-flex align-center">
            <v-avatar color="white" variant="tonal" size="64" class="mr-5">
              <v-icon icon="mdi-file-document-edit-outline" size="36"></v-icon>
            </v-avatar>
            <div>
              <div class="text-h4 font-weight-bold lh-1 mb-1">Application Review</div>
              <div class="text-subtitle-1 font-weight-medium opacity-90 d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-identifier</v-icon>
                Reference No: {{ selectedApplicant.referenceNo }}
              </div>
            </div>
          </div>
          <v-btn icon="mdi-close" variant="text" @click="closeReviewDialog" color="white" class="opacity-80 hover-opacity-100" size="large"></v-btn>
        </v-card-title>

        <!-- Modal Tabs -->
        <v-tabs v-model="activeTab" bg-color="white" color="primary" grow class="border-bottom elevation-1">
          <v-tab value="type" class="text-none font-weight-bold text-subtitle-1 py-6">
            <v-icon start class="mr-3">mdi-account-tag</v-icon>
            Applicant Type
          </v-tab>
          <v-tab value="info" class="text-none font-weight-bold text-subtitle-1 py-6">
            <v-icon start class="mr-3">mdi-card-account-details</v-icon>
            Project & Applicant Info
          </v-tab>
          <v-tab value="requirements" class="text-none font-weight-bold text-subtitle-1 py-6">
            <v-icon start class="mr-3">mdi-file-check-outline</v-icon>
            Locational Clearance Requirements
          </v-tab>
        </v-tabs>

        <!-- Modal Content -->
        <v-card-text class="pa-0 modal-scroll-area bg-grey-lighten-4">
          <v-window v-model="activeTab">
            <!-- Applicant Type Tab -->
            <v-window-item value="type">
              <div class="pa-10 text-center">
                <v-avatar color="primary" variant="tonal" size="120" class="mb-6">
                  <v-icon size="64">mdi-account-group-outline</v-icon>
                </v-avatar>
                <h2 class="text-h4 font-weight-black text-grey-darken-3 mb-2">Applicant Classification</h2>
                <p class="text-body-1 text-grey-darken-1 mb-8">Please verify the selected applicant's category</p>
                
                <v-card class="elevation-3 rounded-xl bg-white mx-auto overflow-hidden" max-width="500">
                  <div class="bg-primary pa-4 text-white font-weight-bold text-uppercase tracking-widest text-caption">Selected Type</div>
                  <div class="pa-10">
                    <div class="text-h3 font-weight-black text-primary mb-0">{{ selectedApplicant.applicantType || 'Not specified' }}</div>
                  </div>
                </v-card>
              </div>
            </v-window-item>

            <!-- Project & Applicant Information Tab -->
            <v-window-item value="info">
              <div class="pa-8">
                <v-row>
                  <!-- Applicant Info -->
                  <v-col cols="12" md="6">
                    <v-card class="elevation-2 rounded-xl bg-white h-100 overflow-hidden">
                      <v-toolbar color="grey-lighten-4" density="compact" class="px-4 border-bottom">
                        <v-icon color="primary" class="mr-3">mdi-account-box-outline</v-icon>
                        <span class="text-subtitle-1 font-weight-bold text-grey-darken-3">Applicant Information</span>
                      </v-toolbar>
                      <div class="pa-6">
                        <div class="info-item mb-6">
                          <div class="text-overline text-grey-darken-1 font-weight-bold mb-1">Full Name</div>
                          <div class="text-h6 font-weight-bold text-grey-darken-4 d-flex align-center">
                            {{ selectedApplicant.name }}
                          </div>
                        </div>
                        <v-divider class="mb-6"></v-divider>
                        <div class="info-item mb-6">
                          <div class="text-overline text-grey-darken-1 font-weight-bold mb-1">Email Address</div>
                          <div class="text-body-1 font-weight-medium text-grey-darken-3 d-flex align-center">
                            <v-icon size="small" color="primary" class="mr-3">mdi-email-outline</v-icon>
                            {{ selectedApplicant.contactInfo?.email || 'N/A' }}
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="text-overline text-grey-darken-1 font-weight-bold mb-1">Contact Number</div>
                          <div class="text-body-1 font-weight-medium text-grey-darken-3 d-flex align-center">
                            <v-icon size="small" color="primary" class="mr-3">mdi-phone-outline</v-icon>
                            {{ selectedApplicant.contactInfo?.phone || 'N/A' }}
                          </div>
                        </div>
                      </div>
                    </v-card>
                  </v-col>

                  <!-- Project Info -->
                  <v-col cols="12" md="6">
                    <v-card class="elevation-2 rounded-xl bg-white h-100 overflow-hidden">
                      <v-toolbar color="grey-lighten-4" density="compact" class="px-4 border-bottom">
                        <v-icon color="primary" class="mr-3">mdi-domain</v-icon>
                        <span class="text-subtitle-1 font-weight-bold text-grey-darken-3">Project Information</span>
                      </v-toolbar>
                      <div class="pa-6">
                        <div class="info-item mb-6">
                          <div class="text-overline text-grey-darken-1 font-weight-bold mb-1">Project Name</div>
                          <div class="text-h6 font-weight-bold text-grey-darken-4">
                            {{ selectedApplicant.projectInfo?.projectName || 'N/A' }}
                          </div>
                        </div>
                        <v-divider class="mb-6"></v-divider>
                        <div class="info-item mb-6">
                          <div class="text-overline text-grey-darken-1 font-weight-bold mb-1">Total Area</div>
                          <div class="text-body-1 font-weight-medium text-grey-darken-3 d-flex align-center">
                            <v-icon size="small" color="primary" class="mr-3">mdi-texture-box</v-icon>
                            {{ selectedApplicant.projectInfo?.totalArea || 'N/A' }}
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="text-overline text-grey-darken-1 font-weight-bold mb-1">Project Location</div>
                          <div class="text-body-1 font-weight-medium text-grey-darken-3 d-flex align-start">
                            <v-icon size="small" color="primary" class="mr-3 mt-1">mdi-map-marker-outline</v-icon>
                            <span>{{ selectedApplicant.projectInfo?.location || 'N/A' }}</span>
                          </div>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <!-- Locational Clearance Requirements Submission Tab -->
            <v-window-item value="requirements">
              <div class="pa-8">
                <v-card class="elevation-2 rounded-xl bg-white overflow-hidden">
                  <v-toolbar color="grey-lighten-4" density="compact" class="px-4 border-bottom">
                    <v-icon color="primary" class="mr-3">mdi-file-document-check-outline</v-icon>
                    <span class="text-subtitle-1 font-weight-bold text-grey-darken-3">Submission Checklist</span>
                  </v-toolbar>
                  <div class="pa-8">
                    <div v-if="selectedApplicant.requirements && selectedApplicant.requirements.length > 0">
                      <div v-for="(req, index) in selectedApplicant.requirements" :key="index" class="mb-4">
                        <v-card class="elevation-0 border rounded-xl pa-5 requirement-card" :class="{ 'submitted-bg': req.submitted }">
                          <div class="d-flex align-center">
                            <v-avatar :color="req.submitted ? 'success' : 'grey-lighten-3'" size="48" class="mr-5">
                              <v-icon :color="req.submitted ? 'white' : 'grey-darken-1'">
                                {{ req.submitted ? 'mdi-check-bold' : 'mdi-clock-outline' }}
                              </v-icon>
                            </v-avatar>
                            <div class="flex-grow-1">
                              <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">{{ req.name }}</div>
                              <div v-if="req.file" class="text-caption text-primary font-weight-bold d-flex align-center mt-1">
                                <v-icon size="x-small" class="mr-1">mdi-paperclip</v-icon>
                                {{ req.file }}
                              </div>
                              <div v-else class="text-caption text-error font-weight-medium mt-1">Pending Submission</div>
                            </div>
                            <div v-if="req.submitted">
                              <v-btn size="small" color="primary" variant="elevated" class="text-none font-weight-bold px-4 rounded-lg" prepend-icon="mdi-eye">View File</v-btn>
                            </div>
                          </div>
                        </v-card>
                      </div>
                    </div>
                    <div v-else class="text-center pa-12 bg-grey-lighten-5 rounded-xl border-dashed">
                      <v-icon color="grey-lighten-2" size="80" class="mb-4">mdi-file-search-outline</v-icon>
                      <p class="text-h6 font-weight-bold text-grey-darken-2 mb-2">No Documents Found</p>
                      <p class="text-body-1 text-grey mb-0">The applicant has not submitted any documents for review yet.</p>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>

        <v-divider></v-divider>

        <!-- Modal Footer -->
        <v-card-actions class="pa-8 bg-white d-flex justify-end">
          <v-btn color="grey-darken-1" variant="text" @click="closeReviewDialog" class="text-none font-weight-bold px-6 mr-4" size="large">
            Cancel
          </v-btn>
          <v-btn 
            color="success" 
            variant="flat" 
            prepend-icon="mdi-check-decagram" 
            @click="verifyFromDialog" 
            class="text-none font-weight-bold px-10 rounded-xl elevation-2" 
            size="large"
            :disabled="selectedApplicant.status === 'Verified'"
          >
            Approve & Verify
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminAideDashboard",
  data() {
    return {
      search: "",
      reviewDialog: false,
      selectedApplicant: null,
      activeTab: "details",
      stats: [
        { title: "Total Applications", value: "124", icon: "mdi-file-document-multiple-outline", color: "blue" },
        { title: "Pending Review", value: "45", icon: "mdi-clock-outline", color: "orange" },
        { title: "Verified Today", value: "12", icon: "mdi-check-circle-outline", color: "green" },
      ],
      headers: [
        { title: "Reference No.", align: "start", key: "referenceNo", class: "text-subtitle-2 font-weight-bold text-grey-darken-2" },
        { title: "Applicant Name", key: "name", class: "text-subtitle-2 font-weight-bold text-grey-darken-2" },
        { title: "Permit Type", key: "permitType", class: "text-subtitle-2 font-weight-bold text-grey-darken-2" },
        { title: "Date Submitted", key: "date", class: "text-subtitle-2 font-weight-bold text-grey-darken-2" },
        { title: "Status", key: "status", class: "text-subtitle-2 font-weight-bold text-grey-darken-2", align: "center" },
        { title: "Actions", key: "actions", sortable: false, align: "center", class: "text-subtitle-2 font-weight-bold text-grey-darken-2" },
      ],
      applicants: [
        { 
          id: 1, referenceNo: "BP-2026-001", name: "Juan Dela Cruz", permitType: "Building Permit", date: "2026-05-01", status: "Pending",
          applicantType: "Individual",
          projectInfo: { projectName: "Two-Story Residential House", location: "Brgy. San Jose, Quezon City", totalArea: "150 sqm" },
          contactInfo: { email: "juan.delacruz@example.com", phone: "09123456789" },
          requirements: [
            { name: "Barangay Clearance", submitted: true, file: "brgy_clearance_juan.pdf" },
            { name: "Title of Property (TCT)", submitted: true, file: "tct_title.pdf" },
            { name: "Architectural Plans", submitted: false, file: null },
            { name: "Bill of Materials", submitted: false, file: null }
          ]
        },
        { 
          id: 2, referenceNo: "LC-2026-042", name: "Maria Clara", permitType: "Locational Clearance", date: "2026-05-02", status: "Pending",
          applicantType: "Corporation",
          projectInfo: { projectName: "Commercial Retail Store", location: "Makati Avenue, Makati City", totalArea: "320 sqm" },
          contactInfo: { email: "maria.clara@corporation.com", phone: "09987654321" },
          requirements: [
            { name: "Notarized Application Form", submitted: true, file: "app_form_notarized.pdf" },
            { name: "Vicinity Map", submitted: true, file: "vicinity_map_makati.pdf" },
            { name: "Site Development Plan", submitted: true, file: "site_dev_plan.pdf" }
          ]
        },
        { 
          id: 3, referenceNo: "BP-2026-015", name: "Jose Rizal", permitType: "Building Permit", date: "2026-05-03", status: "Under Review",
          applicantType: "Individual",
          projectInfo: { projectName: "Library Renovation", location: "Calamba, Laguna", totalArea: "200 sqm" },
          contactInfo: { email: "j.rizal@illustrado.ph", phone: "09112223333" },
          requirements: [
            { name: "Structural Design Analysis", submitted: true, file: "structural_analysis.pdf" },
            { name: "Sanitary/Plumbing Plans", submitted: true, file: "plumbing_plans.pdf" }
          ]
        },
        { 
          id: 4, referenceNo: "OP-2026-088", name: "Andres Bonifacio", permitType: "Occupancy Permit", date: "2026-05-04", status: "Pending",
          applicantType: "Organization",
          projectInfo: { projectName: "Katipunan Headquarters", location: "Tondo, Manila", totalArea: "500 sqm" },
          contactInfo: { email: "supremo@kkk.org", phone: "09887776666" },
          requirements: [
            { name: "Certificate of Completion", submitted: true, file: "cert_completion.pdf" },
            { name: "Logbook of Construction", submitted: false, file: null },
            { name: "As-Built Plans", submitted: false, file: null }
          ]
        },
        { 
          id: 5, referenceNo: "LC-2026-055", name: "Emilio Aguinaldo", permitType: "Locational Clearance", date: "2026-05-05", status: "Pending",
          applicantType: "Government",
          projectInfo: { projectName: "Kawit Shrine Extension", location: "Kawit, Cavite", totalArea: "1000 sqm" },
          contactInfo: { email: "e.aguinaldo@republic.gov.ph", phone: "09445556666" },
          requirements: [
            { name: "Environmental Compliance Certificate", submitted: true, file: "ecc_kawit.pdf" },
            { name: "Zoning Certification", submitted: true, file: "zoning_cert.pdf" }
          ]
        },
      ],
    };
  },
  methods: {
    getStatusColor(status) {
      if (status === "Pending") return "warning";
      if (status === "Under Review") return "info";
      if (status === "Verified") return "success";
      return "grey";
    },
    reviewApplicant(item) {
      this.selectedApplicant = item;
      this.reviewDialog = true;
    },
    closeReviewDialog() {
      this.reviewDialog = false;
      setTimeout(() => {
        if (!this.reviewDialog) {
          this.selectedApplicant = null;
          this.activeTab = "type";
        }
      }, 300); // Wait for transition
    },
    verifyApplicant(item) {
      if (item.status !== "Verified") {
        item.status = "Verified";
        this.stats[1].value = Math.max(0, parseInt(this.stats[1].value) - 1);
        this.stats[2].value = parseInt(this.stats[2].value) + 1;
      }
    },
    verifyFromDialog() {
      if (this.selectedApplicant) {
        this.verifyApplicant(this.selectedApplicant);
        this.closeReviewDialog();
      }
    },
    logout() {
      localStorage.removeItem("admin_aide_authenticated");
      this.$router.push("/login/admin-aide");
    }
  }
};
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #eef0f2 !important;
}

.border-top {
  border-top: 1px solid #eef0f2 !important;
}

.border {
  border: 1px solid #eef2f6 !important;
}

.border-dashed {
  border: 2px dashed #e0e4e8 !important;
}

.tracking-widest {
  letter-spacing: 0.2em;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1) !important;
}

.border-left-indicator {
  border-left: 6px solid transparent;
}

.search-input {
  max-width: 400px;
  min-width: 300px;
}

.data-table-custom ::v-deep th {
  background-color: #f8f9fb !important;
  text-transform: uppercase;
  font-size: 0.7rem !important;
  font-weight: 800 !important;
  color: #5c6770 !important;
  letter-spacing: 0.1em;
  padding: 16px !important;
}

.data-table-custom ::v-deep td {
  padding: 16px !important;
  font-size: 0.9rem;
}

.data-table-custom ::v-deep tr:hover {
  background-color: #f1f4f8 !important;
}

.modal-scroll-area {
  max-height: 70vh;
  overflow-y: auto;
}

.requirement-card {
  transition: all 0.2s ease;
  background-color: #ffffff;
}

.requirement-card:hover {
  border-color: var(--v-primary-base) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
}

.submitted-bg {
  background-color: #f0fdf4;
  border-color: #dcfce7 !important;
}

.info-item .text-overline {
  line-height: 1;
}

.lh-1 {
  line-height: 1.2;
}

.opacity-90 {
  opacity: 0.9;
}

.hover-opacity-100:hover {
  opacity: 1;
}

@media (max-width: 600px) {
  .search-input {
    max-width: 100%;
    width: 100%;
  }
}
</style>
