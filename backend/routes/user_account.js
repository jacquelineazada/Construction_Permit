import express from "express";
import * as UserAccountController from "../controller/UserAccountController.js";

const router = express.Router();

router.get("/", UserAccountController.getAllData);
router.get("/:id", UserAccountController.getDataById);
router.post("/", UserAccountController.insertData);
router.put("/:id", UserAccountController.updateData);
router.delete("/:id", UserAccountController.deleteData);
router.post("/login", UserAccountController.loginUser);

export default router;
