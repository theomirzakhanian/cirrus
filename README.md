# Cirrus

A landing page template for open source projects, built to be driven by a coding agent. Plain React and CSS, MIT licensed, no trackers.

[![CI](https://github.com/theomirzakhanian/cirrus/actions/workflows/ci.yml/badge.svg)](https://github.com/theomirzakhanian/cirrus/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111.svg)](LICENSE)

[Live demo](https://cirrus-beige.vercel.app) · [Use this template](https://github.com/theomirzakhanian/cirrus/generate) · [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftheomirzakhanian%2Fcirrus)

![The Cirrus hero: a sky, a headline, and a product window](docs/preview.jpg)

## Use it with an agent

Paste this into Claude Code, Codex, Cursor, or whatever you run:

```text
Use https://github.com/theomirzakhanian/cirrus as a template for a landing page for my project.
Read AGENTS.md first and follow its steps in order. Point src/site.ts at my repo, rewrite the copy
in every section so it is true of my project, replace the hero window and sky, then run
`npm run weigh` and `npm run build` and deploy the dist folder.
```

[AGENTS.md](AGENTS.md) has the commands, the file map, the ordered customisation steps and the rules the code has to keep following. There is also a [llms.txt](https://cirrus-beige.vercel.app/llms.txt) on the demo site.

## What you get

A hero with a product window, a wall of app icons, feature cards, a page weight chart, a closing banner and a footer. Everything on the page is real code. The chart shows what the page weighs, measured from the build, and every link lives in one typed file, so a missing one fails the build instead of shipping a dead button. The whole page is about 250 kB gzipped.

## By hand

```bash
git clone https://github.com/theomirzakhanian/cirrus my-project
cd my-project
npm install
npm run dev
```

You need Node 22 or newer. `npm run build` writes static files to `dist`.

Three files do most of the work:

- `src/site.ts` has the name, the repo URL, the license, and every menu and footer link. Change `repo` first, because the rest is built from it.
- `src/index.css` has the design tokens (colors, fonts, easing) in the `@theme` block.
- `src/App.tsx` is the page, one line per section. Delete a line to drop a section, move it to reorder.

The window in the hero is drawn in markup as a stand-in, and `public/sky.webp` is the hero background. Replace both.

## What's where

Each section is one component with no shared state.

| Component | File |
| --- | --- |
| Hero, with the product window | `src/components/hero.tsx` |
| Intro, app wall, pitch, use cases, page weight chart, reorder | `src/components/features.tsx` |
| Theming, site.ts | `src/components/theming.tsx` |
| Open source tiles | `src/components/open.tsx` |
| Closing banner, footer | `src/components/end.tsx` |
| Top bars, menus, the split button | `src/components/nav.tsx` |

The app wall comes from a list in `scripts/apps.mjs`. Change the list, run `node scripts/apps.mjs`, and it rewrites `src/apps.ts`.

## Deploy

It's a folder of static files, so anywhere that serves a folder works. Build command `npm run build`, output directory `dist`. The Vercel button above does both for you. If you host under a sub-path, like GitHub Pages at `username.github.io/repo`, set `base` in `vite.config.ts`.

## Page weight

The chart is not a mock-up. `npm run weigh` builds the site, measures every file in `dist` as plain, gzip and brotli, and writes the numbers to `src/weights.ts`. Run it after you change the page, then build again.

## Good to know

Corners use `corner-shape: superellipse()`, which gives the smooth app-icon curve in Chromium browsers. Elsewhere they fall back to ordinary round corners.

Every animation stops under `prefers-reduced-motion`. Buttons, links, tabs and menu items use the pointer cursor.

Text colors were checked against white. AA needs 4.5 for body text.

| Token | Color | Ratio | Body text |
| --- | --- | --- | --- |
| `--color-ink` | `#090b0c` | 19.72 | Passes |
| `--color-muted` | `#737373` | 4.74 | Passes |
| `--color-link` | `#0077bc` | 4.81 | Passes |
| `--color-faint` | `#a1a1a1` | 2.58 | Fails. Only used inside the drawn pictures. |
| `--color-fill` | `#f5f5f5` | 1.09 | Fails. A background, never text. |

There is no dark mode, router, CMS or analytics. The hero window shows a running timer and a few small loops but doesn't play a scripted story.

## Credits

The layout follows the aside.com landing page. No code or assets from that site are used here.

The headline font is Google Sans Flex, set to optical size 100 and cut down to the weight axis (`src/fonts/google-sans-flex-display.woff2`, licence in `src/fonts/OFL.txt`). I picked it by scoring 136 open fonts on letter shape, weight and spacing against the font on aside.com. Body text is Geist. Both are under the SIL Open Font License, packaged by Fontsource.

Icons come from Lucide (ISC), Simple Icons (CC0) and SVG Logos (CC0). The app logos on the wall belong to their owners and are there only to name the apps.

The sky in the hero is an AI-generated image. `scripts/sky.py` draws a rough procedural one if you want a starting point: `python3 scripts/sky.py public/sky.webp preview.png`, with numpy and Pillow installed.

## Contributing and license

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and the [code of conduct](CODE_OF_CONDUCT.md). MIT licensed, see [LICENSE](LICENSE).
