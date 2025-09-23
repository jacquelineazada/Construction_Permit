<template>
  <v-app>
    <v-app-bar color="#1B3C53" dark app>
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

    <v-main>
      <v-container fluid class="pa-0 hero-bg">
        <v-row
          align="center"
          justify="center"
          class="text-white py-12 hero-content"
        >
          <v-col
            cols="12"
            md="6"
            class="text-center text-md-left hero-text-col"
          >
            <h1 class="font-weight-bold mb-4 text-h4 text-sm-h3 text-md-h2">
              Streamline Your Construction Permits
            </h1>
            <p class="subtitle-1">
              Apply, track, and manage construction permits online with our
              comprehensive digital platform. Fast, secure, and efficient permit
              processing for all your construction needs.
            </p>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="d-none d-md-flex justify-center hero-image-col"
          >
            <v-img
              :src="tabletImage"
              contain
              max-height="400"
              class="hero-image"
            ></v-img>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="my-12">
        <div class="text-center mb-10" ref="servicesSection">
          <h1 class="display-1 font-weight-bold">One Stop Shop Services</h1>
          <p class="subtitle-1 text-secondary">
            Complete your construction requirements efficiently
          </p>
        </div>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto rounded-lg" outlined>
              <v-img :src="bpImage" height="200px"></v-img>
              <v-card-title class="font-weight-bold text-h6"
                >Building Permit Application</v-card-title
              >
              <v-card-text>
                Submit and process your building permit applications with ease.
                Ensure compliance with building codes and regulations.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" class="ma-2" to="/login"
                  >Apply Now</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto rounded-lg" outlined>
              <v-img :src="lcImage" height="200px"></v-img>
              <v-card-title class="font-weight-bold text-h6"
                >Locational Clearance</v-card-title
              >
              <v-card-text>
                Obtain necessary clearances for your construction location.
                Verify zoning compliance and land use requirements.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" class="ma-2">Get Clearance</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto rounded-lg" outlined>
              <v-img :src="opImage" height="200px"></v-img>
              <v-card-title class="font-weight-bold text-h6"
                >Occupancy Permit Application</v-card-title
              >
              <v-card-text>
                Apply for occupancy permits for your completed construction
                projects. Ensure safety and compliance standards.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" class="ma-2">Apply Now</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="my-12">
        <div class="text-center mb-10">
          <h2 class="display-1 font-weight-bold">Key Features</h2>
          <p class="subtitle-1 text-secondary">
            Everything you need for efficient permit management
          </p>
        </div>
        <v-row justify="center">
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-lg" outlined>
              <v-icon size="64" color="blue">mdi-file-document</v-icon>
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4"
                >Online Application</v-card-title
              >
              <v-card-text>
                Submit permit applications online with our user-friendly digital
                forms and document upload system.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-lg" outlined>
              <v-icon size="64" color="green">mdi-magnify</v-icon>
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4"
                >Status Tracking</v-card-title
              >
              <v-card-text>
                Track your permit application status in real-time with detailed
                progress updates and notifications.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-lg" outlined>
              <v-icon size="64" color="purple">mdi-upload</v-icon>
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4"
                >Document Management</v-card-title
              >
              <v-card-text>
                Securely upload, store, and manage all required documents for
                your construction permits.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="text-center pa-6 rounded-lg" outlined>
              <v-icon size="64" color="orange">mdi-credit-card-outline</v-icon>
              <v-card-title class="justify-center text-h6 font-weight-bold mt-4"
                >Payment Processing</v-card-title
              >
              <v-card-text>
                Pay permit fees securely online with multiple payment options
                and instant confirmation.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="my-12">
        <div class="text-center mb-10">
          <h2 class="display-1 font-weight-bold">Application Process</h2>
          <p class="subtitle-1 text-secondary">
            Simple steps to get your construction permit
          </p>
        </div>
        <v-row justify="center" class="text-center">
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4"
              ><span class="white--text text-h5 font-weight-bold"
                >1</span
              ></v-avatar
            >
            <h3 class="text-h6 font-weight-bold">Register Account</h3>
            <p class="text-caption mt-2">
              Create your account and verify your identity to access the permit
              system.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4"
              ><span class="white--text text-h5 font-weight-bold"
                >2</span
              ></v-avatar
            >
            <h3 class="text-h6 font-weight-bold">Submit Application</h3>
            <p class="text-caption mt-2">
              Fill out the permit application form and upload required
              documents.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4"
              ><span class="white--text text-h5 font-weight-bold"
                >3</span
              ></v-avatar
            >
            <h3 class="text-h6 font-weight-bold">Review & Payment</h3>
            <p class="text-caption mt-2">
              Review your application, make payment, and wait for processing.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-avatar color="primary" size="64" class="mb-4"
              ><span class="white--text text-h5 font-weight-bold"
                >4</span
              ></v-avatar
            >
            <h3 class="text-h6 font-weight-bold">Get Permit</h3>
            <p class="text-caption mt-2">
              Receive your approved permit digitally and start your construction
              project.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="#1B3C53" dark padless>
      <v-container>
        <v-row>
          <v-col cols="12" md="3" class="mb-4">
            <div class="d-flex align-center mb-2">
              <v-img :src="officialSeal" max-width="48"></v-img>
              <div class="ml-2">
                <h4 class="font-weight-bold">OFFICIAL WEBSITE OF</h4>
                <p class="text-caption text-uppercase">
                  THE CITY GOVERNMENT OF NAGA
                </p>
              </div>
            </div>
            <p class="text-caption">About this website.</p>
            <p class="text-caption">Contact us at info@naga.gov.ph</p>
            <p class="text-caption">
              Governance Team | City Government of Naga
            </p>
            <v-btn icon color="white" href="#" class="mr-2"
              ><v-icon>mdi-facebook</v-icon></v-btn
            >
            <v-btn icon color="white" href="#" class="mr-2"
              ><v-icon>mdi-youtube</v-icon></v-btn
            >
            <v-btn icon color="white" href="#" class="mr-2"
              ><v-icon>mdi-instagram</v-icon></v-btn
            >
          </v-col>
          <v-col cols="12" md="3" class="mb-4">
            <h4 class="font-weight-bold">City Government links</h4>
            <p class="text-caption">Home</p>
            <p class="text-caption">Resident</p>
            <p class="text-caption">Visitor</p>
            <p class="text-caption">Investor</p>
            <p class="text-caption">Supplier</p>
            <p class="text-caption">Student</p>
            <p class="text-caption">City Officials</p>
          </v-col>
          <v-col cols="12" md="3" class="mb-4">
            <h4 class="font-weight-bold">GOVERNMENT LINKS</h4>
            <p class="text-caption">Office of the President</p>
            <p class="text-caption">Office of the Vice President</p>
            <p class="text-caption">Senate of the Philippines</p>
            <p class="text-caption">House of Representatives</p>
            <p class="text-caption">Supreme Court</p>
            <p class="text-caption">Court of Appeals</p>
            <p class="text-caption">Sandiganbayan</p>
          </v-col>
          <v-col cols="12" md="3" class="mb-4">
            <h4 class="font-weight-bold">ABOUT GOVPH</h4>
            <p class="text-caption">
              Learn more about the Philippine government, its structure, how
              government works and the people behind it.
            </p>
            <h4 class="font-weight-bold mt-4">GOVPH</h4>
            <p class="text-caption">Open Data Portal</p>
            <p class="text-caption">Official Gazette</p>
            <div class="d-flex align-center my-2">
              <v-img :src="officialSeal" max-width="48"></v-img>
              <v-img :src="officialSeal" max-width="48" class="ml-2"></v-img>
            </div>
            <p class="text-caption mt-4">Data Privacy Policy</p>
            <p class="text-caption">Terms and Conditions</p>
            <p class="text-caption">REPUBLIC OF THE PHILIPPINES</p>
            <p class="text-caption d-flex align-center">
              <v-icon small class="mr-1">mdi-earth</v-icon>www.naga.gov.ph
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
// Corrected imports
import tabletImage from "../assets/construction.png";
import bpImage from "../assets/bp.png";
import lcImage from "../assets/lc.jpg";
import opImage from "../assets/op.jpg";
import craneImage from "../assets/crane.jpg";

export default {
  data() {
    return {
      tabletImage,
      bpImage,
      lcImage,
      opImage,
      craneImage,
      officialSeal:
        "https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png",
    };
  },
  methods: {
    // New method to handle scrolling
    scrollToServices() {
      const servicesSection = this.$refs.servicesSection;
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
.hero-bg {
  background: linear-gradient(to right, #004d80, #0073e6);
  position: relative;
  overflow: hidden;
}

.hero-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/crane.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  /* This is the change to add space to the text */
  padding-left: 5%;
  padding-right: 5%;
}

.hero-text-col {
  z-index: 2;
}

.hero-image-col {
  z-index: 2;
}

.hero-image {
  border-radius: 8px; /* Adds a slight border radius to the image */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Adds a shadow for a framed effect */
}
</style>