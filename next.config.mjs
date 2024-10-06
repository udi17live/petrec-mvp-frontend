/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
    },
    webpack: (config, { isServer }) => {
      // Add HTML loader for processing HTML files
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader', // Use the installed html-loader
      });
      
      if (!isServer) {
        // Ignore fs module on the client side
        config.resolve.fallback = {
          fs: false,
        };
      }
      
      return config;
    },
  }

export default nextConfig;
