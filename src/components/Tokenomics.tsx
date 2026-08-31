"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowRight, StreamflowLogo } from "./icons";
import { links, token } from "@/config/brand";

const allocation = [
  { label: "Liquidity", pct: 60, note: "Paired at launch and left in the open market." },
  { label: "Community", pct: 22, note: "Rewards, campaigns, and holder programs." },
  { label: "Growth", pct: 12, note: "Content, partners, and listings." },
  { label: "Team", pct: 6, note: "Locked on a public vesting contract." },
];

const RADIUS = 78;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Tokenomics() {
  const [active, setActive] = useState(0);

  let offset = 0;
  const segments = allocation.map((slice, i) => {
    const length = (slice.pct / 100) * CIRCUMFERENCE;
    const seg = { ...slice, index: i, length, offset };
    offset += length;
    return seg;
  });

  const current = allocation[active];

  return (
    <section className="section rule-top" id="tokenomics">
      <div className="shell">
        <Reveal>
          <div className="frame frame-split">
            <div className="frame-pad">
              <p className="eyebrow-muted">Tokenomics</p>
              <h2 className="display" style={{ marginTop: 26 }}>
                One supply.
                <br />
                Four lines.
                <br />
                No footnotes.
              </h2>

              <div style={{ marginTop: 44 }}>
                {allocation.map((slice, i) => (
                  <a
                    key={slice.label}
                    className="alloc-row"
                    href={links.streamflow}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span>{slice.label}</span>
                    <span className="alloc-pct">{slice.pct}%</span>
                    <ArrowRight size={15} />
                  </a>
                ))}
              </div>

              <p className="fine" style={{ marginTop: 24, display: "flex", gap: 8, alignItems: "center" }}>
                <StreamflowLogo size={14} />
                Vesting and treasury movement are published on Streamflow.
              </p>
            </div>

            <div className="frame-grid">
              <div style={{ position: "relative", width: "min(100%, 300px)", aspectRatio: "1" }}>
                <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }} aria-hidden="true">
                  <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="rgba(0,0,0,0.09)" strokeWidth="14" />
                  <circle cx="100" cy="100" r={RADIUS - 16} fill="none" stroke="rgba(18,88,255,0.18)" strokeWidth="1" />
                  {segments.map((seg) => (
                    <circle
                      key={seg.label}
                      cx="100"
                      cy="100"
                      r={RADIUS}
                      fill="none"
                      stroke={seg.index === active ? "#1258ff" : "rgba(10,10,10,0.22)"}
                      strokeWidth={seg.index === active ? 16 : 12}
                      strokeDasharray={`${Math.max(seg.length - 3, 1)} ${CIRCUMFERENCE}`}
                      strokeDashoffset={-seg.offset}
                      style={{ transition: "stroke 260ms ease, stroke-width 260ms ease" }}
                    />
                  ))}
                  <circle cx="100" cy="100" r="44" fill="#0a0a0a" />
                </svg>

                <div className="donut-label">
                  <div style={{ color: "#fff" }}>
                    <p style={{ fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.7 }}>
                      {current.label}
                    </p>
                    <p style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
                      {current.pct}%
                    </p>
                  </div>
                </div>

                <p className="fine" style={{ textAlign: "center", marginTop: 22 }}>
                  {current.note}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="fine" style={{ marginTop: 24, maxWidth: "92ch" }}>
          {token.ticker} is a participation token for a cultural narrative. Holding it
          does not grant ownership of energy capacity, hardware, carbon credits,
          securities, or any other real-world asset. Supply is fixed at{" "}
          {token.supply} and all wallet policy is published before it changes.
        </p>
      </div>
    </section>
  );
}
