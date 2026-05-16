/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lenis'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Skip Next.js image proxy in development — the local TLS cert blocks
    // server-to-Unsplash requests. Vercel production uses full optimization.
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

module.exports = nextConfig
