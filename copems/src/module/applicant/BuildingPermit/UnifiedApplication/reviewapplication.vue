<template>
  <v-app>
    <v-main class="pa-4">
      <v-container fluid class="form-container">
        <v-row no-gutters class="text-center">
          <v-col cols="12">
            <div class="header-text">Republic of the Philippines</div>
            <div class="header-text">City/Municipality of Naga</div>
            <div class="header-text">Province of Camarines Sur</div>
            <div class="form-title mt-4">
              UNIFIED APPLICATION FORM FOR BUILDING PERMIT
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4 check-section-row">
          <v-col cols="3">
            <div class="check-item-small">
              <span class="checkbox-box-small"></span>
              <span class="ml-2 check-label-small">SIMPLE</span>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="check-item-small">
              <span class="checkbox-box-small"></span>
              <span class="ml-2 check-label-small">COMPLEX</span>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="check-item-small">
              <span class="checkbox-box-small"></span>
              <span class="ml-2 check-label-small">NEW</span>
            </div>
          </v-col>
          <v-col cols="3">
            <div class="check-item-small">
              <span class="checkbox-box-small"></span>
              <span class="ml-2 check-label-small">AMENDATORY</span>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters class="check-section-row-alt">
          <v-col cols="3"></v-col>
          <v-col cols="3">
            <div class="check-item-small">
              <span class="checkbox-box-small"></span>
              <span class="ml-2 check-label-small">RENEWAL</span>
            </div>
          </v-col>
          <v-col cols="6"></v-col>
        </v-row>

        <v-row no-gutters class="form-line my-4"></v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <div class="section-text-small-bold">THIS APPLIES ALSO FOR:</div>
          </v-col>
          <v-col cols="6" class="mt-2">
            <div class="check-item">
              <span class="checkbox-box"></span>
              <span class="ml-2 check-label">LOCATIONAL CLEARANCE</span>
            </div>
          </v-col>
          <v-col cols="6" class="mt-2">
            <div class="check-item">
              <span class="checkbox-box"></span>
              <span class="ml-2 check-label"
                >FIRE SAFETY EVALUATION CLEARANCE</span
              >
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters class="mt-4">
          <v-col cols="6" class="pr-2">
            <div class="data-box-label">APPLICATION NO.</div>
            <div class="data-box"></div>
          </v-col>
          <v-col cols="6" class="pl-2">
            <div class="data-box-label">AREA NO.</div>
            <div class="data-box"></div>
          </v-col>
        </v-row>

        <div class="form-box mt-4">
          <div class="box-header">
            BOX 1 (TO BE ACCOMPLISHED IN PRINT BY THE APPLICANT)
          </div>
          <v-row no-gutters class="pa-2">
            <v-col cols="12">
              <div class="section-title">OWNER/APPLICANT</div>
            </v-col>
            <v-col cols="4" class="pr-2">
              <div class="field-value-box"></div>
              <div class="field-label">LAST NAME</div>
            </v-col>
            <v-col cols="4" class="px-1">
              <div class="field-value-box"></div>
              <div class="field-label">FIRST NAME</div>
            </v-col>
            <v-col cols="2" class="px-1">
              <div class="field-value-box"></div>
              <div class="field-label">M.I.</div>
            </v-col>
            <v-col cols="2" class="pl-2">
              <div class="field-value-box"></div>
              <div class="field-label">TIN</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-2">
            <v-col cols="12">
              <div class="section-title-alt">
                FOR CONSTRUCTION OWNED BY AN ENTERPRISE
              </div>
            </v-col>
            <v-col cols="12" class="mt-2">
              <div class="field-value-box"></div>
              <div class="field-label">FORM OF OWNERSHIP</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-2">
            <v-col cols="12">
              <div class="section-title">ADDRESS:</div>
            </v-col>
            <v-col cols="6" class="pr-2">
              <div class="field-value-box"></div>
              <div class="field-label">NO. STREET</div>
            </v-col>
            <v-col cols="6" class="pl-2">
              <div class="field-value-box"></div>
              <div class="field-label">BARANGAY</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-2">
            <v-col cols="6" class="pr-2">
              <div class="field-value-box"></div>
              <div class="field-label">CITY/MUNICIPALITY</div>
            </v-col>
            <v-col cols="3" class="px-1">
              <div class="field-value-box"></div>
              <div class="field-label">ZIP CODE</div>
            </v-col>
            <v-col cols="3" class="pl-2">
              <div class="field-value-box"></div>
              <div class="field-label">CONTACT NO.</div>
            </v-col>
          </v-row>
        </div>

        <div class="form-box mt-4">
          <div class="box-header">LOCATION OF CONSTRUCTION</div>
          <v-row no-gutters class="pa-2">
            <v-col cols="3" class="pr-2">
              <div class="field-value-box"></div>
              <div class="field-label">LOT NO.</div>
            </v-col>
            <v-col cols="3" class="px-1">
              <div class="field-value-box"></div>
              <div class="field-label">BLK NO.</div>
            </v-col>
            <v-col cols="6" class="pl-2">
              <div class="field-value-box"></div>
              <div class="field-label">TCT NO.</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-2">
            <v-col cols="6" class="pr-2">
              <div class="field-value-box"></div>
              <div class="field-label">CURRENT TAX DEC. NO.</div>
            </v-col>
            <v-col cols="6" class="pl-2">
              <div class="field-value-box"></div>
              <div class="field-label">STREET</div>
            </v-col>
          </v-row>
          <v-row no-gutters class="pa-2">
            <v-col cols="6" class="pr-2">
              <div class="field-value-box"></div>
              <div class="field-label">BARANGAY</div>
            </v-col>
            <v-col cols="6" class="pl-2">
              <div class="field-value-box"></div>
              <div class="field-label">CITY/MUNICIPALITY</div>
            </v-col>
          </v-row>
        </div>

        <v-row no-gutters class="mt-4">
          <v-col cols="6" class="pr-2">
            <div class="form-box">
              <div class="box-header">SCOPE OF WORK</div>
              <div class="pa-2">
                <v-row no-gutters>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">NEW CONSTRUCTION</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">RENOVATION</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">ERECTION</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">RAISING</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">ADDITION</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">CONVERSION</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">ALTERATION</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">REPAIR</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">MOVING</span>
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label"
                        >LEGALIZATION OF EXISTING BUILDING</span
                      >
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label"
                        >ACCESSORY BUILDING/STRUCTURE</span
                      >
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">OTHERS (Specify)</span>
                    </div>
                    <div class="field-value-box-small"></div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
          <v-col cols="6" class="pl-2">
            <div class="form-box">
              <div class="box-header">USE OR CHARACTER OF OCCUPANCY</div>
              <div class="pa-2">
                <v-row no-gutters>
                  <v-col cols="12">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label"
                        >GROUP A: RESIDENTIAL (DWELLINGS)</span
                      >
                    </div>
                    <div class="check-item-indented">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label"
                        >SINGLE DUPLEX RESIDENTIAL R-1, R-2</span
                      >
                    </div>
                  </v-col>
                  <v-col cols="12" class="mt-2">
                    <div class="check-item">
                      <span class="checkbox-box"></span>
                      <span class="ml-2 check-label">GROUP B: RESIDENTIAL</span>
                    </div>
                    <v-row no-gutters>
                      <v-col cols="6">
                        <div class="check-item-indented">
                          <span class="checkbox-box"></span>
                          <span class="ml-2 check-label">HOTEL</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="check-item-indented">
                          <span class="checkbox-box"></span>
                          <span class="ml-2 check-label">MOTEL TOWNHOUSE</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="check-item-indented">
                          <span class="checkbox-box"></span>
                          <span class="ml-2 check-label">DORMITORY</span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="check-item-indented">
                          <span class="checkbox-box"></span>
                          <span class="ml-2 check-label"
                            >BOARDINGHOUSE, LODGING HOUSE</span
                          >
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="check-item-indented">
                          <span class="checkbox-box"></span>
                          <span class="ml-2 check-label"
                            >RESIDENTIAL R-3, R-4, R-5</span
                          >
                        </div>
                        <div class="check-item-indented">
                          <span class="checkbox-box"></span>
                          <span class="ml-2 check-label">OTHERS</span>
                        </div>
                        <div class="field-value-box-small"></div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UnifiedApplicationFormPDF",
  data() {
    return {
      // Data properties are empty to prevent sample data from being displayed
    };
  },
});
</script>

<style scoped>
.form-container {
  font-family: "Times New Roman", Times, serif;
  max-width: 8.5in;
  margin: auto;
  padding: 0;
  color: black;
}

.header-text {
  font-size: 14px;
  line-height: 1.2;
}

.form-title {
  font-size: 16px;
  font-weight: bold;
}

.check-section-row {
  font-size: 10px;
}

.check-section-row-alt {
  margin-top: -8px;
  font-size: 10px;
}

.form-line {
  border-top: 2px solid black;
  width: 100%;
}

.section-text-small-bold {
  font-size: 12px;
  font-weight: bold;
}

.check-item,
.check-item-small {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 10px;
}

.check-item-indented {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 10px;
  margin-left: 16px;
}

.checkbox-box {
  min-width: 12px;
  height: 12px;
  border: 1px solid black;
}

.checkbox-box-small {
  min-width: 8px;
  height: 8px;
  border: 1px solid black;
}

.check-label {
  font-size: 10px;
}

.check-label-small {
  font-size: 8px;
}

.data-box-label {
  font-size: 8px;
  text-align: center;
  margin-top: 4px;
}

.data-box {
  border: 1px solid black;
  height: 20px;
}

.form-box {
  border: 1px solid black;
}

.box-header {
  border-bottom: 1px solid black;
  padding: 4px;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
}

.section-title {
  font-weight: bold;
  font-size: 11px;
  margin-bottom: 4px;
  border-bottom: 1px solid black;
  display: inline-block;
  padding-bottom: 2px;
}

.section-title-alt {
  font-weight: bold;
  font-size: 11px;
  margin-top: 8px;
}

.field-value-box {
  min-height: 16px;
  font-size: 12px;
  border-bottom: 1px solid black;
}

.field-value-box-small {
  min-height: 12px;
  font-size: 10px;
  border-bottom: 1px solid black;
  margin-top: 4px;
}

.field-label {
  font-size: 8px;
  text-transform: uppercase;
}
</style>