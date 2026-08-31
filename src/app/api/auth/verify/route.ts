/**
 * Check a signature and open a session.
 *
 * The statement is rebuilt from the challenge cookie rather than taken from the
 * request, so a caller cannot have a signature checked against text of its own
 * choosing. The challenge is cleared whichever way the check goes.
 */

import { NextResponse } from "next/server";
import {
  NONCE_COOKIE,
  SESSION_COOKIE,
  SESSION_TTL_S,
  buildMessage,
  encodeSession,
  verifySignature,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Challenge {
  address: string;
  nonce: string;
  issuedAt: string;
  domain: string;
  uri: string;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    address?: unknown;
    signature?: unknown;
  };

  const raw = req.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith(`${NONCE_COOKIE}=`))
    ?.slice(NONCE_COOKIE.length + 1);

  let challenge: Challenge | null = null;
  try {
    challenge = raw ? (JSON.parse(decodeURIComponent(raw)) as Challenge) : null;
  } catch {
    challenge = null;
  }

  const fail = (message: string, status = 400) => {
    const response = NextResponse.json({ error: message }, { status });
    response.cookies.delete(NONCE_COOKIE);
    return response;
  };

  if (!challenge) return fail("That challenge has expired. Try again.");
  if (typeof body.address !== "string" || typeof body.signature !== "string") {
    return fail("Signature missing.");
  }
  if (body.address !== challenge.address) {
    return fail("That signature is for a different account.");
  }

  const message = buildMessage(challenge);
  if (!verifySignature({ message, address: body.address, signature: body.signature })) {
    return fail("That signature did not check out.", 401);
  }

  const response = NextResponse.json({ address: body.address });
  response.cookies.delete(NONCE_COOKIE);
  response.cookies.set({
    name: SESSION_COOKIE,
    value: encodeSession(body.address),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_S,
  });
  return response;
}
