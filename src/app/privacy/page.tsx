import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      updated="31 August 2026"
      blocks={[
        {
          heading: "No accounts, no tracking pixels",
          body: `${brand.domain} has no sign-up, no login, and no advertising trackers. There is nothing to opt out of because nothing is collected here.`,
        },
        {
          heading: "What the host sees",
          body: "The hosting provider keeps ordinary server logs — IP address, user agent, and requested path — for a short period to serve the page and block abuse.",
        },
        {
          heading: "Wallets stay yours",
          body: "This site never asks you to connect a wallet, sign a message, or enter a recovery phrase. Any page that does is not run by this project.",
        },
        {
          heading: "Contact",
          body: "Questions about this page can be sent through the official channel linked in the footer.",
        },
      ]}
    />
  );
}
