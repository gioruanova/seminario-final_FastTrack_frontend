import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['axios'],
  transpilePackages: [],
  
  compress: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL_PROD?.trim();
    
    if (backendUrl) {
      const cleanUrl = backendUrl.replace(/\/$/, '').trim();
      
      console.log('[Next.js Rewrites] Configurando rewrite de /api/* a:', cleanUrl);
      
      return [
        {
          source: '/api/:path*',
          destination: `${cleanUrl}/:path*`,
        },
      ];
    }
    
    console.log('[Next.js Rewrites] No se configuró NEXT_PUBLIC_API_URL_PROD, sin rewrites');
    return [];
  },
  
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
