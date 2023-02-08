import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { router as PeepsRouter } from "./routes/peep.routes.js";
import { router as RegisterRouter } from "./routes/register.routes.js";
import { router as LoginRouter } from "./routes/login.routes.js";
import cors from "cors";
const app = express();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use("/", PeepsRouter);
app.use("/register", RegisterRouter);
app.use("/login", LoginRouter);
const db = process.env.DBURI;
const main = async () => {
	console.log(`Connecting to database at : ${db}`);
	try {
		await mongoose.connect(db);
		console.log(`Connected to the database at: ${db}`);
	} catch (e) {
		console.log(`Database failed to connect: ${e.message}`);
	}
};
main();

const server = app.listen(process.env.PORT, () =>
	console.log(
		`App is listening at http://${process.env.HOST}:${process.env.PORT}`
	)
);
export default server;
