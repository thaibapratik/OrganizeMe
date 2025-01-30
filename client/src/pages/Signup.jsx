import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../hooks/useUserContext";
import { UserContext } from "../context/userContext";
import { useTodoContext } from "../hooks/useTodoContext";
import { TodoContext } from "../context/TodoContext";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const { fetchTodos } = useTodoContext(TodoContext);
	const { user, dispatch } = useUserContext(UserContext);

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			setError(null);
			const response = await axios.post(
				"https://organizeme-7l2v.onrender.com/api/users/signup",
				{ name, email, password },
				{ withCredentials: true }
			);
			dispatch({ type: "LOGIN", payload: response.data.user });

			await fetchTodos();
			navigate("/dashboard");
		} catch (error) {
			setError(
				error.response?.data?.message ||
					error.message ||
					"Signup failed. Please try again."
			);
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSignup} className="form-container">
			<h2 className="login-heading">Signup</h2>
			<input
				type="name"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="input-field"
				required
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="input-field"
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
				<div className="error">
					{error.response?.data?.message ||
						"Unknown error occurred. Please try again"}
				</div>
			)}

			<button
				type="submit"
				className="submit-button"
				disabled={isLoading}
			>
				{isLoading ? "Signing up..." : "Sign Up"}
			</button>
			<div className="form-footer">
				<p>
					Already have an account?{" "}
					<Link to="/login" className="cta-secondary">
						Log in
					</Link>
				</p>
			</div>
		</form>
	);
};

export default Signup;
