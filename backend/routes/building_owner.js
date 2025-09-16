// routes/building_owner.routes.js
import express from "express";
import * as BuildingOwnerController from "../controller/BuildingOwnerController.js";

const router = express.Router();

router.get("/", BuildingOwnerController.getAllBuildingOwners);
router.get("/:id", BuildingOwnerController.getBuildingOwnerById);
router.post("/", BuildingOwnerController.insertBuildingOwner);
router.put("/:id", BuildingOwnerController.updateBuildingOwner);
router.delete("/:id", BuildingOwnerController.deleteBuildingOwner);

export default router;
