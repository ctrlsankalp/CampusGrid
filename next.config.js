/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/bookings",
        destination: "/resource-bookings",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
