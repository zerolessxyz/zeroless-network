"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { token } from "@/config/brand";

const layers = [
  {
    n: "01",
    rail: "Waste layer",
    ghost: "W",
    title: "Every model has a heat bill.",
    copy: "Training and inference land on chips, power draw, cooling loops, and water. Zero Less makes that dependency easy to talk about without shrinking it to one commodity claim.",
    boundary: "The token does not represent ownership of energy, hardware, or offsets.",
  },
  {
    n: "02",
    rail: "Market layer",
    ghost: "M",
    title: "Scarcity gets a price before it gets a policy.",
    copy: "Markets tend to name a constraint long before institutions do. The surplus story is where retail attention meets a real, physical limit.",
    boundary: "Nothing here is investment advice or a forecast of price.",
  },
  {
    n: "03",
    rail: "Settlement layer",
    ghost: "S",
    title: "Solana keeps the record cheap.",
    copy: "One mint, one route, and settlement fast enough that checking a transfer costs nothing. The chain is the receipt, not the pitch.",
    boundary: "All contract and wallet policy is published before it changes.",
  },
];

export function Brief() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const panel of panels.current) if (panel) io.observe(panel);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section rule-top">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{token.name} narrative brief</p>
        </Reveal>

        <Reveal delay={90}>
          <div className="brief" style={{ marginTop: 30 }}>
            <div className="brief-rail">
              {layers.map((layer, i) => (
                <button
                  key={layer.n}
                  type="button"
                  className="brief-tab"
                  data-active={i === active}
                  onClick={() =>
                    panels.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
                  }
                >
                  <span>{layer.n}</span>
                  <span>{layer.rail}</span>
                </button>
              ))}
            </div>

            <div>
              {layers.map((layer, i) => (
                <div
                  key={layer.n}
                  ref={(node) => {
                    panels.current[i] = node;
                  }}
                  data-index={i}
                  className="brief-panel"
                  style={i > 0 ? { borderTop: "1px solid var(--line)" } : undefined}
                >
                  <span className="brief-ghost">{layer.ghost}</span>
                  <h3 className="display" style={{ maxWidth: "15ch" }}>
                    {layer.title}
                  </h3>
                  <p className="fine" style={{ marginTop: 22, maxWidth: "56ch" }}>
                    {layer.copy}
                  </p>
                  <div className="boundary">
                    <p className="eyebrow-muted">Boundary</p>
                    <p className="fine" style={{ color: "var(--ink)" }}>
                      {layer.boundary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
