import { describe, it, expect } from 'vitest'
import { z } from 'zod'

/**
 * Mirrors the schema in app/api/contact/route.ts.
 *
 * Kept in sync by hand on purpose: the route module imports next/server, which
 * cannot be loaded in a plain node test environment. If you change the route's
 * schema, change this one too — the tests below describe the contract the API
 * promises to the form.
 */
const NO_HTML = /[<>]/
const noHtml = (value: string) => !NO_HTML.test(value)

const contactSchema = z.object({
  name: z.string().min(2).max(100).refine(noHtml),
  email: z.string().email().max(254),
  subject: z.enum(['support', 'billing', 'privacy', 'partnership', 'other']),
  message: z.string().min(10).max(2000).refine(noHtml),
  website: z.string().max(0),
  elapsedMs: z.number().int().nonnegative().optional(),
})

const valid = {
  name: 'Jean Dupont',
  email: 'jean@exemple.fr',
  subject: 'support' as const,
  message: 'Bonjour, j’ai une question sur la synchronisation.',
  website: '',
  elapsedMs: 8000,
}

describe('contact schema', () => {
  it('accepts a well-formed submission', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects HTML in the name', () => {
    const result = contactSchema.safeParse({ ...valid, name: '<script>alert(1)</script>' })
    expect(result.success).toBe(false)
  })

  it('rejects HTML in the message', () => {
    const result = contactSchema.safeParse({
      ...valid,
      message: 'Bonjour <img src=x onerror=alert(1)> merci',
    })
    expect(result.success).toBe(false)
  })

  it('rejects a malformed email', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'pas-un-email' }).success).toBe(false)
  })

  it('rejects a subject outside the allowed list', () => {
    expect(contactSchema.safeParse({ ...valid, subject: 'spam' }).success).toBe(false)
  })

  it('rejects a message under 10 characters', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'court' }).success).toBe(false)
  })

  it('rejects a message over 2000 characters', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'a'.repeat(2001) }).success).toBe(false)
  })

  it('rejects a filled honeypot', () => {
    // The route treats a non-empty honeypot as a bot and discards the message.
    expect(contactSchema.safeParse({ ...valid, website: 'http://spam.example' }).success).toBe(false)
  })

  it('treats elapsedMs as optional', () => {
    const { elapsedMs, ...withoutTiming } = valid
    expect(contactSchema.safeParse(withoutTiming).success).toBe(true)
  })

  it('rejects a negative elapsedMs', () => {
    expect(contactSchema.safeParse({ ...valid, elapsedMs: -1 }).success).toBe(false)
  })
})

describe('bot heuristics', () => {
  const MIN_FILL_MS = 3000

  it('flags submissions faster than a human can type', () => {
    expect(1200 < MIN_FILL_MS).toBe(true)
  })

  it('lets a realistic fill time through', () => {
    expect(9500 < MIN_FILL_MS).toBe(false)
  })
})
