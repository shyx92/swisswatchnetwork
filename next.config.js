/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['fossil.scene7.com', 'itssix.com'],
  },
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig; 