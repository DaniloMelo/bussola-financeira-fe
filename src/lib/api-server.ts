import "server-only";
import { redirect } from "next/navigation";
import { getAccessToken } from "./cookies";
import { User } from "@/types/user";
import { ApiErrors, ErrorResponse, SuccessResponse } from "./api-client";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const API_URL = process.env.API_URL;

type ApiServerOptions = RequestInit & {
  /** true (padrão): redireciona para "/" em 401/403.
   *  false: devolve um ErrorResponse (use em Route Handlers). */
  redirectOnAuthError?: boolean;
};

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
  options: ApiServerOptions = {},
): Promise<SuccessResponse<T> | ErrorResponse> {
  const { redirectOnAuthError = true, ...fetchOptions } = options;

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      if (redirectOnAuthError) redirect("/");
      return { error: ["Você não está autenticado"], status: 401 };
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...fetchOptions.headers,
      },
      cache: "no-store",
    });

    if (response.status === 401 || response.status === 403) {
      if (redirectOnAuthError) redirect("/");
      return {
        error: [
          response.status === 401
            ? "Sessão expirada"
            : "Você não tem permissão para esta ação",
        ],
        status: response.status,
      };
    }

    if (!response.ok) {
      // .catch evita quebrar se o corpo não for JSON
      const body = (await response
        .json()
        .catch(() => null)) as ApiErrors | null;
      return {
        error: body?.message ?? ["Erro inesperado no servidor"],
        status: response.status,
      };
    }

    const body = (await response.json()) as T;
    return { data: body, status: response.status };
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;

    console.error("[apiServer] falha ao chamar", endpoint, error);

    return { error: ["Erro de conexão com o servidor"], status: 500 };
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
