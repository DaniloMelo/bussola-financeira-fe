import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { AuthTokens, JwtPayload } from "./types/auth";

const protectedRoutes = ["/dashboard", "/profile", "/admin"];
const authRoutes = ["/", "/register"];

const API_URL = process.env.API_URL!;
const ACCESS_TOKEN_NAME = process.env.ACCESS_TOKEN_COOKIE_NAME!;
const ACCESS_TOKEN_EXP = process.env.ACCESS_TOKEN_EXP!;
const REFRESH_TOKEN_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME!;
const REFRESH_TOKEN_EXP = process.env.REFRESH_TOKEN_EXP!;
const EXP_SAFETY_MARGIN_IN_SECONDS = 30;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_TOKEN_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_NAME)?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthRoute && accessToken && refreshToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const needsRefresh = isTokenExpiredOrExpiring(accessToken);
  if (needsRefresh && refreshToken) {
    const newTokens = await refreshTokens(refreshToken);
    if (!newTokens) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete(ACCESS_TOKEN_NAME);
      response.cookies.delete(REFRESH_TOKEN_NAME);

      return response;
    }

    const response = NextResponse.next();
    response.cookies.set(ACCESS_TOKEN_NAME, newTokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // maxAge: 60 * 15,'
      maxAge: Number(ACCESS_TOKEN_EXP),
    });

    response.cookies.set(REFRESH_TOKEN_NAME, newTokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // maxAge: 60 * 60 * 24 * 7,
      maxAge: Number(REFRESH_TOKEN_EXP),
    });

    return response;
  }

  return NextResponse.next();
}

function isTokenExpiredOrExpiring(accessToken: string | undefined): boolean {
  if (!accessToken) {
    return true;
  }

  try {
    const payload = jwtDecode<JwtPayload>(accessToken);
    const nowInSeconds = Math.floor(Date.now() / 1000);

    return payload.exp < nowInSeconds + EXP_SAFETY_MARGIN_IN_SECONDS;
  } catch {
    return true;
  }
}

async function refreshTokens(refreshToken: string): Promise<AuthTokens | null> {
  try {
    const response = await fetch(`${API_URL}/v1/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${refreshToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json() as unknown as AuthTokens;
  } catch {
    return null;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
