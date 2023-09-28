import { render } from "@testing-library/react";

import ErrorIcon from "@/components/Icons/Error";

describe("Error", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<ErrorIcon />);

    expect(getByTestId("error-icon")).toBeInTheDocument();
  });
});
