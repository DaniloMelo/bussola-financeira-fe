"use client";

import { useForm } from "react-hook-form";
import AuthLayout from "../AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { activateUserSchema } from "@/schemas/activate-user";
import AuthButton from "../AuthButton";
import { /*useRouter*/ useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { extractFormErrors } from "@/lib/extract-form-errors";
import { useActivateUser } from "@/hooks/use-activate-user";
import Link from "next/link";

export default function ActivateUserForm() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const emailParam = searchParams.get("email")!;

  const { isLoading, activate, resend } = useActivateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activateUserSchema),
  });

  useEffect(() => {
    toast.dismiss();
    const errorMessages = extractFormErrors(errors);
    errorMessages.forEach((error) => {
      toast.error(error);
    });
  }, [errors]);

  useEffect(() => {
    if (emailParam) {
      toast.dismiss();
      toast.success("Usuário criado!");
      toast.success("Código de ativação enviado para o seu e-mail.");

      // const url = new URL(window.location.href);
      // url.searchParams.delete("email");
      // router.replace(url.toString());
    }
  }, [emailParam]);

  function onSubmit(data: { rawCode: string }) {
    // Essa função intermediária entre handleSubmit (RHF) e resetPassword,
    // foi necessária para passar as query strings para a função resetPassword,
    // pois somente aqui no componente temos acesso a URL correta.
    return activate({
      ...data,
      email: emailParam,
    });
  }

  return (
    <AuthLayout
      title="Ativar usuário"
      description="Informe o código para ativar o seu usuário"
    >
      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="flex flex-col items-center-safe"
      >
        <input
          className="
            border-b-2 border-zinc-500 text-3xl tracking-[1em] font-bold outline-none
            mt-10 mb-20 placeholder:text-zinc-300 dark:placeholder:text-zinc-800 w-80 pl-8"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          {...register("rawCode")}
        />

        <AuthButton text="Ativar" disabled={isLoading} />

        <span
          onClick={() => void resend({ email: emailParam })}
          className="self-center text-zinc-500 mt-5 cursor-pointer"
        >
          Não recebeu o código no e-email?{" "}
          <button
            type="button"
            className="font-semibold cursor-pointer text-primary-text dark:text-primary-text"
          >
            Reenviar
          </button>
        </span>

        <Link
          href={"/"}
          className="mt-2 self-center text-secondary-text dark:text-secondary-text"
        >
          Voltar para{" "}
          <span className="font-semibold text-primary-text dark:text-primary-text">
            login
          </span>
        </Link>
      </form>
    </AuthLayout>
  );
}
