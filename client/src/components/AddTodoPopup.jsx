import axios from "axios";
import React, { useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { TodoContext } from "../context/TodoContext";
import { notify } from "./EditTodoPopup";

const AddTodoPopup = ({ toggleAddForm }) => {
	const [task, setTask] = useState("");
	const [priority, setPriority] = useState("medium");
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { dispatch } = useTodoContext(TodoContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		setError("");

		if (!task.trim()) {
			setError("Task is required");
			return;
		}

		if (task.length > 25) {
			setError("Task cannot exceed 25 characters");
			return;
		}

		try {
			const { data } = await axios.post(
				"https://organizeme-7l2v.onrender.com/api/todos",
				{
					task,
					priority,
					date,
				},
				{ withCredentials: true }
			);

			dispatch({ type: "CREATE_TODO", payload: data.todo });
			notify("Todo Added Successfully");

			toggleAddForm();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="popup-overlay">
			<div className="popup-form todo-form">
				<h2>Add New Todo</h2>
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
							required
						/>
					</div>

					{error && <p>{error}</p>}

					<div className="form-actions">
						<button
							type="submit"
							className="btn-submit"
							disabled={isLoading}
						>
							Add Todo
						</button>
						<button
							type="button"
							className="btn-cancel"
							onClick={toggleAddForm}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddTodoPopup;
