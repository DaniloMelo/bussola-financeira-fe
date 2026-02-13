import { ApiErrors } from "@/lib/api-client";
import { RegisterUserInput } from "@/types/auth";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RegisterUserInput;

  const backendResponse = await fetch(`${API_URL}/v1/user`, {
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

  const backendResponseBody = (await backendResponse.json()) as User;

  return NextResponse.json(backendResponseBody, { status: 201 });
}
