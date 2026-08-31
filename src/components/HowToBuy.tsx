"use client";

import { Fragment, useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowRight, CheckCircle, Shield, Swap, Wallet } from "./icons";
import { links, token } from "@/config/brand";

const steps = [
  {
    name: "Wallet",
    icon: Wallet,
    copy: "Install Phantom, write the recovery phrase down offline, and never type it anywhere else.",
  },
  {
    name: "Fund",
    icon: Swap,
    copy: "Send SOL from an exchange to your own address, leaving a little spare for network fees.",
  },
  {
    name: "Buy",
    icon: CheckCircle,
    copy: `Match the address on this page character for character, then swap SOL for ${token.ticker}.`,
  },
];

export function HowToBuy() {
  const [active, setActive] = useState(0);
  const Current = steps[active];

  return (
    <section className="section rule-top" id="how-to-buy">
      <div className="shell">
        <Reveal>
          <h2 className="display" style={{ maxWidth: "16ch" }}>
            Three steps from an empty wallet to {token.ticker}.
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            Set up Phantom, fund it with SOL, and buy only through the verified
            address published here.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="frame steps" style={{ marginTop: "clamp(44px, 5vw, 76px)" }}>
            <div className="frame-pad" style={{ display: "grid", alignContent: "center" }}>
              <div className="steps-track">
                {steps.map((step, i) => (
                  <Fragment key={step.name}>
                    {i > 0 && <span className="step-wire" />}
                    <button
                      type="button"
                      className="step-node"
                      data-active={i === active}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-label={`Step ${i + 1}: ${step.name}`}
                    >
                      <span className="step-disc">
                        <step.icon size={20} />
                      </span>
                      <span className="step-name">{step.name}</span>
                    </button>
                  </Fragment>
                ))}
              </div>

              <div className="step-detail">
                <p className="eyebrow-muted">
                  Step 0{active + 1}
                </p>
                <p className="fine" style={{ marginTop: 12, color: "var(--ink)" }}>
                  {Current.copy}
                </p>
              </div>
            </div>

            <div className="phantom-card">
              <Wallet size={22} className="opacity-70" />
              <div>
                <p className="eyebrow" style={{ color: "#7ea0ff" }}>
                  Verified route
                </p>
                <h3 className="display-sm" style={{ marginTop: 10 }}>
                  Download Phantom
                </h3>
                <p className="fine" style={{ marginTop: 14, color: "rgba(255,255,255,0.62)" }}>
                  Phantom holds SOL and {token.ticker} in one place and works on
                  desktop and mobile. Download it from the official site only.
                </p>
              </div>

              <div style={{ marginTop: "auto" }}>
                <a className="phantom-link" href={links.phantom} target="_blank" rel="noreferrer noopener">
                  Get Phantom wallet
                  <ArrowRight />
                </a>
                <div className="phantom-link" style={{ display: "block" }}>
                  <p style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Shield size={14} />
                    Check the address first
                  </p>
                  <p
                    style={{
                      marginTop: 6,
                      textTransform: "none",
                      letterSpacing: "0.02em",
                      color: "rgba(255,255,255,0.5)",
                      wordBreak: "break-all",
                    }}
                  >
                    {token.mint}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
