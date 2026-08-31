/**
 * Solana, and how this site talks about it.
 *
 * The site holds no funds and quotes no prices — the chain is here only so a
 * wallet can prove who it belongs to, and so the mint can be looked up.
 */
export const chain = {
  label: "Solana",
  /** Written into the sign-in statement so a wallet shows what it is signing. */
  caip: "solana:mainnet",
  unit: "SOL",
  explorer: {
    token: (mint: string) => `https://solscan.io/token/${mint}`,
    account: (address: string) => `https://solscan.io/account/${address}`,
  },
} as const;
