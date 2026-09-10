import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Brand logos, devicon marks and favicons are all pulled from CDNs.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "dellure.com" },
      { protocol: "https", hostname: "www.learnbeyondhorizon.com" },
    ],
  },
};

export default nextConfig;
