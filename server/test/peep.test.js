import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import index from "../index.js";
import Peep from "../models/peep.model.js";
import mockPeeps from "../utils/mockPeeps.json" assert { type: "json" };
import {
	passingPeep,
	emptyContent,
	fullContent,
} from "../utils/testingPeeps.js";
chai.use(chaiHttp);
describe("Testing the peep methods", () => {
	before(async () => {
		await Peep.deleteMany()
			.then(() => console.log(`Database Cleared`))
			.catch((error) => {
				console.log(`Error clearing`);
				throw new Error();
			});
		await Peep.insertMany(mockPeeps)
			.then(() => console.log(`Database populated with sample mock peeps`))
			.catch((error) => {
				console.log(`Error inserting`);
				throw new Error();
			});
	});
	describe("Testing posting a new peep", () => {
		it("should post a peep when the content fits the validators", async () => {
			const res = await chai.request(index).post("/").send(passingPeep);
			expect(res).to.have.status(201);
			expect(res.body).to.have.property("message", "Peep Posted");
		});
		it("shouldn't post a peep when the content is less than 1 character", async () => {
			const res = await chai.request(index).post("/").send(emptyContent);
			expect(res).to.have.status(422);
			expect(res.text).to.eql("Peep must be between 1 and 280 characters");
		});
		it("shouldn't post a peep when the content is more than 280 character", async () => {
			const res = await chai.request(index).post("/").send(fullContent);
			expect(res).to.have.status(422);
			expect(res.text).to.eql("Peep must be between 1 and 280 characters");
		});
	});
	describe("Testing retrieving the peeps", () => {
		it("should retrieve all the peeps", async () => {
			const res = await chai.request(index).get(`/`).send();
			expect(res).to.have.status(200);
			expect(res).to.be.an("Object");
			expect(res.body).to.be.an("array");
		});
		describe("Testing a 404 error for peeps", () => {
			before(async () => {
				await Peep.deleteMany()
					.then(() => console.log(`Database Cleared`))
					.catch((error) => {
						console.log(`Error clearing`);
						throw new Error();
					});
			});
			it("should return a 404 error if there are no peeps", async () => {
				const res = await chai.request(index).get(`/`).send();
				expect(res).to.have.status(404);
				expect(res.body).to.have.property(`message`, `unable to find peeps`);
			});
		});
	});
});
