#!/usr/bin/env node
/**
 * Production smoke test.
 *
 * Run against a server started with `bun run start`. Guards the defects that
 * shipped silently and were only visible in a production build:
 *
 *   1. The middleware redirected localhost to HTTPS, making the built site unreachable.
 *   2. The CSP combined a nonce with 'strict-dynamic' while no script carried the nonce,
 *      which blocks every script and kills React hydration.
 *   3. The middleware itself crashed in Vercel's Edge Runtime (__dirname is not defined
 *      inside the ua-parser-js that `next/server` bundles), returning 500 on every route
 *      its matcher covered — including static files like /robots.txt.
 *
 * Neither is reproducible with `bun run dev`, so a unit test would not have caught them.
 *
 * Usage:  node tests/smoke.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? 'http://localhost:3000'

const ROUTES = ['/', '/features', '/pricing', '/security', '/contact', '/privacy', '/terms']

let failures = 0
let checks = 0

function check(name, condition, detail = '') {
  checks++
  if (condition) {
    console.log(`  PASS  ${name}`)
  } else {
    failures++
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

async function main() {
  console.log(`\nSmoke test against ${BASE}\n`)

  // ── Every public route must answer 200 ────────────────────────────────────
  console.log('Routes')
  for (const route of ROUTES) {
    let res
    try {
      res = await fetch(`${BASE}${route}`, { redirect: 'manual' })
    } catch (err) {
      check(`GET ${route}`, false, `unreachable: ${err.message}`)
      continue
    }

    check(
      `GET ${route} → 200`,
      res.status === 200,
      res.status === 308
        ? 'got 308 — the HTTPS redirect is firing on localhost again'
        : `got ${res.status}`
    )
  }

  // ── Content Security Policy ───────────────────────────────────────────────
  console.log('\nContent Security Policy')
  const home = await fetch(BASE)
  const csp = home.headers.get('content-security-policy') ?? ''
  const html = await home.text()

  check('CSP header is present', csp.length > 0)

  const hasStrictDynamic = csp.includes('strict-dynamic')
  const hasNonce = csp.includes('nonce-')
  const noncedScripts = (html.match(/<script[^>]*nonce=/g) ?? []).length
  const allScripts = (html.match(/<script[^>]*>/g) ?? []).length

  check('page ships at least one script', allScripts > 0, `found ${allScripts}`)

  // The exact shape of the original bug: strict-dynamic makes browsers ignore
  // 'self', so unless every script is nonced, none of them run.
  check(
    'no strict-dynamic without nonced scripts',
    !hasStrictDynamic || noncedScripts === allScripts,
    `strict-dynamic=${hasStrictDynamic}, nonced ${noncedScripts}/${allScripts} scripts`
  )

  // Symmetrically: a nonce in the header that no script carries means the header
  // is lying about how scripts are authorised.
  check(
    'no orphan nonce in the CSP',
    !hasNonce || noncedScripts > 0,
    `CSP declares a nonce but ${noncedScripts} scripts carry one`
  )

  check('frame-ancestors is locked down', csp.includes("frame-ancestors 'none'"))
  check('object-src is locked down', csp.includes("object-src 'none'"))

  // ── Other security headers ────────────────────────────────────────────────
  console.log('\nSecurity headers')
  for (const [header, expected] of [
    ['x-content-type-options', 'nosniff'],
    ['x-frame-options', 'DENY'],
    ['referrer-policy', 'strict-origin-when-cross-origin'],
  ]) {
    check(`${header}: ${expected}`, home.headers.get(header) === expected, `got ${home.headers.get(header)}`)
  }

  check(
    'strict-transport-security is set',
    (home.headers.get('strict-transport-security') ?? '').includes('max-age=')
  )

  // ── Assets referenced by the page must exist ──────────────────────────────
  console.log('\nAssets')
  const manifestRes = await fetch(`${BASE}/manifest.json`)
  check('manifest.json is served', manifestRes.status === 200, `got ${manifestRes.status}`)

  // Static files under public/ used to pass through the middleware matcher, so a
  // crashing middleware turned them into 500s.
  const robotsRes = await fetch(`${BASE}/robots.txt`)
  check('robots.txt is served', robotsRes.status === 200, `got ${robotsRes.status}`)

  if (manifestRes.status === 200) {
    const manifest = await manifestRes.json()
    for (const icon of manifest.icons ?? []) {
      // Resolve against BASE so a relative src ("icon.svg") works as well as an
      // absolute one ("/icon.svg"). Plain concatenation drops the slash.
      const iconUrl = new URL(icon.src, BASE).href
      const iconRes = await fetch(iconUrl, { method: 'HEAD' })
      check(`manifest icon ${icon.src} exists`, iconRes.status === 200, `got ${iconRes.status}`)
    }
  }

  // ── Fonts must be self-hosted, not fetched from Google at render time ─────
  console.log('\nFonts')
  const cssLinks = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+)"/g)].map((m) => m[1])
  let googleFontsImport = false
  for (const cssPath of cssLinks) {
    const css = await fetch(`${BASE}${cssPath}`).then((r) => r.text())
    if (/@import[^;]*fonts\.googleapis\.com/.test(css)) googleFontsImport = true
  }
  check(
    'no @import to Google Fonts in the compiled CSS',
    !googleFontsImport,
    'next/font already self-hosts these families — the @import duplicates the download'
  )

  // ── Result ────────────────────────────────────────────────────────────────
  console.log(`\n${checks - failures}/${checks} checks passed\n`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error('\nSmoke test crashed:', err.message)
  process.exit(1)
})
