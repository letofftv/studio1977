import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BitrixClient } from "@/lib/bitrix-api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/studio/login?error=no_code", req.url));
  }

  try {
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    const redirectUri = `${protocol}://${host}/api/auth/callback`;

    const session = await BitrixClient.exchangeCode(code, redirectUri);

    // Save session in cookie (HTTP-only, secure in production)
    const cookieStore = await cookies();
    cookieStore.set("bitrix_session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600 * 24 * 7, // 7 days (though Bitrix token expires in 1h, we'd need refresh logic)
    });

    return NextResponse.redirect(new URL("/studio", req.url));
  } catch (error: any) {
    console.error("Auth Error:", error);
    return NextResponse.redirect(new URL(`/studio/login?error=${encodeURIComponent(error.message)}`, req.url));
  }
}
