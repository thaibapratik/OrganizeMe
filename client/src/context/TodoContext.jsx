import axios from "axios";
import { isToday } from "date-fns";
import { createContext, useEffect, useReducer, useState } from "react";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
	switch (action.type) {
		case "SET_TODOS":
			return { ...state, todos: action.payload };

		case "CREATE_TODO":
			return { ...state, todos: [action.payload, ...state.todos] };

		case "DELETE_TODO":
			return {
				...state,
				todos: state.todos.filter((t) => t._id !== action.payload._id),
			};

		case "UPDATE_TODO_STATUS":
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo._id === action.payload._id
						? { ...todo, status: action.payload.status }
						: todo
				),
			};

		case "UPDATE_TODO":
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo._id === action.payload._id
						? {
								...todo,
								priority: action.payload.priority,
								task: action.payload.task,
								date: action.payload.date,
						  }
						: todo
				),
			};

		case "CLEAR_TODOS":
			return { ...state, todos: [] };

		default:
			return state;
	}
};

export const TodoContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, {
		todos: [],
	});

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [completedCount, setCompletedCount] = useState(0);
	const [pendingCount, setPendingCount] = useState(0);
	const [total, setTotal] = useState(0);

	function fetchTodosStats() {
		try {
			const today = new Date().toISOString().slice(0, 10);

			const todayTodos = state.todos.filter((todo) => isToday(todo.date));

			setPendingCount(
				todayTodos.filter((todo) => todo.status === "pending").length
			);

			setCompletedCount(
				todayTodos.filter((todo) => todo.status === "completed").length
			);
		} catch (error) {
			console.error("Error fetching todo stats:", error);
		}
	}

	const fetchTodos = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const { data } = await axios.get(
				"http://localhost:4000/api/todos",
				{ withCredentials: true }
			);
			dispatch({ type: "SET_TODOS", payload: data.todos });
		} catch (error) {
			setError(error.response?.data?.message || error.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch stats whenever todos change
	useEffect(() => {
		fetchTodosStats();
	}, [state.todos]);

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<TodoContext.Provider
			value={{
				...state,
				dispatch,
				isLoading,
				error,
				fetchTodos,
				fetchTodosStats,
				completedCount,
				pendingCount,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
