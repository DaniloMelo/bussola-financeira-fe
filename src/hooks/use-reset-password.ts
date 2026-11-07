import { apiClient } from "@/lib/api-client";
import {
  RequestResetPasswordInput,
  ResetPasswordPublicInput,
} from "@/types/reset-password";

import { useState } from "react";
import { toast } from "react-toastify";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function requestPasswordReset(data: RequestResetPasswordInput) {
    setIsLoading(true);

    try {
      const { email } = data;

      const response = await apiClient<{ message: string }>(
        "/api/auth/request-reset-password",
        {
          method: "POST",
          body: JSON.stringify({ email }),
        },
      );

      if (response.error) {
        toast.dismiss();
        response.error.forEach((err: string) => {
          toast.error(err);
        });
        return;
      }

      toast.dismiss();
      toast.success(response.data.message);

      // return true;
    } catch (error: unknown) {
      if (process.env.NODE_ENV != "production") {
        console.error(
          "useResetPassword.requestPasswordReset hook failed:",
          error,
        );
      }

      toast.error(
        "Um erro inesperado ocorreu ao tentar solicitar o reset de senha. Tente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(data: ResetPasswordPublicInput) {
    setIsLoading(true);

    console.log("HOOK ==> ", data);

    try {
      const { password, email, rawToken } = data;

      const response = await apiClient<{ message: string }>(
        "/api/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify({ password, email, rawToken }),
        },
      );

      if (response.error) {
        toast.dismiss();
        response.error.forEach((err: string) => {
          toast.error(err);
        });
        return;
      }

      toast.dismiss();
      toast.success(response.data.message);
    } catch (error: unknown) {
      if (process.env.NODE_ENV != "production") {
        console.error("useResetPassword.resetPassword hook failed:", error);
      }

      toast.error(
        "Um erro inesperado ocorreu ao tentar executar o reset de senha. Tente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, requestPasswordReset, resetPassword };
}
