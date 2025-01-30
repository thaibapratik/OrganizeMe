import axios from "axios";
import { format } from "date-fns";
import { FaDeleteLeft } from "react-icons/fa6";
import { useNoteContext } from "../hooks/useNoteContext";
import { NoteContext } from "../context/NoteContext";
import { useState } from "react";
import EditNotePopup from "./EditNotePopup";

const NoteCard = ({ note }) => {
	const { dispatch } = useNoteContext();
	const [showEditForm, setShowEditForm] = useState(false);

	const formatDate = (date) => {
		return format(new Date(date), "M/d/yy");
	};

	const toggleEditForm = () => {
		setShowEditForm(!showEditForm);
	};

	const handleDeleteButton = async (e) => {
		e.stopPropagation();

		try {
			await axios.delete(
				`https://organizeme-7l2v.onrender.com/api/notes/${note._id}`,
				{
					withCredentials: true,
				}
			);

			dispatch({ type: "DELETE_NOTE", payload: note });
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className="note-card" onClick={toggleEditForm}>
				<div className="note-main">
					<div className="note-title">{note.title}</div>
					<div className="note-body">
						<div className="note-date">
							{formatDate(note.updatedAt)}
						</div>
						<div className="note-content">
							{note.content ? note.content : "No additional text"}
						</div>
					</div>
				</div>
				<FaDeleteLeft
					size={22}
					className="icon note-delete-icon"
					onClick={(e) => {
						handleDeleteButton(e);
					}}
				/>
			</div>
			{showEditForm && (
				<EditNotePopup toggleEditForm={toggleEditForm} note={note} />
			)}
		</>
	);
};
export default NoteCard;
