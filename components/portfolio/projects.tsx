'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Code2 as Github } from 'lucide-react'
import { useRef } from 'react'
import { projects, type Project } from '@/lib/portfolio-data'
import { SectionLabel, SplitText } from './motion-primitives'

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  const { scrollYProgress: exitProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const cardScale = useTransform(exitProgress, [0, 1], [1, 1 - (total - index) * 0.04])
  const cardOpacity = useTransform(exitProgress, [0, 1], [1, index === total - 1 ? 1 : 0.4])

  return (
    <div
      ref={ref}
      className="sticky h-[calc(100svh-9rem)] max-h-[680px] min-h-[520px]"
      style={{ top: `calc(6.5rem + ${index * 20}px)` }}
    >
      <motion.article
        style={{ scale: cardScale, opacity: cardOpacity }}
        className="group relative grid h-full overflow-hidden rounded-[2rem] border border-border bg-card md:grid-cols-[1fr_1.35fr]"
      >
        <div className="relative z-10 flex flex-col justify-between gap-8 p-7 md:p-10">
          <div>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
            <div className="mt-6 text-6xl font-bold tracking-tighter text-outline md:text-7xl" aria-hidden>
              0{index + 1}
            </div>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">{project.title}</h3>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden />
              {project.metric}
            </div>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-border px-3 py-1 text-xs">
                  {s}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <a
                href={project.live}
                className="group/btn inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Live demo
                <ArrowUpRight className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
              </a>
              <a
                href={project.code}
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
              >
                <Github className="size-4" />
                Code
              </a>
            </div>
          </div>
        </div>

        <div className="relative hidden overflow-hidden md:block">
          <motion.img
            src={project.image}
            alt={`${project.title} preview`}
            style={{ scale: imageScale }}
            className="absolute inset-0 size-full object-cover transition-[filter] duration-700 group-hover:brightness-110"
            loading="lazy"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-card via-card/10 to-transparent" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-0 md:hidden">
          <img src={project.image} alt="" className="size-full object-cover opacity-20" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/40" />
        </div>
      </motion.article>
    </div>
  )
}

export function Projects() {
  return (
    <section id="work" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03">Selected work</SectionLabel>
        <h2 className="mt-6 text-balance text-4xl font-semibold tracking-tighter md:text-6xl lg:text-7xl">
          <SplitText text="Projects that" />{' '}
          <span className="font-serif font-normal italic text-primary">
            <SplitText text="make an impact" delay={0.15} />
          </span>
        </h2>

        <div className="mt-16 flex flex-col gap-[25vh]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  )
}
