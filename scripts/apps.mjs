// Builds src/apps.ts: the 24 app icons on the wall, in reading order.
// Logos come from two open collections; the marks belong to their owners.
// Run with `node scripts/apps.mjs` after changing the list.
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import * as si from 'simple-icons'

const logos = createRequire(import.meta.url)('@iconify-json/logos/icons.json')
const logo = (name, bg = '#fff', size = 0.6) => {
  const i = logos.icons[name]
  return { bg, size, vb: `0 0 ${i.width ?? logos.width ?? 256} ${i.height ?? logos.height ?? 256}`, body: i.body }
}
const glyph = (icon, bg, fg = '#fff', size = 0.56) => ({ bg, size, vb: '0 0 24 24', body: `<path fill="${fg}" d="${icon.path}"/>` })

const apps = [
  // far row
  ['LinkedIn', logo('linkedin-icon', '#fff', 1.02)],
  ['Chase', glyph(si.siChase, '#117aca')],
  ['Slack', logo('slack-icon', '#fff', 0.58)],
  ['Stripe', glyph(si.siStripe, '#635bff')],
  ['Product Hunt', glyph(si.siProducthunt, '#da552f', '#fff', 0.62)],
  ['Reddit', glyph(si.siReddit, '#ff4500', '#fff', 0.62)],
  ['Bluesky', glyph(si.siBluesky, '#fff', '#1185fe', 0.6)],
  ['Linear', glyph(si.siLinear, '#1b1c22', '#fff', 0.6)],
  // middle row
  ['Jira', glyph(si.siJira, '#2684ff')],
  ['Google', logo('google-icon', '#fff', 0.6)],
  ['X', glyph(si.siX, '#0b0b0b')],
  ['Google Sheets', glyph(si.siGooglesheets, '#fff', '#34a853', 0.6)],
  ['Google Docs', glyph(si.siGoogledocs, '#fff', '#4285f4', 0.6)],
  ['Google Drive', logo('google-drive', '#fff', 0.62)],
  ['Google Slides', glyph(si.siGoogleslides, '#fff', '#fbbc04', 0.6)],
  ['GitHub', glyph(si.siGithub, '#fff', '#181717', 0.68)],
  // near row
  ['WhatsApp', glyph(si.siWhatsapp, '#25d366', '#fff', 0.64)],
  ['Notion', logo('notion-icon', '#fff', 0.62)],
  ['Gmail', logo('google-gmail', '#fff', 0.64)],
  ['YouTube', logo('youtube-icon', '#fff', 0.64)],
  ['Google Calendar', logo('google-calendar', '#fff', 0.62)],
  ['Discord', glyph(si.siDiscord, '#5865f2', '#fff', 0.62)],
  ['Instagram', glyph(si.siInstagram, 'linear-gradient(45deg,#f9ce34,#ee2a7b 50%,#6228d7)', '#fff', 0.6)],
  ['Salesforce', logo('salesforce', '#fff', 0.72)],
].map(([name, icon]) => ({ name, ...icon }))

writeFileSync(
  new URL('../src/apps.ts', import.meta.url),
  `// Written by scripts/apps.mjs. Edit the list there, not here.\nexport const apps: { name: string; bg: string; size: number; vb: string; body: string }[] = ${JSON.stringify(apps, null, 2)}\n`,
)
console.log(apps.length, 'icons,', Math.round(JSON.stringify(apps).length / 1024), 'kB')
