/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // HMR CSS removeChild null error fix
      config.optimization = {
        ...config.optimization,
        moduleIds: "named",
      };
    }
    return config;
  },
};

export default nextConfig;
