import { render } from "@testing-library/react";

import AnimatedSpinnerIcon from "@/components/Icons/AnimatedSpinner";

describe("Animated Spinner", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<AnimatedSpinnerIcon />);

    expect(getByTestId("animated-spinner-icon")).toBeInTheDocument();
  });
});
