/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'imgs.search.brave.com', 'placehold.co'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't attempt to import server-side packages on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        'handlebars': false,
        '@opentelemetry/exporter-jaeger': false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
