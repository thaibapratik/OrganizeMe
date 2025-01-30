import express from "express";
import {
	countStats,
	createTodo,
	deleteTodo,
	deleteTodos,
	getTodos,
	updateTodo,
} from "../contollers/todo.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createTodo);
router.get("/", verifyToken, getTodos);
router.patch("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);
router.delete("/", verifyToken, deleteTodos);

router.get("/count", verifyToken, countStats);

export default router;
