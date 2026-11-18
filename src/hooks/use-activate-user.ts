import { apiClient } from "@/lib/api-client";
import { ActivateUserData, ResendActivationCode } from "@/types/activate-user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function useActivateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function activate(data: ActivateUserData) {
    setIsLoading(true);

    try {
      const { rawCode, email } = data;

      const response = await apiClient<{ message: string }>(
        "/api/auth/activate-user",
        {
          method: "POST",
          body: JSON.stringify({ rawCode, email }),
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

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      if (process.env.NODE_ENV != "production") {
        console.error("activate-user.activate hook failed:", error);
      }

      toast.error(
        "Um erro inesperado ocorreu ao tentar ativar o usuário. Tente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function resend(data: ResendActivationCode) {
    setIsLoading(true);

    try {
      const { email } = data;

      const response = await apiClient<{ message: string }>(
        "/api/auth/resend-activation-code",
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
    } catch (error) {
      if (process.env.NODE_ENV != "production") {
        console.error("activate-user.resend hook failed:", error);
      }

      toast.error(
        "Um erro inesperado ocorreu ao tentar reenviar o código. Tente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, activate, resend };
}
