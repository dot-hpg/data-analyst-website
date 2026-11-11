// Prefixes files in /public with the deploy sub-path (empty on Vercel, "/<repo>" on GitHub Pages).
// next/link adds it automatically, but next/image and plain <a href> to files do not.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string) {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
