import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="section" style={{ paddingTop: "calc(var(--header-h) + 96px)" }}>
        <div className="shell">
          <p className="eyebrow">Error 404</p>
          <h1 className="display" style={{ marginTop: 22, maxWidth: "14ch" }}>
            Nothing here. Not even a surplus.
          </h1>
          <p className="lede" style={{ marginTop: 26 }}>
            The page you asked for does not exist. Everything real lives on the
            front page.
          </p>
          <Link className="btn" href="/" style={{ marginTop: 34 }}>
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
