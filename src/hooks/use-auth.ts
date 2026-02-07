import { apiClient } from "@/lib/api-client";
import { LoginUserInput, RegisterUserInput } from "@/types/auth";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function registerUser(data: RegisterUserInput) {
    setIsLoading(true);

    try {
      const { name, email, password } = data;

      const response = await apiClient<User>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      console.log(response);

      if (response.error) {
        toast.dismiss();
        response.error.forEach((err: string) => {
          toast.error(err);
        });
        return;
      }

      router.push("/?created=1");
      return true;
    } catch (error: unknown) {
      if (process.env.NODE_ENV != "production") {
        console.error("useAuth.registerUser hook failed:", error);
      }

      toast.error(
        "Um erro inesperado inesperado ocorreu ao tentar criar o usuário. Tente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function loginUser(data: LoginUserInput) {
    setIsLoading(true);

    try {
      const { email, password } = data;

      const response = await apiClient<{ message: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.error) {
        toast.dismiss();
        response.error.forEach((err: string) => {
          toast.error(err);
        });
        return;
      }

      router.push("/teste");
    } catch (error: unknown) {
      if (process.env.NODE_ENV != "production") {
        console.error("useAuth.loginUser hook failed:", error);
      }

      toast.error(
        "Um erro inesperado ocorreu ao tentar fazer o login. Tente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { registerUser, loginUser, isLoading };
}
