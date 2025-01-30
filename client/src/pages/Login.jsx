import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../hooks/useUserContext";
import { UserContext } from "../context/userContext";
import { useTodoContext } from "../hooks/useTodoContext";
import { useNoteContext } from "../hooks/useNoteContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const { user, dispatch } = useUserContext(UserContext);
	const { fetchTodos } = useTodoContext();
	const { fetchNotes } = useNoteContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [user, navigate]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		try {
			const response = await axios.post(
				"http://localhost:4000/api/users/login",
				{ email, password },
				{ withCredentials: true }
			);

			dispatch({ type: "LOGIN", payload: response.data });

			await fetchTodos();
			await fetchNotes();

			navigate("/dashboard");
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleLogin} className="form-container login-container">
			<h2 className="login-heading">Login</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="input-field login-input"
				required
			/>
			<div className="password-container login-password-container">
				<input
					type={showPassword ? "text" : "password"}
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="input-field login-input"
					required
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="password-toggle"
					aria-label={
						showPassword ? "Hide password" : "Show password"
					}
				>
					{showPassword ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
							<line x1="1" y1="1" x2="23" y2="23"></line>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
							<circle cx="12" cy="12" r="3"></circle>
						</svg>
					)}
				</button>
			</div>
			{error && (
				<div className="error">{error.response?.data?.message}</div>
			)}
			<button
				type="submit"
				className="submit-button"
				disabled={isLoading}
			>
				{isLoading ? "Logging in..." : "Login"}
			</button>
			<div className="form-footer">
				<p>
					Don't have an account?{" "}
					<Link to="/signup" className="cta-secondary">
						Sign up
					</Link>
				</p>
			</div>
		</form>
	);
};

export default Login;
