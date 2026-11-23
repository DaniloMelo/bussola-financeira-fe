import { ErrorResponse, SuccessResponse } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function useUpstashCounter() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function updateCounter() {
    try {
      setIsLoading(true);

      const response = await fetch("/api/admin/application/upstash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: new Date().toISOString() }),
      });

      if (!response.ok) {
        const errorResponse = (await response.json()) as ErrorResponse;

        toast.dismiss();
        errorResponse.error.forEach((err) => {
          toast.error(err);
        });
      }

      const successResponse = (await response.json()) as SuccessResponse<{
        message: string;
      }>;

      router.refresh();

      toast.dismiss();
      toast.success(successResponse.data.message);
    } catch (error) {
      if (process.env.NODE_ENV != "production") {
        console.error("useUpstashCounter.updateCounter hook failed:", error);
      }

      toast.error(
        "Um erro inesperado ocorreu ao tentar atualizar contador Upstash. Tente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, updateCounter };
}
