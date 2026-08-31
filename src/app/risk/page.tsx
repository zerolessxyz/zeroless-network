import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { token } from "@/config/brand";

export const metadata: Metadata = { title: "Risk disclosure" };

export default function RiskPage() {
  return (
    <LegalPage
      title="Risk disclosure"
      updated="31 August 2026"
      blocks={[
        {
          heading: "No promise of value",
          body: `${token.ticker} is a community token on Solana. It carries no yield, no revenue share, and no claim on any company. Its price can fall to zero and stay there.`,
        },
        {
          heading: "Not a real-world asset",
          body: "Holding the token does not give you ownership of energy capacity, hardware, water rights, carbon credits, or any regulated instrument. The narrative on this site is cultural, not a claim of title.",
        },
        {
          heading: "Verify before you buy",
          body: `Only the contract address published on this site and on the official channel is real. Anyone offering a different address, a private sale, or a guaranteed return is not connected to the project.`,
        },
        {
          heading: "Your own responsibility",
          body: "Nothing here is financial, legal, or tax advice. Check your local rules, use funds you can afford to lose entirely, and keep your recovery phrase to yourself.",
        },
      ]}
    />
  );
}
