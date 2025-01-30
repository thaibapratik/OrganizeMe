import React from "react";
import { useNavigate } from "react-router-dom";
import NotesList from "../components/NotesList";

const NotePage = () => {
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
			<NotesList showAll={true} />
		</div>
	);
};

export default NotePage;
