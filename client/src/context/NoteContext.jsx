import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";

export const NoteContext = createContext();

const noteReducer = (state, action) => {
	switch (action.type) {
		case "SET_NOTES":
			return {
				notes: action.payload,
			};

		case "CREATE_NOTE":
			return {
				notes: [action.payload, ...state.notes],
			};

		case "DELETE_NOTE":
			return {
				notes: state.notes.filter((n) => n._id !== action.payload._id),
			};

		case "UPDATE_NOTE":
			return {
				notes: state.notes.map((note) =>
					note._id === action.payload._id
						? {
								...note,
								title: action.payload.title,
								content: action.payload.content,
						  }
						: note
				),
			};

		case "CLEAR_NOTES":
			return { notes: [] };

		default:
			return {
				notes: state,
			};
	}
};

export const NoteContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(noteReducer, {
		notes: null,
	});

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchNotes = async () => {
		try {
			setIsLoading(true);
			setError(false);
			const { data } = await axios.get(
				"http://localhost:4000/api/notes",
				{
					withCredentials: true,
				}
			);

			dispatch({ type: "SET_NOTES", payload: data.notes });
		} catch (error) {
			setError(error.response?.data?.message || error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	return (
		<NoteContext.Provider
			value={{ ...state, dispatch, isLoading, error, fetchNotes }}
		>
			{children}
		</NoteContext.Provider>
	);
};
