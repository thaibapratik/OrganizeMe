import axios from "axios";
import React, { useState } from "react";
import { useNoteContext } from "../hooks/useNoteContext";
import { NoteContext } from "../context/NoteContext";
import { notify } from "./EditTodoPopup";

const EditNotePopup = ({ toggleEditForm, note }) => {
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { dispatch } = useNoteContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError("");
		setIsLoading(true);

		if (!title.trim()) {
			setError("Task is required");
			return;
		}

		try {
			const { data } = await axios.patch(
				`http://localhost:4000/api/notes/${note._id}`,
				{
					title,
					content,
				},
				{ withCredentials: true }
			);

			dispatch({ type: "UPDATE_NOTE", payload: data.note });

			notify("Note Edited Succesfully");
			toggleEditForm();
		} catch (error) {
			console.log(error);
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="popup-overlay note-popup">
			<div className="popup-form note-form">
				<h2>Edit Note</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Title"
							required
						/>
					</div>

					<div className="form-group">
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Enter your content"
							required
						/>
					</div>

					{error && <p>{error}</p>}

					<div className="form-actions">
						<button
							type="submit"
							className="btn-submit"
							onClick={handleSubmit}
							disabled={isLoading}
						>
							Edit Note
						</button>
						<button
							type="button"
							className="btn-cancel"
							onClick={toggleEditForm}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditNotePopup;
