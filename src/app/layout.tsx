import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { brand, token } from "@/config/brand";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    url: brand.url,
    siteName: brand.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    site: "@zeroless_xyz",
  },
  other: {
    "token:symbol": token.ticker,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
