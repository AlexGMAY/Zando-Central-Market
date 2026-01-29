import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true, 
  experimental: {
    // 1. Optimise l'extraction CSS (réduit les chunks CSS)
    optimizeCss: true,
    
    // 2. Optimise les packages pour réduire les chunks JS
    optimizePackageImports: [
      'lucide-react', // Si utilisé - regroupe les icônes
      'framer-motion', // Optimise les bundles d'animation
      
    ],
    
    // 3. Scroll restoration pour UX
    scrollRestoration: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache agressif
  },

  /* Headers optimisés pour la performance */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache agressif pour les assets statiques
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|gif|ico|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },      
      {
        source: '/(.*).(woff2|woff|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  /* Compression */
  compress: true, 
}

export default nextConfig