import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**'
      },
      {
        protocol: 'https',
        hostname: 'next-blog-acbbc.appspot.com',
      },
      {
        protocol: 'https',
        hostname: 'next-blog-acbbc.firebasestorage.app', // optional, legacy or manually generated
      },
      {
        protocol: 'https',
        hostname: 'laurynogargasoapiserver.xyz',
        pathname: '/uploads/**',
      },
            {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/uploads/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;