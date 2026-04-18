import { NextRequest, NextResponse } from "next/server";
import { BitrixClient } from "@/lib/bitrix-api";

export async function GET(req: NextRequest) {
  const protocol = req.headers.get("x-forwarded-proto") || "http";
  const host = req.headers.get("host");
  const redirectUri = `${protocol}://${host}/api/auth/callback`;
  
  const authUrl = BitrixClient.getAuthUrl(redirectUri);
  return NextResponse.redirect(authUrl);
}
