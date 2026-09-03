/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Security ────────────────────────────────────────────────────────────────
  // VULN-08: Disable source maps in production to prevent code reconstruction
  productionBrowserSourceMaps: false,

  // ── Performance ─────────────────────────────────────────────────────────────
  // Compress responses with gzip/brotli
  compress: true,

  // Enable React strict mode for better error detection in dev
  reactStrictMode: true,

  // Inline small SVGs/images as data URIs (reduces requests)
  images: {
    formats: ['image/avif', 'image/webp'],  // avif first = smaller files
    deviceSizes: [375, 640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
  },

  // ── Cache headers ───────────────────────────────────────────────────────────
  // Security headers are handled by middleware.ts (per-request).
  // These cache headers target static assets that bypass middleware.
  async headers() {
    return [
      {
        // Static assets: cache for 1 year (immutable)
        source: '/(.*)\\.(ico|png|svg|webp|avif|jpg|jpeg|gif|woff2?|ttf|otf)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // JS/CSS chunks: cache with revalidation
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // HTML pages: always revalidate (SSG pages get fresh content)
        source: '/((?!_next).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ]
  },

  // ── Webpack ─────────────────────────────────────────────────────────────────
  webpack(config, { dev, isServer }) {
    if (!dev) {
      // No source maps in production client bundles
      config.devtool = false
    }
    if (dev) {
      // Windows file system events are unreliable — polling ensures HMR works
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}

export default nextConfig
