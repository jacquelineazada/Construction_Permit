import express from "express";
import * as BuildingUseController from "../controller/buildingUseController.js";

const router = express.Router();

router.get("/", BuildingUseController.getAllBuildingUse);
router.get("/:id", BuildingUseController.getBuildingUseById);
router.post("/", BuildingUseController.createBuildingUse);
router.put("/:id", BuildingUseController.updateBuildingUse);
router.delete("/:id", BuildingUseController.deleteBuildingUse);

export default router;
