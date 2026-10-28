'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
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

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
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
        className="absolute left-1/2 top-[38%] -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px] md:size-[720px]"
      />
      <motion.div
        aria-hidden
        className="absolute right-[8%] top-[22%] -z-10 hidden size-40 rounded-full border border-primary/30 md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_20px_var(--primary)]" />
      </motion.div>

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl">
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

        <h1 className="text-balance text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <SplitText text="Full stack" delay={0.4} />
          <br />
          <span className="font-serif font-normal italic text-muted-foreground">
            <SplitText text="developer" delay={0.55} />
          </span>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 14 }}
            className="ml-2 inline-block size-4 rounded-full bg-primary align-baseline md:size-6"
            aria-hidden
          />
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {"I'm "}
            <span className="text-foreground">{profile.name}</span>
            {' — I design and build '}
            <RotatingWord />
            <br className="hidden sm:block" />
            {' with React, Next.js, React Native, Node.js, PostgreSQL & MongoDB.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05 }}
            className="flex flex-wrap items-center gap-4 md:justify-end"
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
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 font-medium transition-colors hover:border-foreground"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
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
              className="flex flex-col gap-1 bg-background p-6"
            >
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
