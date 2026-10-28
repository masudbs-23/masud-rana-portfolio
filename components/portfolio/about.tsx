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

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-border bg-card/40 p-6 transition-colors duration-500 hover:border-primary/50 hover:bg-card">
                <div className="mb-10 grid size-12 place-items-center rounded-2xl bg-secondary transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="size-5" />
                </div>
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
