'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { faqs } from '@/lib/faq'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section-padding bg-canvas" aria-labelledby="faq-heading">
      <div className="container-max">
        <div className="mb-10 max-w-2xl">
          <span className="section-label">Questions</span>
          <h2 id="faq-heading" className="heading-lg text-ink mt-3">
            Ce qu’on nous demande le plus.
          </h2>
        </div>

        <div className="max-w-3xl divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span
                      className={cn(
                        'font-semibold transition-colors duration-200',
                        isOpen ? 'text-primary-700' : 'text-ink group-hover:text-primary-700'
                      )}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 flex-shrink-0 transition-transform duration-300',
                        isOpen ? 'rotate-180 text-primary-700' : 'text-gray-400'
                      )}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  hidden={!isOpen}
                  className="pb-5 pr-8"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10">
          <Link
            href="/contact"
            prefetch
            className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:text-primary-800 transition-colors"
          >
            Poser une autre question
            <ArrowRight className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
