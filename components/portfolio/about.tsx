'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Code2, Gauge, Layers, Smartphone } from 'lucide-react'
import { useRef } from 'react'
import { Reveal, SectionLabel } from './motion-primitives'

const statement =
  'I turn ambitious ideas into fast, scalable and beautifully crafted products — from pixel-perfect interfaces to rock-solid backends that just work.'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

const pillars = [
  { icon: Layers, title: 'End-to-end ownership', text: 'Database schema to deployed UI — one developer, zero hand-off friction.' },
  { icon: Gauge, title: 'Performance obsessed', text: 'Core Web Vitals in the green, APIs that respond in milliseconds.' },
  { icon: Smartphone, title: 'Web + Mobile', text: 'Shared logic across Next.js and React Native for faster delivery.' },
  { icon: Code2, title: 'Clean, typed code', text: 'TypeScript everywhere, tested and maintainable for the long run.' },
]

export function About() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = statement.split(' ')

  return (
    <section id="about" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01">About me</SectionLabel>

        <p
          ref={ref}
          className="mt-10 text-balance text-3xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl"
        >
          {words.map((word, i) => (
            <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
        </p>

        <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-card/35 p-3 shadow-2xl shadow-black/20 md:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,oklch(0.91_0.2_124_/_12%),transparent_30%)]" />
          <div className="relative grid gap-px overflow-hidden rounded-[1.35rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group relative flex min-h-[13.5rem] flex-col justify-between overflow-hidden bg-background/80 p-6 transition-colors duration-500 hover:bg-card md:p-7">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.65rem] tracking-[0.25em] text-primary/80">0{i + 1}</span>
                    <p.icon className="size-5 text-muted-foreground transition-colors duration-500 group-hover:text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-medium tracking-tight">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
