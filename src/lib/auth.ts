/**
 * Wallet sign-in — the server half.
 *
 * A browser can claim any address it likes, so connecting proves nothing on its
 * own. Instead the server issues a nonce, the wallet signs a readable statement
 * carrying it, and the signature is checked here against the claimed address.
 * A verified address gets an HMAC-signed, httpOnly session cookie.
 *
 * Solana signs ed25519 over the raw statement bytes, verified with tweetnacl.
 * Nothing from the browser is trusted: the statement is rebuilt here from the
 * challenge this server issued, so a signature over anything else opens no
 * session. It is a message signature, not a transaction — no funds move and no
 * network fee is paid.
 */

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { brand } from "@/config/brand";
import { chain } from "@/config/chain";

export const NONCE_COOKIE = "zeroless_nonce";
export const SESSION_COOKIE = "zeroless_session";
export const NONCE_TTL_S = 5 * 60;
export const SESSION_TTL_S = 7 * 24 * 60 * 60;

/**
 * HMAC key for the session cookie.
 *
 * There is deliberately no fallback in production. Any default written here
 * would be known to everyone who can read the source, and anyone who knows it
 * can forge a session cookie for any address. Failing the deploy loudly beats
 * serving traffic unguarded.
 */
function secret(): string {
  const configured = process.env.AUTH_SECRET;
  if (configured && configured.length >= 32) return configured;

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET is missing or shorter than 32 characters. Set it to at " +
        "least 32 random characters before serving traffic — sessions cannot " +
        "be signed safely without it.",
    );
  }

  // Local development only. Never reached in production.
  return "zeroless-development-only-not-a-secret";
}

export function newNonce(): string {
  return bs58.encode(randomBytes(16));
}

/**
 * The host the visitor actually opened.
 *
 * Used verbatim in the signed statement so the wallet shows the same address as
 * the address bar, preview deployments included. It is never the basis of a
 * security decision: validity is decided by a signature over the exact same
 * statement, and the host is kept in the challenge cookie so it can be rebuilt.
 */
export function requestOrigin(req: { headers: Headers }): {
  domain: string;
  uri: string;
} {
  const host = req.headers.get("host");
  if (!host || host.length > 255 || /[^\w.:-]/.test(host)) {
    return { domain: brand.domain, uri: `https://${brand.domain}` };
  }
  const proto = host.startsWith("localhost") ? "http" : "https";
  return { domain: host, uri: `${proto}://${host}` };
}

/** The exact bytes the wallet is asked to sign. Rebuilt here to verify. */
export function buildMessage(input: {
  address: string;
  nonce: string;
  issuedAt: string;
  domain: string;
  uri: string;
}): string {
  return [
    `${input.domain} wants you to sign in with your Solana account:`,
    input.address,
    "",
    `Sign in to ${brand.name}. This proves the account is yours and nothing ` +
      "else: it is not a transaction, no funds move, and no network fee is " +
      "paid.",
    "",
    `URI: ${input.uri}`,
    "Version: 1",
    `Chain: ${chain.caip}`,
    `Nonce: ${input.nonce}`,
    `Issued At: ${input.issuedAt}`,
  ].join("\n");
}

/**
 * Check a signature against a statement.
 *
 * Every failure returns false rather than throwing: a malformed address, a
 * signature of the wrong length and a signature by the wrong key are all the
 * same answer to the caller, and none of them should be able to crash a route.
 */
export function verifySignature(input: {
  message: string;
  address: string;
  signature: string;
}): boolean {
  let publicKey: Uint8Array;
  let signature: Uint8Array;
  try {
    publicKey = bs58.decode(input.address);
    signature = bs58.decode(input.signature);
  } catch {
    return false;
  }
  if (publicKey.length !== 32 || signature.length !== 64) return false;

  try {
    return nacl.sign.detached.verify(
      new TextEncoder().encode(input.message),
      signature,
      publicKey,
    );
  } catch {
    return false;
  }
}

/* ---- session cookie: base64url(payload).hmac ---- */

export interface Session {
  address: string;
  issuedAt: number;
  expiresAt: number;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(address: string, now = Date.now()): string {
  const session: Session = {
    address,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_S * 1000,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(
  cookie: string | undefined,
  now = Date.now(),
): Session | null {
  if (!cookie) return null;
  const [payload, mac] = cookie.split(".");
  if (!payload || !mac) return null;

  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given))
    return null;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    ) as Session;
    if (!session.address || session.expiresAt < now) return null;
    return session;
  } catch {
    return null;
  }
}
