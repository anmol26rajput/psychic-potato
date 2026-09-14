import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The vercel.app alias is still indexable and serves a stale duplicate of the
  // site, which splits Google's signals. Send it to the real domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "anmol-rajput.vercel.app" }],
        destination: "https://www.anmolrajput.com/:path*",
        permanent: true,
      },
    ];
  },
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
