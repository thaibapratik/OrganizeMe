import express from "express";
import {
	login,
	logout,
	signup,
	checkAuth,
} from "../contollers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check-auth", verifyToken, checkAuth);

export default router;
