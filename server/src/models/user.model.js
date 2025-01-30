import mongoose from "mongoose";

function formatName(name) {
	if (!name) return "";
	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const userSchema = new mongoose.Schema({
	name: { type: String, required: true, set: (value) => formatName(value) },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
