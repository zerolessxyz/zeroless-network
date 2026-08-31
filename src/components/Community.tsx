import { Reveal } from "./Reveal";
import { DiscordLogo, TelegramLogo, XLogo } from "./icons";
import { links, token } from "@/config/brand";

const channels = [
  { name: "X / Twitter", note: "Open official channel", href: links.x, Icon: XLogo },
  { name: "Telegram", note: "Opens at launch", href: links.telegram, Icon: TelegramLogo },
  { name: "Discord", note: "Opens at launch", href: links.discord, Icon: DiscordLogo },
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
            <p className="fine" style={{ maxWidth: "44ch" }}>
              Contract, route, and launch updates are mirrored across every
              official {token.name} channel.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="channels">
            {channels.map(({ name, note, href, Icon }) => {
              const live = Boolean(href);
              const body = (
                <>
                  <Icon size={34} />
                  <div>
                    <p className="channel-name">{name}</p>
                    <p className="channel-note">{note}</p>
                  </div>
                </>
              );

              return live ? (
                <a
                  key={name}
                  className="channel"
                  data-live="true"
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {body}
                </a>
              ) : (
                <div key={name} className="channel" data-live="false">
                  {body}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
