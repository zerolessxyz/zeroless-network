/**
 * Issue a challenge.
 *
 * The nonce and the statement built around it are kept in a short-lived
 * httpOnly cookie, not sent back for the browser to hold. Verification rebuilds
 * the statement from that cookie, so the only thing that can open a session is
 * a signature over what this server actually issued.
 */

import { NextResponse } from "next/server";
import {
  NONCE_COOKIE,
  NONCE_TTL_S,
  buildMessage,
  newNonce,
  requestOrigin,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { address } = (await req.json().catch(() => ({}))) as {
    address?: unknown;
  };

  if (typeof address !== "string" || address.length < 32 || address.length > 48) {
    return NextResponse.json({ error: "Address missing." }, { status: 400 });
  }

  const nonce = newNonce();
  const issuedAt = new Date().toISOString();
  const { domain, uri } = requestOrigin(req);
  const message = buildMessage({ address, nonce, issuedAt, domain, uri });

  const response = NextResponse.json({ message });
  response.cookies.set({
    name: NONCE_COOKIE,
    value: JSON.stringify({ address, nonce, issuedAt, domain, uri }),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: NONCE_TTL_S,
  });
  return response;
}
