import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Security middleware — sets OWASP-aligned headers on every HTML response.
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
 */

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]'])

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
  'upgrade-insecure-requests',
].join('; ')

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname

  // HTTPS redirect in production — but never for local development servers,
  // which have no TLS listener and would 308 into a dead address.
  if (
    process.env.NODE_ENV === 'production' &&
    !LOCAL_HOSTS.has(hostname) &&
    request.headers.get('x-forwarded-proto') === 'http'
  ) {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    return NextResponse.redirect(url, { status: 308 })
  }

  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', CSP)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
}
