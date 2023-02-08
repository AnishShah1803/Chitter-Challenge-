import mongoose from "mongoose";
const peepSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	secondName: { type: String, required: true },
	username: { type: String, required: true },
	content: { type: String, required: true },
	dateCreated: { type: String, required: true },
});

const Peep = new mongoose.model("Peep", peepSchema);
export default Peep;
