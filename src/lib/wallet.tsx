"use client";

/**
 * The wallet, on the browser side.
 *
 * One provider holds three things: which wallets are installed, which account
 * is signed in, and a way to ask that account to sign a fresh statement. There
 * is no wallet SDK in the bundle — installed wallets announce themselves
 * through the Wallet Standard handshake in `wallet-standard.ts`.
 *
 * The signed-in address is never trusted from here. It is read back from the
 * server's session cookie, so the UI and the server always agree on who is
 * signed in even after a reload or an account switch in the extension.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import bs58 from "bs58";
import {
  connectAndSign,
  discoverWallets,
  findWallet,
  knownWallets,
  releaseWallet,
  signAs,
  watchAccounts,
  type StandardWallet,
} from "./wallet-standard";

const WALLET_NAME_KEY = "zeroless.wallet";

interface WalletState {
  /** Installed wallets that can sign a Solana message. */
  available: StandardWallet[];
  /** The signed-in address, as the server sees it. */
  address: string | null;
  /** The wallet the session was opened with. */
  walletName: string | null;
  connecting: boolean;
  error: string | null;
  ready: boolean;
  connect: (walletName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  /** Sign a statement the server wrote. Returns the base58 signature. */
  sign: (message: string) => Promise<string>;
  clearError: () => void;
}

const Context = createContext<WalletState | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [available, setAvailable] = useState<StandardWallet[]>([]);
  const [address, setAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Wallets can register at any point during load, so this stays listening.
  useEffect(() => {
    const stop = discoverWallets(() => setAvailable(knownWallets()));
    setAvailable(knownWallets());
    return stop;
  }, []);

  // Who the server says we are. The cookie is the only source of truth.
  useEffect(() => {
    let live = true;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data: { address: string | null }) => {
        if (!live) return;
        setAddress(data.address);
        setWalletName(
          typeof window === "undefined"
            ? null
            : window.localStorage.getItem(WALLET_NAME_KEY),
        );
      })
      .catch(() => {})
      .finally(() => live && setReady(true));
    return () => {
      live = false;
    };
  }, []);

  // If the extension switches account, the old session no longer describes the
  // person at the keyboard — close it rather than leave a stale address up.
  useEffect(() => {
    if (!walletName || !address) return;
    const wallet = findWallet(walletName);
    if (!wallet) return;

    return watchAccounts(wallet, (next) => {
      if (next && next !== address) {
        fetch("/api/auth/session", { method: "DELETE" }).finally(() => {
          setAddress(null);
        });
      }
    });
  }, [walletName, address]);

  const connect = useCallback(async (name: string) => {
    setConnecting(true);
    setError(null);
    try {
      const wallet = findWallet(name);
      if (!wallet) throw new Error(`${name} is not installed.`);

      const { address: signer, signature } = await connectAndSign(
        wallet,
        async (addr) => {
          const res = await fetch("/api/auth/nonce", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ address: addr }),
          });
          const data = (await res.json()) as { message?: string; error?: string };
          if (!res.ok || !data.message) {
            throw new Error(data.error ?? "Could not start sign-in.");
          }
          return new TextEncoder().encode(data.message);
        },
      );

      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          address: signer,
          signature: bs58.encode(signature),
        }),
      });
      const data = (await res.json()) as { address?: string; error?: string };
      if (!res.ok || !data.address) {
        throw new Error(data.error ?? "Sign-in failed.");
      }

      window.localStorage.setItem(WALLET_NAME_KEY, wallet.name);
      setWalletName(wallet.name);
      setAddress(data.address);
    } catch (cause) {
      setError(readable(cause));
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await fetch("/api/auth/session", { method: "DELETE" }).catch(() => {});
    if (walletName) await releaseWallet(walletName);
    window.localStorage.removeItem(WALLET_NAME_KEY);
    setAddress(null);
    setWalletName(null);
  }, [walletName]);

  const sign = useCallback(
    async (message: string) => {
      if (!address || !walletName) throw new Error("Connect a wallet first.");
      const wallet = findWallet(walletName);
      if (!wallet) throw new Error(`${walletName} is no longer available.`);

      const signature = await signAs(
        wallet,
        address,
        new TextEncoder().encode(message),
      );
      return bs58.encode(signature);
    },
    [address, walletName],
  );

  const value = useMemo<WalletState>(
    () => ({
      available,
      address,
      walletName,
      connecting,
      error,
      ready,
      connect,
      disconnect,
      sign,
      clearError: () => setError(null),
    }),
    [available, address, walletName, connecting, error, ready, connect, disconnect, sign],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useWallet(): WalletState {
  const value = useContext(Context);
  if (!value) throw new Error("useWallet must be used inside WalletProvider.");
  return value;
}

/** Wallet rejections are noisy; this keeps only the part worth showing. */
function readable(cause: unknown): string {
  const message = cause instanceof Error ? cause.message : String(cause);
  if (/user rejected|declined|denied|cancell?ed/i.test(message)) {
    return "You declined the signature.";
  }
  return message.length > 140 ? "That did not go through. Try again." : message;
}
