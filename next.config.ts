import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Configure the base path for GitHub Pages (repository name)
  basePath: '/salon-hair',
  images: {
    // Next.js internal image optimization requires a Node.js server, 
    // so we must disable it for a static GitHub Pages export.
    unoptimized: true,
  },
};

export default nextConfig;
