/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export async function fetchWithAuth(endpoint: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options?.headers,
    },
  });

  if (response.status !== 401) {
    return response;
  }

  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return response;
  }

  const refreshResponse = await fetch(`${API_URL}/v1/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }),
      ...options?.headers,
    },
  });

  if (!refreshResponse.ok) {
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    return response;
  }

  const newTokens = await response.json();

  cookieStore.set("access_token", newTokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  cookieStore.set("refresh_token", newTokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${newTokens.access_token}`,
      ...options?.headers,
    },
  });
}
