import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

/**
 * POST /api/contact
 *
 * Receives the contact form, validates it, and relays it by email via Resend.
 * Runs server-side only, so the Resend API key is never exposed to the browser.
 *
 * Bot mitigation, in order of cost to an attacker:
 *   1. Honeypot field ("website") — must be empty
 *   2. Submission timing — a human takes more than MIN_FILL_MS to fill the form
 *   3. Per-IP rate limit
 *   4. Strict schema validation, HTML rejected in free-text fields
 */

// Reject angle brackets in free-text fields: no HTML reaches the support inbox.
const NO_HTML = /[<>]/
const noHtml = (value: string) => !NO_HTML.test(value)

const contactSchema = z.object({
  name: z.string().min(2).max(100).refine(noHtml, 'Caractères non autorisés'),
  email: z.string().email().max(254),
  subject: z.enum(['support', 'billing', 'privacy', 'partnership', 'other']),
  message: z.string().min(10).max(2000).refine(noHtml, 'HTML non autorisé'),
  website: z.string().max(0),
  elapsedMs: z.number().int().nonnegative().optional(),
})

// A human cannot read the labels, type a name, an email and 10+ characters
// of message in under three seconds.
const MIN_FILL_MS = 3000

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 3

/**
 * In-memory rate limiting.
 *
 * Known limitation: on serverless platforms each instance keeps its own Map and
 * cold-starts wipe it, so this is a speed bump rather than a guarantee. Move to
 * Vercel KV or Upstash Redis before the site sees real traffic.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false

  entry.count++
  return true
}

/** Pretend success so bots get no signal about what tripped the filter. */
function silentSuccess() {
  return NextResponse.json({ success: true }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans une minute.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    // Generic message: never leak field names, enum values, or the honeypot's existence.
    return NextResponse.json(
      { error: 'Requête invalide. Vérifiez les champs du formulaire.' },
      { status: 400 }
    )
  }

  const { name, email, subject, message, website, elapsedMs } = result.data

  // Honeypot filled → bot.
  if (website.length > 0) {
    console.warn('[contact] honeypot triggered', { ip })
    return silentSuccess()
  }

  // Submitted implausibly fast → bot.
  if (typeof elapsedMs === 'number' && elapsedMs < MIN_FILL_MS) {
    console.warn('[contact] submitted too fast', { ip, elapsedMs })
    return silentSuccess()
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    // No key configured (local dev): accept the submission without sending.
    console.info('[contact] RESEND_API_KEY missing — message not sent', { subject })
    return NextResponse.json({ success: true }, { status: 200 })
  }

  try {
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SmartFridge Contact <noreply@smartfridge.app>',
        to: ['support@smartfridge.app'],
        reply_to: email,
        // Plain text only — nothing renders as HTML in the support inbox.
        subject: `[Contact] ${subject} — ${name}`,
        text: `Nom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\n${message}`,
      }),
    })

    if (!emailRes.ok) {
      console.error('[contact] Resend rejected the request:', await emailRes.text())
      return NextResponse.json({ error: 'Envoi impossible.' }, { status: 502 })
    }
  } catch (err) {
    console.error('[contact] network error while sending:', err)
    return NextResponse.json({ error: 'Envoi impossible.' }, { status: 502 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
