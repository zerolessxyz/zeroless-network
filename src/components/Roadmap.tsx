import { Reveal } from "./Reveal";
import { token } from "@/config/brand";

const phases = [
  {
    n: "01",
    stage: "Live",
    title: "Token launch",
    copy: "Mint on Solana and publish a single verified address on every channel the project owns.",
    tags: ["Token deployed", "Address published", "Channels synced"],
  },
  {
    n: "02",
    stage: "Trade",
    title: "Market access",
    copy: "Open the market route, seat the liquidity, and keep one path that anyone can check before buying.",
    tags: ["Liquidity seated", "Route verified", "Charts live"],
  },
  {
    n: "03",
    stage: "Onboard",
    title: "Holder access",
    copy: "Walk newcomers through a wallet, a fund, and a first buy without guessing which address is real.",
    tags: ["Wallet guide", "Address check", "Support desk"],
  },
  {
    n: "04",
    stage: "Grow",
    title: "Community expansion",
    copy: "Turn the surplus thesis into something readable — steady posts, partners, and holder-led rooms.",
    tags: ["Content cadence", "Partners", "Holder rooms"],
  },
  {
    n: "05",
    stage: "Build",
    title: "Transparent operations",
    copy: "Report what moved, what did not, and what comes next on a schedule that does not slip.",
    tags: ["Progress notes", "Treasury log", "Ecosystem work"],
  },
];

export function Roadmap() {
  return (
    <section className="section rule-top" id="roadmap">
      <div className="shell roadmap-grid">
        <div className="roadmap-sticky">
          <h2 className="display">
            From one address to an open market.
          </h2>
          <p className="lede" style={{ marginTop: 28 }}>
            A live Solana plan built around verified access, honest onboarding,
            and progress you can check without asking anyone.
          </p>
          <p className="badge-live" style={{ marginTop: 30 }}>
            {token.name} is live
          </p>
        </div>

        <div>
          {phases.map((phase) => (
            <article key={phase.n} className="phase">
              <div className="phase-head">
                <span>{phase.n}</span>
                <span style={{ color: "var(--accent)" }}>{phase.stage}</span>
              </div>

              <h3 className="phase-title" style={{ marginTop: 64 }}>
                {phase.title}
              </h3>
              <p className="fine" style={{ marginTop: 18, maxWidth: "46ch" }}>
                {phase.copy}
              </p>
              <div className="tag-row">
                {phase.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
