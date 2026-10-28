'use client'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { profile, stats } from '@/lib/portfolio-data'
import { Counter, Magnetic, SplitText } from './motion-primitives'

const roles = ['web apps', 'mobile apps', 'scalable APIs', 'digital products']

function RotatingWord() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block overflow-hidden align-bottom leading-[inherit]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[index]}
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block font-serif text-[1.2em] italic leading-none text-primary"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const orbitLogos = ['react', 'nextdotjs', 'nodedotjs', 'postgresql', 'mongodb', 'typescript']

const formatPercent = (value: number) => `${value.toFixed(6)}%`

function OrbitRing() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[118%] -translate-x-1/2 -translate-y-1/2 sm:size-[132%]"
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-foreground/10" />
      <div className="absolute inset-[14%] rounded-full border border-foreground/[0.06]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        {orbitLogos.map((slug, i) => {
          const angle = (i / orbitLogos.length) * Math.PI * 2
          return (
            <div
              key={slug}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: formatPercent(50 + 50 * Math.cos(angle)), top: formatPercent(50 + 50 * Math.sin(angle)) }}
            >
              <motion.span
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="grid size-10 place-items-center rounded-full border border-border bg-card/90 shadow-lg shadow-black/40 backdrop-blur"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/mono.svg`}
                  alt=""
                  className="size-4 opacity-80 invert"
                />
              </motion.span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

function CropMarks() {
  const base = 'absolute size-4 border-foreground/30'
  return (
    <div aria-hidden className="pointer-events-none absolute -inset-4">
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </div>
  )
}

function RotatingBadge() {
  return null
}

function Portrait() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(my, [-0.5, 0.5], ['0%', '100%'])
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, oklch(1 0 0 / 18%), transparent 55%)`,
  )

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[340px] [perspective:1400px] sm:max-w-[380px]"
    >
      <OrbitRing />
      <div
        aria-hidden
        className="absolute inset-x-10 bottom-0 top-1/3 -z-10 rounded-full bg-primary/25 blur-[90px]"
      />
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative"
      >
        <CropMarks />

        <div className="relative rounded-[2.5rem] border border-foreground/10 bg-foreground/[0.02] p-2.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
          <div className="border-beam relative rounded-[2rem] p-px">
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-card">
              <div className="relative aspect-[3/4]">
                <Image
                  src={profile.image}
                  alt={`Portrait of ${profile.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 380px, 90vw"
                  className="object-cover object-top grayscale-[40%] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,oklch(0.135_0.004_260/0.6))]" />
                <div aria-hidden className="bg-noise absolute inset-0 opacity-[0.08] mix-blend-overlay" />
                <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0" />

                <span className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-foreground/15 bg-background/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/80 backdrop-blur-md">
                  {'Portfolio \u00b7 2026'}
                </span>
              </div>

            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 160, damping: 18 }}
          style={{ transform: 'translateZ(60px)' }}
          className="absolute -right-4 top-1/3 z-20 sm:-right-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-2xl border border-border bg-background/75 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <p className="flex items-baseline gap-1 text-3xl font-semibold tracking-tight">
              5<span className="text-primary">+</span>
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-[0.2em] text-muted-foreground">
              Years of
              <br />
              experience
            </p>
          </motion.div>
        </motion.div>

      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-16 pt-40"
    >
      <div aria-hidden className="bg-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <motion.div
        aria-hidden
        style={{ scale: orbScale }}
        className="absolute right-[10%] top-[40%] -z-10 size-[520px] -translate-y-1/2 rounded-full bg-primary/20 blur-[140px] md:size-[680px]"
      />
      <div
        aria-hidden
        className="absolute -left-40 top-0 -z-10 size-[420px] rounded-full bg-[oklch(0.55_0.18_280/0.18)] blur-[140px]"
      />

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="text-muted-foreground">Available for new projects</span>
              <span className="hidden text-border sm:inline">|</span>
              <span className="hidden font-mono text-xs sm:inline">{profile.location}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground"
            >
              {"Hi, I'm "}
              <span className="text-shimmer font-semibold">{profile.name}</span>
            </motion.p>

            <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl lg:text-[6.5rem]">
              <SplitText text="Full stack" delay={0.4} />
              <br />
              <span className="font-serif font-normal italic text-muted-foreground">
                <SplitText text="developer" delay={0.55} />
              </span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 14 }}
                className="ml-2 inline-block size-4 rounded-full bg-primary align-baseline shadow-[0_0_24px_var(--primary)] md:size-5"
                aria-hidden
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              {'I design and build '}
              <RotatingWord />
              <br className="hidden sm:block" />
              {' with React, Next.js, React Native, Node.js, PostgreSQL & MongoDB.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_40px_-6px_var(--primary)]"
                >
                  View my work
                  <span className="grid size-10 place-items-center rounded-full bg-primary-foreground text-primary transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-4 font-medium backdrop-blur transition-colors hover:border-foreground"
                >
                  Get in touch
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <Portrait />
        </div>

        <motion.dl
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } } }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="group relative flex flex-col gap-1 overflow-hidden bg-background p-6 transition-colors hover:bg-card"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
              />
              <dd className="text-4xl font-semibold tracking-tight md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="text-sm text-muted-foreground">{s.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDownRight className="size-4 rotate-45" />
        </motion.span>
        Scroll
      </motion.a>
    </section>
  )
}
