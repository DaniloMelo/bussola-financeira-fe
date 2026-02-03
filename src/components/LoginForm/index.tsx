import Link from "next/link";
import Input from "../Input";
import AuthLayout from "../AuthLayout";

export default function LoginForm() {
  return (
    <AuthLayout
      title="Bem-vindo de volta!"
      description="Faça login para acessar sua conta"
    >
      <form className="flex flex-col">
        <Input
          labelText="Email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
        />

        <Input
          labelText="Senha"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
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
