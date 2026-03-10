/* eslint-disable @next/next/no-img-element */

import { useAuth } from "@/hooks/use-auth";
import LoginForm from ".";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/hooks/use-auth");

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe("LoginForm", () => {
  const mockLoginUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useAuth).mockReturnValue({
      registerUser: jest.fn(),
      loginUser: mockLoginUser,
      logoutUser: jest.fn(),
      isLoading: false,
    });
  });

  it("Should render all form fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it("Should show error toast when user submit the form with some invalid field", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("Should call 'useAuth.registerUser' with correct data", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "john@email.com");
    await user.type(screen.getByLabelText("Senha"), "Password@123");

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "john@email.com",
          password: "Password@123",
        }),
        expect.anything(), // Ignora os outros campos adicionais enviados pelo react-hook-form
      );
    });
  });

  it("Should disable the form button while the form is submited", () => {
    jest.mocked(useAuth).mockReturnValue({
      registerUser: jest.fn(),
      loginUser: mockLoginUser,
      logoutUser: jest.fn(),
      isLoading: true,
    });

    render(<LoginForm />);

    expect(screen.getByRole("button", { name: "Aguarde" })).toBeDisabled();
  });
});
