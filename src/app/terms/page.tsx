import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      updated="31 August 2026"
      blocks={[
        {
          heading: "What this site is",
          body: `${brand.domain} is an informational page about the ${brand.name} narrative and token. It does not take custody of funds, execute trades, or operate an exchange.`,
        },
        {
          heading: "Using the site",
          body: "You may read, share, and link to anything published here. You may not present the project as an issuer of securities, impersonate its channels, or use its name to solicit funds.",
        },
        {
          heading: "Third-party destinations",
          body: "Links to wallets, markets, explorers, and vesting contracts lead to services this project does not run. Their terms and their risks are their own.",
        },
        {
          heading: "Changes",
          body: "Content can change as the project moves. Material changes to contract or wallet policy are published before they take effect.",
        },
      ]}
    />
  );
}
