import { render } from "@testing-library/react";
import Footer from "../Components/Footer";

it("Footer matches snapshot", () => {
	const FooterComponent = render(<Footer />);
	expect(FooterComponent).toMatchSnapshot();
});
