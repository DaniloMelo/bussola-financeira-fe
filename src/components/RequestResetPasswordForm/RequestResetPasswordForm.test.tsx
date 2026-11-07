import { useResetPassword } from "@/hooks/use-reset-password";
import { render, screen, waitFor } from "@testing-library/react";
import RequestResetPasswordForm from ".";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

jest.mock("@/hooks/use-reset-password");

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe("RequestResetPasswordForm", () => {
  const mockRequestPasswordReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useResetPassword).mockReturnValue({
      requestPasswordReset: mockRequestPasswordReset,
      resetPassword: jest.fn(),
      isLoading: false,
    });
  });

  it("should render all form fields", () => {
    render(<RequestResetPasswordForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();

    const linkElement = screen.getByRole("link", {
      name: "Voltar para login",
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("Should show error toast when user submit the form with some invalid field", async () => {
    const user = userEvent.setup();
    render(<RequestResetPasswordForm />);

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("Should call 'useResetPassword.requestPasswordReset' with correct data", async () => {
    const user = userEvent.setup();
    render(<RequestResetPasswordForm />);

    await user.type(screen.getByLabelText("Email"), "john@email.com");

    await user.click(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => {
      expect(mockRequestPasswordReset).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "john@email.com",
        }),
        expect.anything(), // Ignora os outros campos adicionais enviados pelo react-hook-form
      );
    });
  });

  it("Should disable the form button while the form is submited", () => {
    jest.mocked(useResetPassword).mockReturnValue({
      requestPasswordReset: mockRequestPasswordReset,
      resetPassword: jest.fn(),
      isLoading: true,
    });

    render(<RequestResetPasswordForm />);

    expect(screen.getByRole("button", { name: "Aguarde" })).toBeDisabled();
  });
});
