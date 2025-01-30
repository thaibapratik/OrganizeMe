import express from "express";
import {
	createNote,
	deleteNote,
	getNotes,
	updateNote,
} from "../contollers/note.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createNote);
router.get("/", verifyToken, getNotes);
router.patch("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
