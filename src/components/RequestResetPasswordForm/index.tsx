"use client";

import { useResetPassword } from "@/hooks/use-reset-password";
import AuthButton from "../AuthButton";
import AuthLayout from "../AuthLayout";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { requestPasswordResetSchema } from "@/schemas/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { extractFormErrors } from "@/lib/extract-form-errors";

export default function RequestResetPasswordForm() {
  const { isLoading, requestPasswordReset } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requestPasswordResetSchema),
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
      title="Solicitar redefinição de senha"
      description="Informe o seu email"
    >
      <form
        onSubmit={(e) => void handleSubmit(requestPasswordReset)(e)}
        className="flex flex-col"
      >
        <Input
          labelText="Email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          {...register("email")}
          // required
        />

        <AuthButton text="Enviar" disabled={isLoading} />
      </form>
    </AuthLayout>
  );
}
