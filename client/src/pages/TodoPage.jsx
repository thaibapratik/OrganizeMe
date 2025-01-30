import React from "react";
import { useNavigate } from "react-router-dom";
import TodosList from "../components/TodosList";

const TodoPage = () => {
	const navigate = useNavigate();

	return (
		<div className="todo-page">
			<div className="page-header">
				<button
					onClick={() => navigate("/dashboard")}
					className="back-button"
				>
					← Back to Dashboard
				</button>
			</div>
			<TodosList showAll={true} />
		</div>
	);
};

export default TodoPage;
