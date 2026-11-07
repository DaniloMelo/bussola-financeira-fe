/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useResetPassword } from "@/hooks/use-reset-password";
import { render, screen, waitFor } from "@testing-library/react";
import ResetPasswordPublicForm from ".";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

jest.mock("@/hooks/use-reset-password");

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: jest.fn(),
}));
const mockUseSearchParams = useSearchParams as jest.Mock;

describe("resetPasswordPublicForm", () => {
  const mockResetPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useResetPassword).mockReturnValue({
      requestPasswordReset: jest.fn(),
      resetPassword: mockResetPassword,
      isLoading: false,
    });

    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({
        email: "john@email.com",
        token: "test-token-123",
      }),
    );
  });

  it("should render all form fields", () => {
    render(<ResetPasswordPublicForm />);

    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Alterar" })).toBeInTheDocument();

    const linkElement = screen.getByRole("link", {
      name: "Voltar para login",
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("Should show error toast when user submit the form with some invalid field", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPublicForm />);

    await user.click(screen.getByRole("button", { name: "Alterar" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("Should call 'useResetPassword.resetPassword' with correct data", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordPublicForm />);

    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.type(screen.getByLabelText("Confirmar senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Alterar" }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith(
        expect.objectContaining({
          password: "123456",
          confirmPassword: "123456",
          email: "john@email.com",
          rawToken: "test-token-123",
        }),
      );
    });
  });

  it("Should disable the form button while the form is submited", () => {
    jest.mocked(useResetPassword).mockReturnValue({
      requestPasswordReset: jest.fn(),
      resetPassword: mockResetPassword,
      isLoading: true,
    });

    render(<ResetPasswordPublicForm />);

    expect(screen.getByRole("button", { name: "Aguarde" })).toBeDisabled();
  });
});
