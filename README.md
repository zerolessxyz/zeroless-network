# Zero Less

Marketing site for **Zero Less** ($ZLESS) — a Solana community token built around
the surplus that machine infrastructure burns and nobody counts.

Live: [zeroless.xyz](https://zeroless.xyz)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- TypeScript
- Tailwind CSS v4 + a hand-written design layer in `src/app/globals.css`
- Geist via `next/font/google`
- No database, no analytics, no wallet connection — the page is fully static

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

```bash
npm run build   # production build
npm start       # serve the production build
npx tsc --noEmit  # type check
```

## Project layout

```
src/
  app/
    page.tsx          landing page (all sections)
    layout.tsx        fonts, metadata
    globals.css       design tokens + component styles
    risk|terms|privacy  short legal pages
  components/         one file per section
  config/brand.ts     name, token, links — single source of truth
```

## Editing the token details

Everything brand-specific lives in `src/config/brand.ts`: token name, symbol,
mint address, and every outbound link. Change the mint there and the hero,
the buy card, and the pump.fun link all follow.

## License

MIT — see [LICENSE](LICENSE).
