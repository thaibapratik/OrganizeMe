import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { UserContext } from "../context/userContext";
import TodosList from "../components/TodosList";
import AddTodoPopup from "../components/AddTodoPopup";
import NotesList from "../components/NotesList";

import axios from "axios";
import DonutChart from "../components/DonutChart";
import { useTodoContext } from "../hooks/useTodoContext";

const Dashboard = () => {
	const navigate = useNavigate();
	const { user } = useUserContext(UserContext);
	const { fetchTodosStats, completedCount, pendingCount } = useTodoContext();
	const [showAddForm, setShowAddForm] = useState(false);

	useEffect(() => {
		if (!user) {
			navigate("/login");
		} else {
			fetchTodosStats();
		}
	}, [user, navigate]);

	function toggleAddForm() {
		setShowAddForm(!showAddForm);
	}

	return (
		<main>
			<div className="dashboard">
				<div className="todos">
					<TodosList toggleAddForm={toggleAddForm} />

					{/* Render the chart only if percentages are available */}
					{(completedCount > 0 || pendingCount > 0) && (
						<div className="todo-chart">
							<DonutChart
								completedCount={completedCount}
								pendingCount={pendingCount}
							/>
						</div>
					)}
				</div>

				<div className="notes-list">
					<NotesList />
				</div>

				{showAddForm && (
					<AddTodoPopup toggleAddForm={toggleAddForm} type="Add" />
				)}
			</div>
		</main>
	);
};

export default Dashboard;
