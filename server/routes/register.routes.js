import express from "express";
import { check, validationResult } from "express-validator";
import Account from "../models/account.model.js";
export const router = express.Router();
router.use(express.json());
router.route("/").post(
	[
		check(`firstName`)
			.exists()
			.isLength({ min: 2 })
			.matches(/^[a-z ,.'-]+$/i)
			.withMessage(`Please enter a first name of minimum 2 characters`),
		check(`secondName`)
			.exists()
			.isLength({ min: 2 })
			.matches(/^[a-z ,.'-]+$/i)
			.withMessage(`Please enter a second name of minimum 2 characters`),
		check("username")
			.not()
			.isEmpty()
			.withMessage("Username is required")
			.isLength({ min: 6 })
			.withMessage("Username must be at least 6 characters long")
			.matches(/^[a-zA-Z0-9]+$/, "i")
			.withMessage("Username must be alphanumeric"),
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
		if (!errors.isEmpty() && errors.errors[0].param === "firstName") {
			return res.status(422).send(`Please enter a valid first name`);
		}
		if (!errors.isEmpty() && errors.errors[0].param === "secondName") {
			return res.status(422).send(`Please enter a valid second name`);
		}
		if (!errors.isEmpty() && errors.errors[0].param === "username") {
			return res.status(422).send(`Please enter a valid username`);
		}
		if (!errors.isEmpty() && errors.errors[0].param === "email") {
			return res.status(422).send(`Please enter a valid email address`);
		}
		if (!errors.isEmpty() && errors.errors[0].param === "password") {
			return res.status(422).send(`Please enter a valid password`);
		}
		const { username, email } = req.body;
		Account.findOne({ $or: [{ username }, { email }] }, (error, account) => {
			if (account) {
				res.send({
					message: `This username/email is already registered. Please Log in.`,
				});
			} else {
				const newAccount = new Account(req.body);
				try {
					newAccount.save();
					res.status(201).json({
						message: `Registration Complete. Please log in.`,
					});
				} catch (error) {
					res.status(422).send(`Error registering user`);
				}
			}
		});
	}
);
