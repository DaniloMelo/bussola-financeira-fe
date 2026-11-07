"use client";

import { useForm, useWatch } from "react-hook-form";
import AuthButton from "../AuthButton";
import AuthLayout from "../AuthLayout";
import Input from "../Input";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordStrength from "../PasswordStrength";
import { resetPasswordSchema } from "@/schemas/reset-password";
import { useResetPassword } from "@/hooks/use-reset-password";
import Link from "next/link";
import { toast } from "react-toastify";
import { extractFormErrors } from "@/lib/extract-form-errors";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPublicForm() {
  const searchParams = useSearchParams();
  const { isLoading, resetPassword } = useResetPassword();

  const rawToken = searchParams.get("token")!;
  const email = searchParams.get("email")!;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const passwordValue = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  useEffect(() => {
    toast.dismiss();

    const errorMessages = extractFormErrors(errors);

    errorMessages.forEach((message) => {
      toast.error(message);
    });
  }, [errors]);

  async function onSubmit(data: { password: string; confirmPassword: string }) {
    // Essa função intermediária entre handleSubmit (RHF) e resetPassword,
    // foi necessária para passar as query strings para a função resetPassword,
    // pois somente aqui no componente temos acesso a URL correta.
    console.log("FUNÇÃO ONSUBMIT", data);
    await resetPassword({
      ...data,
      rawToken,
      email,
    });
  }

  return (
    <AuthLayout title="Redefinir senha" description="Informe a sua nova senha">
      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="flex flex-col"
      >
        <Input
          labelText="Senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("password")}
          // required
        />

        <Input
          labelText="Confirmar senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          {...register("confirmPassword")}
          // required
        />

        {passwordValue && <PasswordStrength password={passwordValue} />}

        <AuthButton text="Alterar" disabled={isLoading} />

        <Link href="/" className="self-center text-zinc-500 mt-5">
          Voltar para{" "}
          <span className="font-semibold text-primary-text dark:text-primary-text">
            login
          </span>
        </Link>
      </form>
    </AuthLayout>
  );
}
