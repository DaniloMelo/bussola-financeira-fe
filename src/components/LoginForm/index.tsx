import Link from "next/link";
import Input from "../Input";
import AuthLayout from "../AuthLayout";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractFormErrors } from "@/lib/extract-form-errors";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import AuthButton from "../AuthButton";

export default function LoginForm() {
  const { loginUser, isLoading } = useAuth();

  console.log(isLoading);

  const router = useRouter();
  const searchParams = useSearchParams();
  const createdUserQueryString = searchParams.get("created");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    toast.dismiss();
    const errorMessages = extractFormErrors(errors);
    errorMessages.forEach((error) => {
      toast.error(error);
    });
  }, [errors]);

  useEffect(() => {
    if (createdUserQueryString === "1") {
      toast.success("Usuário criado! Faça login para continuar.");
      const url = new URL(window.location.href);
      url.searchParams.delete("created");
      router.replace(url.toString());
    }
  }, [createdUserQueryString, router]);

  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      description="Faça login para acessar sua conta"
    >
      <form
        onSubmit={(e) => void handleSubmit(loginUser)(e)}
        className="flex flex-col"
      >
        <Input
          labelText="Email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          required
          {...register("email")}
        />

        <Input
          labelText="Senha"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          {...register("password")}
        />

        <AuthButton text="Entrar" disabled={isLoading} />

        <Link href="/register" className="self-center text-zinc-500 mt-5">
          Ainda não tem uma conta?{" "}
          <span className="font-semibold text-foreground">Criar</span>
        </Link>
      </form>
    </AuthLayout>
  );
}
