import createHttpError from "http-errors";
import Todo from "../models/todo.model.js";
import mongoose from "mongoose";

export const createTodo = async (req, res, next) => {
	try {
		const { task, date, priority } = req.body;
		if (!task) {
			throw createHttpError(400, "Task is required");
		}

		const newTodo = await Todo.create({
			task,
			date,
			priority,
			user: req.userId,
		});

		if (!newTodo) {
			throw createHttpError(500, "Error creating new todo");
		}

		res.status(201).json({ todo: newTodo });
	} catch (error) {
		next(error);
	}
};

export const getTodos = async (req, res, next) => {
	try {
		const todos = await Todo.find({ user: req.userId }).sort({
			status: -1,
			createdAt: -1,
		});
		if (!todos) {
			throw createHttpError(400, "No todos found");
		}

		res.status(200).json({ todos });
	} catch (error) {
		next(error);
	}
};

export const updateTodo = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { task, priority, date, status } = req.body;

		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(400, "No todo found");
		}

		const todo = await Todo.findById(id);
		if (!todo) {
			throw createHttpError(400, "No todo found");
		}

		if (todo.user.toString() !== req.userId.toString()) {
			throw createHttpError(403, "Not authorized to update this note");
		}

		const updatedTodo = await Todo.findByIdAndUpdate(
			id,
			{ task, priority, date, status },
			{ new: true, runValidators: true }
		);

		if (!updatedTodo) {
			throw createHttpError(500, "Error updating todo");
		}

		res.status(200).json({ todo: updatedTodo });
	} catch (error) {
		next(error);
	}
};

export const deleteTodo = async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.isValidObjectId(id)) {
		throw createHttpError(400, "No todo found");
	}

	const todo = await Todo.findById(id);
	if (!todo) {
		throw createHttpError(400, "No todo found");
	}

	if (todo.user.toString() !== req.userId.toString()) {
		throw createHttpError(403, "Not authorized to delete this note");
	}

	const deletedTodo = await Todo.findByIdAndDelete(id);
	if (!deletedTodo) {
		throw createHttpError(500, "Error deleting note");
	}

	res.status(200).json({ message: "Note deleted" });
};

export const deleteTodos = async (req, res, next) => {
	const deleteAll = await Todo.deleteMany();
	if (deleteAll) {
		res.status(200).json({ message: "Deleted all" });
	}
};

export const countStats = async (req, res, next) => {
	try {
		const total = await Todo.countDocuments({
			user: req.userId,
			date: today,
		});
		const completedCount = await Todo.countDocuments({
			user: req.userId,
			status: "completed",
		});

		let completedPercentage =
			total > 0 ? Math.round((completedCount / total) * 100) : 0;
		let pendingPercentage = total > 0 ? 100 - completedPercentage : 0;

		res.json({
			completedPercentage: completedPercentage,
			pendingPercentage: pendingPercentage,
		});
	} catch (error) {
		next(error);
	}
};
