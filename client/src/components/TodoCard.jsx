import { format, isToday, isTomorrow } from "date-fns";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useTodoContext } from "../hooks/useTodoContext";
import { TodoContext } from "../context/TodoContext";
import { useState } from "react";
import EditTodoPopup from "./EditTodoPopup";

const TodoCard = ({ todo, toggleTaskCompletion }) => {
	const { _id, task, status, date, createdAt, priority } = todo;
	const { dispatch } = useTodoContext(TodoContext);
	const [showEditForm, setShowEditForm] = useState(false);

	const formatDate = (date) => {
		if (isToday(new Date(date))) return "Today";

		const formattedDate = format(new Date(date), "MM/dd");
		return formattedDate;
	};

	const handleDeleteButton = async () => {
		try {
			await axios.delete(
				`https://organizeme-7l2v.onrender.com/api/todos/${_id}`,
				{
					withCredentials: true,
				}
			);

			dispatch({ type: "DELETE_TODO", payload: todo });
		} catch (error) {
			console.log(error);
		}
	};

	const toggleEditForm = () => {
		setShowEditForm(!showEditForm);
	};

	return (
		<div className="todo-card">
			<div className="main-content">
				<span className="todo-date">
					{date ? formatDate(date) : formatDate(createdAt)}
				</span>
				<label>
					<input
						type="checkbox"
						checked={status === "completed"}
						onChange={toggleTaskCompletion}
					/>
					<span className="checkmark"></span>
					<span
						className={`task-text ${
							status === "completed" ? "completed" : ""
						}`}
					>
						{task}
						<span
							className={
								priority === "high"
									? "dark-green-dot"
									: priority === "medium"
									? "green-dot"
									: "light-dot"
							}
						></span>
					</span>
				</label>
				{/* {category && <span className="category-tag">#{category}</span>} */}
			</div>

			<div className="icons">
				<FaRegEdit
					size={20}
					className="icon"
					onClick={toggleEditForm}
				/>
				<FaDeleteLeft
					size={20}
					className="icon"
					onClick={handleDeleteButton}
				/>
			</div>

			{showEditForm && (
				<EditTodoPopup
					toggleEditForm={toggleEditForm}
					oldTask={task}
					oldDate={date}
					oldPriority={priority}
					id={_id}
				/>
			)}
		</div>
	);
};

export default TodoCard;
