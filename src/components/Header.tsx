"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ArrowRight } from "./icons";
import { nav, token } from "@/config/brand";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="shell header-inner">
        <a href="#top" aria-label={`${token.name} home`}>
          <Logo />
        </a>

        <nav className="header-nav">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn" href={token.buyUrl} target="_blank" rel="noreferrer noopener">
          Buy {token.ticker}
          <ArrowRight />
        </a>
      </div>
    </header>
  );
}
