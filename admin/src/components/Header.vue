<template>
  <div class="px-4 py-3 d-flex align-center justify-space-between" style="height: 57px">
    <!-- ✅ Dynamic Title -->
    <div class="text-h6 font-weight-bold">{{ props.header_title }}</div>

    <div class="d-flex align-center">
      <!-- Notifications -->
      <v-menu :close-on-content-click="false" location="bottom end">
        <template v-slot:activator="{ props: menuProps }">
          <v-badge
            color="red"
            :content="unreadNotificationsCount"
            overlap
            class="me-2"
            v-bind="menuProps"
          >
            <v-icon size="20">mdi-bell</v-icon>
          </v-badge>
        </template>

        <v-card min-width="300" max-width="400">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h6">Notifications</span>
            <v-btn icon @click="closeNotifications">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>

          <!-- Notification list -->
          <v-card
            v-for="(notification, index) in notifications"
            :key="index"
            color="blue-lighten-4"
            class="ma-2"
          >
            <v-list-item class="d-flex flex-column align-start">
              <div class="d-flex align-center">
                <v-icon class="me-2" color="blue-darken-2">
                  mdi-file-document-outline
                </v-icon>
                <div class="font-weight-bold">Documents submitted for verification</div>
              </div>
              <v-list-item-subtitle class="text-caption mt-1">
                {{ notification.applicationId }}
              </v-list-item-subtitle>
              <v-list-item-subtitle class="text-caption">
                {{ notification.time }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-card>
        </v-card>
      </v-menu>

      <!-- ✅ Dynamic User Info -->
      <v-btn text to="/profile" class="profile-btn">
        <v-avatar size="32" class="mx-2">
          <v-img alt="User Avatar" src="https://cdn.vuetifyjs.com/images/john.jpg" />
        </v-avatar>
        <div class="d-flex flex-column text-left">
          <span
            class="text-caption font-weight-bold"
            style="color: #555; white-space: nowrap"
          >
            {{ props.username }}
          </span>
          <span
            class="text-caption font-weight-medium"
            style="color: #888; white-space: nowrap"
          >
            {{ userTypeLabel }}
          </span>
        </div>
      </v-btn>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue"; // ✅ Added computed

const props = defineProps({
  header_title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  user_type: {
    type: Number,
    default: 0, // 0 = normal user, 1 = admin
  },
});

// Map user_type to text
const userTypeLabel = computed(() => (props.user_type === 1 ? "LGU STAFF" : "Applicant"));
</script>
<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
}
</style>
