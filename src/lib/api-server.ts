import { redirect } from "next/navigation";
import { getAccessToken } from "./cookies";
import { User } from "@/types/user";
import { ApiErrors, ErrorResponse, SuccessResponse } from "./api-client";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const API_URL = process.env.API_URL;

/**
 * Faz requisições autenticadas para o backend
 *
 * O middleware já garantiu que temos tokens válidos/renovados
 *
 * @param endpoint Rota do endpoint
 * @param options (Opcional) Opções como 'method', 'headers' e etc para o fetch
 */
export async function apiServer<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<SuccessResponse<T> | ErrorResponse> {
  try {
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

    if (response.status === 401 || response.status === 403) {
      redirect("/");
    }

    if (!response.ok) {
      const body = (await response.json()) as ApiErrors;
      return {
        error: body.message,
        status: response.status,
      };
    }

    const body = (await response.json()) as T;

    return {
      data: body,
      status: response.status,
    };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      error: ["Erro de conexão com o servidor"],
      status: 500,
    };
  }
}

/**
 * Retorna o usuário autenticado ou redireciona para o login.
 * Útil para proteger páginas/rotas.
 *
 * @returns Dados do usuário autenticado
 */
export async function requireAuthenticatedUser(): Promise<User> {
  const response = await apiServer<User>(`/v1/user/me`);

  if (response.error) {
    redirect("/");
  }

  return response.data;
}

export async function requireAdminRole() {
  const user = await requireAuthenticatedUser();

  const roles = user.roles.map((role) => role.name);

  if (!roles.includes("ADMIN")) {
    redirect("/");
  }

  return user;
}
