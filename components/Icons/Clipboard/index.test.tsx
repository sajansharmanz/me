import { render } from "@testing-library/react";

import ClipboardIcon from "@/components/Icons/Clipboard";

describe("Clipboard", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<ClipboardIcon />);

    expect(getByTestId("clipboard-icon")).toBeInTheDocument();
  });
});
