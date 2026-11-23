/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: `next build` writes a plain HTML/CSS/JS site to ./out
  // which Cloudflare Pages serves directly (no server needed).
  output: "export",
  eslint: { ignoreDuringBuilds: true },
  // Cloudflare Pages has no Next.js image optimizer, so serve images as-is.
  // Keep source images compressed (WebP/AVIF, sensible dimensions).
  images: { unoptimized: true },
};

export default nextConfig;
