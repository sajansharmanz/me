import { render } from "@testing-library/react";

import CheckmarkIcon from "@/components/Icons/Checkmark";

describe("Checkmark", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<CheckmarkIcon />);

    expect(getByTestId("checkmark-icon")).toBeInTheDocument();
  });
});
