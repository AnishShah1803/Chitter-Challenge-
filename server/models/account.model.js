import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
	firstName: { type: String, require: true },
	secondName: { type: String, require: true },
	username: { type: String, require: true, unique: true },
	email: { type: String, require: true, unique: true },
	password: { type: String, require: true },
});

const Account = new mongoose.model("Account", accountSchema);
export default Account;
