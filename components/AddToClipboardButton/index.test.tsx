import AddToClipboardButton from "@/components/AddToClipboardButton";
import { act, fireEvent, render, waitFor } from "@testing-library/react";

const mockWriteText = jest.fn();

describe("AddToClipboardButton", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      writable: true,
      value: {
        writeText: mockWriteText,
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the correct label", () => {
    const { container } = render(
      <AddToClipboardButton label="test" clipboardText="test" />,
    );

    expect(container).toHaveTextContent("test");
  });

  it("should copy the label correctly to the clipboard", () => {
    const { container } = render(
      <AddToClipboardButton label="test" clipboardText="test" />,
    );

    act(() => fireEvent.click(container));

    waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });
});
