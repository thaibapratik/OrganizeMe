import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	try {
		let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

		if (!token) {
			throw createHttpError(401, "Unauthorized");
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		if (!decoded) {
			throw createHttpError(401, "Unauthorized");
		}

		req.userId = decoded.userId;
		next();
	} catch (error) {
		next(error);
	}
};
