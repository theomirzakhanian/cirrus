import { Archive, ArrowDownToLine, ArrowUpRight, ChevronDown, Menu as MenuIcon, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { siGit, siGithub, siVercel } from 'simple-icons'
import { site } from '../site'
import { Brand, Logo } from './bits'

/** Close on Escape or a click outside the element. */
function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open, close])
  return ref
}

const panel =
  'absolute z-50 rounded-[13px] bg-white p-1 shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_10px_28px_-6px_rgb(0_0_0/0.16),0_2px_6px_-2px_rgb(0_0_0/0.08)] animate-[menu-in_180ms_var(--ease-out)]'

function GetIcon({ name }: { name: string }) {
  if (name === 'github') return <Brand icon={siGithub} />
  if (name === 'git') return <Brand icon={siGit} />
  if (name === 'vercel') return <Brand icon={siVercel} size={14} />
  return <Archive size={16} strokeWidth={1.75} aria-hidden="true" />
}

const sizes = {
  sm: { box: 'h-9 rounded-[11px] text-sm font-medium', main: 'px-2.5', icon: 0 },
  pill: { box: 'h-10 rounded-full text-base font-[450]', main: 'pl-3.5 pr-3 gap-2', icon: 16 },
  lg: { box: 'h-11 rounded-[17px] text-base font-medium', main: 'pl-3 pr-3 gap-2', icon: 18 },
} as const

/** The black two-part button: the main action, and a chevron that lists the other ways in. */
export function SplitButton({ size, label, align = 'center' }: { size: keyof typeof sizes; label: string; align?: 'center' | 'end' }) {
  const [open, setOpen] = useState(false)
  const ref = useDismiss(open, () => setOpen(false))
  const id = useId()
  const s = sizes[size]
  return (
    <div ref={ref} className="relative inline-flex">
      <div className={`inline-flex items-stretch overflow-hidden border border-transparent bg-ink text-[#fafafa] ${s.box}`}>
        <a
          href={site.get[0].href}
          className={`inline-flex items-center whitespace-nowrap transition-colors duration-150 hover:bg-white/10 active:bg-white/15 ${s.main}`}
        >
          {s.icon ? <ArrowDownToLine size={s.icon} strokeWidth={1.75} aria-hidden="true" /> : null}
          {label}
        </a>
        <span aria-hidden="true" className="w-px bg-[#fafafa]/20" />
        <button
          type="button"
          aria-label="More ways to get it"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex w-10 items-center justify-center transition-colors duration-150 hover:bg-white/10 active:bg-white/15"
        >
          <ChevronDown size={16} strokeWidth={2} aria-hidden="true" className={`transition-transform duration-200 ease-out ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {open ? (
        <div
          id={id}
          role="menu"
          className={`${panel} top-full mt-2 w-[290px] ${align === 'end' ? 'right-0 origin-top-right' : 'left-1/2 -ml-[145px] origin-top'}`}
        >
          {site.get.map((row) => (
            <a
              key={row.label}
              role="menuitem"
              href={row.href}
              className="flex h-9 items-center gap-3 rounded-[9px] px-3 text-sm font-medium text-ink transition-colors duration-100 hover:bg-fill"
            >
              <span className="flex w-4 justify-center">
                <GetIcon name={row.icon} />
              </span>
              {row.label}
              <span className="ml-auto text-xs font-normal text-muted">{row.detail}</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  )
}

/** Features / Use cases / Resources: open on hover or click, plus one plain link. */
function Links() {
  const [open, setOpen] = useState<number | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const ref = useDismiss(open !== null, () => setOpen(null))
  const show = (i: number) => {
    window.clearTimeout(timer.current)
    setOpen(i)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(null), 140)
  }
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <div ref={ref} className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
      <ul className="flex items-center gap-10 text-sm leading-5 font-medium text-ink">
        {site.nav.map((group, i) => (
          <li key={group.label} className="relative" onPointerEnter={(e) => e.pointerType === 'mouse' && show(i)} onPointerLeave={(e) => e.pointerType === 'mouse' && hide()}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
              className="block transition-opacity duration-150 hover:opacity-60"
            >
              {group.label}
            </button>
            {open === i ? (
              <div className="absolute top-full -left-2.5 pt-1.5">
                <div role="menu" className={`${panel} relative min-w-[160px] origin-top-left`}>
                  {group.links.map((link) => (
                    <a
                      key={link.label}
                      role="menuitem"
                      href={link.href}
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      onClick={() => setOpen(null)}
                      className="flex h-7 items-center justify-between gap-6 rounded-[9px] px-2 whitespace-nowrap transition-colors duration-100 hover:bg-fill"
                    >
                      {link.label}
                      {'external' in link && link.external ? <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" /> : null}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </li>
        ))}
        <li>
          <a href={site.navLink.href} className="block transition-opacity duration-150 hover:opacity-60">
            {site.navLink.label}
          </a>
        </li>
      </ul>
    </div>
  )
}

/** Small screens: one button that drops the whole menu down. */
function Drawer() {
  const [open, setOpen] = useState(false)
  const ref = useDismiss(open, () => setOpen(false))
  return (
    <div ref={ref} className="lg:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 items-center justify-center rounded-[11px] text-ink transition-colors duration-150 hover:bg-black/5"
      >
        {open ? <X size={20} strokeWidth={1.75} aria-hidden="true" /> : <MenuIcon size={20} strokeWidth={1.75} aria-hidden="true" />}
      </button>
      {open ? (
        <div className={`${panel} inset-x-2 top-full mt-1 max-h-[70svh] origin-top overflow-y-auto p-3`}>
          {site.nav.map((group) => (
            <div key={group.label} className="pb-3">
              <p className="px-2 pb-1 text-sm font-medium text-muted">{group.label}</p>
              {group.links.map((link) => (
                <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="flex h-10 items-center rounded-[9px] px-2 text-base font-medium text-ink active:bg-fill">
                  {link.label}
                </a>
              ))}
            </div>
          ))}
          <a href={site.navLink.href} onClick={() => setOpen(false)} className="flex h-10 items-center rounded-[9px] px-2 text-base font-medium text-ink active:bg-fill">
            {site.navLink.label}
          </a>
        </div>
      ) : null}
    </div>
  )
}

function Bar() {
  return (
    <>
      <a href="#top" aria-label={`${site.name} home`} className="block">
        <Logo name={site.name} />
      </a>
      <Links />
      <div className="flex items-center gap-1">
        <SplitButton size="sm" label="Use template" align="end" />
        <Drawer />
      </div>
    </>
  )
}

/** The bar that sits on the sky at the top of the hero. */
export function HeroNav() {
  return (
    <nav aria-label="Main" className="relative z-30 flex h-14 items-center justify-between px-4">
      <Bar />
    </nav>
  )
}

/** The white bar that takes over once the hero has scrolled away. */
export function StickyNav() {
  const ref = useRef<HTMLElement>(null)
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      const el = ref.current
      if (el) setStuck(window.scrollY >= el.offsetTop - 1 && window.scrollY > 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return (
    <nav
      ref={ref}
      aria-label="Main"
      aria-hidden={!stuck}
      inert={!stuck}
      className={`sticky top-0 z-40 -mt-[57px] border-b border-line bg-white transition-opacity duration-200 ${stuck ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div className="shell">
        <div className="frame relative flex h-14 items-center justify-between">
          <Bar />
        </div>
      </div>
    </nav>
  )
}
