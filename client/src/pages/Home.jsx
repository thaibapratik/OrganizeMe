import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { UserContext } from "../context/userContext";
import { useEffect } from "react";

const Home = () => {
	const { user } = useUserContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [navigate, user]);

	return (
		<div className="home-container">
			<div className="hero-section">
				<div className="hero-content">
					<h1>Organize Notes & Tasks with Ease</h1>
					<p className="hero-subtitle">
						Create, manage, and organize your notes and tasks with
						authorization. Stay productive with powerful
						organization tools and seamless synchronization across
						all devices.
					</p>
					<div className="cta-buttons">
						<Link to="/signup" className="cta-primary">
							Get Started
						</Link>
						<div className="existing-msg-text">
							Existing User?{" "}
							<Link to="/login" className="cta-secondary">
								Log in
							</Link>
						</div>
					</div>
				</div>
			</div>

			<section className="features">
				<div className="feature-card">
					<div className="feature-icon">📝</div>
					<h3>Smart Notes & Tasks</h3>
					<p>
						Create, edit, and manage notes with rich text. Add tasks
						with deadlines and priorities.
					</p>
				</div>

				<div className="feature-card">
					<div className="feature-icon">✅</div>
					<h3>Task Management</h3>
					<p>
						Create to-do lists, set reminders, track progress, and
						view pending/completed tasks in a pie chart.
					</p>
				</div>
				<div className="feature-card">
					<div className="feature-icon">🔑</div>
					<h3>Secure Signup & Login</h3>
					<p>
						Sign up and log in securely to access your personalized
						tasks and notes.
					</p>
				</div>
			</section>
		</div>
	);
};

export default Home;
