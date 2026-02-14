export type ApiErrors = {
  message: string[];
};

type ErrorResponse = {
  data?: never;
  error: string[];
  status: number;
};

type SuccessResponse<T> = {
  data: T;
  error?: never;
  status: number;
};

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<SuccessResponse<T> | ErrorResponse> {
  try {
    const response = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

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
  } catch {
    return {
      error: ["Erro de conexão com o servidor"],
      status: 500,
    };
  }
}
