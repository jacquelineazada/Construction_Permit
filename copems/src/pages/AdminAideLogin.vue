<template>
  <div class="page-wrapper">
    <v-main>
      <v-container
        class="fill-height pa-8 d-flex align-center justify-center"
        fluid
      >
        <v-row align="center" justify="center" class="w-100">
          <v-col cols="12" md="6" class="pa-6">
            <div class="info-section elevation-2">
              <h2 class="info-title gradient-info-title">
                Admin Aide Portal
              </h2>
              <div class="mt-8 text-center">
                <v-icon color="#3D5AFE" size="80" class="mb-4">mdi-shield-account-outline</v-icon>
                <h3 class="feature-title">Secure Verification System</h3>
                <p class="feature-description">
                  Welcome to the Admin Aide Verification System. Please log in with your authorized credentials to review and verify applicant data securely.
                </p>
                <v-alert
                  type="info"
                  variant="tonal"
                  class="mt-6 text-left"
                >
                  <strong>Testing Credentials:</strong><br/>
                  Email: adminaide@example.com<br/>
                  Password: admin123
                </v-alert>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="5" class="pa-6">
            <v-card class="login-card pa-7 elevation-8">
              <v-card-title
                class="text-center text-h5 font-weight-bold pb-1 text-blue-darken-3"
              >
                Admin Aide Login
              </v-card-title>
              <v-card-subtitle class="text-center mb-6 text-grey-darken-1">
                Access your dashboard
              </v-card-subtitle>
              <v-card-text>
                <v-form @submit.prevent="handleLogin" ref="loginForm">
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    density="comfortable"
                    variant="outlined"
                    class="mb-4"
                    prepend-inner-icon="mdi-email-outline"
                    :rules="[v => !!v || 'Email is required']"
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    density="comfortable"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="
                      showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="toggleShowPassword"
                    class="mb-2"
                    :rules="[v => !!v || 'Password is required']"
                  />
                  
                  <v-alert
                    v-if="errorMessage"
                    type="error"
                    variant="tonal"
                    density="compact"
                    class="mb-4"
                  >
                    {{ errorMessage }}
                  </v-alert>

                  <v-btn
                    block
                    color="primary"
                    size="large"
                    class="login-btn gradient-btn mt-4"
                    type="submit"
                    :loading="loading"
                  >
                    Login
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "AdminAideLogin",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      const { valid } = await this.$refs.loginForm.validate();
      if (!valid) return;

      this.loading = true;
      this.errorMessage = "";

      // Simulate API call
      setTimeout(() => {
        if (this.email === "adminaide@example.com" && this.password === "admin123") {
          // Store token/session
          localStorage.setItem("admin_aide_authenticated", "true");
          // Redirect to dashboard
          this.$router.push("/admin/admin-aide");
        } else {
          this.errorMessage = "Invalid email or password.";
        }
        this.loading = false;
      }, 800);
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  background: linear-gradient(120deg, #f7f8fa 60%, #e6f0fa 100%);
  min-height: 100vh;
}

.info-section {
  padding: 2.2rem 2.2rem 1.7rem 2.2rem;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 2px 18px 0 rgba(25, 118, 210, 0.08);
  min-height: 370px;
  transition: box-shadow 0.19s;
}

.info-section:hover {
  box-shadow: 0 6px 32px 0 rgba(25, 118, 210, 0.16);
}

.info-title {
  color: #2c3e50;
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.7em;
  letter-spacing: 0.03em;
}

.gradient-info-title {
  background: linear-gradient(90deg, #1976d2 20%, #4a148c 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-title {
  font-size: 1.13rem;
  font-weight: 700;
  color: #283593;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}

.feature-description {
  font-size: 0.99rem;
  color: #5c6f7c;
  line-height: 1.63;
  padding: 0 10px;
  margin-bottom: 0;
}

.login-card {
  border-radius: 22px !important;
  box-shadow: 0 8px 40px rgba(33, 150, 243, 0.12) !important;
  border: none;
  background: #fff;
  transition: box-shadow 0.18s;
}

.login-card:hover {
  box-shadow: 0 12px 48px rgba(25, 118, 210, 0.17) !important;
}

.login-btn {
  color: #fff !important;
  text-transform: none;
  font-weight: 700;
  font-size: 1.13rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(76, 0, 224, 0.09);
  letter-spacing: 0.01em;
  transition: background 0.15s;
}

.gradient-btn {
  background: linear-gradient(90deg, #4a00e0 30%, #1976d2 100%) !important;
}

.v-text-field {
  font-size: 1.04rem;
}

.v-text-field input {
  color: #283593;
  font-weight: 500;
}

@media (max-width: 1200px) {
  .info-section {
    padding: 1.2rem;
  }
  .login-card {
    padding: 2rem !important;
  }
}

@media (max-width: 900px) {
  .info-section {
    min-height: 320px;
  }
  .login-card {
    padding: 1.2rem !important;
  }
}

@media (max-width: 600px) {
  .info-section,
  .login-card {
    padding: 1rem !important;
  }
  .info-section {
    min-height: auto;
  }
  .login-card {
    border-radius: 9px !important;
  }
}
</style>
