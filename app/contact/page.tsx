'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Clock, Check, CircleAlert, Send, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { CONTACT_EMAIL } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Nom trop court').max(100),
  email: z.string().email('Email invalide'),
  subject: z.enum(['support', 'billing', 'privacy', 'partnership', 'other'], {
    required_error: 'Sélectionnez un sujet',
  }),
  message: z
    .string()
    .min(10, 'Message trop court (10 caractères minimum)')
    .max(2000, 'Message trop long (2000 caractères maximum)'),
  // Honeypot — must stay empty. Bots that fill every field get caught here.
  website: z.string().max(0),
})

type FormData = z.infer<typeof schema>

const subjects = [
  { value: 'support',     label: 'Support technique' },
  { value: 'billing',     label: 'Facturation & abonnement' },
  { value: 'privacy',     label: 'Confidentialité & RGPD' },
  { value: 'partnership', label: 'Partenariat / Presse' },
  { value: 'other',       label: 'Autre' },
]

const contactInfos = [
  { Icon: Mail,  title: 'Nous écrire',        value: CONTACT_EMAIL,    href: `mailto:${CONTACT_EMAIL}` },
  { Icon: Clock, title: 'Temps de réponse',   value: 'Sous 48 h',      href: null },
]

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Bot mitigation: record when the form became interactive. A real person needs
  // several seconds to fill this in; scripted submissions arrive near-instantly.
  const mountedAt = useRef<number>(0)
  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      })
      if (res.ok) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full px-4 py-3 rounded-xl border text-gray-900 text-sm transition-colors duration-200 min-h-[48px]',
      'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent',
      hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'
    )

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-20 section-padding text-center" aria-labelledby="contact-hero-heading">
        <div className="container-max">
          <span className="badge bg-white/15 text-white border border-white/20 mb-4">
            Contact &amp; Support
          </span>
          <h1 id="contact-hero-heading" className="heading-xl text-white mb-5">
            Une question ? On est <span className="text-secondary-400">là pour vous</span>
          </h1>
          <p className="text-white/80 text-xl max-w-xl mx-auto">
            Notre équipe répond en moins de 24 h ouvrées.
            Pour les urgences premium, réponse en 4 h.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-gray-50" aria-label="Formulaire de contact">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

            {/* Sidebar */}
            <div className="space-y-4">
              {contactInfos.map(({ Icon, title, value, href }) => (
                <div key={title} className="card p-5">
                  <div className="flex items-center gap-3 mb-1">
                    <Icon className="w-5 h-5 text-gray-900 flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-sm font-semibold text-gray-900">{title}</span>
                  </div>
                  {href ? (
                    <a href={href} className="text-primary-700 text-sm hover:underline ml-8 block">
                      {value}
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm ml-8">{value}</p>
                  )}
                </div>
              ))}

              <div className="card p-5 bg-gray-100 border-gray-200">
                <h2 className="font-semibold text-gray-900 text-sm mb-2">Support in-app</h2>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Disponible dans l&apos;application via <strong>Paramètres → Aide</strong>.
                  Les abonnés Elite bénéficient d&apos;un support prioritaire.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="heading-sm text-gray-900 mb-6">Envoyer un message</h2>

                {/* Status messages are announced to screen readers */}
                <div aria-live="polite" aria-atomic="true">
                  {status === 'success' && (
                    <div className="mb-6 p-4 bg-gray-100 border border-gray-300 rounded-xl text-gray-900 flex items-start gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                      <div>
                        <strong>Message envoyé</strong>
                        <p className="text-sm mt-0.5">Nous vous répondrons dans les 24 h ouvrées.</p>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl text-red-800 flex items-start gap-3">
                      <CircleAlert className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                      <div>
                        <strong>Le message n&apos;est pas parti</strong>
                        <p className="text-sm mt-0.5">
                          Réessayez, ou écrivez directement à{' '}
                          <a href={`mailto:${CONTACT_EMAIL}`} className="underline font-medium">
                            {CONTACT_EMAIL}
                          </a>{' '}
                          — votre message ne sera pas perdu.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/*
                    Honeypot. Positioned off-screen rather than display:none —
                    some bots skip hidden fields but fill absolutely-positioned ones.
                    Never focusable, never announced, excluded from autofill.
                  */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      width: 1,
                      height: 1,
                      overflow: 'hidden',
                      clip: 'rect(0 0 0 0)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <label htmlFor="website">Ne pas remplir ce champ</label>
                    <input
                      id="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('website')}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nom complet <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                        {...register('name')}
                        className={inputClass(!!errors.name)}
                        placeholder="Votre nom"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-700 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-describedby={errors.email ? 'email-error' : 'email-help'}
                        aria-invalid={!!errors.email}
                        {...register('email')}
                        className={inputClass(!!errors.email)}
                        placeholder="votre.email@exemple.com"
                      />
                      <p id="email-help" className="text-gray-500 text-xs mt-1">Jamais partagé à des tiers.</p>
                      {errors.email && (
                        <p id="email-error" className="text-red-700 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Sujet <span aria-hidden="true">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      {...register('subject')}
                      className={inputClass(!!errors.subject)}
                    >
                      <option value="">Sélectionner un sujet…</option>
                      {subjects.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="text-red-700 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                      {...register('message')}
                      className={cn(inputClass(!!errors.message), 'resize-y')}
                      placeholder="Décrivez votre demande en détail…"
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-700 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'loading' ? (
                      <>
                        <LoaderCircle className="w-5 h-5 animate-spin" strokeWidth={2} aria-hidden="true" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send className="w-[18px] h-[18px]" strokeWidth={2} aria-hidden="true" />
                        Envoyer le message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    En soumettant ce formulaire, vous acceptez notre{' '}
                    <a href="/privacy" className="text-primary-700 hover:underline">
                      politique de confidentialité
                    </a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
