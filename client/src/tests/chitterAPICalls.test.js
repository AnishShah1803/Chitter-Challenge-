import axiosMock from "axios";
import * as api from "../AsyncFunctions/chitterAPICalls";
import mockPeeps from "../Components/utils/mockPeeps.json";
import mockAccount from "../Components/utils/mockAccount.json";

jest.mock("axios");

describe("External Data tests", () => {
	let functionResult;
	describe("getPeeps tests", () => {
		const setPeeps = jest.fn();
		const setGetError = jest.fn();
		describe("Normal data returned", () => {
			beforeEach(async () => {
				axiosMock.get.mockResolvedValueOnce({ data: mockPeeps });
				functionResult = await api.getPeeps(setPeeps, setGetError);
			});
			it("should make a get request via axios", () => {
				expect(axiosMock.get).toHaveBeenCalledTimes(1);
				expect(axiosMock.get).toHaveBeenCalledWith(`http://localhost:4000/`);
			});
		});
	});
	describe("postAccount Data tests", () => {
		const response = jest.fn();
		response.mockResolvedValueOnce({});
		const setPostError = jest.fn();
		const testAccount = mockAccount[0];
		describe("Normal data returned", () => {
			beforeEach(async () => {
				axiosMock.post.mockResolvedValueOnce({});
				functionResult = await api.postAccount(
					testAccount,
					setPostError,
					response
				);
			});
			it("should make a post request via axios", () => {
				expect(axiosMock.post).toHaveBeenCalledTimes(1);
				expect(axiosMock.post).toHaveBeenCalledWith(
					`http://localhost:4000/register`,
					testAccount
				);
			});
		});
	});
	describe("postLogin Data tests", () => {
		const response = jest.fn();
		response.mockResolvedValueOnce({});
		const setPostError = jest.fn();
		const setAccount = jest.fn();
		const setLoggedIn = jest.fn();
		const testAccount = {
			email: mockAccount[0].email,
			password: mockAccount[0].password,
		};
		describe("Normal data returned", () => {
			beforeEach(async () => {
				axiosMock.post.mockResolvedValueOnce({});
				functionResult = await api.postLogin(
					testAccount,
					setPostError,
					response,
					setAccount,
					setLoggedIn
				);
			});
			it("should make a post request via axios", () => {
				expect(axiosMock.post).toHaveBeenCalledTimes(1);
				expect(axiosMock.post).toHaveBeenCalledWith(
					`http://localhost:4000/login`,
					testAccount
				);
			});
		});
	});
	describe("post Peep tests", () => {
		const setResponse = jest.fn();
		const setPostError = jest.fn();
		const getPeepHandler = jest.fn();
		const newPeep = {
			firstName: "Anish",
			secondName: "Shah",
			username: "passingUsername",
			content: "This is some content",
			dateCreated: "2022-12-10",
		};
		describe("Normal data returned", () => {
			beforeEach(async () => {
				axiosMock.post.mockResolvedValueOnce({});
				functionResult = await api.postPeep(
					newPeep,
					getPeepHandler,
					setPostError,
					setResponse
				);
			});
			it("should make a post request via axios", () => {
				expect(axiosMock.post).toHaveBeenCalledTimes(1);
				expect(axiosMock.post).toHaveBeenCalledWith(
					`http://localhost:4000/`,
					newPeep
				);
			});
		});
	});
});
