import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App test suite", () => {
	it("should render header and footer content", () => {
		render(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(screen.getByText("Chitter")).toBeInTheDocument();
		expect(screen.getByText("© 2022 Copyright:")).toBeInTheDocument();
	});
});
