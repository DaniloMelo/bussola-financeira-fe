/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { ApiRequestError } from "./custom-errors";
import { AuthTokens } from "@/types/auth";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable not defined.");
}

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export async function createApiClient() {
  const cookieStore = await cookies();

  const api = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const accessToken = process.env.ACCESS_TOKEN_COOKIE;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequest;

      if (!originalRequest || originalRequest._retry) {
        return Promise.reject(transformError(error));
      }

      const isUnauthorized = error.response?.status === 401;
      const isRefreshRoute = originalRequest.url?.includes("/auth/refresh");

      if (!isUnauthorized || isRefreshRoute) {
        return Promise.reject(transformError(error));
      }

      const refreshToken = cookieStore.get("refresh_token")?.value;

      if (!refreshToken) {
        return Promise.reject(new ApiRequestError("Sessão expirada", 401));
      }

      try {
        originalRequest._retry = true;

        const refreshResponse = await axios.post(
          `${API_URL}/v1/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        const { access_token, refresh_token } =
          refreshResponse.data as AuthTokens;

        cookieStore.set("access_token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 15,
        });

        cookieStore.set("refresh_token", refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch {
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");

        return Promise.reject(
          new ApiRequestError("Sessão expirada. Faça login novamente.", 401),
        );
      }
    },
  );

  return api;
}

function transformError(error: AxiosError): ApiRequestError {
  if (error.response) {
    const data = error.response.data as { message?: string };
    return new ApiRequestError(
      data?.message || "Erro na requisição",
      error.response.status,
      data,
    );
  }

  if (error.code === "ECONNABORTED") {
    return new ApiRequestError("Requisição expirou", 408);
  }

  return new ApiRequestError("Erro de conexão com o servidor", 500);
}
