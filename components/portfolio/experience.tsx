'use client'

import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { experience } from '@/lib/portfolio-data'
import { Reveal, SectionLabel, SplitText } from './motion-primitives'

export function Experience() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.5'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24 })

  return (
    <section id="experience" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionLabel index="04">Experience</SectionLabel>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tighter md:text-6xl">
            <SplitText text="The journey" />{' '}
            <span className="font-serif font-normal italic text-primary">
              <SplitText text="so far" delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm text-muted-foreground">
              Five years of shipping products for startups and agencies — learning, leading and building at every step.
            </p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative flex flex-col">
          <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-border" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-primary shadow-[0_0_12px_var(--primary)]"
          />
          {experience.map((item, i) => (
            <li key={item.company} className="relative pb-14 pl-12 last:pb-0">
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-40%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-primary bg-background"
              />
              <Reveal delay={i * 0.05}>
                <div className="group rounded-3xl border border-transparent p-1 transition-colors">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{item.period}</span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{item.role}</h3>
                  <p className="mt-1 font-serif text-xl italic text-muted-foreground">{item.company}</p>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
