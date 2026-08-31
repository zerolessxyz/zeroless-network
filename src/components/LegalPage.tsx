import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Props = {
  title: string;
  updated: string;
  blocks: { heading: string; body: string }[];
};

export function LegalPage({ title, updated, blocks }: Props) {
  return (
    <>
      <Header />
      <main className="section" style={{ paddingTop: "calc(var(--header-h) + 72px)" }}>
        <div className="shell" style={{ maxWidth: 880 }}>
          <p className="eyebrow-muted">Last updated {updated}</p>
          <h1 className="display" style={{ marginTop: 22 }}>
            {title}
          </h1>

          <div style={{ marginTop: 56, display: "grid", gap: 40 }}>
            {blocks.map((block) => (
              <section key={block.heading}>
                <h2 style={{ fontSize: 18, fontWeight: 560, letterSpacing: "-0.02em" }}>
                  {block.heading}
                </h2>
                <p className="fine" style={{ marginTop: 12, maxWidth: "72ch" }}>
                  {block.body}
                </p>
              </section>
            ))}
          </div>

          <Link className="btn-ghost" href="/" style={{ marginTop: 56 }}>
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
