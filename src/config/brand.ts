export const brand = {
  name: "Zero Less",
  wordmark: "Zero",
  markLabel: "Less",
  domain: "zeroless.xyz",
  url: "https://zeroless.xyz",
  tagline: "The efficiency narrative for the machine economy.",
  description:
    "Zero Less is a crypto-native story about the surplus machines burn and nobody counts.",
} as const;

export const token = {
  name: "Zero Less",
  symbol: "ZLESS",
  ticker: "$ZLESS",
  chain: "Solana",
  supply: "1,000,000,000",
  mint: "XXXXXXXXXXXXXXXXXXpump",
  get buyUrl() {
    return `https://pump.fun/coin/${this.mint}`;
  },
} as const;

export const links = {
  x: "https://x.com/zeroless_xyz",
  streamflow: "https://app.streamflow.finance/contract/solana/mainnet/",
  phantom: "https://phantom.app/download",
  github: "https://github.com/zerolessxyz/zeroless-network",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "How to buy", href: "#how-to-buy" },
  { label: "Community", href: "#community" },
] as const;
