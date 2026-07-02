/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: ".",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "imgd-ct.aeplcdn.com",
      },
    ],
  },
};

export default nextConfig;
// trigger router rebuild
