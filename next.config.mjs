/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent @imgly/background-removal (WASM) from being bundled server-side
  serverExternalPackages: ["@imgly/background-removal"],
  
  // Next.js 16 defaults to Turbopack. We need an empty config to acknowledge the webpack fallback,
  // or explicitly opt out if needed.
  turbopack: {},
  
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle the wasm package on the server
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : [config.externals].filter(Boolean)),
        "@imgly/background-removal",
      ];
    }
    return config;
  },
};

export default nextConfig;
