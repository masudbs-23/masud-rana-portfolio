'use client'

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Code2, Sparkles } from 'lucide-react'
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

function FloatingChip({
  children,
  className,
  delay,
  depth,
}: {
  children: React.ReactNode
  className: string
  delay: number
  depth: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 180, damping: 18 }}
      style={{ transform: `translateZ(${depth}px)` }}
      className={`absolute z-10 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + depth / 20, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-3 rounded-2xl border border-border bg-background/70 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl"
      >
        {children}
      </motion.div>
    </motion.div>
  )
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
      className="relative mx-auto w-full max-w-[400px] [perspective:1200px]"
    >
      <div
        aria-hidden
        className="absolute inset-x-6 -bottom-6 top-10 -z-10 rounded-[2.5rem] bg-primary/30 blur-3xl"
      />
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <div className="border-beam relative rounded-[2.25rem] p-px">
          <div className="relative overflow-hidden rounded-[calc(2.25rem-1px)] bg-card">
            <div className="relative aspect-[4/5]">
              <Image
                src={profile.image}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 400px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <motion.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0" />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                  {profile.role}
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{profile.name}</p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-background/60 backdrop-blur">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </div>
        </div>

        <FloatingChip className="-left-6 top-10 md:-left-14" delay={1.3} depth={60}>
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Code2 className="size-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">5+ years</span>
            <span className="block text-xs text-muted-foreground">Shipping products</span>
          </span>
        </FloatingChip>

        <FloatingChip className="-right-4 top-1/2 md:-right-12" delay={1.5} depth={80}>
          <span className="flex -space-x-2">
            {['react', 'nextdotjs', 'nodedotjs'].map((slug) => (
              <span
                key={slug}
                className="grid size-8 place-items-center rounded-full border border-border bg-secondary"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/mono.svg`}
                  alt=""
                  className="size-4 invert"
                />
              </span>
            ))}
          </span>
          <span className="text-xs font-medium">Full stack</span>
        </FloatingChip>

        <FloatingChip className="-left-2 bottom-28 md:-left-10" delay={1.7} depth={40}>
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-medium">Open to work</span>
        </FloatingChip>
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
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-16 pt-32"
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
