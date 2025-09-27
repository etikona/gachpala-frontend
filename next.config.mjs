/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "gachpala-server.onrender.com"], // Add your domain
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
