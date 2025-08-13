/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true
  },
  images: {
    domains: ["avatars.githubusercontent.com", "cdn.jsdelivr.net"],
  },
};

module.exports = nextConfig;