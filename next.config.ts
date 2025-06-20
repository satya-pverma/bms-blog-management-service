import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Wildcard to allow all HTTPS domains
      },
    ],
  },
};

export default nextConfig;