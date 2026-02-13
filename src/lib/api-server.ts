import { redirect } from "next/navigation";
import { getAccessToken } from "./cookies";
import { User } from "@/types/user";

const API_URL = process.env.API_URL;

/**
 * Faz requisições autenticadas para o backend
 * O middleware já garantiu que temos tokens válidos/renovados
 *
 * @param endpoint Rota do endpoint
 * @param options (Opcional) Opções como 'method', 'headers' e etc para o fetch
 */
export async function fetchProtected(endpoint: string, options?: RequestInit) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    redirect("/");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options?.headers,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    redirect("/");
  }

  return response;
}

/**
 * Retorna o usuário autenticado ou redireciona para o login.
 * Útil para proteger páginas/rotas.
 *
 * @returns Dados do usuário autenticado
 */
export async function requireAuthenticatedUser(): Promise<User> {
  const response = await fetchProtected(`/v1/user/me`);

  if (!response.ok) {
    redirect("/");
  }

  const user = (await response.json()) as User;
  return user;
}
