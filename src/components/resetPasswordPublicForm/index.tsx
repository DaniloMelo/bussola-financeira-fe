"use client";

import AuthButton from "../AuthButton";
import AuthLayout from "../AuthLayout";
import Input from "../Input";

export default function ResetPasswordPublicForm() {
  return (
    <AuthLayout title="Redefinir senha" description="Informe a sua nova senha">
      <form className="flex flex-col">
        <Input
          labelText="Senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          // required
        />

        <Input
          labelText="Confirmar senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <AuthButton text="Alterar" />
      </form>
    </AuthLayout>
  );
}
