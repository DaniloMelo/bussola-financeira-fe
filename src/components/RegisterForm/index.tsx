import Link from "next/link";
import InputText from "../ImputText";
import AuthLayout from "../AuthLayout";

export default function RegisterForm() {
  return (
    <AuthLayout
      title="Bem-vindo!"
      description="Comece a controlar suas finanças hoje"
    >
      <form className="flex flex-col">
        <InputText
          labelText="Nome"
          type="text"
          placeholder="Seu Nome"
          autoComplete="name"
        />

        <InputText
          labelText="Email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
        />

        <InputText
          labelText="Senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <InputText
          labelText="Confirmar senha"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <button className="cursor-pointer bg-blue-500 hover:bg-blue-800 text-white rounded-sm mt-4 p-1 font-semibold">
          Entrar
        </button>

        <Link href="/" className="self-center text-zinc-500 mt-5">
          já tem uma conta?{" "}
          <span className="font-semibold text-foreground">Entrar</span>
        </Link>
      </form>
    </AuthLayout>
  );
}
