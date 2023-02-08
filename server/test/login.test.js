import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import index from "../index.js";
import Account from "../models/account.model.js";
import mockAccounts from "../utils/mockAccounts.json" assert { type: "json" };
chai.use(chaiHttp);
describe("testing logging into an account", () => {
	before(async () => {
		await Account.deleteMany()
			.then(() => console.log(`Database Cleared`))
			.catch((error) => {
				console.log(`Error clearing`);
				throw new Error();
			});
		await Account.insertMany(mockAccounts)
			.then(() => console.log(`Database populated with sample mock accounts`))
			.catch((error) => {
				console.log(`Error inserting`);
				throw new Error();
			});
	});
	describe("Testing the Login scenarios", () => {
		it("should return a successful message when logging in with correct details", async () => {
			let login = {
				email: `anemail@gmail.com`,
				password: `Password1`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(201);
			expect(res.body).to.be.an("Object");
			expect(res.body).to.have.property("message", "Login Success");
		});
		it("should return a unsuccessful message when logging in with an incorrect email", async () => {
			let login = {
				email: `afakemail@gmail.com`,
				password: `Password1`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(404);
			expect(res.body).to.be.an("Object");
			expect(res.body).to.have.property("message", "Details not found");
		});
		it("should return a unsuccessful message when logging in with an incorrect email", async () => {
			let login = {
				email: `anemail@gmail.com`,
				password: `anInvalidPassword1`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(404);
			expect(res.body).to.be.an("Object");
			expect(res.body).to.have.property("message", "Details not found");
		});
		it(`should return an unsuccessful message when logging in with an email that isn't an email`, async () => {
			let login = {
				email: `notanemail`,
				password: `Password1`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid email address");
		});
		it(`should return an unsuccessful message when logging in with a password that doesn't have 8 characters`, async () => {
			let login = {
				email: `anemail@gmail.com`,
				password: `Not1`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it(`should return an unsuccessful message when logging in with a password that doesn't have a capital letter`, async () => {
			let login = {
				email: `anemail@gmail.com`,
				password: `notapassword1`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it(`should return an unsuccessful message when logging in with a password that doesn't have a lowercase letter`, async () => {
			let login = {
				email: `anemail@gmail.com`,
				password: `NOTAPASSWORD1`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it(`should return an unsuccessful message when logging in with a password that doesn't have a number`, async () => {
			let login = {
				email: `anemail@gmail.com`,
				password: `NotValidPassword`,
			};
			const res = await chai.request(index).post("/login").send(login);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
	});
});
