import { Box, Check, ChevronDown, Flag, Folder, Globe, Plus, Scale, ScrollText } from 'lucide-react'
import type { ReactNode } from 'react'
import { siCloudflare, siFigma, siNetlify, siReact, siTailwindcss, siTypescript, siVercel, siVite } from 'simple-icons'
import { site } from '../site'
import { Brand, Caption, Crumb, Decode, Hand, Mark } from './bits'

function Tile({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="relative h-80 overflow-hidden rounded-[11px] bg-white select-none">
      {children}
    </div>
  )
}

const menu = 'rounded-[10px] bg-white p-1 shadow-[0_0_0_1px_rgb(0_0_0/0.07),0_8px_20px_-6px_rgb(0_0_0/0.16),0_2px_5px_-2px_rgb(0_0_0/0.08)]'

function TileLicense() {
  return (
    <Tile>
      <div className="absolute top-[42px] -right-4 left-[42px] flex h-9 items-center gap-3 border-b border-line text-[13px] font-medium text-faint">
        <span className="flex size-6 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]">
          <Plus size={13} strokeWidth={1.75} />
        </span>
        Pick a license for the repo
      </div>
      <div className="absolute top-[88px] left-[44px] flex items-center gap-2 text-xs font-medium">
        <span className="flex h-6 items-center gap-1 rounded-[7px] bg-fill px-2 text-ink">
          <Scale size={12} strokeWidth={2} /> MIT <ChevronDown size={11} strokeWidth={2} className="text-muted" />
        </span>
        <span className="flex h-6 items-center gap-1 px-1 text-faint">
          <ScrollText size={12} strokeWidth={2} /> Notice <ChevronDown size={11} strokeWidth={2} />
        </span>
      </div>
      <div className={`absolute top-[120px] left-[44px] w-[206px] ${menu}`}>
        <div className="flex items-start gap-2 rounded-[7px] bg-fill px-2 py-1.5">
          <Scale size={13} strokeWidth={1.75} className="mt-0.5 text-ink" />
          <span className="flex-1 text-[12.5px] leading-4 font-medium text-ink">
            MIT
            <br />
            <span className="text-[10.5px] font-normal text-muted">Keep the notice, do anything</span>
          </span>
          <Check size={13} strokeWidth={2.25} className="mt-2 text-ink" />
        </div>
        <div className="flex items-start gap-2 px-2 py-1.5">
          <ScrollText size={13} strokeWidth={1.75} className="mt-0.5 text-ink" />
          <span className="flex-1 text-[12.5px] leading-4 font-medium text-ink">
            Apache 2.0
            <br />
            <span className="text-[10.5px] font-normal text-muted">Adds a patent grant</span>
          </span>
        </div>
      </div>
    </Tile>
  )
}

function TileLayers() {
  const edge = 'font-mono text-[9.5px] tracking-[0.14em] fill-[#737373]'
  return (
    <Tile>
      <svg viewBox="0 0 291 320" className="size-full">
        <defs>
          <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="#fff" />
          </pattern>
        </defs>
        <g transform="translate(145.5 196) scale(1 0.52) rotate(45)">
          <rect x="-92" y="-92" width="184" height="184" rx="6" fill="#d2d2d2" />
        </g>
        <g transform="translate(145.5 158) scale(1 0.52) rotate(45)">
          <rect x="-80" y="-80" width="160" height="160" rx="6" fill="#e4e4e4" />
          <rect x="-80" y="-80" width="160" height="160" rx="6" fill="url(#dots)" />
        </g>
        <g transform="translate(145.5 124) scale(1 0.52) rotate(45)">
          <rect x="-74" y="-74" width="148" height="148" rx="6" fill="#f1f1f1" />
          <g transform="rotate(-45)" fill="none" stroke="#d9d9d9" strokeWidth="6" strokeLinecap="round">
            <circle r="13" fill="#d9d9d9" stroke="none" />
            <path d="M-34 -12a36 36 0 0 0 0 24M34 -12a36 36 0 0 1 0 24M-22 -30a40 40 0 0 1 44 0M-22 30a40 40 0 0 0 44 0" />
          </g>
        </g>
        <text className={edge} transform="translate(38 188) rotate(27.5)">
          STATIC HTML + CSS
        </text>
        <text className={edge} transform="translate(170 268) rotate(-27.5)">
          ZERO TRACKERS
        </text>
      </svg>
    </Tile>
  )
}

function Item({ icon, children, right, active }: { icon: ReactNode; children: ReactNode; right?: ReactNode; active?: boolean }) {
  return (
    <div className={`relative flex h-[25px] items-center gap-2 rounded-[6px] px-1.5 text-[12.5px] text-ink ${active ? 'bg-fill' : ''}`}>
      <span className="flex w-3.5 justify-center">{icon}</span>
      <span className="flex-1 truncate">{children}</span>
      {right}
    </div>
  )
}

function TileDeploy() {
  const check = <Check size={12} strokeWidth={2.5} />
  return (
    <Tile>
      <div className="absolute top-[58px] -left-2 flex items-center gap-2 text-xs font-medium">
        <span className="flex h-6 items-center gap-1 text-faint">
          ocal <ChevronDown size={11} strokeWidth={2} />
        </span>
        <span className="flex h-6 items-center gap-1 rounded-[7px] px-1.5 text-ink">
          <Globe size={12} strokeWidth={2} /> Static <ChevronDown size={11} strokeWidth={2} className="text-muted" />
        </span>
      </div>
      <p className="absolute top-[50px] left-[113px] z-10 w-[168px] rounded-[7px] bg-white px-2 py-1.5 text-[10.5px] leading-[14px] text-ink shadow-[0_0_0_1px_rgb(0_0_0/0.07),0_4px_12px_-3px_rgb(0_0_0/0.14)]">
        Builds to plain files in dist. Any host that can serve a folder can run it.
      </p>
      <div className={`absolute top-[86px] left-[43px] w-[206px] ${menu}`}>
        <p className="px-1.5 pt-1 pb-0.5 text-[10.5px] text-muted">Host</p>
        <Item icon={<Brand icon={siVercel} size={11} />}>Vercel</Item>
        <Item active icon={<Brand icon={siNetlify} size={12} />} right={check}>
          Netlify
          <Hand tap className="absolute top-1 right-5" />
        </Item>
        <Item icon={<Brand icon={siCloudflare} size={13} />}>Cloudflare Pages</Item>
        <p className="px-1.5 pt-2 pb-0.5 text-[10.5px] text-muted">Output</p>
        <Item icon={<Folder size={12} strokeWidth={1.75} />} right={check}>
          dist folder
        </Item>
        <Item icon={<Box size={12} strokeWidth={1.75} />}>Docker image</Item>
        <div className="-mx-1 my-1 h-px bg-line" />
        <Item
          icon={<Flag size={12} strokeWidth={1.75} />}
          right={
            <span className="flex h-3.5 w-6 items-center justify-end rounded-full bg-[#1fb866] px-0.5">
              <span className="size-2.5 rounded-full bg-white" />
            </span>
          }
        >
          Preview deploys
        </Item>
      </div>
    </Tile>
  )
}

const ring = [siReact, siTypescript, siTailwindcss, siVite, siFigma]

function TileOrbit() {
  return (
    <Tile>
      <div className="absolute top-[52%] left-1/2 size-[232px] -translate-1/2">
        <div className="absolute inset-0 rounded-full border-2 border-dotted border-[#d4d4d4]" />
        <div className="absolute inset-0 animate-[orbit_70s_linear_infinite]">
          {ring.map((icon, i) => {
            const a = (i / ring.length) * Math.PI * 2 - 0.9
            return (
              <span key={icon.slug} className="absolute -mt-5 -ml-5 flex size-10 items-center justify-center bg-white" style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}>
                <Brand icon={icon} size={34} className="animate-[orbit-counter_70s_linear_infinite] text-[#b4b4b4]" />
              </span>
            )
          })}
        </div>
        <Mark size={92} className="absolute top-1/2 left-1/2 -translate-1/2 text-ink" />
      </div>
    </Tile>
  )
}

export function Open() {
  return (
    <div id="open" className="bg-wash">
      <div className="rails px-6 py-16 text-center lg:px-36 lg:py-24">
        <p>
          <Crumb href={`${site.repo}/blob/main/LICENSE`}>Open by default</Crumb>
        </p>
        <h2 className="mt-6 font-display text-[32px] leading-9 font-[500] text-ink md:text-[44px] md:leading-[48px]">
          <Decode text="Open" /> enough to fork today.
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-lg leading-7 text-balance text-muted">
          {site.name} is {site.license} licensed, ships no trackers, and runs anywhere static files do.
        </p>
      </div>
      <div className="rails grid gap-x-6 gap-y-2 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <figure>
          <TileLicense />
          <figcaption>
            <Caption lead={`${site.license} licensed`}>Use it for client work, a product, or your own project. Keep the notice.</Caption>
          </figcaption>
        </figure>
        <figure>
          <TileLayers />
          <figcaption>
            <Caption lead="Nothing phones home">No analytics, cookies, or third-party scripts ship with the page.</Caption>
          </figcaption>
        </figure>
        <figure>
          <TileDeploy />
          <figcaption>
            <Caption lead="Host it anywhere">It builds to a folder of static files. Any host can serve it.</Caption>
          </figcaption>
        </figure>
        <figure>
          <TileOrbit />
          <figcaption>
            <Caption lead="Bring your own stack">Plain React and CSS. Add your router, CMS, or component library.</Caption>
          </figcaption>
        </figure>
      </div>
      <div className="rails h-16 lg:h-[168px]" />
    </div>
  )
}
