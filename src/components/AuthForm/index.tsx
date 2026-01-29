// import Link from "next/link";
// import InputText from "../ImputText";
import Image from "next/image";
// import { Children } from "react";

type RegisterFormProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthForm({
  title,
  description,
  children,
}: RegisterFormProps) {
  return (
    <main className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <form action="" className="flex flex-col w-xl p-6">
          <h1 className="text-3xl text-center font-bold">{title}</h1>
          <p className="text-center text-zinc-500 mb-4">{description}</p>

          {/* <InputText type="text" labelText="Nome" />
          <InputText type="email" labelText="Email" />
          <InputText type="password" labelText="Senha" />

          <button className="cursor-pointer bg-blue-500 hover:bg-blue-800 text-white rounded-sm mt-4 p-1 font-semibold">
            Entrar
          </button>

          <Link href="#" className="self-center text-zinc-500 mt-5">
            Ainda não tem uma conta?{" "}
            <span className="font-semibold text-black">Criar</span>
          </Link> */}

          {children}
        </form>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src="/images/jouwen-wang-qJ9FwIQgLHI-unsplash.jpg"
          alt="dev"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </main>
  );
}
