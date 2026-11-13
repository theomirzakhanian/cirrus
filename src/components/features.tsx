import { ArrowUpDown, Braces, Check, ChevronLeft, ChevronRight, Eye, FileCode, FolderOpen, GitCommitHorizontal, Image, Palette, RotateCw, Search, Terminal, Type, type LucideIcon } from 'lucide-react'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { siGithub } from 'simple-icons'
import { apps } from '../apps'
import { site } from '../site'
import { weights, type WeightKey } from '../weights'
import { Brand, Caption, Crumb, Hand, Ink, useSeen } from './bits'

/* ───────────────────────── Intro ───────────────────────── */

export function Intro() {
  return (
    <div id="intro" className="border-b border-line">
      <div className="shell">
        <div className="frame rails flex flex-col gap-8 px-6 pt-16 pb-16 lg:flex-row lg:gap-16 lg:px-36 lg:pt-[106px] lg:pb-24">
          <div className="shrink-0 lg:w-64">
            <Crumb href="#sections">Introducing {site.name}</Crumb>
          </div>
          <div className="max-w-[676px] space-y-8 font-display text-xl font-[450] leading-7 text-muted">
            <p>
              <span className="font-[500] text-ink">Most open source landing pages are an afterthought.</span> A README pasted under a logo. A docs link that 404s. The project is
              good, and the page says nothing about it.
            </p>
            <p>
              <span className="font-[500] text-ink">{site.name} is a landing page built for open source.</span> Every section on this page is real code you can fork, restyle, and
              ship in an afternoon: hero, feature cards, charts, and footer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Stack wall ───────────────────────── */

// The wall is a flat 8 x 3 grid laid on a floor that tilts away from you.
const CELL = 200
const GAP = 40

export function Stack() {
  const [ref, seen] = useSeen<HTMLDivElement>()
  return (
    <div className="bg-gradient-to-b from-wash to-white">
      <div className="rails px-6 pt-16 pb-6 text-center lg:pt-24">
        <Crumb href="#use-cases">Launch anywhere</Crumb>
        <h2 className="mt-6 font-display text-[32px] leading-9 font-[500] text-balance text-ink md:text-[44px] md:leading-[48px]">
          Anything you build in the open, <br className="hidden md:block" />
          {site.name} can launch for you.
        </h2>
      </div>
      <div ref={ref} aria-hidden="true" className="rails relative -mt-4 h-[150px] overflow-hidden md:-mt-8 md:h-[210px] lg:-mt-12 lg:h-[262px] xl:-mt-16 xl:h-80">
        <div className="absolute inset-0 [mask-image:linear-gradient(#000_0%,#000_62%,transparent_100%)]">
          <div
            className="absolute bottom-0 left-1/2 -ml-[594px] h-80 w-[1188px] origin-bottom max-xl:scale-[0.8] max-lg:scale-[0.62] max-md:scale-[0.42]"
            style={{ perspective: '1200px', perspectiveOrigin: '50% 100%' }}
          >
            <div
              className="absolute bottom-0 left-1/2 grid grid-cols-8"
              style={{
                width: CELL * 8 + GAP * 7,
                marginLeft: -(CELL * 8 + GAP * 7) / 2,
                gap: GAP,
                transformOrigin: '50% 100%',
                transform: 'rotateX(48deg) scale(0.65)',
              }}
            >
              {apps.map((app, i) => (
                <div
                  key={app.name}
                  className="relative transition-[opacity,transform] duration-700 ease-(--ease-out)"
                  style={{
                    width: CELL,
                    height: CELL,
                    opacity: seen ? 1 : 0,
                    transform: seen ? 'none' : 'translateY(36px) scale(0.88)',
                    transitionDelay: `${(2 - Math.floor(i / 8)) * 110 + (i % 8) * 40}ms`,
                  }}
                >
                  <div className="absolute top-[172px] left-1/2 -ml-[78px] h-11 w-[156px] rounded-full bg-[radial-gradient(rgb(0_0_0/0.4)_0%,rgb(0_0_0/0.28)_45%,transparent_72%)] blur-[5px]" />
                  <div
                    className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[45px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.05),inset_0_2px_1px_rgb(255_255_255/0.5)]"
                    style={{ background: app.bg }}
                  >
                    <svg viewBox={app.vb} style={{ width: `${app.size * 100}%`, height: `${app.size * 100}%` }} dangerouslySetInnerHTML={{ __html: app.body }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Pitch() {
  return (
    <div className="rails px-6 py-16 lg:px-[264px] lg:py-24">
      <p className="text-lg leading-7 text-ink">
        Unlike a site builder, {site.name} is plain React and CSS in your own repo. No account, no editor, no theme store. One link, and it reads properly wherever you
        post it: Slack, LinkedIn, X, Product Hunt, a Notion page.
      </p>
    </div>
  )
}

/* ───────────────────────── Use cases ───────────────────────── */

export function Pic({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={`relative h-80 overflow-hidden rounded-[11px] bg-fill select-none ${className}`}>
      {children}
    </div>
  )
}

function Bubble({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`absolute bottom-[calc(100%-106px)] left-8 max-w-[calc(100%-64px)] rounded-[10px] bg-white px-3 py-1.5 font-display text-base leading-6 font-[525] text-ink shadow-[0_1px_2px_rgb(0_0_0/0.06)] ${className}`}>
      {children}
    </p>
  )
}

function PicFork() {
  return (
    <Pic className="bg-[radial-gradient(120%_90%_at_0%_0%,#e6c8f6_0%,transparent_55%),radial-gradient(90%_80%_at_100%_10%,#ffc0c9_0%,transparent_60%),linear-gradient(#fbe2ee,#fdf1ee)]">
      <Bubble>Start a repo from this template</Bubble>
      <div className="absolute top-[120px] -right-8 bottom-0 left-8 rounded-tl-2xl bg-[#fbf7f1]">
        <div className="absolute top-[27px] left-5 w-[237px] md:left-[74px] overflow-hidden bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.08),0_8px_20px_-8px_rgb(0_0_0/0.15)]">
          <div className="flex h-7 items-center justify-center gap-1.5 bg-[#1f2328] text-[9px] font-semibold tracking-wide text-white">
            <Brand icon={siGithub} size={11} /> NEW REPOSITORY
          </div>
          <div className="px-3.5 pt-3.5 pb-6">
            <p className="text-[9.5px] font-semibold text-ink">Create a new repository</p>
            <p className="mt-2.5 text-[6.5px] font-medium text-muted">Repository name</p>
            <div className="mt-1 flex h-5 items-center rounded-[3px] px-1.5 text-[8px] text-ink shadow-[inset_0_0_0_1px_rgb(0_0_0/0.18)]">
              my-project<span className="ml-px h-2.5 w-px animate-[caret_1.1s_steps(1)_infinite] bg-ink" />
            </div>
            <div className="relative mt-2 flex h-5 items-center justify-center rounded-[3px] bg-[#1f883d] text-[7.5px] font-semibold text-white">
              Create repository
              <Hand tap className="absolute top-1 right-4" />
            </div>
            <p className="mt-2.5 text-[5.5px] leading-[8px] text-muted">
              A copy of every file lands in your account. <span className="text-[#0969da] underline">MIT License</span> applies.
            </p>
          </div>
        </div>
      </div>
    </Pic>
  )
}

function Code({ children, indent }: { children: ReactNode; indent?: boolean }) {
  return <div className={`flex h-[18px] items-center whitespace-pre ${indent ? 'pl-[2ch]' : ''}`}>{children}</div>
}
const k = 'text-[#8250df]'
const s = 'text-[#0a7d4f]'
const p = 'text-[#57606a]'

function PicConfig() {
  return (
    <Pic className="bg-[radial-gradient(110%_90%_at_0%_0%,#a6daf6_0%,transparent_60%),radial-gradient(90%_90%_at_100%_0%,#bdeee4_0%,transparent_60%),linear-gradient(#d9f0f7,#e8f6f6)]">
      <Bubble>Rename the project and point every link at my repo</Bubble>
      <div className="absolute top-[120px] -right-8 bottom-0 left-8 overflow-hidden rounded-tl-2xl bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.05)]">
        <div className="flex h-8 items-center gap-3 border-b border-line px-3 text-[10px] font-medium">
          <span className="text-ink">site.ts</span>
          <span className="text-faint">App.tsx</span>
          <span className="text-faint">index.css</span>
        </div>
        <div className="px-3 pt-2.5 font-mono text-[10.5px] text-ink">
          <Code>
            <span className={k}>export const</span> site = {'{'}
          </Code>
          <Code indent>
            name: <span className={`${s} rounded-[3px] bg-[#0084d1]/15`}>'Hayloft'</span>
            <span className="h-3 w-px animate-[caret_1.1s_steps(1)_infinite] bg-ink" />
          </Code>
          <Code indent>
            repo: <span className={s}>'github.com/mara/hayloft'</span>,
          </Code>
          <Code indent>
            license: <span className={s}>'MIT'</span>,
          </Code>
          <Code indent>
            nav: [<span className={p}>features, useCases, resources</span>],
          </Code>
          <Code indent>
            footer: [<span className={p}>project</span>],
          </Code>
          <Code>{'}'}</Code>
          <Code> </Code>
          <Code>
            <span className={p}>{'// typed, so a missing link fails the build'}</span>
          </Code>
        </div>
      </div>
    </Pic>
  )
}

function PicShip() {
  const files = weights.files
  return (
    <Pic className="bg-[radial-gradient(110%_90%_at_0%_0%,#a4e5c2_0%,transparent_60%),radial-gradient(90%_90%_at_100%_0%,#c6f1d0_0%,transparent_60%),linear-gradient(#d7f3e2,#e9f8ee)]">
      <p className="absolute top-[-2px] left-8 flex h-8 items-center gap-1.5 rounded-b-[9px] bg-white/55 px-2.5 text-[13px] font-medium text-[#0a8f54]">
        <Terminal size={14} strokeWidth={2} /> npm run build
      </p>
      <Bubble>Ship this to production</Bubble>
      <div className="absolute top-[120px] -right-8 bottom-0 left-8 overflow-hidden rounded-tl-2xl bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.05)]">
        <div className="flex h-8 items-center gap-2 border-b border-line px-3 text-[10px] font-medium text-ink">
          <span className="size-1.5 rounded-full bg-[#1fb866]" /> Production
          <span className="font-normal text-muted">main</span>
        </div>
        <div className="px-3 pt-2.5 font-mono text-[10px] text-[#57606a]">
          <Code>
            <Check size={11} strokeWidth={2.5} className="mr-1.5 text-[#0a8f54]" />
            {weights.modules} modules transformed
          </Code>
          {files.map((f) => (
            <Code key={f.name}>
              <span className="w-[178px] truncate text-ink">{f.name}</span>
              <span className="w-[62px] text-right tabular-nums">{f.raw}</span>
            </Code>
          ))}
          <Code>
            <Check size={11} strokeWidth={2.5} className="mr-1.5 text-[#0a8f54]" />
            built, no server needed
          </Code>
        </div>
      </div>
    </Pic>
  )
}

export function UseCases() {
  return (
    <div id="use-cases" className="rails grid gap-x-6 gap-y-2 px-6 pb-16 lg:grid-cols-3 lg:pb-24 max-lg:[&>figure]:mx-auto max-lg:[&>figure]:w-full max-lg:[&>figure]:max-w-[480px]">
      <figure>
        <PicFork />
        <figcaption>
          <Caption lead="Fork it">Start from the template and own every line.</Caption>
        </figcaption>
      </figure>
      <figure>
        <PicConfig />
        <figcaption>
          <Caption lead="Make it yours">Name, links, and menus live in one typed file.</Caption>
        </figcaption>
      </figure>
      <figure>
        <PicShip />
        <figcaption>
          <Caption lead="Ship it">It builds to static files. Push, and your host does the rest.</Caption>
        </figcaption>
      </figure>
    </div>
  )
}

/* ───────────────────────── Page weight chart ───────────────────────── */

const rowIcon: Record<string, LucideIcon> = { JavaScript: Braces, Fonts: Type, CSS: Palette, Images: Image, HTML: FileCode }
const tabs: { key: WeightKey; label: string }[] = [
  { key: 'gzip', label: 'Gzip' },
  { key: 'brotli', label: 'Brotli' },
  { key: 'raw', label: 'Uncompressed' },
]

function Tabs({ value, onChange }: { value: WeightKey; onChange: (key: WeightKey) => void }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[value]
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [value])
  return (
    <div role="tablist" aria-label="Compression" className="relative inline-flex rounded-[17px] bg-fill p-1">
      {pill ? (
        <span
          aria-hidden="true"
          className="absolute top-1 h-8 rounded-[11px] bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_1px_2px_rgb(0_0_0/0.08)] transition-[left,width] duration-300 ease-(--ease-out)"
          style={pill}
        />
      ) : null}
      {tabs.map((tab) => (
        <button
          key={tab.key}
          ref={(el) => {
            refs.current[tab.key] = el
          }}
          type="button"
          role="tab"
          aria-selected={value === tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative h-8 rounded-[11px] px-3 text-sm font-medium transition-colors duration-200 ${value === tab.key ? 'text-ink' : 'text-[#080c0c]/60 hover:text-ink'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export function Weight() {
  const [key, setKey] = useState<WeightKey>('gzip')
  const [ref, seen] = useSeen<HTMLDivElement>()
  const max = Math.max(...weights.rows.map((r) => r[key]))
  const total = weights.rows.reduce((sum, r) => sum + r.gzip, 0)
  return (
    <div id="weight">
      <div className="rails px-6 py-16 lg:px-[264px]">
        <h3 className="font-display text-[26px] leading-9 font-[525] text-ink md:text-[30px] md:leading-10">
          The <Ink>whole page</Ink>, weighed.
        </h3>
        <p className="mt-3 text-lg leading-7 text-muted">
          Everything this page sends to your browser, measured from the production build: {total.toFixed(0)} kB gzipped. No analytics, no trackers, no third-party
          scripts.{' '}
          <a href={`${site.repo}#page-weight`} className="font-medium text-link underline decoration-link/30 decoration-dotted underline-offset-4 hover:decoration-link">
            Learn more
          </a>
        </p>
      </div>
      <div className="rails flex flex-col items-center gap-10 px-6 pb-16 lg:px-36 lg:pb-24">
        <div ref={ref} className="w-full border-y border-line">
          {weights.rows.map((row, i) => {
            const Icon = rowIcon[row.name]
            return (
              <div key={row.name} className={`flex h-14 items-center gap-4 ${i ? 'border-t border-line' : ''}`}>
                <div className="flex w-[120px] shrink-0 items-center gap-2 sm:w-[200px]">
                  <span className="flex size-7 items-center justify-center text-ink">
                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium text-ink">{row.name}</span>
                </div>
                <div className="min-w-0 flex-1 pr-3">
                  <div
                    className="h-6 origin-left rounded-[5px] transition-[width,scale] duration-700 ease-(--ease-out)"
                    style={{
                      width: `${Math.max(1.5, (row[key] / max) * 100)}%`,
                      scale: seen ? '1 1' : '0 1',
                      transitionDelay: seen ? `${i * 60}ms` : '0ms',
                      background: i === 0 ? '#1f6ff5' : '#e5e5e5',
                    }}
                  />
                </div>
                <div className="w-[72px] shrink-0 text-right text-base font-medium text-ink tabular-nums sm:w-[104px]">{row[key].toFixed(1)} kB</div>
              </div>
            )
          })}
        </div>
        <Tabs value={key} onChange={setKey} />
      </div>
    </div>
  )
}

/* ───────────────────────── Sections you can pull apart ───────────────────────── */

function Log({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex h-[34px] items-center gap-2.5 text-[15px] text-muted">
      <Icon size={15} strokeWidth={1.75} className="shrink-0 text-[#8b8bd6]" />
      <span className="truncate">{children}</span>
    </div>
  )
}

export function Reorder() {
  return (
    <div id="sections" className="bg-gradient-to-b from-white from-[18%] to-wash">
      <div className="rails px-6 py-16 lg:px-[264px]">
        <h3 className="font-display text-[26px] leading-9 font-[525] text-ink md:text-[30px] md:leading-10">
          <Ink>Sections</Ink> you can pull apart.
        </h3>
        <p className="mt-3 text-lg leading-7 text-muted">
          Every section is one component with no shared state. Delete the ones you don’t need, reorder the rest in App.tsx, and nothing else breaks.{' '}
          <a href={`${site.repo}#sections`} className="font-medium text-link underline decoration-link/30 decoration-dotted underline-offset-4 hover:decoration-link">
            Learn more
          </a>
        </p>
      </div>
      <div aria-hidden="true" className="rails overflow-hidden px-6 select-none md:h-96 lg:px-16">
        <div className="mx-auto grid h-full max-w-[896px] gap-6 md:grid-cols-2">
          <div className="pt-4">
            <p className="max-w-80 rounded-[17px] bg-fill px-4 py-2.5 text-base leading-6 font-medium text-ink">Move the page weight chart above the use cases</p>
          </div>
          <div className="relative max-md:h-72">
            <div className="absolute top-10 -left-[108px] h-96 w-[432px] rounded-t-[17px] border border-b-0 border-black/[0.08] bg-white opacity-60 max-md:hidden">
              <div className="flex h-11 items-center gap-3 px-4 text-muted">
                <ChevronLeft size={16} strokeWidth={1.75} />
                <ChevronRight size={16} strokeWidth={1.75} />
                <RotateCw size={14} strokeWidth={1.75} />
                <span className="text-[13px] text-ink">src/components</span>
              </div>
              <div className="flex items-center gap-3 px-5 pt-2 font-display text-lg font-[525] text-ink">
                <FolderOpen size={18} strokeWidth={1.75} /> Files
              </div>
              <div className="flex gap-5 border-b border-line px-5 pt-4 pb-3 text-xs font-medium text-ink">
                <span>By name</span>
                <span className="text-link">By section</span>
              </div>
              <div className="m-5 rounded-xl border border-black/[0.08] p-4">
                <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
                  <Search size={13} strokeWidth={2} /> “section”
                </p>
                {['weight.tsx', 'features.tsx', 'theming.tsx'].map((f) => (
                  <div key={f} className="mt-3 flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-md bg-[#ececfb] text-[#6e6ed0]">
                      <FileCode size={15} strokeWidth={1.75} />
                    </span>
                    <span className="text-xs leading-4 text-ink">
                      {f}
                      <br />
                      <span className="text-muted">src/components</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative ml-1 h-96 w-full max-w-[432px] rounded-t-[17px] border border-b-0 border-black/[0.08] bg-white/[0.86] px-4 pt-4 backdrop-blur-[3px]">
              <p className="text-[15px] leading-5 text-ink">Both sections are self-contained, so this is a two-line change in App.tsx.</p>
              <div className="mt-1.5">
                <Log icon={FileCode}>Opening src/App.tsx</Log>
                <Log icon={ArrowUpDown}>Moving Weight above UseCases</Log>
                <Log icon={Check}>Type check passed</Log>
              </div>
              <p className="mt-1.5 text-[15px] leading-5 text-ink">Nothing else imports either file. The preview already shows the new order.</p>
              <div className="mt-1.5">
                <Log icon={Eye}>Reloading the preview</Log>
                <Log icon={GitCommitHorizontal}>Committing to a branch</Log>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
