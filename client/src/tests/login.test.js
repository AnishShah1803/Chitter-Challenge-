import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Components/Login";
import mockAccount from "../Components/utils/mockAccount.json";
import userEvent from "@testing-library/user-event";
describe("Register tests", () => {
	const mockPostLoginHandler = jest.fn();
	const mockResponse = "response";
	const testLogin = {
		email: mockAccount[1].email,
		password: mockAccount[1].password,
	};

	beforeEach(() => {
		render(
			<MemoryRouter>
				<Login submitAction={mockPostLoginHandler} response={mockResponse} />
			</MemoryRouter>
		);
	});
	describe("Rendering Tests", () => {
		it("should render the email input", () => {
			expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		});
		it("should render the password input", () => {
			expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		});
	});
	describe("Registering test", () => {
		it("should make a call to mockPostAccountHandler when the signUp button is clicked", () => {
			const email = screen.getByPlaceholderText("Email");
			const password = screen.getByPlaceholderText("Password");
			const submitButton = screen.getByText("Login");
			userEvent.type(email, testLogin.email);
			userEvent.type(password, testLogin.password);
			userEvent.click(submitButton);

			expect(mockPostLoginHandler).toHaveBeenCalledTimes(1);
			expect(mockPostLoginHandler).toHaveBeenCalledWith(testLogin);
		});
	});
});
