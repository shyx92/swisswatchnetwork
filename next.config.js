/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['fossil.scene7.com', 'itssix.com'],
  }
};

module.exports = nextConfig; 