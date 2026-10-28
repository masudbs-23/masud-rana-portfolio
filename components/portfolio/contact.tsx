'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { profile } from '@/lib/portfolio-data'
import { Magnetic, Reveal, SectionLabel, SplitText } from './motion-primitives'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-10 pt-32 md:pt-44">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 translate-y-1/3 rounded-full bg-primary/20 blur-[140px]"
      />
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05">Contact</SectionLabel>

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

        <Reveal className="mt-28">
          <ul className="grid grid-cols-2 border-t border-border md:grid-cols-4">
            {profile.socials.map((s) => (
              <li key={s.label} className="border-b border-border md:border-b-0 md:[&:not(:last-child)]:border-r even:border-l md:even:border-l-0">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between px-4 py-6 transition-colors hover:bg-card/60"
                >
                  <span className="font-medium">{s.label}</span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="mt-16 flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
          <p>
            {'© '}
            {new Date().getFullYear()} {profile.name}. Crafted with care.
          </p>
          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            className="font-mono text-xs uppercase tracking-[0.2em] hover:text-foreground"
          >
            Back to top ↑
          </motion.a>
        </footer>

        <div aria-hidden className="pointer-events-none mt-10 select-none overflow-hidden">
          <motion.p
            initial={{ y: '60%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="whitespace-nowrap text-center text-[17vw] font-bold leading-[0.8] tracking-tighter text-outline lg:text-[12rem]"
          >
            {profile.name.split(' ')[0].toUpperCase()}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
