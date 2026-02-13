import getEnv from "@/utils/get-env";
import { cookies } from "next/headers";

export interface CookiesOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
  maxAge?: number;
}

const defaultOptions: CookiesOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

const ACCESS_TOKEN_NAME = getEnv("ACCESS_TOKEN_COOKIE_NAME");
const ACCESS_TOKEN_EXP = getEnv("ACCESS_TOKEN_EXP");
const REFRESH_TOKEN_NAME = getEnv("REFRESH_TOKEN_COOKIE_NAME");
const REFRESH_TOKEN_EXP = getEnv("REFRESH_TOKEN_EXP");

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_NAME, accessToken, {
    ...defaultOptions,
    maxAge: Number(ACCESS_TOKEN_EXP),
  });

  cookieStore.set(REFRESH_TOKEN_NAME, refreshToken, {
    ...defaultOptions,
    maxAge: Number(REFRESH_TOKEN_EXP),
  });
}

export async function clearAuthTokens(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_NAME);
  cookieStore.delete(REFRESH_TOKEN_NAME);
}

export async function clearAccessToken(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_NAME);
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookeStore = await cookies();
  return cookeStore.get(ACCESS_TOKEN_NAME)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookeStore = await cookies();
  return cookeStore.get(REFRESH_TOKEN_NAME)?.value;
}
