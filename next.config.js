/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fossil.scene7.com',
      },
      {
        protocol: 'https',
        hostname: 'itssix.com',
      }
    ],
    domains: ['fossil.scene7.com', 'itssix.com'],
  }
};

module.exports = nextConfig; 