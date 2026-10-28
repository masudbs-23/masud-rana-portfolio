'use client'

import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { profile } from '@/lib/portfolio-data'
import { Magnetic, SectionLabel, SplitText } from './motion-primitives'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-28 pt-32 md:pb-36 md:pt-44">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 translate-y-1/3 rounded-full bg-primary/20 blur-[140px]"
      />
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="06">Contact</SectionLabel>

        <h2 className="mt-8 text-balance text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          <SplitText text="Have an idea?" />
          <br />
          <span className="font-serif font-normal italic text-primary">
            <SplitText text="Let's build it." delay={0.2} />
          </span>
        </h2>

        <div className="mt-16 flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-primary py-3 pl-8 pr-3 text-lg font-medium text-primary-foreground md:text-2xl"
            >
              <span className="relative z-10">{profile.email}</span>
              <span className="relative z-10 grid size-12 place-items-center rounded-full bg-primary-foreground text-primary transition-transform duration-500 group-hover:rotate-45 md:size-14">
                <ArrowUpRight className="size-5" />
              </span>
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-foreground"
          >
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
            <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
          </button>
        </div>

      </div>
    </section>
  )
}
