import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Peep from "../Components/Peep";
import PeepModel from "../Components/utils/Peep.model";

jest.mock("../Components/utils/Peep.model", () => {
	return class PeepModel {
		constructor() {
			this.firstName = `Anish`;
			this.secondName = `Shah`;
			this.username = `testusername`;
			this.content = `Test content`;
			this.dateCreated = `12/12/2022, 01:15:15`;
		}
	};
});
let testPeep = new PeepModel();
const { firstName, secondName, username, content, dateCreated } = testPeep;
describe("Peep test suite", () => {
	describe("Testing render when peeps exist", () => {
		it("it should render stuff", () => {
			render(
				<MemoryRouter>
					<Peep peep={testPeep} />
				</MemoryRouter>
			);
			const testName = screen.getByText(`${firstName} ${secondName}`);
			const testUsername = screen.getByText(`@${username}`);
			const testContent = screen.getByText(content);
			const testDate = screen.getByText(dateCreated);
			expect(testName).toBeInTheDocument();
			expect(testUsername).toBeInTheDocument();
			expect(testContent).toBeInTheDocument();
			expect(testDate).toBeInTheDocument();
		});
	});
});
