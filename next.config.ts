import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next writes an AGENTS.md / CLAUDE.md of its own otherwise, and the public
  // repository is allowed exactly one markdown file: README.md.
  agentRules: false,
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
