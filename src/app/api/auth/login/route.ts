import { ApiErrors } from "@/lib/api-client";
import { setAuthCookies } from "@/lib/cookies";
import { AuthTokens, LoginUserInput } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request: NextRequest) {
  // await simulateWait(5);
  const body = (await request.json()) as LoginUserInput;

  const backendResponse = await fetch(`${API_URL}/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!backendResponse.ok) {
    const backendResponseBody = (await backendResponse.json()) as ApiErrors;

    return NextResponse.json(
      { message: backendResponseBody.message },
      { status: backendResponse.status },
    );
  }

  const backendResponseBody = (await backendResponse.json()) as AuthTokens;

  await setAuthCookies(
    backendResponseBody.access_token,
    backendResponseBody.refresh_token,
  );

  return NextResponse.json({ message: "Login realizado com sucesso." });
}
