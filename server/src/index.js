import express from "express";
import { connectDb } from "./utils/db.js";
import "dotenv/config.js";
import cors from "cors";
import authRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import { isHttpError } from "http-errors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use("/api/users", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/todos", todoRoutes);

app.use("*", (error, req, res, next) => {
	let errorMessage = "An internal error occurred";
	let status = 500;
	if (isHttpError(error)) {
		errorMessage = error.message;
		status = error.status;
	}
	res.status(status).json({ message: errorMessage });
});

connectDb()
	.then(() => {
		app.listen(PORT, () => console.log("Server is running on port", PORT));
	})
	.catch((err) => console.log(err));
