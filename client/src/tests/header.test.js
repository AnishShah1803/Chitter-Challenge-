import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Components/Header";

describe("Header tests", () => {
	it("should render with logout button if loggedin = true", () => {
		const loggedIn = true;
		render(
			<MemoryRouter>
				<Header loggedIn={loggedIn} />
			</MemoryRouter>
		);
		expect(screen.getByText("Log Out")).toBeInTheDocument();
	});
	it("should render with login button if loggedin = false", () => {
		const loggedIn = false;
		render(
			<MemoryRouter>
				<Header loggedIn={loggedIn} />
			</MemoryRouter>
		);
		expect(screen.getByText("Login")).toBeInTheDocument();
	});
});
