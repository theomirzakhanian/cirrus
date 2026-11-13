import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import type { SimpleIcon } from 'simple-icons'

/** The mark: a circle with two wisps. */
export function Mark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <circle cx="14" cy="14" r="11.6" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M7.6 12.2c2.1-1.9 4.3-1.9 6.4 0s4.3 1.9 6.4 0M7.6 17c2.1-1.9 4.3-1.9 6.4 0s4.3 1.9 6.4 0"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({ name }: { name: string }) {
  return (
    <span className="inline-flex h-9 items-center gap-1.5 text-ink">
      <Mark />
      <span className="font-display text-[23px] leading-none font-[525] tracking-[-0.03em]">{name}</span>
    </span>
  )
}

/** A brand glyph from simple-icons, drawn in the current color. */
export function Brand({ icon, size = 16, className = '', style }: { icon: SimpleIcon; size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} style={style}>
      <path d={icon.path} />
    </svg>
  )
}

/** The about-to-click hand, for illustrations. */
export function Hand({ className = '', tap = false, style }: { className?: string; tap?: boolean; style?: CSSProperties }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.28)] ${className}`}
      style={{ ...(tap ? { animation: 'hand-tap 2.6s var(--ease-out) infinite' } : null), ...style }}
    >
      <path
        d="M10 9.5V4a2 2 0 0 0-4 0v9.9l-.76-.66a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8v-3a2 2 0 0 0-4 0v-1a2 2 0 0 0-4 0V9a2 2 0 0 0-4 0z"
        fill="#fff"
        stroke="#090b0c"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 9.5v3.2M14 10v2.7M18 11v2" stroke="#090b0c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** The arrow pointer with a name tag, like a collaborator's cursor. */
export function Arrow({ label, className = '' }: { label?: string; className?: string }) {
  return (
    <span className={`pointer-events-none inline-flex items-start ${className}`} aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
        <path d="M5.2 3.4l14 7.2-6 1.7-2.6 5.9z" fill="#090b0c" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
      {label ? (
        <span className="mt-7 -ml-1 rounded-full bg-[#1e9be9] px-2.5 py-0.5 font-display text-[15px] leading-6 font-[525] text-white">{label}</span>
      ) : null}
    </span>
  )
}

/** True once the element has scrolled into view. Fires once. */
export function useSeen<T extends Element>(margin = '0px 0px -15% 0px') {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin, seen])
  return [ref, seen] as const
}

/** Masked like a password, then typed out once it scrolls into view. */
export function Decode({ text }: { text: string }) {
  const [ref, seen] = useSeen<HTMLSpanElement>()
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(text.length)
      return
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setShown(i)
      if (i >= text.length) window.clearInterval(id)
    }, 70)
    return () => window.clearInterval(id)
  }, [seen, text])
  return (
    <span ref={ref} aria-label={text} className="whitespace-nowrap">
      {[...text].map((ch, i) =>
        ch === ' ' ? (
          <span key={i}> </span>
        ) : (
          <span key={i} aria-hidden="true" className="relative inline-block">
            <span className={i < shown ? '' : 'invisible'}>{ch}</span>
            {i < shown ? null : <span className="absolute inset-x-0 top-[0.14em] text-center">*</span>}
          </span>
        ),
      )}
    </span>
  )
}

/** A word that starts pale and inks in when seen. */
export function Ink({ children }: { children: ReactNode }) {
  const [ref, seen] = useSeen<HTMLSpanElement>()
  return (
    <span ref={ref} className="transition-colors duration-700 ease-out" style={{ color: seen ? undefined : '#d0d6d8' }}>
      {children}
    </span>
  )
}

/** The small blue link that sits above a section heading. */
export function Crumb({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-0.5 text-base leading-6 font-medium text-link">
      {children}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

/** Bold lead-in followed by a muted sentence, used under every picture. */
export function Caption({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <p className="px-4 py-5 text-base leading-6 text-muted">
      <span className="font-medium text-ink">{lead}</span> {children}
    </p>
  )
}

/** Dashed hairline between blocks inside the rails. */
export function Dashed() {
  return <div aria-hidden="true" className="rails h-px bg-[linear-gradient(to_right,rgb(0_0_0/0.1)_50%,transparent_50%)] bg-[length:6px_1px]" />
}
