import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/(.*)",
        destination: "https://localhost:7284/api/:path*",
      },
    ]
  },
};

export default nextConfig;
