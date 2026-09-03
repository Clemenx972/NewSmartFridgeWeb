/**
 * Security headers live here rather than in a middleware.
 *
 * Design note on CSP:
 * A previous version used a per-request nonce with 'strict-dynamic'. That combination
 * silently broke production: 'strict-dynamic' makes browsers ignore the 'self' source,
 * so only nonce-tagged scripts run — but the nonce was never applied to Next.js's inline
 * bootstrap scripts, leaving 18 unnonced <script> tags and zero hydration.
 *
 * Applying the nonce correctly would require reading headers() in the root layout, which
 * opts every page out of static generation. For a brochure site with no user-generated
 * content, that trade is not worth it: React escapes all interpolated values, and there is
 * no injection surface. We use 'self' + 'unsafe-inline' for scripts instead, and keep every
 * other directive strict.
 *
 * Design note on the delivery mechanism:
 * These headers used to be set by middleware.ts. On Vercel the middleware runs in the Edge
 * Runtime, where importing `next/server` pulls in a bundled ua-parser-js that references
 * __dirname — undefined in that runtime, so every matched request died with a 500. The
 * headers are static, so a per-request function bought nothing; `headers()` is compiled
 * into the routing layer and has no runtime to crash.
 */

// Next.js's dev server compiles modules with eval() for hot reloading.
// Allowing it in development only keeps HMR working without weakening
// the production policy, which never needs eval.
const SCRIPT_SRC =
  process.env.NODE_ENV === 'development'
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'"

const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' is required for Next.js's inline hydration bootstrap.
  // No 'strict-dynamic' — it would nullify 'self' and block every script.
  SCRIPT_SRC,
  // 'unsafe-inline' required by Tailwind JIT + next/font injected styles
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.resend.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Browsers rewrite any http:// subresource to https:// — this replaces the
  // 308 redirect the middleware used to issue. Vercel already forces TLS at
  // the edge, and localhost has no TLS listener to redirect to.
  'upgrade-insecure-requests',
].join('; ')

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
]

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

  // ── Headers ─────────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Security headers on every response, assets included
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
      {
        // Static assets: cache for 1 year (immutable)
        source: '/(.*)\\.(ico|png|svg|webp|avif|jpg|jpeg|gif|woff2?|ttf|otf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // JS/CSS chunks: cache with revalidation
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // HTML pages: always revalidate (SSG pages get fresh content).
        // Assets are excluded explicitly: when two rules set the same header the
        // last match wins, so a bare catch-all here silently overwrote the
        // immutable Cache-Control above and made every image uncacheable.
        source:
          '/((?!_next|.*\\.(?:ico|png|svg|webp|avif|jpg|jpeg|gif|woff2?|ttf|otf)$).*)',
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
