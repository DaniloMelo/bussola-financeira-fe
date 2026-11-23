import { apiServer } from "@/lib/api-server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { date: string };

  const backendResponse = await apiServer<{ message: string }>(
    "/v1/admin/application",
    {
      method: "POST",
      body: JSON.stringify({ date: body.date }),
    },
  );

  if (backendResponse.error) {
    return NextResponse.json(
      { errors: backendResponse.error },
      { status: backendResponse.status },
    );
  }

  return NextResponse.json(backendResponse, { status: 200 });
}
