import express from "express";
import {
	createUserController,
	deeteUserController,
	fetchUserController,
	updateUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/fetch", fetchUserController);
router.post("/create", createUserController);
router.put("/update/:id", updateUserController);
router.delete("/delete/:id", deeteUserController);
export default router;
