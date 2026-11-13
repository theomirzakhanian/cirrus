// Weighs the production build and writes src/weights.ts, which the
// "whole page, weighed" chart reads. Run with `npm run weigh`.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliCompressSync, gzipSync } from 'node:zlib'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const kinds = { '.js': 'JavaScript', '.css': 'CSS', '.woff2': 'Fonts', '.webp': 'Images', '.svg': 'Images', '.png': 'Images', '.jpg': 'Images', '.html': 'HTML' }

const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]))
const kb = (n) => Math.round(n / 100) / 10

const totals = {}
const files = []
for (const file of walk(dist)) {
  const kind = kinds[extname(file)]
  if (!kind) continue
  const buf = readFileSync(file)
  const t = (totals[kind] ??= { raw: 0, gzip: 0, brotli: 0 })
  t.raw += buf.length
  t.gzip += gzipSync(buf, { level: 9 }).length
  t.brotli += brotliCompressSync(buf).length
  files.push({ name: `dist/${relative(dist, file).replace(/-[\w-]{8}\./, '.')}`, bytes: buf.length })
}

const rows = Object.entries(totals)
  .map(([name, t]) => ({ name, gzip: kb(t.gzip), brotli: kb(t.brotli), raw: kb(t.raw) }))
  .sort((a, b) => b.gzip - a.gzip)
const top = files
  .filter((f) => /\.(html|css|js)$/.test(f.name))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((f) => ({ name: f.name, raw: `${kb(f.bytes).toFixed(1)} kB` }))
const modules = Number(process.argv[2]) || 0

const out = `// Written by scripts/weigh.mjs from the production build. Run \`npm run weigh\` to refresh.
export type WeightKey = 'gzip' | 'brotli' | 'raw'

export const weights = ${JSON.stringify({ modules, rows, files: top }, null, 2)}
`
writeFileSync(new URL('../src/weights.ts', import.meta.url), out)
console.table(rows)
