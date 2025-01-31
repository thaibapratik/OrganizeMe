import axios from "axios";
import React, { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { TodoContext } from "../context/TodoContext";
import { Slide, toast } from "react-toastify";

export const notify = (message) => {
	toast.success(message, {
		position: "bottom-right",
		autoClose: 2000,
		closeButton: false,
		hideProgressBar: true,
		closeOnClick: false,
		pauseOnHover: false,
		draggable: true,
		theme: "dark",
		transition: Slide,
	});
};

const EditTodoPopup = ({
	toggleEditForm,
	oldTask,
	oldPriority,
	oldDate,
	id,
}) => {
	const [task, setTask] = useState(oldTask);
	const [priority, setPriority] = useState(oldPriority);
	const [date, setDate] = useState(oldDate ? oldDate.split("T")[0] : "");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { dispatch } = useTodoContext(TodoContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!task.trim()) {
			setError("Task is required");
			return;
		}

		if (task.length > 25) {
			setError("Task cannot exceed 25 characters");
			return;
		}

		try {
			const token = localStorage.getItem("jwt");

			if (!token) {
				setError("Unauthorized. Please login again.");
				return;
			}

			const { data } = await axios.patch(
				`https://organizeme-7l2v.onrender.com/api/todos/${id}`,
				{
					task,
					priority,
					date,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch({
				type: "UPDATE_TODO",
				payload: data.todo,
			});

			toggleEditForm();
			notify("Todo Edited Successfully");
		} catch (error) {
			console.error("Edit error:", error.response?.data);
			setError(error.response?.data?.message || "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="popup-overlay">
			<div className="popup-form todo-form">
				<h2>Edit Todo</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="task">Task</label>
						<input
							type="text"
							value={task}
							onChange={(e) => setTask(e.target.value)}
							placeholder="Enter your task"
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="priority">Priority</label>
						<select
							id="priority"
							value={priority}
							onChange={(e) => setPriority(e.target.value)}
						>
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="date">Date</label>
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					{error && <p className="error">{error}</p>}{" "}
					<div className="form-actions">
						<button
							type="submit"
							className="btn-submit"
							disabled={isLoading}
						>
							Edit Todo
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

export default EditTodoPopup;
