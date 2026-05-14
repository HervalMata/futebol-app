import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: true,
    images: {
        domains: [
            'media-1.api-sports.io',
            'media-2.api-sports.io',
            'media-3.api-sports.io',
        ]
    }
};

export default nextConfig;
