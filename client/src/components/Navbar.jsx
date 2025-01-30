import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { UserContext } from "../context/userContext";
import { useEffect } from "react";
import axios from "axios";
import { useTodoContext } from "../hooks/useTodoContext";
import { TodoContext } from "../context/TodoContext";
import { useNoteContext } from "../hooks/useNoteContext";
import { NoteContext } from "../context/NoteContext";

const Navbar = () => {
	const { user, dispatch: userDispatch } = useUserContext(UserContext);
	const { dispatch: todoDispatch } = useTodoContext(TodoContext);
	const { dispatch: noteDispatch } = useNoteContext();

	const handleLogout = (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("jwt");
			userDispatch({ type: "LOGOUT" });
			todoDispatch({ type: "CLEAR_TODOS" });
			noteDispatch({ type: "CLEAR_NOTES" });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<nav className="home-nav">
			<Link to={"/"} className="logo">
				OrganizeMe
			</Link>
			{user && (
				<div className="nav-workspace">{user.name}'s workspace</div>
			)}

			{user ? (
				<button className="logout-btn" onClick={(e) => handleLogout(e)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9-4-4m4 4-4 4m4-4H9"
						/>
					</svg>
					Logout
				</button>
			) : (
				<Link to="/login" className="login-btn">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						className="login-icon"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
					Login
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
