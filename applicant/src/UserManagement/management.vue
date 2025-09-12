<template>
  <v-app>
    <!-- Header/App Bar -->
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
        style="max-width: 1600px"
      >
        <div class="d-flex align-center">
          <!-- Logo for the header -->
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-3"
          />
          <div>
            <!-- Text for the government unit -->
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
        <!-- Navigation Links for larger screens -->
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

    <!-- Main content area containing the user management table -->
    <v-main style="background-color: #f0f2f5; padding: 24px">
      <v-container fluid class="pa-0">
        <!-- Page Title and Add User Button -->
        <div class="d-flex justify-space-between align-center mb-4">
          <div>
            <h1 class="text-h4 font-weight-bold">Users</h1>
            <p class="text-subtitle-1 text-grey-darken-1">
              Manage system users and their roles
            </p>
          </div>
          <v-btn color="#1976D2" dark>
            <v-icon left>mdi-plus</v-icon>
            Add User
          </v-btn>
        </div>

        <!-- Search and Filter Section -->
        <v-card
          class="pa-4 mb-4"
          rounded="lg"
          width="1300"
          style="margin: 0 auto"
        >
          <v-row no-gutters>
            <v-col cols="12" sm="4" class="pe-2">
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search users..."
                variant="outlined"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="px-2">
              <v-select
                v-model="roleFilter"
                :items="roles"
                label="All Roles"
                variant="outlined"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="ps-2">
              <v-select
                v-model="statusFilter"
                :items="statuses"
                label="All Status"
                variant="outlined"
                hide-details
              ></v-select>
            </v-col>
          </v-row>
        </v-card>

        <!-- User Data Table -->
        <v-card class="pa-4" rounded="lg" width="1300" style="margin: 0 auto">
          <v-table>
            <thead>
              <tr>
                <th class="text-left text-uppercase font-weight-bold">User</th>
                <th class="text-left text-uppercase font-weight-bold">Role</th>
                <th class="text-left text-uppercase font-weight-bold">
                  Department
                </th>
                <th class="text-left text-uppercase font-weight-bold">
                  Status
                </th>
                <th class="text-left text-uppercase font-weight-bold">
                  Last Login
                </th>
                <th class="text-left text-uppercase font-weight-bold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>
                  <div class="d-flex align-center">
                    <v-avatar color="primary" class="me-3">
                      <span class="white--text">{{ user.initials }}</span>
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold">{{ user.name }}</div>
                      <div class="text-caption text-grey">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <v-chip :color="roleColor(user.role)" small>{{
                    user.role
                  }}</v-chip>
                </td>
                <td>{{ user.department }}</td>
                <td>
                  <v-chip :color="statusColor(user.status)" small>{{
                    user.status
                  }}</v-chip>
                </td>
                <td>{{ user.lastLogin }}</td>
                <td>
                  <span
                    class="mx-1"
                    @click="editUser(user)"
                    style="cursor: pointer"
                  >
                    <v-icon color="grey" x-small>mdi-pencil</v-icon>
                  </span>
                  <span
                    class="mx-1"
                    @click="deleteUser(user)"
                    style="cursor: pointer"
                  >
                    <v-icon color="red" x-small>mdi-delete</v-icon>
                  </span>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-container>
    </v-main>

    <!-- Modal for editing user details -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Edit User</v-card-title>
        <v-card-text v-if="selectedUser">
          <p>You are editing the user with the following details:</p>
          <ul>
            <li><strong>Name:</strong> {{ selectedUser.name }}</li>
            <li><strong>Email:</strong> {{ selectedUser.email }}</li>
            <li><strong>Role:</strong> {{ selectedUser.role }}</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editDialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    // Reactive data for search and filters
    const search = ref("");
    const roleFilter = ref("All Roles");
    const statusFilter = ref("All Status");
    const roles = [
      "All Roles",
      "Administrator",
      "Architect",
      "Civil Engineer",
      "Mechanical Engineer",
      "Electrical Engineer",
      "Engineer",
    ];
    const statuses = ["All Status", "Active", "Inactive"];

    // Reactive data for the edit modal
    const editDialog = ref(false);
    const selectedUser = ref(null);

    // Sample user data
    const users = ref([
      {
        id: 1,
        initials: "JS",
        name: "John Smith",
        email: "john.smith@company.com",
        role: "Administrator",
        department: "IT Department",
        status: "Active",
        lastLogin: "2025-01-06 09:30",
      },
      {
        id: 2,
        initials: "SJ",
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        role: "Architect",
        department: "Design Department",
        status: "Active",
        lastLogin: "2025-01-05 16:45",
      },
      {
        id: 3,
        initials: "MB",
        name: "Michael Brown",
        email: "michael.brown@company.com",
        role: "Civil Engineer",
        department: "Engineering Department",
        status: "Active",
        lastLogin: "2025-01-06 08:15",
      },
      {
        id: 4,
        initials: "ED",
        name: "Emily Davis",
        email: "emily.davis@company.com",
        role: "Mechanical Engineer",
        department: "Engineering Department",
        status: "Inactive",
        lastLogin: "2025-01-03 14:20",
      },
      {
        id: 5,
        initials: "DW",
        email: "david.wilson@company.com",
        role: "Electrical Engineer",
        department: "Engineering Department",
        status: "Active",
        lastLogin: "2025-01-06 10:00",
      },
      {
        id: 6,
        initials: "LA",
        name: "Lisa Anderson",
        email: "lisa.anderson@company.com",
        role: "Engineer",
        department: "R&D Department",
        status: "Active",
        lastLogin: "2025-01-05 13:30",
      },
      {
        id: 7,
        initials: "RT",
        name: "Robert Taylor",
        email: "robert.taylor@company.com",
        role: "Architect",
        department: "Design Department",
        status: "Active",
        lastLogin: "2025-01-04 11:45",
      },
      {
        id: 8,
        initials: "JM",
        name: "Jennifer Martinez",
        email: "jennifer.martinez@company.com",
        role: "Civil Engineer",
        department: "Engineering Department",
        status: "Inactive",
        lastLogin: "2025-01-02 15:10",
      },
    ]);

    // Computed property for filtering users
    const filteredUsers = computed(() => {
      let filtered = users.value;

      // Filter by search query
      if (search.value) {
        filtered = filtered.filter(
          (user) =>
            user.name.toLowerCase().includes(search.value.toLowerCase()) ||
            user.email.toLowerCase().includes(search.value.toLowerCase())
        );
      }

      // Filter by role
      if (roleFilter.value !== "All Roles") {
        filtered = filtered.filter((user) => user.role === roleFilter.value);
      }

      // Filter by status
      if (statusFilter.value !== "All Status") {
        filtered = filtered.filter(
          (user) => user.status === statusFilter.value
        );
      }

      return filtered;
    });

    // Method to determine chip color based on role
    const roleColor = (role) => {
      switch (role) {
        case "Administrator":
          return "#1976D2";
        case "Architect":
          return "teal";
        case "Civil Engineer":
          return "orange";
        case "Mechanical Engineer":
          return "purple";
        case "Electrical Engineer":
          return "indigo";
        case "Engineer":
          return "cyan";
        default:
          return "grey";
      }
    };

    // Method to determine chip color based on status
    const statusColor = (status) => {
      return status === "Active" ? "green" : "red";
    };

    // Methods for actions
    const editUser = (user) => {
      selectedUser.value = user;
      editDialog.value = true;
    };

    const deleteUser = (user) => {
      // Find the index of the user to be deleted
      const userIndex = users.value.findIndex((u) => u.id === user.id);

      // If the user exists, remove them from the array
      if (userIndex !== -1) {
        users.value.splice(userIndex, 1);
        console.log(`User ${user.name} deleted successfully.`);
      }
    };

    // Return all reactive data and methods
    return {
      search,
      roleFilter,
      statusFilter,
      roles,
      statuses,
      filteredUsers,
      roleColor,
      statusColor,
      editUser,
      deleteUser,
      editDialog,
      selectedUser,
    };
  },
};
</script>

<style scoped>
/* Scoped styles for the navigation links */
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}
</style>
