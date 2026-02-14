import Link from "next/link";
import Input from "../Input";
import AuthLayout from "../AuthLayout";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractFormErrors } from "@/lib/extract-form-errors";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/use-auth";
import AuthButton from "../AuthButton";

export default function RegisterForm() {
  const { registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    toast.dismiss();

    const errorMessages = extractFormErrors(errors);

    errorMessages.forEach((message) => {
      toast.error(message);
    });
  }, [errors]);

  return (
    <AuthLayout
      title="Bem-vindo!"
      description="Comece a controlar suas finanças hoje"
    >
      <form
        onSubmit={(e) => void handleSubmit(registerUser)(e)}
        className="flex flex-col"
      >
        <Input
          labelText="Nome"
          type="text"
          placeholder="Seu Nome"
          autoComplete="name"
          required
          {...register("name")}
        />

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
          autoComplete="new-password"
          required
          {...register("password")}
        />

        <Input
          labelText="Confirmar senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("confirmPassword")}
        />

        <AuthButton text="Criar" disabled={isLoading} />

        <Link href="/" className="self-center text-zinc-500 mt-5">
          já tem uma conta?{" "}
          <span className="font-semibold text-foreground">Entrar</span>
        </Link>
      </form>
    </AuthLayout>
  );
}
