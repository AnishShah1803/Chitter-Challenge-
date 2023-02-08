import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import index from "../index.js";
import Account from "../models/account.model.js";
import mockAccounts from "../utils/mockAccounts.json" assert { type: "json" };
chai.use(chaiHttp);
describe("testing the registration of a new account", () => {
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
	describe("Testing the Registration scenarios", () => {
		it("should create a new account when all validators are passed", async () => {
			let account = {
				firstName: `TESTNAME`,
				secondName: `TESTNAME`,
				username: `testUsername1`,
				email: `testemail@gmail.com`,
				password: `thisIsATest0`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(201);
			expect(res.body).to.be.an("Object");
			expect(res.body).to.have.property(
				"message",
				"Registration Complete. Please log in."
			);
		});
		it("should not create a new account if the first name is less than 2 characters", async () => {
			let account = {
				firstName: "a",
				secondName: "b",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
				password: `thisIsATest0`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid first name");
		});
		it("should not create a new account if the username is less than 6 characters", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `test`,
				email: `testemail2@gmail.com`,
				password: `thisIsATest0`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid username");
		});
		it("should not create a new account if the username has special symbols", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername*`,
				email: `testemail2@gmail.com`,
				password: `thisIsATest0`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid username");
		});
		it("should not create a new account if the email is invalid", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail`,
				password: `thisIsATest0`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid email address");
		});
		it("should not create a new account if the password is less than 8 characters", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
				password: `Test1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it("should not create a new account if the password doesn't contain a number", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
				password: `TestPassword`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it("should not create a new account if the password doesn't contain an uppercase letter", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
				password: `testpassword1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it("should not create a new account if the password doesn't contain a lowercase letter", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
				password: `TESTPASSWORD1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it("should not create a new account if it doesn't contain a firstname", async () => {
			let account = {
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
				password: `testPassword1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid first name");
		});
		it("should not create a new account if the password doesn't contain a second name", async () => {
			let account = {
				firstName: "anish",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
				password: `testPassword1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid second name");
		});
		it("should not create a new account if the password doesn't contain a username ", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				email: `testemail2@gmail.com`,
				password: `testPassword1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid username");
		});
		it("should not create a new account if the password doesn't contain an email ", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				password: `testPassword1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid email address");
		});
		it("should not create a new account if the password doesn't contain a password ", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail2@gmail.com`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(422);
			expect(res.body).to.be.an("Object");
			expect(res.text).to.be.eql("Please enter a valid password");
		});
		it("should not create a new account if the username isn't unique", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername1`,
				email: `testemail2@gmail.com`,
				password: `testPassword1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(200);
			expect(res.body).to.be.an("Object");
			expect(res.body).to.have.property(
				"message",
				`This username/email is already registered. Please Log in.`
			);
		});
		it("should not create a new account if the email isn't unique", async () => {
			let account = {
				firstName: "anish",
				secondName: "shah",
				username: `testUsername2`,
				email: `testemail@gmail.com`,
				password: `testPassword1`,
			};
			const res = await chai.request(index).post("/register").send(account);
			expect(res).to.have.status(200);
			expect(res.body).to.be.an("Object");
			expect(res.body).to.have.property(
				"message",
				`This username/email is already registered. Please Log in.`
			);
		});
	});
});
