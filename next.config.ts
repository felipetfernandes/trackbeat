import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
      },
      // Dica: Para permitir qualquer subdomínio do Apple Music/iTunes:
      {
        protocol: 'https',
        hostname: '*.mzstatic.com',
      },
    ],
  },
};

export default nextConfig;
