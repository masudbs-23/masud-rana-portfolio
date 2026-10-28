'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { coreSkills, type Skill } from '@/lib/portfolio-data'
import { cn } from '@/lib/utils'
import { Reveal, SectionLabel, SplitText } from './motion-primitives'

const EASE = [0.22, 1, 0.36, 1] as const
const RADIUS = 92
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const CYCLE_MS = 5000

function Logo({ skill, className }: { skill: Skill; className?: string }) {
  return (
    <img
      src={skill.logo}
      alt=""
      aria-hidden
      className={cn(className, skill.invert && 'invert')}
      loading="lazy"
    />
  )
}

function Gauge({ skill }: { skill: Skill }) {
  const ticks = Array.from({ length: 60 })
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[300px] place-items-center">
      <div aria-hidden className="absolute inset-[18%] rounded-full bg-primary/15 blur-3xl" />

      <svg viewBox="0 0 240 240" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        {ticks.map((_, i) => {
          const angle = (i / ticks.length) * Math.PI * 2
          const inner = 108
          const outer = i % 5 === 0 ? 116 : 112
          return (
            <line
              key={i}
              x1={120 + Math.cos(angle) * inner}
              y1={120 + Math.sin(angle) * inner}
              x2={120 + Math.cos(angle) * outer}
              y2={120 + Math.sin(angle) * outer}
              stroke="currentColor"
              strokeWidth={1}
              className={cn(
                'transition-colors duration-700',
                i / ticks.length < skill.level / 100 ? 'text-primary/70' : 'text-foreground/10',
              )}
            />
          )
        })}
        <circle cx="120" cy="120" r={RADIUS} fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/[0.06]" />
        <motion.circle
          cx="120"
          cy="120"
          r={RADIUS}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - skill.level / 100) }}
          transition={{ duration: 1.4, ease: EASE }}
          style={{ filter: 'drop-shadow(0 0 6px var(--primary))' }}
        />
      </svg>

      <div aria-hidden className="absolute inset-[24%] animate-spin-slow rounded-full border border-dashed border-foreground/10" />

      <div className="relative grid size-[38%] place-items-center rounded-full border border-border bg-background/80 shadow-[inset_0_1px_0_oklch(1_0_0/8%)] backdrop-blur">
        <AnimatePresence mode="wait">
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.6, rotate: -30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.6, rotate: 30, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Logo skill={skill} className="size-12 md:size-14" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function SkillPanel({ skill, index }: { skill: Skill; index: number }) {
  return (
    <div className="relative rounded-[2rem] p-px">
      <div aria-hidden className="border-beam absolute inset-0 rounded-[2rem] opacity-70" />
      <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-card">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

        <div className="relative flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-primary" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {'~/stack/'}
            <span className="text-foreground">{skill.name.toLowerCase().replace(/[\s.]/g, '')}</span>
          </span>
          <span className="font-mono text-xs text-muted-foreground">{`0${index + 1}/0${coreSkills.length}`}</span>
        </div>

        <div className="relative grid gap-8 p-6 md:p-8 sm:grid-cols-[1fr_1.1fr] sm:items-center">
          <Gauge skill={skill} />

          <AnimatePresence mode="wait">
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{skill.layer}</p>
              <h3 className="mt-3 text-4xl font-semibold tracking-tighter md:text-5xl">{skill.name}</h3>
              <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{skill.blurb}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {skill.tags.map((tag, i) => (
                  <motion.li
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.06, ease: EASE }}
                    className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs"
                  >
                    {tag}
                  </motion.li>
                ))}
              </ul>

              <dl className="mt-8 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background/40">
                {[
                  { label: 'Mastery', value: `${skill.level}%` },
                  { label: 'Years', value: `${skill.years}+` },
                  { label: 'Shipped', value: skill.shipped },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</dt>
                    <dd className="mt-1 text-xl font-semibold tracking-tight">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % coreSkills.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused, active])

  return (
    <section id="skills" className="relative px-6 py-32 md:py-44">
      <div aria-hidden className="absolute right-0 top-1/3 -z-10 h-[420px] w-[520px] rounded-full bg-primary/10 blur-[140px]" />
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
              One language, every layer. From pixel-perfect interfaces to the database underneath — hover a tool to dive in.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div
            className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
          >
            <div role="tablist" aria-label="Core skills" aria-orientation="vertical" className="flex flex-col">
              {coreSkills.map((skill, i) => {
                const isActive = i === active
                return (
                  <button
                    key={skill.name}
                    type="button"
                    role="tab"
                    id={`skill-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls="skill-panel"
                    onClick={() => setActive(i)}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-cursor
                    className="group relative flex items-center gap-4 border-b border-border px-4 py-5 text-left outline-none first:border-t md:gap-6"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skill-highlight"
                        aria-hidden
                        className="absolute inset-0 rounded-2xl border border-primary/30 bg-primary/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={cn(
                        'relative font-mono text-xs transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {`0${i + 1}`}
                    </span>
                    <span
                      className={cn(
                        'relative grid size-10 shrink-0 place-items-center rounded-xl border bg-background transition-all duration-500',
                        isActive ? 'border-primary/40 scale-110' : 'border-border grayscale group-hover:grayscale-0',
                      )}
                    >
                      <Logo skill={skill} className="size-5" />
                    </span>
                    <span className="relative flex-1">
                      <span
                        className={cn(
                          'block text-xl font-semibold tracking-tight transition-all duration-500 md:text-2xl',
                          isActive ? 'translate-x-1 text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {skill.name}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {skill.layer}
                      </span>
                    </span>
                    <span className="relative hidden w-24 sm:block" aria-hidden>
                      <span className="block h-px w-full bg-border" />
                      <motion.span
                        className="absolute left-0 top-0 block h-px bg-primary"
                        initial={false}
                        animate={{ width: isActive ? `${skill.level}%` : '0%' }}
                        transition={{ duration: 0.8, ease: EASE }}
                      />
                    </span>
                    <span
                      className={cn(
                        'relative w-10 text-right font-mono text-sm tabular-nums transition-colors',
                        isActive ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {skill.level}
                    </span>
                    {isActive && !paused && (
                      <motion.span
                        key={`progress-${active}`}
                        aria-hidden
                        className="absolute bottom-0 left-4 h-px bg-primary/60"
                        initial={{ width: 0 }}
                        animate={{ width: 'calc(100% - 2rem)' }}
                        transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} className="lg:sticky lg:top-28">
              <SkillPanel skill={coreSkills[active]} index={active} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
