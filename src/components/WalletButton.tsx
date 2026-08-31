"use client";

/**
 * Connect, or say who is connected.
 *
 * Signing in signs a statement, not a transaction: no funds move and no network
 * fee is paid. The session it opens is identity only — this site sells nothing,
 * holds nothing, and asks for no approval beyond that one signature.
 *
 * The picker lists whatever the visitor actually has installed, discovered
 * through the Wallet Standard handshake, so it never offers a wallet the
 * browser cannot honour.
 */

import { useEffect, useRef, useState } from "react";
import { useWallet } from "@/lib/wallet";
import { Wallet as WalletIcon } from "./icons";

function short(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function WalletButton() {
  const {
    available,
    address,
    connect,
    disconnect,
    connecting,
    error,
    clearError,
    ready,
  } = useWallet();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function away(event: MouseEvent) {
      if (box.current && !box.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div className="wallet-wrap" ref={box}>
      <button
        type="button"
        className={address ? "btn-ghost" : "btn"}
        disabled={connecting || !ready}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => {
          clearError();
          setOpen((was) => !was);
        }}
      >
        <WalletIcon size={15} />
        {address ? short(address) : connecting ? "Signing…" : "Connect wallet"}
      </button>

      {open ? (
        <div className="wallet-menu" role="menu">
          {address ? (
            <>
              <p className="wallet-address">{address}</p>
              <button
                type="button"
                className="wallet-item"
                onClick={() => {
                  setOpen(false);
                  void disconnect();
                }}
              >
                Sign out
              </button>
            </>
          ) : available.length === 0 ? (
            <p className="wallet-note">
              No Solana wallet announced itself. Install one, then reload this
              page.
            </p>
          ) : (
            <>
              <p className="wallet-note">
                Signing in proves the account is yours. It is not a transaction
                and costs nothing.
              </p>
              {available.map((wallet) => (
                <button
                  key={wallet.name}
                  type="button"
                  className="wallet-item"
                  onClick={() => {
                    setOpen(false);
                    void connect(wallet.name);
                  }}
                >
                  {/* Wallet-supplied data URI; next/image would only add a hop. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={wallet.icon} alt="" width={18} height={18} />
                  {wallet.name}
                </button>
              ))}
            </>
          )}

          {error ? <p className="wallet-error">{error}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
