"use client";

import { useState } from "react";
import { LiquidMark } from "./LiquidMark";
import { ArrowRight, Copy } from "./icons";
import { token } from "@/config/brand";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyMint = async () => {
    try {
      await navigator.clipboard.writeText(token.mint);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <div className="hero-glow" />
        <LiquidMark />
      </div>

      <div className="shell hero-content">
        <div>
          <p className="hero-eyebrow">
            <span className="hero-dot" />
            <span className="eyebrow-muted">Surplus meets narrative</span>
          </p>
          <h1 className="display-xl">
            Keep the loss
            <br />
            at zero.
          </h1>
          <p className="lede" style={{ marginTop: 26 }}>
            Machines run hot, grids run long, and markets run wide. {token.name} takes
            the part everyone writes off and gives it somewhere to trade.
          </p>
        </div>

        <div className="ca-card">
          <div className="ca-head">
            <span className="eyebrow-muted">Contract address</span>
            <span className="eyebrow">{token.chain}</span>
          </div>
          <div className="ca-value">
            <span>{token.mint}</span>
            <button className="copy-btn" onClick={copyMint} type="button">
              <Copy />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div style={{ padding: 14, paddingTop: 0 }}>
            <a
              className="btn"
              href={token.buyUrl}
              target="_blank"
              rel="noreferrer noopener"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              Buy {token.ticker}
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
