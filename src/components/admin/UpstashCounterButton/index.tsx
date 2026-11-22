"use client";
import { useUpstashCounter } from "@/hooks/use-upstash-counter";

export function UpstashCounterButton() {
  const { isLoading, updateCounter } = useUpstashCounter();

  return (
    <button
      onClick={() => void updateCounter()}
      disabled={isLoading}
      className="py-2 px-4 rounded-md text-lg bg-blue-500 hover:bg-blue-700 text-white cursor-pointer my-5"
    >
      {isLoading ? "Enviando..." : "Atualizar contador Upstash"}
    </button>
  );
}
