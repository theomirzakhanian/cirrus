import type { ReactNode } from 'react'
import { Dashed } from './components/bits'
import { Cta, Footer } from './components/end'
import { Intro, Pitch, Reorder, Stack, UseCases, Weight } from './components/features'
import { Hero } from './components/hero'
import { StickyNav } from './components/nav'
import { Open } from './components/open'
import { Config, Theming } from './components/theming'

/** A full-width band with the two page rails. Sections go inside. */
function Band({ children }: { children: ReactNode }) {
  return (
    <section className="border-b border-line">
      <div className="shell">
        <div className="frame">{children}</div>
      </div>
    </section>
  )
}

// The page, top to bottom. Every section is self-contained:
// delete a line to drop it, move a line to reorder it.
export default function App() {
  return (
    <>
      <main>
        <Hero />
        <StickyNav />
        <Intro />
        <Band>
          <Stack />
          <Pitch />
          <UseCases />
          <Dashed />
          <Weight />
          <Dashed />
          <Reorder />
        </Band>
        <Band>
          <Theming />
          <Dashed />
          <Config />
        </Band>
        <Band>
          <Open />
        </Band>
        <Cta />
      </main>
      <Footer />
    </>
  )
}
