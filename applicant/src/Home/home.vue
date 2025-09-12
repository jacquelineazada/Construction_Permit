<template>
  <div class="page-wrapper">
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container
        class="d-flex align-center justify-space-between py-0 px-6"
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

    <v-main>
      <v-container fluid class="pa-0">
        <section class="hero-section d-flex align-center justify-center">
          <v-container class="hero-content text-left">
            <h1 class="hero-title">
              One Stop Shop for<br />Construction Permits
            </h1>
            <p class="hero-subtitle">
              Fast, Efficient, and Convenient Permit Processing in Naga City
            </p>
            <div class="d-flex mt-6">
              <v-btn
                outlined
                large
                color="grey-lighten-2"
                class="mr-4"
                @click="goToLogin"
              >
                <v-icon left>mdi-login</v-icon>
                Sign In
              </v-btn>
              <v-btn color="#2962FF" dark large to="/services">
                <v-icon left>mdi-file-edit-outline</v-icon>
                Apply Now
              </v-btn>
            </div>
          </v-container>
        </section>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import nagaImage from "@/assets/naga.png";

export default {
  name: "HomePage",
  data() {
    return {
      backgroundImageUrl: nagaImage,
    };
  },
  methods: {
    goToLogin() {
      window.location.href = "/alogin";
    },
  },
};
</script>

<style scoped>
/* ... (Existing styles remain the same for non-layout properties) ... */

.page-wrapper {
  background-color: #f7f7f7;
  min-height: 100vh;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

/* Hero section with local background image */
.hero-section {
  width: 100%;
  min-height: calc(100vh - 88px);
  background-image: url("@/assets/naga.png");

  /* Retaining the fix to show the whole image */
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0 16px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
}

.hero-section::before {
  content: none;
}

.hero-content {
  /* KEY CHANGE: Setting the max-width here aligns it with the App Bar content */
  max-width: 1600px; /* Aligns with the 1600px set on the App Bar's v-container */
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.v-btn {
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  box-shadow: none;
}

.v-btn.v-size--large {
  height: 48px;
}

.v-btn.text-white {
  color: white !important;
  border-color: white;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
