/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "@/lib/api-client";
import { act, renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";
import { toast } from "react-toastify";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/lib/api-client");

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe("useAuth", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
  });

  describe("registerUser", () => {
    const validUserInput = {
      name: "John Doe",
      email: "john@email.com",
      password: "Password@123",
      confirmPassword: "Password@123",
    };

    it("Should redirect to '/?created=1' after registration", async () => {
      jest.mocked(apiClient).mockResolvedValue({
        data: {
          id: "1",
          name: "John Doe",
        },
        status: 200,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.registerUser(validUserInput);
      });

      expect(mockPush).toHaveBeenCalledWith("/?created=1");
    });

    it("Should show a toast with generic API error message when user already exists", async () => {
      jest.mocked(apiClient).mockResolvedValue({
        error: ["Falha ao criar o usuário. Verifique os dados fornecidos."],
        status: 400,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.registerUser(validUserInput);
      });

      expect(toast.dismiss).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(
        "Falha ao criar o usuário. Verifique os dados fornecidos.",
      );
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("Should show one toast per error when API returns multiple errors", async () => {
      jest.mocked(apiClient).mockResolvedValue({
        error: ["Usuário inválido", "Email inválido", "Senha inválida"],
        status: 400,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.registerUser(validUserInput);
      });

      expect(toast.dismiss).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenNthCalledWith(1, "Usuário inválido");
      expect(toast.error).toHaveBeenNthCalledWith(2, "Email inválido");
      expect(toast.error).toHaveBeenNthCalledWith(3, "Senha inválida");
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("Should show a generic error toast when an unexpected exception occurs", async () => {
      jest.mocked(apiClient).mockResolvedValue({
        error: [
          "Um erro inesperado inesperado ocorreu ao tentar criar o usuário. Tente mais tarde.",
        ],
        status: 500,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.registerUser(validUserInput);
      });

      expect(toast.dismiss).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(
        "Um erro inesperado inesperado ocorreu ao tentar criar o usuário. Tente mais tarde.",
      );
      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("loginUser", () => {
    const validUserInput = {
      email: "john@email.com",
      password: "Password@123",
    };

    it("Should redirect to '/dashboard' after login", async () => {
      jest.mocked(apiClient).mockResolvedValue({
        data: {
          message: "Login realizado com sucesso",
        },
        status: 200,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.loginUser(validUserInput);
      });

      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });

    it("Should show a toast with generic API error message when user dont exist", async () => {
      jest.mocked(apiClient).mockResolvedValue({
        error: ["Falha ao fazer login. Verifique suas credenciais."],
        status: 400,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.loginUser(validUserInput);
      });

      expect(toast.dismiss).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(
        "Falha ao fazer login. Verifique suas credenciais.",
      );
      expect(mockPush).not.toHaveBeenCalled();
    });

    it("Should show a generic error toast when an unexpected exception occurs", async () => {
      jest.mocked(apiClient).mockResolvedValue({
        error: [
          "Um erro inesperado ocorreu ao tentar fazer o login. Tente mais tarde.",
        ],
        status: 500,
      });

      const { result } = renderHook(() => useAuth());
      await act(async () => {
        await result.current.loginUser(validUserInput);
      });

      expect(toast.dismiss).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith(
        "Um erro inesperado ocorreu ao tentar fazer o login. Tente mais tarde.",
      );
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
