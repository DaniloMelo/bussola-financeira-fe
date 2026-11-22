/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiServer } from "@/lib/api-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.date) {
    return NextResponse.json(
      { message: ["A data é obrigatória"] },
      { status: 400 },
    );
  }

  const result = await apiServer<{ message: string }>("/v1/admin/application", {
    method: "POST",
    body: JSON.stringify({ date: body.date }),
    redirectOnAuthError: false,
  });

  if ("error" in result) {
    const messages = Array.isArray(result.error)
      ? result.error
      : [result.error];
    return NextResponse.json({ message: messages }, { status: result.status });
  }

  return NextResponse.json(result.data, { status: 200 });
}
