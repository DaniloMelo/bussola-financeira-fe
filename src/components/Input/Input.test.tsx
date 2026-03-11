import { render, screen } from "@testing-library/react";
import Input from ".";
import userEvent from "@testing-library/user-event";

jest.mock("react-icons/lu", () => ({
  LuEye: () => <span data-testid="icon-eye-opened" />,
  LuEyeClosed: () => <span data-testid="icon-eye-closed" />,
}));

describe("Input", () => {
  it("Should render input without label", () => {
    render(<Input type="text" />);

    expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("Should render input with label", () => {
    render(<Input type="text" labelText="Test Label" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Test Label" }),
    ).toBeInTheDocument();
  });

  it("Should not render eye icon for non-password inputs type", () => {
    render(<Input type="text" labelText="Test Label" />);

    expect(
      screen.getByRole("textbox", { name: "Test Label" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-eye-opened")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-eye-closed")).not.toBeInTheDocument();
  });

  it("Should render input type password with initial state 'cloed eye icon'", () => {
    render(<Input type="password" labelText="Senha" />);

    // Inputs do tipo password não tem uma role específica por motivos de segurança. Então temos que busca-los pelo label, placeholder e etc
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-eye-closed")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-eye-opened")).not.toBeInTheDocument();
  });

  it("Should show and hide password text when user clicks in the eye icon", async () => {
    const user = userEvent.setup();
    render(<Input type="password" labelText="Senha" />);

    await user.click(screen.getByTestId("icon-eye-closed"));

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("icon-eye-opened")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-eye-closed")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("icon-eye-opened"));

    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
    expect(screen.queryByTestId("icon-eye-opened")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-eye-closed")).toBeInTheDocument();
  });
});
