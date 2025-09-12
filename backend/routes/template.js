import express from "express";
import * as template from "../controller/template.js"; // Add `.js` extension

const router = express.Router();

router.get("/", template.getAllData);
router.get("/:id", template.getDataById);
router.post("/", template.insertData);
router.put("/:id", template.updateData);
router.delete("/:id", template.deleteData);

export default router;
