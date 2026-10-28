'use client'

import { motion } from 'motion/react'
import { education } from '@/lib/portfolio-data'
import { Reveal, SectionLabel, SplitText } from './motion-primitives'

export function Education() {
  return (
    <section id="education" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.6fr]">
        <div className="md:sticky md:top-32 md:self-start">
          <SectionLabel index="05">Education</SectionLabel>
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tighter md:text-6xl">
            <SplitText text="The foundation" />{' '}
            <span className="font-serif font-normal italic text-primary">
              <SplitText text="behind the work" delay={0.12} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm text-muted-foreground">
              The curiosity, discipline and fundamentals that continue to shape how I build products.
            </p>
          </Reveal>
        </div>

        <ol className="relative flex flex-col gap-10">
          {education.map((item, i) => (
            <li key={item.institution} className="relative pl-12">
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-40%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-primary bg-background"
              />
              {i < education.length - 1 && <span aria-hidden className="absolute bottom-[-2.5rem] left-[7px] top-5 w-px bg-border" />}
              <Reveal delay={i * 0.08}>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">{item.period}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{item.degree}</h3>
                <p className="mt-1 font-serif text-xl italic text-muted-foreground">{item.institution}</p>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{item.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
