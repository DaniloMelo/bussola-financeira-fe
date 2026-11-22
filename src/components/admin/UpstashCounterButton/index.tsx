/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function UpstashCounterButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/application/upstash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: new Date().toISOString() }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Sessão expirada: avisa e manda para o login
        if (response.status === 401) {
          toast.error("Sua sessão expirou. Faça login novamente.");
          router.push("/");
          return;
        }

        // Demais erros: mostra cada mensagem
        const messages: string[] = Array.isArray(data?.message)
          ? data.message
          : [data?.message ?? "Erro inesperado"];

        messages.forEach((msg) => toast.error(msg));
        return;
      }

      toast.success(data?.message ?? "Contador atualizado!");
    } catch {
      // fetch só lança exceção em falha de REDE (offline, servidor fora do ar)
      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false); // roda sempre, com sucesso ou erro
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="py-2 px-4 rounded-md text-lg bg-blue-500 hover:bg-blue-700 text-white cursor-pointer my-5"
    >
      {isLoading ? "Enviando..." : "Atualizar contador Upstash"}
    </button>
  );
}
