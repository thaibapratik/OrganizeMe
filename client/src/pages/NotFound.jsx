import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="not-found">
			<h1 className="not-found-title">404</h1>
			<p className="not-found-message">
				Oops! The page you're looking for doesn't exist.
			</p>
			<Link to="/" className="not-found-link">
				Go back to Dashboard
			</Link>
		</div>
	);
};

export default NotFound;
