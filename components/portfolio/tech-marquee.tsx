import { marqueeTech } from '@/lib/portfolio-data'

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeTech, ...marqueeTech]
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <ul
        className={`flex w-max shrink-0 items-center gap-4 pr-4 hover:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {items.map((tech, i) => (
          <li
            key={`${tech.name}-${i}`}
            aria-hidden={i >= marqueeTech.length}
            className="flex items-center gap-3 rounded-full border border-border bg-card/50 px-5 py-3 transition-colors hover:border-primary/60"
          >
            <img src={tech.logo} alt="" width={20} height={20} className="size-5 invert" loading="lazy" />
            <span className="whitespace-nowrap text-sm font-medium">{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section aria-label="Technologies I work with" className="relative flex flex-col gap-4 border-y border-border py-10">
      <Row />
      <Row reverse />
    </section>
  )
}
