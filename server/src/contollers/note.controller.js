import createHttpError from "http-errors";
import Note from "../models/note.model.js";
import mongoose from "mongoose";

export const createNote = async (req, res, next) => {
	try {
		const { title, content } = req.body;

		if (!title) {
			throw createHttpError(400, "Title is required");
		}

		const newNote = await Note.create({ user: req.userId, title, content });
		if (!newNote) {
			throw createHttpError(500, "Error creating note. Try again");
		}

		res.status(201).json({ note: newNote });
	} catch (error) {
		next(error);
	}
};

export const getNotes = async (req, res, next) => {
	try {
		const notes = await Note.find({ user: req.userId }).sort({
			updatedAt: -1,
		});
		if (!notes) {
			throw createHttpError(400, "No notes found");
		}

		res.status(200).json({ notes });
	} catch (error) {
		next(error);
	}
};

export const updateNote = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, content } = req.body;

		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(400, "Note not found");
		}

		if (!title) {
			throw createHttpError(400, "Title is required");
		}

		const note = await Note.findById(id);
		if (!note) {
			throw createHttpError(400, "Note not found");
		}

		if (note.user.toString() !== req.userId.toString()) {
			throw createHttpError(403, "Not authorized to update this note");
		}

		const updatedNote = await Note.findByIdAndUpdate(
			id,
			{ title, content },
			{ new: true }
		);

		if (!updatedNote) {
			throw createHttpError(401, "Error updating note");
		}

		res.status(200).json({ note: updatedNote });
	} catch (error) {
		next(error);
	}
};

export const deleteNote = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			throw createHttpError(400, "Note not found");
		}

		const note = await Note.findById(id);
		if (!note) {
			throw createHttpError(400, "Note not found");
		}

		if (note.user.toString() !== req.userId.toString()) {
			throw createHttpError(403, "Not authroized to delete this note");
		}

		const deletedNote = await Note.findByIdAndDelete(id);
		if (!deletedNote) {
			throw createHttpError(401, "Error deleting note");
		}

		res.status(200).json({ message: "Note deleted" });
	} catch (error) {
		next(error);
	}
};
