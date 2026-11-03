import { ApiErrors } from "@/lib/api-client";
import { RequestResetPasswordInput } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RequestResetPasswordInput;

  const backendResponse = await fetch(
    `${API_URL}/v1/auth/request-reset-password`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!backendResponse.ok) {
    const backendResponseBody = (await backendResponse.json()) as ApiErrors;

    return NextResponse.json(
      { message: backendResponseBody.message },
      { status: backendResponse.status },
    );
  }

  const backendResponseBody = (await backendResponse.json()) as {
    message: string;
  };

  return NextResponse.json(backendResponseBody, { status: 200 });
}
