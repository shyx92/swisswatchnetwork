/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'watch-images.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'www.seikowatches.com',
      }
    ],
    domains: ['res.cloudinary.com', 'static1.squarespace.com', 'fossil.scene7.com', 'itssix.com'],
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig; 