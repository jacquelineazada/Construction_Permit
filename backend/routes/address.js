import express from "express";
import * as AddressController from "../controller/AddressController.js"; // adjust filename if different

const router = express.Router();

//
// ========================
// Province Routes
// ========================
router.get("/provinces", AddressController.getAllProvinces);
router.get("/province/:id", AddressController.getProvinceById);

//
// ========================
// Town Routes
// ========================
router.get("/towns", AddressController.getAllTowns);
router.get("/town/:id", AddressController.getTownById);
router.get("/towns/:id", AddressController.getTownsByProvinceId);

//
// ========================
// Barangay Routes
// ========================
router.get("/barangays", AddressController.getAllBarangays);
router.get("/barangay/:id", AddressController.getBarangayById);
router.get("/barangays/:id", AddressController.getBarangaysByTownId);

export default router;
