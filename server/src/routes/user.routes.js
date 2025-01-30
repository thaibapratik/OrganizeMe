import express from "express";
import { login, signup, checkAuth } from "../contollers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/check-auth", verifyToken, checkAuth);

export default router;
