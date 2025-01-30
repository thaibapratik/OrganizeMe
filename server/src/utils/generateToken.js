import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
		expiresIn: "7d",
	});

	res.cookie("jwt", token, {
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
		httpOnly: true, // Prevent access to cookies via JavaScript
		secure: process.env.NODE_ENV === "production", // Use secure cookies in production
		sameSite: "none", // Prevent CSRF attacks
	});

	return token;
};
