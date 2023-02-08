import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Components/Register";
import mockAccount from "../Components/utils/mockAccount.json";
import userEvent from "@testing-library/user-event";
describe("Register tests", () => {
	const mockPostAccountHandler = jest.fn();
	const mockResponse = "response";
	const testAccount = mockAccount[1];

	beforeEach(() => {
		render(
			<MemoryRouter>
				<Register
					submitAction={mockPostAccountHandler}
					response={mockResponse}
				/>
			</MemoryRouter>
		);
	});
	describe("Rendering Tests", () => {
		it("should render the first name input", () => {
			expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
		});
		it("should render the second name input", () => {
			expect(screen.getByPlaceholderText("Second Name")).toBeInTheDocument();
		});
		it("should render the username input", () => {
			expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
		});
		it("should render the email input", () => {
			expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		});
		it("should render the password input", () => {
			expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		});
	});
	describe("Registering test", () => {
		it("should make a call to mockPostAccountHandler when the signUp button is clicked", () => {
			const firstName = screen.getByPlaceholderText("First Name");
			const secondName = screen.getByPlaceholderText("Second Name");
			const username = screen.getByPlaceholderText("Username");
			const email = screen.getByPlaceholderText("Email");
			const password = screen.getByPlaceholderText("Password");
			const submitButton = screen.getByText("Sign Up");

			userEvent.type(firstName, testAccount.firstName);
			userEvent.type(secondName, testAccount.secondName);
			userEvent.type(username, testAccount.username);
			userEvent.type(email, testAccount.email);
			userEvent.type(password, testAccount.password);
			userEvent.click(submitButton);

			expect(mockPostAccountHandler).toHaveBeenCalledTimes(1);
			expect(mockPostAccountHandler).toHaveBeenCalledWith(testAccount);
		});
	});
});
