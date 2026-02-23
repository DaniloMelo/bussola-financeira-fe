import { clearAuthTokens, getAccessToken } from "@/lib/cookies";

import {} from "@/types/user";
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    await clearAuthTokens();
    return NextResponse.json({ message: "Logout realizado com sucesso" });
  }

  await fetch(`${API_URL}/v1/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  await clearAuthTokens();

  return NextResponse.json({ message: "Logout realizado com sucesso" });
}
