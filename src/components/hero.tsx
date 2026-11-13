import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileCode,
  GitBranch,
  LayoutTemplate,
  LoaderCircle,
  PanelLeft,
  PanelsTopLeft,
  Plus,
  RotateCw,
  Scale,
  ScanSearch,
  Search,
  SquarePen,
  Star,
  Tag,
  WandSparkles,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { siFigma, siGithub, siMarkdown, siNpm, siReact, siTailwindcss, siTypescript, siVite, type SimpleIcon } from 'simple-icons'
import { site } from '../site'
import { Brand, Hand, Mark } from './bits'
import { HeroNav, SplitButton } from './nav'

const tiles: SimpleIcon[] = [siReact, siTypescript, siTailwindcss, siVite, siGithub, siFigma]

function Row({ icon, children, muted, selected, right }: { icon?: ReactNode; children: ReactNode; muted?: boolean; selected?: boolean; right?: ReactNode }) {
  return (
    <div
      className={`flex h-8 items-center gap-2 py-1 pr-1 pl-2 text-sm leading-5 font-[450] ${muted ? 'text-muted' : 'text-ink'} ${
        selected ? 'rounded-[11px] bg-white/85 shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_1px_2px_rgb(0_0_0/0.06)]' : 'rounded-lg'
      }`}
    >
      {icon ? <span className="flex size-4 shrink-0 items-center justify-center">{icon}</span> : null}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {right ? <span className="flex shrink-0 items-center pr-1">{right}</span> : null}
    </div>
  )
}

function Group({ label, children, tight }: { label: string; children: ReactNode; tight?: boolean }) {
  return (
    <div className="flex flex-col gap-1 px-2 pt-1 pb-2">
      <div className={`flex items-center px-2 text-[13px] font-medium text-muted ${tight ? 'h-5' : 'h-7'}`}>{label}</div>
      {children}
    </div>
  )
}

const spinner = <LoaderCircle size={14} strokeWidth={2} className="animate-[spin-slow_1.1s_linear_infinite] text-faint" aria-hidden="true" />
const dot = <span className="mr-0.5 size-1.5 rounded-full bg-[#0096ee]" />
const lucide = (Icon: LucideIcon) => <Icon size={16} strokeWidth={1.75} aria-hidden="true" />

function Sidebar() {
  return (
    <div className="hidden w-64 shrink-0 flex-col overflow-hidden md:flex [&>*]:shrink-0">
      <div className="flex h-[42px] items-center justify-between pr-1.5 pl-4">
        <div className="flex gap-2">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex size-7 items-center justify-center text-muted">
          <PanelLeft size={16} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5 px-2.5 py-1">
        {tiles.map((icon) => (
          <div key={icon.slug} className="flex h-10 items-center justify-center rounded-[11px] bg-black/[0.08]">
            <Brand icon={icon} size={18} style={{ color: icon.hex === '000000' || icon.hex === '181717' ? '#090b0c' : `#${icon.hex}` }} />
          </div>
        ))}
      </div>
      <Group label="Pinned">
        <Row icon={<Brand icon={siMarkdown} />}>README.md</Row>
        <Row icon={<Brand icon={siGithub} />}>Repository</Row>
        <Row icon={<Brand icon={siNpm} style={{ color: '#cb3837' }} />}>Package</Row>
      </Group>
      <Group label="Changes">
        <Row muted icon={lucide(SquarePen)}>
          New change
        </Row>
        <Row right={spinner}>Add page weight chart</Row>
        <Row right={spinner}>Tighten hero spacing</Row>
        <Row right={dot}>Fix footer links</Row>
        <Row muted>Show all</Row>
      </Group>
      <Group label="Sections" tight>
        <Row muted icon={lucide(Plus)}>
          New section
        </Row>
        <Row
          muted
          icon={lucide(PanelsTopLeft)}
          right={
            <span className="flex items-center gap-2 text-xs font-medium text-muted/75">
              4 <ChevronDown size={14} strokeWidth={1.75} aria-hidden="true" />
            </span>
          }
        >
          Drafts
        </Row>
        <Row selected icon={<Mark size={16} />}>
          Hero
        </Row>
        <Row icon={lucide(LayoutTemplate)}>Stack wall</Row>
        <Row icon={<Brand icon={siMarkdown} />}>Use cases | README</Row>
        <Row icon={lucide(Scale)}>License</Row>
      </Group>
    </div>
  )
}

function Step({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex h-5 items-center gap-2 text-[13px] font-[450] text-muted">
      <Icon size={13} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-faint" />
      <span className="truncate">{children}</span>
    </div>
  )
}

function Task({ meta, title, children, thumb, right, working }: { meta: ReactNode; title: string; children: ReactNode; thumb: ReactNode; right?: ReactNode; working?: boolean }) {
  return (
    <div className="relative flex h-64 w-[260px] shrink-0 flex-col overflow-hidden rounded-[14px] bg-white/70 shadow-[0_0_0_1px_rgb(0_0_0/0.07)]">
      <div className="px-3 pt-2.5">
        <div className="flex h-4 items-center justify-between text-xs font-medium text-faint">
          <span className="tabular-nums">{meta}</span>
          {right}
        </div>
        <p
          className={`mt-1 truncate text-sm leading-5 font-semibold ${
            working ? 'bg-[linear-gradient(90deg,#171717_0%,#171717_35%,#a3a3a3_50%,#171717_65%,#171717_100%)] bg-[length:300%_100%] bg-clip-text text-transparent animate-[shimmer_2.4s_linear_infinite]' : 'text-[#171717]'
          }`}
        >
          {title}
        </p>
        <div className="mt-1">{children}</div>
      </div>
      <div className="mx-2 mt-auto h-[134px] overflow-hidden rounded-t-lg">{thumb}</div>
    </div>
  )
}

/** Small pictures inside the three cards. All drawn in markup so they stay sharp. */
function ThumbChart() {
  const bars = [100, 62, 38, 24, 9]
  return (
    <div className="flex size-full flex-col justify-center gap-2 bg-white px-4 shadow-[inset_0_0_0_1px_rgb(0_0_0/0.06)]">
      {bars.map((w, i) => (
        <div key={w} className="flex items-center gap-2">
          <span className="h-1.5 w-8 rounded-full bg-black/10" />
          <span className="h-2.5 rounded-[3px]" style={{ width: `${w * 0.62}%`, background: i === 0 ? '#1f6ff5' : '#e7e7e7' }} />
        </div>
      ))}
    </div>
  )
}
function ThumbHero() {
  return (
    <div className="relative flex size-full flex-col items-center bg-[url(/sky.webp)] bg-cover bg-[position:70%_20%] pt-6">
      <span className="h-1.5 w-12 rounded-full border border-black/20" />
      <span className="mt-2 h-2.5 w-36 rounded-full bg-ink" />
      <span className="mt-1.5 h-2.5 w-24 rounded-full bg-ink" />
      <span className="mt-3 h-4 w-20 rounded-full bg-ink" />
      <span className="mt-4 h-20 w-[88%] rounded-t-md bg-white/75" />
    </div>
  )
}
function ThumbDoc() {
  return (
    <div className="size-full bg-[#f1f1ef] px-5 pt-4">
      <div className="size-full rounded-t-md bg-white px-4 pt-4 shadow-[0_1px_3px_rgb(0_0_0/0.08)]">
        <p className="font-display text-[11px] leading-4 font-[525] text-ink">Link check, 12 Nov</p>
        {[92, 78, 85, 60].map((w) => (
          <div key={w} className="mt-2 flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#28c840]" />
            <span className="h-1.5 rounded-full bg-black/10" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function useTimer(start: number) {
  const [s, setS] = useState(start)
  useEffect(() => {
    const id = window.setInterval(() => setS((v) => v + 1), 1000)
    return () => window.clearInterval(id)
  }, [])
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`
}

function Workspace() {
  const elapsed = useTimer(229)
  const chip = 'flex items-center gap-1 text-[13px] font-medium text-muted'
  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-[19px] bg-white/80 shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_1px_3px_rgb(0_0_0/0.05)]">
      <div className="flex h-[42px] items-center px-1.5 text-muted">
        {[ChevronLeft, ChevronRight, RotateCw].map((Icon, i) => (
          <span key={i} className="flex size-8 items-center justify-center">
            <Icon size={i === 2 ? 15 : 18} strokeWidth={1.75} aria-hidden="true" />
          </span>
        ))}
        <span className="ml-1.5 flex h-7 min-w-0 flex-1 items-center gap-2 text-sm font-[450]">
          <Search size={15} strokeWidth={1.75} aria-hidden="true" className="mx-1 shrink-0" />
          <span className="truncate">Search sections or type a path</span>
        </span>
        <span className="flex size-8 items-center justify-center">
          <Star size={16} strokeWidth={1.75} aria-hidden="true" />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center px-4">
        <Mark size={52} className="mt-[98px] text-black/[0.09]" />

        <div className="mt-[26px] w-full max-w-[620px]">
          <div className="flex h-11 items-center gap-2 rounded-[14px] bg-white pr-2 pl-3 shadow-[0_0_0_1px_rgb(0_0_0/0.07),0_2px_6px_-1px_rgb(0_0_0/0.06)]">
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-faint">Describe a change, @ for files</span>
            <kbd className="hidden h-5 items-center rounded-[5px] bg-fill px-1.5 font-mono text-xs font-medium tracking-[-0.3px] text-[#525252] sm:flex">Tab</kbd>
            <span className="hidden text-xs font-medium text-muted sm:block">to switch</span>
            <span className="flex h-7 items-center rounded-[9px] bg-fill p-0.5 text-sm font-medium tracking-[-0.02em] text-muted">
              <span className="px-2.5">Preview</span>
              <span className="flex h-6 items-center rounded-[7px] bg-white px-3 text-ink shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.08)]">Edit</span>
            </span>
          </div>
          <div className="mt-2 flex h-5 items-center justify-between px-3">
            <div className="flex items-center gap-4">
              <Plus size={16} strokeWidth={1.75} className="text-muted" aria-hidden="true" />
              <span className={chip}>
                <GitBranch size={14} strokeWidth={1.75} aria-hidden="true" /> main <ChevronDown size={12} strokeWidth={2} className="text-faint" aria-hidden="true" />
              </span>
              <span className={chip}>
                <Scale size={14} strokeWidth={1.75} aria-hidden="true" /> {site.license} <ChevronDown size={12} strokeWidth={2} className="text-faint" aria-hidden="true" />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className={chip}>
                <Tag size={13} strokeWidth={1.75} aria-hidden="true" /> v1.0.0
              </span>
              <span className={`${chip} hidden sm:flex`}>
                Light <ChevronDown size={12} strokeWidth={2} className="text-faint" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[89px] w-full max-w-[796px]">
          <p className="px-3.5 font-display text-base leading-5 font-[525] text-ink">Recent changes</p>
          <div className="mt-3 flex gap-2 overflow-hidden p-px">
            <Task working meta={`Working for ${elapsed}`} title="Add page weight chart" thumb={<ThumbChart />}>
              <Step icon={ScanSearch}>Reading the build output</Step>
              <Step icon={FileCode}>Writing weight.tsx</Step>
              <Step icon={WandSparkles}>Checking contrast</Step>
              <Hand tap className="absolute top-[52px] -left-1" />
            </Task>
            <Task meta="an hour ago" title="Tighten hero spacing" right={dot} thumb={<ThumbHero />}>
              <p className="line-clamp-3 text-[13px] leading-4 text-[#262626]">
                The headline now sits 16px under the badge and 32px over the button, on the same 8px grid as the rest of the page.
              </p>
            </Task>
            <Task
              meta="an hour ago"
              title="Link check"
              right={
                <span className="flex items-center gap-1.5">
                  Every 9am {dot}
                </span>
              }
              thumb={<ThumbDoc />}
            >
              <p className="line-clamp-3 text-[13px] leading-4 text-[#262626]">
                Summary: 42 links checked, 0 broken. Three redirects were updated in site.ts so the footer points at the new paths.
              </p>
            </Task>
          </div>
        </div>
      </div>
    </div>
  )
}

/** A stand-in for your product screenshot. Swap the whole thing for an image if you have one. */
function Window() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex h-[720px] max-w-[1320px] rounded-[22px] bg-white/[0.64] shadow-[0_0_0_1px_rgb(255_255_255/0.8),0_40px_80px_-30px_rgb(20_80_120/0.35)] backdrop-blur-2xl select-none"
    >
      <Sidebar />
      <Workspace />
    </div>
  )
}

export function Hero() {
  return (
    <div id="top" className="p-2 pb-0 md:p-4 md:pb-0">
      <div className="relative h-[880px] overflow-hidden rounded-[26px] bg-[#bfeafc] shadow-xl md:h-[1106px] md:rounded-[33.6px]">
        <img src="/sky.webp" alt="" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 size-full object-cover object-top" />
        <HeroNav />
        <header className="relative z-20 px-4 pt-12 text-center md:pt-[66px]">
          <a
            href="#open"
            className="group inline-flex h-6 items-center gap-0.5 rounded-full border border-[#0a0a0a]/20 px-2.5 font-display text-xs leading-4 font-[575] tracking-[0.01em] text-[#090b0b]/70 transition-colors duration-150 hover:border-[#0a0a0a]/35 hover:text-[#090b0b]"
          >
            {site.license} licensed
            <ChevronRight size={12} strokeWidth={2} aria-hidden="true" className="-mr-1 opacity-60 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </a>
          <h1 className="mx-auto mt-4 max-w-[16em] font-display text-[34px] leading-[38px] font-[450] tracking-[0.0095em] text-balance text-ink md:text-[48px] md:leading-[52px]">
            The bestest, most coolest template, <br className="hidden md:block" />
            but it’s open source.
          </h1>
          <div className="mt-8">
            <SplitButton size="pill" label="Use this template" />
          </div>
        </header>
        <div className="relative z-10 mt-12 px-3 md:mt-16 md:px-4">
          <div aria-hidden="true" className="absolute inset-x-0 top-[70%] h-40 bg-[radial-gradient(48%_50%_at_50%_50%,rgb(30_110_160/0.18),transparent)]" />
          <Window />
        </div>
        {/* The hairline around the whole card. It sits on top so the photo can't cover it. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.06)]" />
      </div>
    </div>
  )
}
