"use client";

import { useForm } from "react-hook-form";
import AuthLayout from "../AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { activateUserSchema } from "@/schemas/activate-user";
import AuthButton from "../AuthButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { extractFormErrors } from "@/lib/extract-form-errors";

export default function ActivateUserForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const emailParam = searchParams.get("email")!;
  console.log(emailParam);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activateUserSchema),
  });

  useEffect(() => {
    if (emailParam) {
      toast.dismiss();
      toast.success("Usuário criado!");
      toast.success("Código de ativação enviado para o seu e-mail.");

      // const url = new URL(window.location.href);
      // url.searchParams.delete("email");
      // router.replace(url.toString());
    }
  }, [emailParam, router]);

  useEffect(() => {
    toast.dismiss();
    const errorMessages = extractFormErrors(errors);
    errorMessages.forEach((error) => {
      toast.error(error);
    });
  }, [errors]);

  function onSubmit() {}

  return (
    <AuthLayout
      title="Ativar usuário"
      description="Informe o código para ativar o seu usuário"
    >
      <form
        onSubmit={() => handleSubmit(onSubmit)}
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

        <AuthButton text="Ativar" />
      </form>
    </AuthLayout>
  );
}
