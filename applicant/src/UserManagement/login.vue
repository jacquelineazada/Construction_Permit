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
            <div class="text-white" style="font-size: 12px; font-weight: 400">
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div class="text-white" style="font-size: 15px; font-weight: 700">
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
        <!-- Navigation Links -->
        <div class="d-none d-md-flex nav-links">
          <v-btn text class="mx-0" style="color: white" to="/home">Home</v-btn>
          <v-btn text class="mx-0" style="color: white" to="/services"
            >Services</v-btn
          >
          <v-btn text class="mx-0" style="color: white" to="/about"
            >About</v-btn
          >
        </div>
      </v-container>
    </v-app-bar>

    <!-- Main content area -->
    <v-main style="background-color: #f0f2f5">
      <v-container fluid class="fill-height d-flex align-center justify-center">
        <!-- Login Card -->
        <v-card width="400" class="pa-4">
          <!-- Logo -->
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="80"
            height="70"
            contain
            class="mx-auto mb-2"
          />
          <div class="text-center">
            <h3 class="font-weight-bold mb-1">Administrator Login</h3>
            <p class="text-caption text-grey">
              Welcome to the Administrative Control Panel
            </p>
          </div>

          <!-- Login Form -->
          <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
            <v-text-field
              v-model="username"
              label="Username"
              placeholder="Enter your username"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              :rules="[(v) => !!v || 'Username is required']"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append-inner="show = !show"
              variant="outlined"
              :rules="[(v) => !!v || 'Password is required']"
            ></v-text-field>

            <v-alert v-if="error" type="error" class="my-2" dense>
              {{ error }}
            </v-alert>

            <v-row class="align-center justify-space-between">
              <v-col cols="6">
                <v-checkbox
                  v-model="remember"
                  label="Remember me"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col cols="6" class="text-right">
                <a
                  href="#"
                  style="text-decoration: none; font-size: 12px; color: #1976d2"
                >
                  Forgot password?
                </a>
              </v-col>
            </v-row>

            <!-- Submit Button -->
            <v-btn
              color="#1976D2"
              block
              class="mt-4"
              type="submit"
              :loading="loading"
            >
              <v-icon left>mdi-arrow-right</v-icon> Sign In
            </v-btn>
          </v-form>

          <!-- Footer -->
          <div class="text-center mt-4">
            <small>
              <a href="#" style="text-decoration: none; color: grey"
                >Privacy Policy</a
              >
              |
              <a href="#" style="text-decoration: none; color: grey"
                >Terms of Service</a
              >
              |
              <a href="#" style="text-decoration: none; color: grey">Support</a>
            </small>
            <br />
            <small class="text-grey"
              >© 2023 Administrative System. All rights reserved.</small
            >
            <br />
            <small class="text-grey">Version 2.1.0</small>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const show = ref(false);
    const valid = ref(false);
    const error = ref("");
    const loading = ref(false);
    const remember = ref(false);

    const login = async () => {
      error.value = "";
      const isValid = valid.value;

      if (!isValid) {
        error.value = "Please fill in all required fields.";
        return;
      }

      loading.value = true;

      // Fake API call simulation (replace with your real backend call)
      setTimeout(() => {
        loading.value = false;
        if (username.value === "admin" && password.value === "1234") {
          alert("✅ Login successful!");
          // Redirect to dashboard
          window.location.href = "/dashboard";
        } else {
          error.value = "Invalid username or password.";
        }
      }, 1000);
    };

    return {
      username,
      password,
      show,
      login,
      valid,
      error,
      loading,
      remember,
    };
  },
};
</script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}
</style>
