import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Peep from "../Components/Peep";
import Peeps from "../Components/Peeps";
import mockPeeps from "../Components/utils/mockPeeps.json";

describe("Peep test suite", () => {
	describe("Testing render when peeps exist", () => {
		beforeEach(() => {
			const peeps = mockPeeps;
			render(
				<MemoryRouter>
					<Peeps peepData={{ peeps, error: `` }} />
				</MemoryRouter>
			);
		});
		it("it should render the peeps from the first item in the mock peeps", () => {
			const testName = screen.getAllByText(
				`${mockPeeps[0].firstName} ${mockPeeps[0].secondName}`
			);
			const testUsername = screen.getAllByText(`@${mockPeeps[0].username}`);
			const testContent = screen.getAllByText(mockPeeps[0].content);
			const testDate = screen.getAllByText(mockPeeps[0].dateCreated);
			expect(testName[0]).toBeInTheDocument();
			expect(testUsername[0]).toBeInTheDocument();
			expect(testContent[0]).toBeInTheDocument();
			expect(testDate[0]).toBeInTheDocument();
		});
		it("it should render the peeps from the second item in the mock peeps", () => {
			const testName = screen.getAllByText(
				`${mockPeeps[1].firstName} ${mockPeeps[1].secondName}`
			);
			const testUsername = screen.getAllByText(`@${mockPeeps[1].username}`);
			const testContent = screen.getAllByText(mockPeeps[1].content);
			const testDate = screen.getAllByText(mockPeeps[1].dateCreated);
			expect(testName[0]).toBeInTheDocument();
			expect(testUsername[0]).toBeInTheDocument();
			expect(testContent[0]).toBeInTheDocument();
			expect(testDate[0]).toBeInTheDocument();
		});
		it("it should render the peeps from the third item in the mock peeps", () => {
			const testName = screen.getAllByText(
				`${mockPeeps[2].firstName} ${mockPeeps[2].secondName}`
			);
			const testUsername = screen.getAllByText(`@${mockPeeps[2].username}`);
			const testContent = screen.getAllByText(mockPeeps[2].content);
			const testDate = screen.getAllByText(mockPeeps[2].dateCreated);
			expect(testName[0]).toBeInTheDocument();
			expect(testUsername[0]).toBeInTheDocument();
			expect(testContent[0]).toBeInTheDocument();
			expect(testDate[0]).toBeInTheDocument();
		});
	});
	describe("Testing Peeps when loggedIn = true", () => {
		const peeps = mockPeeps;
		const postPeepsHandler = jest.fn();
		const loggedIn = true;
		const account = {
			firstName: "testFirst",
			secondName: "testSecond",
			username: "testuser",
			content: "This is a test peep",
			dateCreated: "2022-12-10",
		};
		beforeEach(() => {
			render(
				<MemoryRouter>
					<Peeps
						peepData={{ peeps, error: "" }}
						loggedIn={loggedIn}
						account={account}
						submitAction={postPeepsHandler}
					/>
				</MemoryRouter>
			);
		});
		describe("Posting peep test", () => {
			it("should render the post peep card", () => {
				expect(screen.getByText("testFirst testSecond")).toBeInTheDocument();
				expect(screen.getByText("@testuser"));
				expect(screen.getByPlaceholderText("peep...")).toBeInTheDocument();
			});
			it("should make a call to postPeepsHandler when the post button is clicked", () => {
				const content = screen.getByPlaceholderText("peep...");
				const submitButton = screen.getByText("Post It!");
				userEvent.type(content, "THIS IS A TEST! REPEAT THIS IS A TEST!");
				userEvent.click(submitButton);
				expect(postPeepsHandler).toHaveBeenCalledTimes(1);
			});
		});
	});
});
