import { Reveal } from "./Reveal";
import { ZeroMark } from "./Logo";

const nodes = [
  {
    slot: "top",
    title: "AI",
    kicker: "Compute",
    copy: "Where the load is created.",
    live: true,
  },
  {
    slot: "left",
    title: "GRID",
    kicker: "Energy",
    copy: "What the load actually costs.",
    live: false,
  },
  {
    slot: "right",
    title: "HEAT",
    kicker: "Loss",
    copy: "The share that never comes back.",
    live: false,
  },
  {
    slot: "bottom",
    title: "SOL",
    kicker: "Settlement",
    copy: "Where the story gets priced.",
    live: false,
  },
] as const;

export function Systems() {
  return (
    <section className="section rule-top">
      <div className="shell">
        <Reveal>
          <h2 className="display" style={{ maxWidth: "14ch" }}>
            One token at the crossing of four systems.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="systems">
            <svg
              className="systems-wires"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="50" y1="17" x2="50" y2="50" stroke="#1258ff" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
              <line x1="17" y1="50" x2="50" y2="50" stroke="rgba(0,0,0,0.16)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="83" y1="50" x2="50" y2="50" stroke="rgba(0,0,0,0.16)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="50" y1="83" x2="50" y2="50" stroke="rgba(0,0,0,0.16)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>

            {nodes.map((node) => (
              <div
                key={node.title}
                className="systems-node"
                data-slot={node.slot}
                data-live={node.live}
              >
                <p className="systems-title">{node.title}</p>
                <p className="systems-kicker">{node.kicker}</p>
                <p className="systems-copy">{node.copy}</p>
              </div>
            ))}

            <div className="systems-hub">
              <ZeroMark size={42} idPrefix="hub" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
