<template>
  <div>
    <v-app-bar flat color="#0000CC" dark height="88">
      <v-container
        fluid
        class="d-flex align-center py-0"
        style="max-width: 100%"
      >
        <!-- Left Section: Logo and Text -->
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-4"
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

        <!-- Centered navigation links -->
        <div class="d-flex justify-center flex-grow-1"></div>

        <!-- Right-aligned buttons -->
        <div class="d-flex align-center">
          <v-btn text class="mx-2" style="color: white" to="/login"
            >Login</v-btn
          >
          <v-btn text class="mx-2" style="color: white">Register</v-btn>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script setup></script>

<style scoped>
.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 600;
  font-size: 16px;
}
</style>
