// routes/bldg_use_group.routes.js
import express from "express";
import * as BldgUseGroupController from "../controller/BldgUseGroupController.js"; // Add `.js` extension

const router = express.Router();

router.get("/", BldgUseGroupController.getAllData);
router.get("/:id", BldgUseGroupController.getDataById);
router.post("/", BldgUseGroupController.insertData);
router.put("/:id", BldgUseGroupController.updateData);
router.delete("/:id", BldgUseGroupController.deleteData);

export default router;
