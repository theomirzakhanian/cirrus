import { Check, ChevronRight, Pipette, Settings2, X } from 'lucide-react'
import { siGithub, siNpm } from 'simple-icons'
import { site } from '../site'
import { Arrow, Brand, Caption, Crumb, Decode } from './bits'
import { Pic } from './features'

function PicTokens() {
  return (
    <Pic className="bg-[radial-gradient(70%_80%_at_88%_38%,#e4f36f_0%,#dbef72_32%,transparent_66%),linear-gradient(120deg,#eceee9,#dde4dd)]">
      <div className="absolute top-[84px] -left-4 flex h-[62px] w-[250px] items-center justify-between rounded-[18px] bg-white/85 pr-3.5 pl-9 shadow-[0_1px_3px_rgb(0_0_0/0.06)]">
        <span className="font-mono text-[22px] tracking-[0.04em] text-[#c4c4c4]">#0077bc</span>
        <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-link text-white">
          <Pipette size={18} strokeWidth={2} />
        </span>
      </div>
      <div className="absolute top-[178px] -bottom-6 -left-4 w-[250px] rounded-[18px] bg-white/50 pt-4 pl-9">
        <p className="font-display text-[19px] leading-6 font-[525] text-ink">--color-link</p>
        <p className="text-sm text-muted">Links and focus rings</p>
        <p className="mt-5 font-display text-[19px] leading-6 font-[525] text-ink">--color-ink</p>
        <p className="text-sm text-muted">Headings and body</p>
      </div>
    </Pic>
  )
}

function PicMotion() {
  return (
    <Pic className="bg-[radial-gradient(120%_100%_at_50%_110%,#84c2f4_0%,transparent_70%),linear-gradient(#d2e8f8,#bcdcf4)]">
      <div className="absolute top-9 left-1/2 w-[290px] -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.04),0_14px_30px_-12px_rgb(20_60_110/0.35)]">
        <div className="bg-[#f4f6f8] px-4 pt-3 pb-3">
          <div className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[9px] text-muted shadow-[0_0_0_1px_rgb(0_0_0/0.05)]">
            <Settings2 size={10} strokeWidth={2} /> System settings | Accessibility
            <ChevronRight size={10} strokeWidth={2} className="ml-auto" />
          </div>
          <div className="mt-2 flex items-center justify-between px-1 text-[10px] font-medium text-ink">
            Reduce motion
            <span className="flex h-3.5 w-6 items-center justify-end rounded-full bg-[#1fb866] px-0.5">
              <span className="size-2.5 rounded-full bg-white" />
            </span>
          </div>
        </div>
        <div className="px-4 pt-3.5 pb-4">
          <p className="text-xs font-semibold text-ink">Reduce motion is on for this visitor</p>
          <p className="mt-1.5 text-[10px] leading-[15px] text-muted">The reveals, the sliding tab, and the orbit all stop. Every word and picture stays where it is.</p>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-medium whitespace-nowrap">
            <span className="rounded-full bg-fill px-2.5 py-1 text-ink">Reveals off</span>
            <span className="rounded-full bg-fill px-2.5 py-1 text-ink">Orbit paused</span>
            <span className="px-1.5 text-muted">Layout unchanged</span>
          </div>
        </div>
      </div>
    </Pic>
  )
}

const pairs = [
  { token: '--color-ink', color: '#090b0c', ratio: '19.72', pass: true },
  { token: '--color-muted', color: '#737373', ratio: '4.74', pass: true },
  { token: '--color-link', color: '#0077bc', ratio: '4.81', pass: true },
  { token: '--color-faint', color: '#a1a1a1', ratio: '2.58', pass: false },
  { token: '--color-fill', color: '#f5f5f5', ratio: '1.09', pass: false },
]

function PicContrast() {
  return (
    <Pic className="bg-[radial-gradient(110%_90%_at_0%_0%,#93e0bb_0%,transparent_62%),linear-gradient(#c9f0d9,#b5e9cf)]">
      <div className="absolute top-4 -right-6 -bottom-6 left-9 rounded-xl bg-white/75 font-mono shadow-[0_1px_3px_rgb(0_0_0/0.05)]">
        <div className="flex h-9 items-center bg-black/[0.04] pr-12 pl-12 text-[11px] text-muted">
          <span className="flex-1">Token</span>
          <span className="w-[86px]">On white</span>
        </div>
        {pairs.map((row) => (
          <div key={row.token} className="flex h-12 items-center border-t border-black/[0.05] pr-12 pl-4 text-[13.5px] text-ink">
            <span className="size-5 shrink-0 rounded-[5px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.1)]" style={{ background: row.color }} />
            <span className="ml-3 flex-1 font-medium">{row.token}</span>
            <span className="w-[58px] tabular-nums">{row.ratio}</span>
            {row.pass ? <Check size={15} strokeWidth={2.25} className="text-[#1fa35c]" /> : <X size={15} strokeWidth={2.25} className="text-[#e5484d]" />}
          </div>
        ))}
      </div>
    </Pic>
  )
}

export function Theming() {
  return (
    <div id="theming">
      <div className="rails px-6 py-16 lg:px-36 lg:py-24">
        <p>
          <Crumb href="#config">Theming</Crumb>
        </p>
        <h2 className="mt-6 font-display text-[32px] leading-9 font-[500] text-ink md:text-[44px] md:leading-[48px]">
          Restyle it in <Decode text="one file" />.
        </h2>
        <p className="mt-4 text-lg leading-7 text-muted">
          Most templates make you hunt through forty files to change a color. <br className="hidden lg:block" />
          {site.name} keeps its tokens together, so a rebrand is a five-line diff.
        </p>
      </div>
      <div className="rails grid gap-x-6 gap-y-2 px-6 pb-16 lg:grid-cols-3 lg:pb-24 max-lg:[&>figure]:mx-auto max-lg:[&>figure]:w-full max-lg:[&>figure]:max-w-[480px]">
        <figure>
          <PicTokens />
          <figcaption>
            <Caption lead="Tokens in one place">Colors, fonts, and easing sit at the top of index.css.</Caption>
          </figcaption>
        </figure>
        <figure>
          <PicMotion />
          <figcaption>
            <Caption lead="Motion with an off switch">Every animation steps aside when the system asks for reduced motion.</Caption>
          </figcaption>
        </figure>
        <figure>
          <PicContrast />
          <figcaption>
            <Caption lead="Readable by default">Text colors are measured against WCAG contrast. The ratios are in the README.</Caption>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

function Skeleton({ dim }: { dim?: boolean }) {
  return (
    <span className="flex flex-col gap-2.5">
      <span className={`block h-[18px] w-[150px] rounded-full ${dim ? 'bg-white/10' : 'bg-white/45'}`} />
      <span className="flex gap-2">
        <span className={`block h-3 w-12 rounded-full ${dim ? 'bg-white/[0.07]' : 'bg-white/25'}`} />
        <span className={`block h-3 w-[74px] rounded-full ${dim ? 'bg-white/[0.07]' : 'bg-white/25'}`} />
      </span>
    </span>
  )
}

export function Config() {
  return (
    <div id="config" className="rails flex flex-col lg:flex-row lg:gap-6">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16">
        <h3 className="font-display text-[26px] leading-8 font-[525] text-ink md:text-[30px] md:leading-9">
          site.ts <br />
          <span className="text-muted/60">
            One typed file for your <br className="hidden sm:block" />
            name, links, and menus.
          </span>
        </h3>
        <div className="py-4">
          <a
            href={`${site.repo}/blob/main/src/site.ts`}
            className="inline-flex h-10 items-center rounded-[17px] bg-fill px-3 text-base font-medium text-[#171717] transition-[background-color,scale] duration-150 hover:bg-[#ebebeb] active:scale-[0.97]"
          >
            Learn more
          </a>
        </div>
        <ul className="space-y-4 pt-2 text-base leading-6">
          <li>
            <p className="font-medium text-ink">Checked at build time</p>
            <p className="text-muted">Leave out a link and the build fails, not the page.</p>
          </li>
          <li>
            <p className="font-medium text-ink">No CMS, no dashboard</p>
            <p className="max-w-[480px] text-muted">It is a TypeScript file. Edit it, push, and every menu on the page follows.</p>
          </li>
        </ul>
      </div>
      <div
        aria-hidden="true"
        className="relative h-[420px] shrink-0 overflow-hidden bg-[#161d20] bg-[radial-gradient(80%_60%_at_50%_108%,#0d6f8a_0%,rgb(13_111_138/0.35)_45%,transparent_75%),radial-gradient(70%_50%_at_50%_-10%,#06090a_0%,transparent_70%)] select-none lg:h-[468px] lg:w-[560px]"
      >
        <div className="absolute top-[88px] left-1/2 flex h-14 w-[290px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-white/35 font-mono text-[19px] tracking-[0.02em] text-white/70">
          name: 'Cirrus'
        </div>
        <div className="absolute top-[166px] left-1/2 w-[410px] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-[26px] bg-white/[0.09] p-2.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)] backdrop-blur-sm">
          <div className="flex items-center gap-4 rounded-[20px] bg-white/[0.16] p-3">
            <span className="flex size-[66px] items-center justify-center rounded-[14px] bg-white text-[#181717]">
              <Brand icon={siGithub} size={40} />
            </span>
            <Skeleton />
          </div>
          <div className="mt-1 flex items-center gap-4 p-3 opacity-80">
            <span className="flex size-[66px] items-center justify-center rounded-[14px] bg-white/75 text-[#cb3837]">
              <Brand icon={siNpm} size={40} />
            </span>
            <Skeleton dim />
          </div>
        </div>
        <Arrow label="You" className="absolute top-[236px] left-[calc(50%+68px)]" />
      </div>
    </div>
  )
}
