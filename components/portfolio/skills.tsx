'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { coreSkills, type Skill } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { Reveal, SectionLabel, SplitText } from './motion-primitives'

function SkillCard({ skill, index, featured }: { skill: Skill; index: number; featured?: boolean }) {
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(0, { stiffness: 200, damping: 20 })
  const ry = useSpring(0, { stiffness: 200, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, color-mix(in oklch, var(--primary) 16%, transparent), transparent 70%)`

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const px = e.clientX - rect.left
        const py = e.clientY - rect.top
        mx.set(px)
        my.set(py)
        ry.set((px / rect.width - 0.5) * 8)
        rx.set(-(py / rect.height - 0.5) * 8)
      }}
      onPointerLeave={() => {
        mx.set(-300)
        my.set(-300)
        rx.set(0)
        ry.set(0)
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      data-cursor
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/40 p-7 transition-colors duration-500 hover:border-primary/40',
        featured && 'md:col-span-2',
      )}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="relative flex items-start justify-between">
        <div className="grid size-14 place-items-center rounded-2xl border border-border bg-background transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
          <img
            src={skill.logo}
            alt={`${skill.name} logo`}
            width={28}
            height={28}
            className={cn('size-7', skill.invert && 'invert')}
            loading="lazy"
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
      </div>

      <div className="relative mt-auto pt-12">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{skill.name}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{skill.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <div className="mb-2 flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">Proficiency</span>
            <span className="text-primary">{skill.level}%</span>
          </div>
          <div
            className="h-1 overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-label={`${skill.name} proficiency`}
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="02">Skills & stack</SectionLabel>
            <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tighter md:text-6xl lg:text-7xl">
              <SplitText text="My core" />{' '}
              <span className="font-serif font-normal italic text-primary">
                <SplitText text="toolkit" delay={0.12} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-pretty text-muted-foreground">
              A modern, battle-tested JavaScript stack I use to ship production apps across web, mobile and the server.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {coreSkills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} featured={i === 0 || i === 5} />
          ))}
        </div>
      </div>
    </section>
  )
}
