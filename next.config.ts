import type { NextConfig } from "next";

// Two deploy targets share one codebase:
// - Vercel (default): a normal Next.js build, like the original portfolio.
// - GitHub Pages: set GITHUB_PAGES=true to build a static site into ./out,
//   served from https://<user>.github.io/<repo>/ (see .github/workflows/deploy.yml).
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.PAGES_BASE_PATH ?? "/data-analyst-website") : "";

const nextConfig: NextConfig = {
  ...(isPages && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
