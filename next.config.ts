// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     turbopack: false, // ❌ Disable Turbopack
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreDuringBuilds: true,
  // No need for 'experimental' unless you're using valid options
};

// export default nextConfig;
module.exports = nextConfig