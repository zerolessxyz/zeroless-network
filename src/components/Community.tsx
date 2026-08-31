import { Reveal } from "./Reveal";
import { GithubLogo, StreamflowLogo, XLogo } from "./icons";
import { links, token } from "@/config/brand";

const channels = [
  { name: "X / Twitter", note: "Open official channel", href: links.x, Icon: XLogo },
  { name: "GitHub", note: "Read the source", href: links.github, Icon: GithubLogo },
  { name: "Streamflow", note: "Check the vesting", href: links.streamflow, Icon: StreamflowLogo },
];

export function Community() {
  return (
    <section className="section rule-top" id="community">
      <div className="shell">
        <Reveal>
          <div style={{ display: "grid", gap: 24 }}>
            <h2 className="display" style={{ maxWidth: "12ch" }}>
              Follow the launch signal.
            </h2>
            <p className="fine" style={{ maxWidth: "46ch" }}>
              The account, the source, and the vesting are all open. Check
              {" "}{token.name} here before you trust it anywhere else.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="channels">
            {channels.map(({ name, note, href, Icon }) => (
              <a
                key={name}
                className="channel"
                data-live="true"
                href={href}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Icon size={34} />
                <div>
                  <p className="channel-name">{name}</p>
                  <p className="channel-note">{note}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
