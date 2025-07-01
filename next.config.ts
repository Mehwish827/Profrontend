// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     turbopack: false, // ❌ Disable Turbopack
//   },
// };

// module.exports = nextConfig;
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;