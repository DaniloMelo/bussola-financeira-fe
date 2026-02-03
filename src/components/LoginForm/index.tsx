/* eslint-disable @typescript-eslint/no-misused-promises */

import Link from "next/link";
import Input from "../Input";
import AuthLayout from "../AuthLayout";
import { useForm } from "react-hook-form";
import { loginFormData, loginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractFormErrors } from "@/lib/extract-form-errors";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function LoginForm() {
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

  function loginUser(data: loginFormData) {
    console.log(data);
  }

  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      description="Faça login para acessar sua conta"
    >
      <form onSubmit={handleSubmit(loginUser)} className="flex flex-col">
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

        <button className="cursor-pointer bg-blue-500 hover:bg-blue-800 text-white rounded-sm mt-4 p-1 font-semibold">
          Entrar
        </button>

        <Link href="/register" className="self-center text-zinc-500 mt-5">
          Ainda não tem uma conta?{" "}
          <span className="font-semibold text-foreground">Criar</span>
        </Link>
      </form>
    </AuthLayout>
  );
}
