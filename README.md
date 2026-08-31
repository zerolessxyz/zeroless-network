# Zero Less

Marketing site for **Zero Less** ($ZLESS) — a Solana community token built around
the surplus that machine infrastructure burns and nobody counts.

Live: [zeroless.xyz](https://zeroless.xyz)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- TypeScript
- Tailwind CSS v4 + a hand-written design layer in `src/app/globals.css`
- Geist via `next/font/google`
- Wallet sign-in over the Wallet Standard handshake — no wallet SDK in the bundle
- No database and no analytics; every page is static apart from three auth routes

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in AUTH_SECRET
npm run dev
```

The site runs at `http://localhost:3000`.

`AUTH_SECRET` signs the wallet session cookie and must be at least 32
characters (`openssl rand -base64 48`). Without it the app still builds and
still serves every page — it fails only when a session cookie is read.

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
    api/auth/         nonce, verify, session — wallet sign-in
  components/         one file per section
  config/brand.ts     name, token, links — single source of truth
  lib/                wallet discovery, signing, session cookie
```

## Wallet sign-in

Connecting is identity only. The server issues a nonce, the wallet signs a
readable statement carrying it, and the signature is checked against the claimed
address before an httpOnly session cookie is issued. It is a message signature,
not a transaction: no funds move and no network fee is paid. Nothing on the site
is gated behind it yet.

## Editing the token details

Everything brand-specific lives in `src/config/brand.ts`: token name, symbol,
mint address, and every outbound link. Change the mint there and the hero,
the buy card, and the pump.fun link all follow.

## License

MIT — see [LICENSE](LICENSE).
