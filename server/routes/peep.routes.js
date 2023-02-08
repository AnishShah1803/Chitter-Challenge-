import express from "express";
import Peep from "../models/peep.model.js";
import { check, validationResult } from "express-validator";
export const router = express.Router();
router.use(express.json());
router
	.route("/")
	.get((req, res) => {
		Peep.find((error, peeps) => {
			error || peeps.length === 0
				? res.status(404).json({
						message: "unable to find peeps",
				  })
				: res.status(200).json(peeps);
		}).sort({ _id: -1 });
	})
	.post(
		[
			check(`content`)
				.exists()
				.isLength({ min: 1, max: 280 })
				.withMessage(`Peep must be between 1 and 280 characters`)
				.matches(/^[a-zA-Z0-9!?.@_', ]*$/),
		],
		async (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res
					.status(422)
					.send(`Peep must be between 1 and 280 characters`);
			}
			const newPeep = new Peep(req.body);
			try {
				await newPeep.save();
				res.status(201).json({
					message: `Peep Posted`,
				});
			} catch (error) {
				res.status(422).send(`Error posting peep`);
			}
		}
	);
