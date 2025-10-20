import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Ayuda con problemas de SSR en Next.js 15
    serverComponentsExternalPackages: ['axios'],
  },
  // Configuración para evitar problemas de hidratación
  transpilePackages: [],
  // Configuración de headers para evitar problemas de CORS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

export default nextConfig;
