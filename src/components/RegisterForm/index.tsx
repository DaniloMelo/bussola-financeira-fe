import Link from "next/link";
import AuthForm from "../AuthForm";
import InputText from "../ImputText";

export default function RegisterForm() {
  return (
    <AuthForm title="Bem vindo!" description="Crie uma conta para começar">
      <InputText type="text" labelText="Nome" />
      <InputText type="email" labelText="Email" />
      <InputText type="password" labelText="Senha" />

      <button className="cursor-pointer bg-blue-500 hover:bg-blue-800 text-white rounded-sm mt-4 p-1 font-semibold">
        Entrar
      </button>

      <Link href="/" className="self-center text-zinc-500 mt-5">
        já tem uma conta?{" "}
        <span className="font-semibold text-black">Entrar</span>
      </Link>
    </AuthForm>
  );
}
