"use client";

import AuthButton from "../AuthButton";
import AuthLayout from "../AuthLayout";
import Input from "../Input";

export default function RequestResetPasswordForm() {
  return (
    <AuthLayout
      title="Solicitar redefinição de senha"
      description="Se houver um cadastro de usuário válido, receberá um email com instruções para redefinir sua senha"
    >
      <form className="flex flex-col">
        <Input
          labelText="Email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          // required
        />

        <AuthButton text="Enviar" />
      </form>
    </AuthLayout>
  );
}
