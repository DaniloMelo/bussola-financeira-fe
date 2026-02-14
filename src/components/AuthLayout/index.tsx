import Image from "next/image";

type RegisterFormProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  description,
  children,
}: RegisterFormProps) {
  return (
    <main className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <header className="text-center mb-6">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {title}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              {description}
            </p>
          </header>

          {children}
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src="/images/jouwen-wang-qJ9FwIQgLHI-unsplash.jpg"
          alt="Imagem decorativa"
          fill
          className="object-cover object-center"
          priority
        />

        {/* // TODO: Verificar se o overlay abaixo será necesário quando usar a imagem da app */}
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" /> */}

        <div className="absolute bottom-10 left-10 right-10 text-white">
          <h2 className="text-3xl font-bold mb-2">Controle suas finanças</h2>
          <p className="text-zinc-200">
            Organize seus gastos, acompanhe seus investimentos e alcance seus
            objetivos financeiros.
          </p>
        </div>
      </div>
    </main>
  );
}
