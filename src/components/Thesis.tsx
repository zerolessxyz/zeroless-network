import { Reveal } from "./Reveal";
import { token } from "@/config/brand";

const pillars = [
  {
    name: "Machines burn",
    kicker: "Constant",
    art: "sphere",
  },
  {
    name: "Demand keeps climbing",
    kicker: "Compounding",
    art: "stack",
  },
  {
    name: "Recovery gets priced",
    kicker: "Emerging",
    art: "lens",
  },
] as const;

const layers = [
  { n: "01", label: "Load", tag: "Demand" },
  { n: "02", label: "Machines", tag: "Compute" },
  { n: "03", label: "Heat", tag: "Loss" },
  { n: "04", label: "Recovery", tag: "Markets" },
  { n: "05", label: "Settlement", tag: "Solana" },
];

function PillarArt({ kind }: { kind: (typeof pillars)[number]["art"] }) {
  if (kind === "sphere") {
    return (
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="pa-1" cx="32%" cy="26%" r="82%">
            <stop offset="0%" stopColor="#8d8d92" />
            <stop offset="55%" stopColor="#3a3a3d" />
            <stop offset="100%" stopColor="#101012" />
          </radialGradient>
        </defs>
        <circle cx="44" cy="34" r="20" fill="url(#pa-1)" />
        <path d="M22 84c0-12.2 9.8-22 22-22s22 9.8 22 22Z" fill="url(#pa-1)" />
      </svg>
    );
  }
  if (kind === "stack") {
    return (
      <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="pa-2" x1="10" y1="10" x2="70" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9c9ca0" />
            <stop offset="100%" stopColor="#4a4a4d" />
          </linearGradient>
        </defs>
        <rect x="14" y="40" width="34" height="34" rx="4" fill="url(#pa-2)" transform="rotate(45 31 57)" />
        <rect x="30" y="26" width="30" height="30" rx="4" fill="url(#pa-2)" transform="rotate(45 45 41)" />
        <rect x="50" y="12" width="24" height="24" rx="4" fill="#1258ff" transform="rotate(45 62 24)" />
      </svg>
    );
  }
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pa-3" x1="18" y1="14" x2="72" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8d8d92" />
          <stop offset="100%" stopColor="#141416" />
        </linearGradient>
      </defs>
      <rect x="20" y="16" width="48" height="58" rx="16" fill="url(#pa-3)" />
      <circle cx="44" cy="36" r="10" fill="none" stroke="#e6e6e8" strokeWidth="3" />
    </svg>
  );
}

export function Thesis() {
  return (
    <section className="section rule-top" id="about">
      <div className="shell">
        <Reveal>
          <h2 className="display" style={{ textAlign: "center", maxWidth: "18ch", marginInline: "auto" }}>
            Every system runs a surplus. Almost none of it is counted.
          </h2>
        </Reveal>

        <div className="pillars">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.name} delay={i * 90}>
              <div className="pillar">
                <div className="pillar-orb">
                  <PillarArt kind={pillar.art} />
                </div>
                <p className="pillar-name">{pillar.name}</p>
                <p className="eyebrow-muted">{pillar.kicker}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="frame frame-split" style={{ marginTop: "clamp(72px, 9vw, 140px)" }}>
            <div className="frame-pad">
              <p className="eyebrow">Introducing {token.name}</p>
              <h3 className="display" style={{ marginTop: 28 }}>
                The efficiency narrative for the machine economy.
              </h3>
              <p className="lede" style={{ marginTop: 30 }}>
                Compute looks clean on a dashboard. On the ground it is heat,
                headroom, and hours nobody bills for. {token.ticker} is where that
                overlooked half gets a name.
              </p>
            </div>

            <div className="frame-grid">
              <div className="layer-stack">
                {layers.map((layer) => (
                  <div key={layer.n} className="layer-row">
                    <span>{layer.n}</span>
                    <span>{layer.label}</span>
                    <span>{layer.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
