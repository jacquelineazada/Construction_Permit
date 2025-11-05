<template>
  <v-app>
    <v-app-bar flat color="blue-darken-4" dark height="88" app>
      <v-toolbar-title class="ml-2 font-weight-bold">
        <v-icon left>mdi-office-building-outline</v-icon>
        Building Permit Portal
      </v-toolbar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6"
        style="
          background-color: white;
          border-bottom: 1px solid #e0e0e0;
          height: 60px;
        "
      >
        <div class="d-flex align-center">
          <v-icon color="blue-darken-3" class="mr-3" size="32"
            >mdi-office-building-outline</v-icon
          >
          <h2 class="mb-0 font-weight-bold page-title-responsive gradient-text">
            Building Permit Payment System
          </h2>
        </div>
      </v-card>

      <v-container class="py-5">
        <v-row>
          <v-col cols="12" lg="8">
            <v-card class="pa-5 rounded-lg" flat>
              <v-card-title
                class="text-h5 font-weight-bold text-grey-darken-3 mb-3"
                >Assessment Fee Breakdown</v-card-title
              >
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left font-weight-bold text-grey-darken-1">
                      Assessed Fees
                    </th>
                    <th class="text-left font-weight-bold text-grey-darken-1">
                      Account
                    </th>
                    <th class="text-left font-weight-bold text-grey-darken-1">
                      Basis of Assessment
                    </th>
                    <th class="text-right font-weight-bold text-grey-darken-1">
                      Amount Due
                    </th>
                    <th class="text-left font-weight-bold text-grey-darken-1">
                      Assessed By
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colspan="5"
                      class="pt-3 pb-1 font-weight-bold text-subtitle-1 text-grey-darken-2"
                    >
                      FOR ZONING (ZONING ADMINISTRATOR):
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-icon size="x-small" class="mr-2"
                        >mdi-square-small</v-icon
                      >
                      Locational / Zoning of Land
                    </td>
                    <td></td>
                    <td></td>
                    <td class="text-right">{{ formatCurrency(0) }}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td
                      colspan="5"
                      class="pt-4 pb-1 font-weight-bold text-subtitle-1 text-grey-darken-2"
                    >
                      FOR BUILDING / STRUCTURE (OBO):
                    </td>
                  </tr>
                  <tr v-for="item in buildingFees" :key="item.name">
                    <td>
                      <v-icon size="x-small" class="mr-2"
                        >mdi-square-small</v-icon
                      >
                      {{ item.name }}
                    </td>
                    <td>{{ item.account }}</td>
                    <td>{{ item.basis }}</td>
                    <td class="text-right">
                      {{ formatCurrency(item.amount) }}
                    </td>
                    <td>{{ item.assessedBy }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="3" class="text-left text-h6 font-weight-bold">
                      TOTAL
                    </td>
                    <td
                      class="text-right text-h6 font-weight-bold text-blue-darken-2"
                    >
                      {{ formatCurrency(subtotal) }}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </v-table>
            </v-card>

            <v-card class="pa-5 mt-5 rounded-lg" flat>
              <v-card-title
                class="text-h6 font-weight-bold d-flex align-center"
              >
                <v-icon class="mr-2" color="blue-darken-2"
                  >mdi-credit-card-outline</v-icon
                >
                Select Payment Method
              </v-card-title>
              <v-row class="mt-4">
                <v-col
                  v-for="method in paymentMethods"
                  :key="method.id"
                  cols="12"
                  md="4"
                >
                  <v-card
                    :class="{ 'selected-card': selectedMethod === method.id }"
                    class="text-center py-4 payment-card"
                    variant="outlined"
                    @click="
                      selectedMethod = method.id;
                      selectedWallet = null;
                    "
                  >
                    <v-icon
                      :icon="method.icon"
                      size="large"
                      :color="
                        selectedMethod === method.id
                          ? 'blue-darken-2'
                          : 'grey-darken-1'
                      "
                    ></v-icon>
                    <div class="font-weight-bold mt-2">{{ method.title }}</div>
                    <div class="text-caption text-grey-darken-1">
                      {{ method.subtitle }}
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <div v-if="selectedMethod === 'card'">
                <v-card-title class="text-h6 font-weight-bold mt-6"
                  >Card Information</v-card-title
                >
                <v-row class="mt-2">
                  <v-col cols="12"
                    ><v-text-field
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      variant="outlined"
                      density="comfortable"
                      append-inner-icon="mdi-credit-card-chip-outline"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6"
                    ><v-text-field
                      label="Expiry Date"
                      placeholder="MM/YY"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6"
                    ><v-text-field
                      label="CVV"
                      placeholder="123"
                      variant="outlined"
                      density="comfortable"
                      append-inner-icon="mdi-help-circle-outline"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="12"
                    ><v-text-field
                      label="Cardholder Name"
                      placeholder="John Doe"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field
                  ></v-col>
                </v-row>
              </div>

              <div v-if="selectedMethod === 'bank'">
                <v-card-title class="text-h6 font-weight-bold mt-6"
                  >Bank Transfer Details</v-card-title
                >
                <v-row class="mt-2">
                  <v-col cols="12"
                    ><v-text-field
                      label="Bank Name"
                      placeholder="Enter your bank name"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6"
                    ><v-text-field
                      label="Account Number"
                      placeholder="Enter account number"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6"
                    ><v-text-field
                      label="Routing Number"
                      placeholder="Enter routing number"
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field
                  ></v-col>
                </v-row>
              </div>

              <div v-if="selectedMethod === 'wallet'">
                <v-card-title class="text-h6 font-weight-bold mt-6"
                  >Digital Wallet</v-card-title
                >
                <v-row class="mt-2">
                  <v-col
                    v-for="wallet in digitalWallets"
                    :key="wallet.id"
                    cols="12"
                    md="4"
                  >
                    <v-card
                      @click="selectedWallet = wallet.id"
                      :class="{ 'selected-card': selectedWallet === wallet.id }"
                      class="text-center py-4 payment-card"
                      variant="outlined"
                    >
                      <v-icon
                        :icon="wallet.icon"
                        size="large"
                        :color="wallet.color"
                      ></v-icon>
                      <div class="font-weight-bold mt-2">{{ wallet.name }}</div>
                    </v-card>
                  </v-col>
                </v-row>

                <div v-if="selectedWallet === 'paypal'" class="mt-6">
                  <v-card color="blue-lighten-5" flat class="pa-4 rounded-lg">
                    <v-card-title class="text-subtitle-1 font-weight-bold"
                      ><v-icon start icon="mdi-paypal"></v-icon>PayPal
                      Payment</v-card-title
                    >
                    <v-card-text class="text-center text-grey-darken-3 py-4"
                      >You will be redirected to PayPal to complete your
                      payment</v-card-text
                    >
                    <v-card-actions class="justify-center"
                      ><v-btn
                        color="indigo-darken-3"
                        size="large"
                        class="font-weight-bold"
                        ><v-icon start icon="mdi-paypal"></v-icon>Continue with
                        PayPal</v-btn
                      ></v-card-actions
                    >
                  </v-card>
                </div>

                <div v-if="selectedWallet === 'gcash'" class="mt-6">
                  <v-card color="blue-lighten-5" flat class="pa-4 rounded-lg">
                    <v-card-title class="text-subtitle-1 font-weight-bold"
                      ><v-icon start icon="mdi-wallet"></v-icon>GCash
                      Payment</v-card-title
                    >
                    <v-row class="mt-2" align="center">
                      <v-col cols="12" md="7">
                        <v-text-field
                          label="GCash Mobile Number"
                          prefix="+63"
                          placeholder="9XXXXXXXXX"
                          variant="outlined"
                          density="comfortable"
                          persistent-hint
                          hint="Enter your 10-digit mobile number linked to GCash"
                        ></v-text-field>
                        <v-radio-group
                          v-model="gcashPaymentMethod"
                          class="mt-4"
                        >
                          <template v-slot:label
                            ><div>
                              <strong>Payment Method</strong>
                            </div></template
                          >
                          <v-radio label="Scan QR Code" value="qr"></v-radio>
                          <v-radio
                            label="Manual Payment"
                            value="manual"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="12" md="5" class="text-center">
                        <v-card
                          variant="outlined"
                          class="d-flex flex-column align-center justify-center pa-4"
                          height="180"
                        >
                          <v-icon
                            icon="mdi-qrcode"
                            size="64"
                            color="grey-darken-1"
                          ></v-icon>
                          <div class="font-weight-bold mt-2">
                            QR Code will appear here
                          </div>
                          <div class="text-caption text-grey-darken-1">
                            Amount: {{ formatCurrency(0) }}
                          </div>
                        </v-card>
                        <div class="text-caption text-grey-darken-2 mt-2">
                          Scan this QR code with your GCash app
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>

                <div v-if="selectedWallet === 'maya'" class="mt-6">
                  <v-card color="green-lighten-5" flat class="pa-4 rounded-lg">
                    <v-card-title
                      class="text-subtitle-1 font-weight-bold text-green-darken-4"
                      ><v-icon start icon="mdi-cellphone"></v-icon>Maya
                      Payment</v-card-title
                    >
                    <div class="pa-2">
                      <v-text-field
                        class="mt-4"
                        label="Maya Mobile Number"
                        prefix="+63"
                        placeholder="9XXXXXXXXX"
                        variant="outlined"
                        density="comfortable"
                      ></v-text-field>
                      <v-btn
                        color="green-darken-1"
                        size="large"
                        class="font-weight-bold mt-4"
                        block
                        ><v-icon start icon="mdi-cellphone"></v-icon>Continue
                        with Maya</v-btn
                      >
                    </div>
                  </v-card>
                </div>
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" lg="4">
            <v-card class="pa-5 rounded-lg" flat>
              <v-card-title
                class="text-h5 font-weight-bold text-grey-darken-3 mb-4"
                >Payment Summary</v-card-title
              >
              <v-row dense
                ><v-col cols="6" class="text-grey-darken-1">Subtotal</v-col
                ><v-col cols="6" class="text-right font-weight-medium">{{
                  formatCurrency(subtotal)
                }}</v-col></v-row
              >
              <v-row dense
                ><v-col cols="6" class="text-grey-darken-1"
                  >Processing Fee</v-col
                ><v-col cols="6" class="text-right font-weight-medium">{{
                  formatCurrency(processingFee)
                }}</v-col></v-row
              >
              <v-row dense
                ><v-col cols="6" class="text-grey-darken-1">Tax</v-col
                ><v-col cols="6" class="text-right font-weight-medium">{{
                  formatCurrency(0)
                }}</v-col></v-row
              >
              <v-divider class="my-3"></v-divider>
              <v-row dense class="mb-6"
                ><v-col cols="6" class="text-h6 font-weight-bold">Total</v-col
                ><v-col
                  cols="6"
                  class="text-right text-h6 font-weight-bold text-blue-darken-2"
                  >{{ formatCurrency(total) }}</v-col
                ></v-row
              >
              <v-card color="grey-lighten-5" flat class="pa-4 rounded-lg mb-6">
                <v-card-title class="text-subtitle-1 font-weight-bold pa-0 mb-3"
                  >Security & Trust</v-card-title
                >
                <div class="d-flex align-center mb-2">
                  <v-icon color="green" class="mr-3">mdi-shield-check</v-icon
                  ><span class="text-body-2 text-grey-darken-2"
                    >SSL Encrypted</span
                  >
                </div>
                <div class="d-flex align-center mb-2">
                  <v-icon color="green" class="mr-3">mdi-lock</v-icon
                  ><span class="text-body-2 text-grey-darken-2"
                    >Secure Payment</span
                  >
                </div>
                <div class="d-flex align-center">
                  <v-icon color="green" class="mr-3">mdi-security</v-icon
                  ><span class="text-body-2 text-grey-darken-2"
                    >Privacy Protected</span
                  >
                </div>
                <div class="mt-3">
                  <v-icon class="mr-1">mdi-credit-card-outline</v-icon
                  ><v-icon class="mr-1">mdi-visa</v-icon
                  ><v-icon class="mr-1">mdi-mastercard</v-icon
                  ><v-icon>mdi-credit-card</v-icon>
                </div>
              </v-card>

              <v-checkbox density="compact">
                <template v-slot:label>
                  <div class="text-body-2">
                    I agree to the
                    <a
                      href="#"
                      @click.prevent="termsDialog = true"
                      class="text-blue-darken-2 font-weight-bold"
                      >Terms of Service</a
                    >
                    and
                    <a
                      href="#"
                      @click.prevent="privacyDialog = true"
                      class="text-blue-darken-2 font-weight-bold"
                      >Privacy Policy</a
                    >
                  </div>
                </template>
              </v-checkbox>

              <v-btn
                color="blue-darken-3"
                block
                size="large"
                class="mb-2 font-weight-bold"
                >Pay Now - {{ formatCurrency(total) }}</v-btn
              >
              <v-btn variant="text" color="grey-darken-1" block size="large"
                ><v-icon left class="mr-1">mdi-arrow-left</v-icon> Back to
                Application</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="termsDialog" max-width="800px" scrollable>
        <v-card class="rounded-lg">
          <v-toolbar color="white" density="compact"
            ><v-toolbar-title
              class="text-h6 font-weight-bold text-grey-darken-3"
              >Terms of Service</v-toolbar-title
            ><v-spacer></v-spacer
            ><v-btn icon="mdi-close" @click="termsDialog = false"></v-btn
          ></v-toolbar>
          <v-card-text class="pa-6 text-body-1">
            <h3 class="text-h6 mb-2">1. Acceptance of Terms</h3>
            <p class="mb-4">
              By using the City Building Permit Payment System, you agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services.
            </p>
            <p>
              These terms may be updated from time to time, and your continued
              use of the service constitutes acceptance of any changes.
            </p>
            <v-divider class="my-6"></v-divider>
            <h3 class="text-h6 mb-4">2. Payment Terms</h3>
            <p class="mb-3">
              <strong>2.1 Payment Processing:</strong> All payments are
              processed securely through our certified payment partners. Payment
              information is encrypted and protected according to industry
              standards.
            </p>
            <p class="mb-3">
              <strong>2.2 Payment Methods:</strong> We accept credit cards,
              debit cards, bank transfers, and digital wallets as specified in
              the payment interface.
            </p>
            <p class="mb-3">
              <strong>2.3 Processing Fees:</strong> A processing fee of 2.5%
              will be added to all payments to cover transaction costs.
            </p>
            <p class="mb-4">
              <strong>2.4 Payment Confirmation:</strong> You will receive a
              payment confirmation via email once your payment is successfully
              processed.
            </p>
            <v-divider class="my-6"></v-divider>
            <h3 class="text-h6 mb-4">3. Refund Policy</h3>
            <p>
              <strong>3.1 Refund Eligibility:</strong> Refunds may be requested
              within 30 days of payment for duplicate payments or system errors
              only.
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4"
            ><v-spacer></v-spacer
            ><v-btn
              color="blue-darken-3"
              variant="flat"
              @click="termsDialog = false"
              class="font-weight-bold"
              size="large"
              >Close</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-dialog>

      <v-dialog v-model="privacyDialog" max-width="800px" scrollable>
        <v-card class="rounded-lg">
          <v-toolbar color="white" density="compact"
            ><v-toolbar-title
              class="text-h6 font-weight-bold text-grey-darken-3"
              >Privacy Policy</v-toolbar-title
            ><v-spacer></v-spacer
            ><v-btn icon="mdi-close" @click="privacyDialog = false"></v-btn
          ></v-toolbar>
          <v-card-text class="pa-6 text-body-1">
            <div
              v-for="section in privacyPolicy"
              :key="section.title"
              class="mb-4"
            >
              <h3 class="text-h6 mb-3">{{ section.title }}</h3>
              <div
                v-for="item in section.content"
                :key="item.heading"
                class="mb-3"
              >
                <p v-if="item.heading">
                  <strong>{{ item.heading }}</strong> {{ item.text }}
                </p>
                <p v-else>{{ item.text }}</p>
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="pa-4"
            ><v-spacer></v-spacer
            ><v-btn
              color="blue-darken-3"
              variant="flat"
              @click="privacyDialog = false"
              class="font-weight-bold"
              size="large"
              >Close</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";

const termsDialog = ref(false);
const privacyDialog = ref(false);
const selectedMethod = ref("card");
const selectedWallet = ref(null);
const gcashPaymentMethod = ref("qr");

// --- DATA & COMPUTED PROPERTIES ---

// Initial fees data now has names, but other fields are empty or zero
const buildingFees = ref([
  { name: "Filing Fee", account: "", basis: "", amount: 0, assessedBy: "" },
  {
    name: "Line and Grade (Geodetic)",
    account: "",
    basis: "",
    amount: 0,
    assessedBy: "",
  },
  { name: "Fencing", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Architectural", account: "", basis: "", amount: 0, assessedBy: "" },
  {
    name: "Civil / Structural",
    account: "",
    basis: "",
    amount: 0,
    assessedBy: "",
  },
  { name: "Electrical", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Mechanical", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Sanitary", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Plumbing", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Electronics", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Interior", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Surcharges", account: "", basis: "", amount: 0, assessedBy: "" },
  { name: "Penalties", account: "", basis: "", amount: 0, assessedBy: "" },
]);

// Computed properties to automatically calculate totals
const subtotal = computed(() => {
  return buildingFees.value.reduce((acc, item) => acc + item.amount, 0);
});

const processingFee = computed(() => {
  return subtotal.value * 0.025; // 2.5% processing fee
});

const total = computed(() => {
  return subtotal.value + processingFee.value;
});

// Helper function to format numbers as PHP currency
const formatCurrency = (value) => {
  if (typeof value !== "number") {
    value = 0;
  }
  return value.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
};

// --- STATIC DATA ---

const paymentMethods = ref([
  {
    id: "card",
    title: "Credit/Debit Card",
    subtitle: "Instant processing",
    icon: "mdi-credit-card",
  },
  {
    id: "bank",
    title: "Bank Transfer",
    subtitle: "1-2 business days",
    icon: "mdi-bank",
  },
  {
    id: "wallet",
    title: "Digital Wallet",
    subtitle: "Instant processing",
    icon: "mdi-wallet",
  },
]);

const digitalWallets = ref([
  { id: "paypal", name: "PayPal", icon: "mdi-paypal", color: "blue-darken-2" },
  { id: "gcash", name: "GCash", icon: "mdi-wallet", color: "blue" },
  { id: "maya", name: "Maya", icon: "mdi-cellphone", color: "green" },
]);

const privacyPolicy = ref([
  {
    title: "1. Information We Collect",
    content: [
      {
        heading: "1.1 Personal Information:",
        text: "We collect personal information you provide when using our building permit payment system, including name, address, phone number, email address, and payment information.",
      },
      {
        heading: "1.2 Application Data:",
        text: "We collect information related to your building permit application, including property details, construction plans, and permit specifications.",
      },
      {
        heading: "1.3 Payment Information:",
        text: "Payment details such as credit card information, bank account details, and digital wallet information are collected securely through our payment processors.",
      },
      {
        heading: "1.4 Technical Data:",
        text: "We automatically collect IP addresses, browser information, device information, and usage patterns when you access our system.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        heading: "2.1 Service Provision:",
        text: "Your information is used to process permit applications, collect payments, and provide customer support services.",
      },
      {
        heading: "2.2 Communication:",
        text: "We use your contact information to send application updates, payment confirmations, and important notices about your permit.",
      },
      {
        heading: "2.3 Legal Compliance:",
        text: "Information may be used to comply with applicable laws, regulations, and government requirements.",
      },
      {
        heading: "2.4 System Improvement:",
        text: "Anonymous usage data helps us improve our system performance and user experience.",
      },
    ],
  },
  {
    title: "3. Information Storage and Security",
    content: [
      {
        heading: "3.1 Data Security:",
        text: "We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your information.",
      },
      {
        heading: "3.2 Data Retention:",
        text: "Personal information is retained for the duration required by law and for legitimate business purposes, typically 7 years for permit records.",
      },
      {
        heading: "3.3 Secure Storage:",
        text: "All data is stored on secure servers with regular backups and disaster recovery procedures in place.",
      },
      {
        heading: "3.4 Access Controls:",
        text: "Only authorized personnel with legitimate business needs have access to your personal information.",
      },
    ],
  },
  {
    title: "4. Information Sharing",
    content: [
      {
        heading: "4.1 Government Agencies:",
        text: "Permit information may be shared with relevant government departments, inspectors, and regulatory bodies as required by law.",
      },
      {
        heading: "4.2 Service Providers:",
        text: "We share necessary information with payment processors, IT service providers, and other vendors who assist in providing our services.",
      },
      {
        heading: "4.3 Legal Requirements:",
        text: "Information may be disclosed when required by law, court order, or to protect public safety.",
      },
      {
        heading: "4.4 No Commercial Sale:",
        text: "We do not sell, rent, or lease your personal information to third parties for commercial purposes.",
      },
    ],
  },
  {
    title: "5. Your Privacy Rights",
    content: [
      {
        heading: "5.1 Access Rights:",
        text: "You have the right to request access to the personal information we hold about you and receive a copy of this information.",
      },
      {
        heading: "5.2 Correction Rights:",
        text: "You may request correction of inaccurate or incomplete personal information we hold about you.",
      },
      {
        heading: "5.3 Deletion Rights:",
        text: "You may request deletion of your personal information, subject to legal and regulatory retention requirements.",
      },
      {
        heading: "5.4 Portability Rights:",
        text: "You have the right to receive your personal information in a structured, commonly used, and machine-readable format.",
      },
      {
        heading: "5.5 Objection Rights:",
        text: "You may object to certain processing of your personal information where we rely on legitimate interests as the legal basis.",
      },
    ],
  },
  {
    title: "6. Cookies and Tracking",
    content: [
      {
        heading: "6.1 Essential Cookies:",
        text: "We use essential cookies necessary for the operation of our website and payment processing system.",
      },
      {
        heading: "6.2 Analytics:",
        text: "We may use analytics tools to understand how users interact with our system to improve functionality and user experience.",
      },
      {
        heading: "6.3 Cookie Management:",
        text: "You can manage cookie preferences through your browser settings, though disabling certain cookies may affect system functionality.",
      },
    ],
  },
  {
    title: "7. Third-Party Services",
    content: [
      {
        heading: "7.1 Payment Processors:",
        text: "We use third-party payment processors who have their own privacy policies governing the processing of payment information.",
      },
      {
        heading: "7.2 Service Integration:",
        text: "Some features may integrate with third-party services, each governed by their respective privacy policies.",
      },
      {
        heading: "7.3 Links to Other Sites:",
        text: "Our service may contain links to other websites that are not operated by us and have their own privacy policies.",
      },
    ],
  },
  {
    title: "8. Data Breach Notification",
    content: [
      {
        heading: "8.1 Breach Response:",
        text: "In the event of a data breach, we will assess the risk and notify affected users and relevant authorities as required by law.",
      },
      {
        heading: "8.2 Notification Timeline:",
        text: "We will provide notification without undue delay, typically within 72 hours of becoming aware of the breach.",
      },
      {
        heading: "8.3 Mitigation Measures:",
        text: "We will take immediate steps to contain the breach and prevent further unauthorized access to personal information.",
      },
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      {
        text: "Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18.",
      },
      {
        text: "If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.",
      },
    ],
  },
  {
    title: "10. International Data Transfers",
    content: [
      {
        heading: "10.1 Data Location:",
        text: "Your personal information may be transferred to and processed in countries other than your country of residence.",
      },
      {
        heading: "10.2 Safeguards:",
        text: "When transferring data internationally, we ensure appropriate safeguards are in place to protect your personal information.",
      },
    ],
  },
  {
    title: "11. Updates to This Policy",
    content: [
      {
        heading: "11.1 Policy Changes:",
        text: "We may update this privacy policy from time to time to reflect changes in our practices or applicable law.",
      },
      {
        heading: "11.2 Notification:",
        text: "We will notify users of material changes through our website or by email where appropriate.",
      },
      {
        heading: "11.3 Continued Use:",
        text: "Your continued use of our services after policy changes constitutes acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "12. Contact Information",
    content: [
      {
        text: "For privacy-related questions, concerns, or to exercise your privacy rights, please contact us:",
      },
      { text: "Privacy Officer: privacy@citybuilding.gov" },
      { text: "Phone: (555) 123-4567 ext. 789" },
      {
        text: "Mail: Privacy Office, City Building Department, 123 Government Plaza, Suite 400, Your City, State 12345",
      },
      { text: "Office Hours: Monday - Friday, 8:00 AM - 5:00 PM" },
    ],
  },
  {
    title: "13. Effective Date",
    content: [
      {
        text: "This Privacy Policy is effective as of January 1, 2025, and supersedes all previous versions.",
      },
    ],
  },
]);
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #1e3a8a, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page-title-responsive {
  font-size: 1.5rem;
}
@media (max-width: 600px) {
  .page-title-responsive {
    font-size: 1.25rem;
  }
}
.total-row {
  border-top: 1px solid #e0e0e0;
}
.payment-card {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.selected-card {
  border: 2px solid #1e40af; /* blue-darken-2 */
  background-color: #eef2ff; /* blue-lighten-5 */
}
</style>