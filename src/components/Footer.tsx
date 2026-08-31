import { Logo } from "./Logo";
import { ArrowRight, GithubLogo, StreamflowLogo, XLogo } from "./icons";
import { brand, links, token } from "@/config/brand";

const columns = [
  {
    title: "About",
    items: [
      { label: "The thesis", href: "#about" },
      { label: "Four systems", href: "#about" },
      { label: "Narrative brief", href: "#about" },
    ],
  },
  {
    title: "Launch",
    items: [
      { label: "Tokenomics", href: "#tokenomics" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "How to buy", href: "#how-to-buy" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "X community", href: links.x, external: true },
      { label: "Streamflow", href: links.streamflow, external: true },
      { label: "Source", href: links.github, external: true },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Risk disclosure", href: "/risk" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="rule-top">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Logo size={26} />
            <p className="fine" style={{ marginTop: 18, maxWidth: "34ch" }}>
              {brand.tagline}
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
              <a className="icon-btn" href={links.x} target="_blank" rel="noreferrer noopener" aria-label="X">
                <XLogo size={15} />
              </a>
              <a
                className="icon-btn"
                href={links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <GithubLogo size={15} />
              </a>
              <a
                className="icon-btn"
                href={links.streamflow}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Streamflow"
              >
                <StreamflowLogo size={14} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="display" style={{ maxWidth: "14ch" }}>
              Stay inside the signal.
            </h2>
            <a
              className="subscribe"
              href={links.x}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span>Join the community</span>
              <ArrowRight />
            </a>
          </div>
        </div>

        <div className="footer-cols">
          {columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h3>{col.title}</h3>
              {col.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} {token.name}</span>
          <span>Digital assets involve substantial risk</span>
        </div>
      </div>
    </footer>
  );
}
