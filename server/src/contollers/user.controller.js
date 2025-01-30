import createHttpError from "http-errors";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (!email || !password || !name) {
			throw createHttpError(400, "All fields are required");
		}

		const user = await User.findOne({ email });
		if (user) {
			throw createHttpError(400, "User already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			email,
			password: hashedPassword,
			name,
		});

		const token = generateToken(newUser._id, res);
		res.status(201).json({
			user: {
				id: newUser._id,
				name: newUser.name,
				email: newUser.email,
			},
			token,
		});
	} catch (error) {
		next(error);
		console.log(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw createHttpError(400, "All fields are required");
		}

		const user = await User.findOne({ email });
		if (!user) {
			throw createHttpError(400, "Email or password is incorrect");
		}

		const matchPassword = await bcrypt.compare(password, user.password);
		if (!matchPassword) {
			throw createHttpError(400, "Email or password is incorrect");
		}

		const token = generateToken(user._id, res);
		res.status(200).json({
			name: user.name,
			email: user.email,
			token: token,
		});
	} catch (error) {
		next(error);
		console.log(error);
	}
};

export const logout = (req, res, next) => {
	try {
		res.clearCookie("jwt", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "none",
		});

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		next(error);
		console.log(error);
	}
};

export const checkAuth = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) {
			throw createHttpError(400, "User not found");
		}

		res.status(200).json({
			success: true,
			user: { ...user._doc, password: undefined },
		});
	} catch (error) {
		next(error);
	}
};
