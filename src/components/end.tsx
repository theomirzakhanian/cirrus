import { ArrowUpRight } from 'lucide-react'
import { siDiscord, siGithub, siX } from 'simple-icons'
import { site, type NavLink } from '../site'
import { Brand } from './bits'
import { SplitButton } from './nav'

export function Cta() {
  return (
    <div id="get" className="shell pt-16 lg:pt-24">
      <div className="frame relative flex min-h-[468px] flex-col items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(#e6f4ff,#d3ebfd)] px-6 py-24 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(34%_62%_at_50%_112%,#2b83fb_0%,#3f9bff_38%,transparent_100%),radial-gradient(78%_80%_at_50%_120%,#5cc0ff_0%,rgb(110_200_255/0.8)_48%,transparent_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.6)_1px,transparent_1.6px)] bg-[length:12px_12px] [mask-image:radial-gradient(52%_60%_at_50%_100%,#000_25%,transparent_100%)]"
        />
        <h2 className="relative font-display text-[32px] leading-9 font-[500] text-balance text-ink md:text-[44px] md:leading-[48px]">
          Built for maintainers and contributors. <br className="hidden md:block" />
          Start shipping today.
        </h2>
        <div className="relative mt-10">
          <SplitButton size="lg" label="Use this template" />
        </div>
      </div>
    </div>
  )
}

function FooterLink({ link, loose }: { link: NavLink; loose?: boolean }) {
  return (
    <li className={loose ? 'h-5' : 'h-5'}>
      <a
        href={link.href}
        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="inline-flex items-center gap-0.5 text-sm leading-5 font-medium text-ink transition-opacity duration-150 hover:opacity-60"
      >
        {link.label}
        {link.external ? <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" /> : null}
      </a>
    </li>
  )
}

const social = { github: siGithub, x: siX, discord: siDiscord }

export function Footer() {
  const groups = [...site.nav, ...site.footer]
  return (
    <footer className="shell pt-16 pb-24 lg:pt-24">
      <div className="frame">
        <ul className="grid grid-cols-2 gap-x-3 gap-y-10 pb-20 sm:grid-cols-3 lg:flex lg:gap-y-6">
          {groups.map((group) => (
            <li key={group.label} className="lg:w-60">
              <p className="text-sm leading-5 font-medium text-muted/80">{group.label}</p>
              <ul className="mt-3 space-y-3 lg:space-y-2">
                {group.links.map((link) => (
                  <FooterLink key={link.label} link={link} />
                ))}
              </ul>
            </li>
          ))}
          <li className="lg:w-40">
            <ul className="space-y-3">
              {site.legal.map((link) => (
                <FooterLink key={link.label} link={link} loose />
              ))}
            </ul>
          </li>
        </ul>
        <div className="h-px bg-line" />
        <div className="flex items-center justify-between gap-4 pt-6">
          <p className="text-sm leading-5 text-muted/80">{site.copyright}</p>
          <ul className="flex gap-2">
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" className="flex size-5 items-center justify-center text-[#525252] transition-colors duration-150 hover:text-ink">
                  <Brand icon={social[s.icon]} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
