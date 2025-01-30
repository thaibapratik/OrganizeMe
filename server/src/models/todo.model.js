import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			required: true,
			trim: true,
			maxLength: [25, "Task cannot exceed 25 characters"],
		},

		status: {
			type: String,
			enum: ["completed", "pending"],
			default: "pending",
		},

		date: {
			type: Date,

			validate: {
				validator: function (value) {
					if (!value) return true;
					const inputDate = new Date(value).setHours(0, 0, 0, 0);
					const today = new Date().setHours(0, 0, 0, 0);

					return inputDate >= today;
				},
				message: "Date must be today or in the future",
			},
		},

		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
