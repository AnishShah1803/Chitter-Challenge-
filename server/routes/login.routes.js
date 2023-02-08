import express from "express";
import Account from "../models/account.model.js";
import { check, validationResult } from "express-validator";
export const router = express.Router();
router.use(express.json());
router.route("/").post(
	[
		check(`email`).exists().isEmail().withMessage(`Please enter a valid email`),
		check("password")
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters long")
			.matches(/\d/, "i")
			.withMessage("Password must contain at least one number")
			.matches(/[a-z]+/g)
			.withMessage("Password must contain at least one lowercase letter")
			.matches(/[A-Z]+/g)
			.withMessage("Password must contain at least one uppercase letter"),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty() && errors.errors[0].param === "email") {
			return res.status(422).send(`Please enter a valid email address`);
		}
		if (!errors.isEmpty() && errors.errors[0].param === "password") {
			return res.status(422).send(`Please enter a valid password`);
		}
		const { email, password } = req.body;
		Account.findOne({ email }, (err, account) => {
			if (account && password === account.password) {
				res.status(201).send({ message: `Login Success`, account });
			} else {
				res.status(404).send({ message: `Details not found` });
			}
		});
	}
);
