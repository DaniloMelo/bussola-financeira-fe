/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useActivateUser } from "@/hooks/use-activate-user";
import { render, screen, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import ActivateUserForm from "./page";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

jest.mock("@/hooks/use-activate-user");

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useSearchParams: jest.fn(),
}));

const mockUseSearchParams = useSearchParams as jest.Mock;

describe("ActivateUserForm", () => {
  const mockActivate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useActivateUser).mockReturnValue({
      activate: mockActivate,
      resend: jest.fn(),
      isLoading: false,
    });

    mockUseSearchParams.mockReturnValue(
      new URLSearchParams({
        email: "john@email.com",
      }),
    );
  });

  it("should render all form fields", () => {
    render(<ActivateUserForm />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ativar" })).toBeInTheDocument();

    const resendCodeButton = screen.getByRole("button", {
      name: "Reenviar",
    });
    expect(resendCodeButton).toBeInTheDocument();

    const linkElement = screen.getByRole("link", {
      name: "Voltar para login",
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("Should show error toast when user submit the form with some invalid field", async () => {
    const user = userEvent.setup();
    render(<ActivateUserForm />);

    await user.click(screen.getByRole("button", { name: "Ativar" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("Should call 'useResetPassword.resetPassword' with correct data", async () => {
    const user = userEvent.setup();
    render(<ActivateUserForm />);

    await user.type(screen.getByRole("textbox"), "123456");
    await user.click(screen.getByRole("button", { name: "Ativar" }));

    await waitFor(() => {
      expect(mockActivate).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "john@email.com",
          rawCode: "123456",
        }),
      );
    });
  });

  it("Should disable the form button while the form is submited", () => {
    jest.mocked(useActivateUser).mockReturnValue({
      activate: mockActivate,
      resend: jest.fn(),
      isLoading: true,
    });

    render(<ActivateUserForm />);

    expect(screen.getByRole("button", { name: "Aguarde" })).toBeDisabled();
  });
});
