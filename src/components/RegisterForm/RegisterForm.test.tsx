/* eslint-disable @next/next/no-img-element */

import { useAuth } from "@/hooks/use-auth";
import { render, screen, waitFor } from "@testing-library/react";
import RegisterForm from ".";
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

describe("RegisterForm", () => {
  const mockRegisterUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useAuth).mockReturnValue({
      registerUser: mockRegisterUser,
      loginUser: jest.fn(),
      logoutUser: jest.fn(),
      isLoading: false,
    });
  });

  it("Should render all form fields", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Criar" })).toBeInTheDocument();
  });

  it("Should show password strength when the user enters the password", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    expect(screen.queryByText(/Força da senha:/i)).not.toBeInTheDocument();

    await user.type(screen.getByLabelText("Senha"), "Password@123");

    expect(screen.getByText(/Força da senha:/i)).toBeInTheDocument();
  });

  it("Should show error toast when user submit the form with some invalid field", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: "Criar" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("Should call 'useAuth.registerUser' with correct data", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Nome"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@email.com");
    await user.type(screen.getByLabelText("Senha"), "Password@123");
    await user.type(screen.getByLabelText("Confirmar senha"), "Password@123");

    await user.click(screen.getByRole("button", { name: "Criar" }));

    await waitFor(() => {
      expect(mockRegisterUser).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "John Doe",
          email: "john@email.com",
          password: "Password@123",
          confirmPassword: "Password@123",
        }),
        expect.anything(), // Ignora os outros campos adicionais enviados pelo react-hook-form
      );
    });
  });

  it("Should disable the form button while the form is submited", () => {
    jest.mocked(useAuth).mockReturnValue({
      registerUser: mockRegisterUser,
      loginUser: jest.fn(),
      logoutUser: jest.fn(),
      isLoading: true,
    });

    render(<RegisterForm />);

    expect(screen.getByRole("button", { name: "Aguarde" })).toBeDisabled();
  });
});
