import { About } from '@/components/portfolio/about'
import { CursorGlow, ScrollProgress } from '@/components/portfolio/ambient'
import { Contact } from '@/components/portfolio/contact'
import { Experience } from '@/components/portfolio/experience'
import { Footer } from '@/components/portfolio/footer'
import { Hero } from '@/components/portfolio/hero'
import { Nav } from '@/components/portfolio/nav'
import { Projects } from '@/components/portfolio/projects'
import { Skills } from '@/components/portfolio/skills'
import { TechMarquee } from '@/components/portfolio/tech-marquee'

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div aria-hidden className="bg-noise pointer-events-none fixed inset-0 z-[55] opacity-[0.035] mix-blend-overlay" />
      <Nav />
      <main className="relative overflow-x-clip">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
