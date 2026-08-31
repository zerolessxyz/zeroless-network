/** Who the session cookie says you are, and how to stop being them. */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, decodeSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = decodeSession((await cookies()).get(SESSION_COOKIE)?.value);
  return NextResponse.json({ address: session?.address ?? null });
}

export async function DELETE() {
  const response = NextResponse.json({ address: null });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
