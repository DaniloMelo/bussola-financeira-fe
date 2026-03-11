import { render, screen } from "@testing-library/react";
import AuthButton from ".";
import userEvent from "@testing-library/user-event";

jest.mock("react-icons/cg", () => ({
  CgSpinner: () => <span data-testid="spinner-icon" />,
}));

describe("AuthButton", () => {
  it("Should render with text passing by props", () => {
    render(<AuthButton text="Test" />);

    expect(screen.getByRole("button", { name: /Test/i })).toBeInTheDocument();
  });

  it("Should not be disabled", () => {
    render(<AuthButton text="Test" />);

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("Should not show the spiner", () => {
    render(<AuthButton text="Test" />);

    expect(screen.queryByTestId("spinner-icon")).not.toBeInTheDocument();
  });

  it("Should show 'Aguarde' text and spinner when disabled", () => {
    render(<AuthButton text="Test" disabled />);

    expect(
      screen.getByRole("button", { name: /Aguarde/i }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("spinner-icon")).toBeInTheDocument();
  });

  it("Should call 'onClick' when not disabled", async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();

    render(<AuthButton text="Test" onClick={mockOnClick} />);
    await user.click(screen.getByRole("button", { name: /Test/i }));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Should not call 'onClick' when disabled", async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();

    render(<AuthButton text="Test" disabled onClick={mockOnClick} />);
    await user.click(screen.getByRole("button", { name: /Aguarde/i }));

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
