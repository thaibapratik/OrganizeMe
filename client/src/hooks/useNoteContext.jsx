import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

export const useNoteContext = () => {
	const context = useContext(NoteContext);
	if (!context) {
		throw new Error(
			"useNoteContext must be used within a NoteContextProvider"
		);
	}
	return context;
};
