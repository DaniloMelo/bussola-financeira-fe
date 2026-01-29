import Link from "next/link";
import AuthForm from "../AuthForm";
import InputText from "../ImputText";

export default function LoginForm() {
  return (
    <AuthForm
      title="Bem vindo de volta!"
      description="Faça login para ver suas finanças"
    >
      <InputText type="email" labelText="Email" />
      <InputText type="password" labelText="Senha" />

      <Link href="#" className="text-right text-sm font-semibold">
        Esqueceu sua senha?
      </Link>

      <button className="cursor-pointer bg-blue-500 hover:bg-blue-800 text-white rounded-sm mt-4 p-1 font-semibold">
        Entrar
      </button>

      <Link href="/register" className="self-center text-zinc-500 mt-5">
        Ainda não tem uma conta?{" "}
        <span className="font-semibold text-black">Criar</span>
      </Link>
    </AuthForm>
  );
}
