'use client'

import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '@/lib/portfolio-data'
import { Magnetic } from './motion-primitives'

function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date())
    setTime(format())
    const id = setInterval(() => setTime(format()), 1000)
    return () => clearInterval(id)
  }, [])

  return <span className="tabular-nums">{time ?? '--:--:-- --'}</span>
}

function FooterLink({ href, children, external }: { href: string; children: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="h-px w-0 bg-primary transition-all duration-500 group-hover:w-4" aria-hidden />
      {children}
      {external && (
        <ArrowUpRight className="size-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      )}
    </a>
  )
}

export function Footer() {
  const mx = useMotionValue(-1000)
  const my = useMotionValue(-1000)
  const mask = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, black 20%, transparent 70%)`

  return (
    <footer className="relative px-4 pb-4 md:px-6 md:pb-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-card/50 backdrop-blur-sm">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div aria-hidden className="absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div aria-hidden className="bg-grid absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

        <div className="relative grid gap-12 px-6 pb-10 pt-14 md:grid-cols-12 md:px-12">
          <div className="md:col-span-5">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">
                MR
              </span>
              <span className="text-lg font-semibold tracking-tight">{profile.name}</span>
            </a>
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Full stack developer crafting fast, beautiful products across{' '}
              <span className="font-serif text-lg italic text-foreground">web, mobile & server.</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                Available for new projects
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-muted-foreground">
                {profile.location.split(',')[0]}
                <span className="text-foreground/30">{'/'}</span>
                <LocalTime />
              </span>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50">Navigate</p>
            <ul className="mt-6 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <FooterLink href={`#${l.id}`}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50">Connect</p>
            <ul className="mt-6 flex flex-col gap-3">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <FooterLink href={s.href} external>
                    {s.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-3 border-b border-border pb-1 text-lg font-medium transition-colors hover:border-primary"
            >
              {profile.email}
              <ArrowUpRight className="size-4 text-primary transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        <div
          aria-hidden
          className="relative select-none overflow-hidden px-4 md:px-8"
          onPointerMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            mx.set(e.clientX - rect.left)
            my.set(e.clientY - rect.top)
          }}
          onPointerLeave={() => {
            mx.set(-1000)
            my.set(-1000)
          }}
        >
          <motion.p
            initial={{ y: '40%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-outline whitespace-nowrap text-center text-[14.5vw] font-bold leading-[0.85] tracking-tighter xl:text-[11.5rem]"
          >
            {profile.name.toUpperCase()}
          </motion.p>
          <motion.p
            className="pointer-events-none absolute inset-x-4 top-0 whitespace-nowrap bg-gradient-to-b from-primary to-primary/30 bg-clip-text text-center text-[14.5vw] font-bold leading-[0.85] tracking-tighter text-transparent md:inset-x-8 xl:text-[11.5rem]"
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          >
            {profile.name.toUpperCase()}
          </motion.p>
        </div>

        <div className="relative flex flex-col items-start justify-between gap-4 border-t border-border px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:px-12">
          <p>
            {'© '}
            {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs">Designed & built with Next.js + Motion</p>
          <Magnetic strength={0.4}>
            <a
              href="#top"
              aria-label="Back to top"
              className="group grid size-12 place-items-center rounded-full border border-border bg-background transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowUp className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  )
}
