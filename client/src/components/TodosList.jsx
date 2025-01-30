import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import { useTodoContext } from "../hooks/useTodoContext";
import axios from "axios";
import { IoAdd } from "react-icons/io5";
import { isToday } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const TodosList = ({ toggleAddForm, showAll = false }) => {
	const { todos, dispatch, isLoading, error, fetchTodosStats } =
		useTodoContext();

	const toggleTaskCompletion = async (id, status) => {
		const token = localStorage.getItem("jwt");
		try {
			const { data } = await axios.patch(
				`https://organizeme-7l2v.onrender.com/api/todos/${id}`,
				{ status: status === "completed" ? "pending" : "completed" },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch({
				type: "UPDATE_TODO_STATUS",
				payload: {
					_id: id,
					status: status === "completed" ? "pending" : "completed",
				},
			});

			fetchTodosStats();
		} catch (error) {
			console.log(error);
		}
	};

	const todaysTasks = todos.filter((todo) => isToday(new Date(todo.date)));

	return (
		<div className="tasks">
			<div className="task-heading">
				<div className="todays-task">
					<h3>{showAll ? "All Tasks" : "Today's Tasks"}</h3>
					<IoAdd
						size={25}
						className="add-icon"
						onClick={toggleAddForm}
					/>
				</div>
				{showAll || (
					<Link className="view-all" to={"/todos"}>
						View all{" "}
						<IoIosArrowForward
							size={10}
							className="view-all-icon"
						/>
					</Link>
				)}
			</div>

			{isLoading && <p>Loading tasks...</p>}

			{error && <p className="error">{error}</p>}

			{!isLoading && !error && (
				<>
					{/* Show today's tasks or all tasks based on showAll */}
					{showAll ? (
						todos.length > 0 ? (
							todos.map((todo) => (
								<TodoCard
									key={todo._id}
									todo={todo}
									toggleTaskCompletion={() =>
										toggleTaskCompletion(
											todo._id,
											todo.status
										)
									}
								/>
							))
						) : (
							<p>
								No tasks available. Add some tasks to get
								started!
							</p>
						)
					) : todaysTasks.length > 0 ? (
						todaysTasks.map((todo) => (
							<TodoCard
								key={todo._id}
								todo={todo}
								toggleTaskCompletion={() =>
									toggleTaskCompletion(todo._id, todo.status)
								}
							/>
						))
					) : (
						<p>
							No tasks available for today. Add some tasks to get
							started!
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default TodosList;
