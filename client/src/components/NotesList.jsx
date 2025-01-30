import { IoAdd } from "react-icons/io5";
import { NoteContext } from "../context/NoteContext";
import { useNoteContext } from "../hooks/useNoteContext";
import NoteCard from "./NoteCard";
import { useState } from "react";
import AddNotePopup from "./AddNotePopup";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Input from "./Input";

const NotesList = ({ showAll = false }) => {
	const { notes, isLoading, error } = useNoteContext();
	const [showAddForm, setShowAddForm] = useState(false);
	const [search, setSearch] = useState("");

	const toggleAddForm = () => {
		setShowAddForm(!showAddForm);
	};

	// Filter notes based on search input
	const filteredNotes = notes
		? notes.filter(
				(note) =>
					note.title.toLowerCase().includes(search.toLowerCase()) ||
					note.content.toLowerCase().includes(search.toLowerCase())
		  )
		: [];

	// Apply filtering before slicing for dashboard view
	const dashboardNotes = filteredNotes.slice(0, 7);

	return (
		<div className="notes">
			<div className="task-heading">
				<div className="todays-task">
					<h3>{showAll ? "All Notes" : "Notes"}</h3>
					<IoAdd
						size={25}
						className="add-icon"
						onClick={toggleAddForm}
					/>
					{showAll && (
						<Input
							placeholder="Search notes"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					)}
				</div>

				{showAll || (
					<Link className="view-all" to={"/notes"}>
						View all{" "}
						<IoIosArrowForward
							size={10}
							className="view-all-icon"
						/>
					</Link>
				)}
			</div>

			{isLoading && <p>Loading notes...</p>}

			{error && <p className="error">{error}</p>}

			{!isLoading && !error ? (
				filteredNotes.length > 0 ? (
					showAll ? (
						filteredNotes.map((note) => (
							<NoteCard key={note._id} note={note} />
						))
					) : (
						dashboardNotes.map((note) => (
							<NoteCard key={note._id} note={note} />
						))
					)
				) : (
					<p>No notes available. Add some tasks to get started!</p>
				)
			) : (
				<p>No notes available. Add some tasks to get started!</p>
			)}

			{showAddForm && <AddNotePopup toggleAddForm={toggleAddForm} />}
		</div>
	);
};

export default NotesList;
