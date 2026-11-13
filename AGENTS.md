# AGENTS.md

Cirrus is a static landing page template for open source projects. Vite 8, React 19, TypeScript, Tailwind v4. Node 22 or newer. There is no server, no router and no CMS.

You are most likely here to turn it into a landing page for a specific project. Follow "Make it a landing page for a new project" below, in order.

## Commands

```bash
npm install
npm run dev          # dev server, http://localhost:5173
npx tsc -b           # typecheck, must pass
npm run build        # typecheck + production build into dist/
npm run weigh        # builds, measures dist/, rewrites src/weights.ts. Run after changing the page, then run npm run build again
node scripts/apps.mjs  # rewrites src/apps.ts from the app list inside the script
npx oxlint           # 3 known warnings in src/components/bits.tsx, no errors
```

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npx tsc -b` and `npm run build` on Node 22. Keep those green.

## Where things are

| Path | What it is |
| --- | --- |
| `src/site.ts` | Name, repo URL, license, and every menu, footer and download link. Typed. |
| `src/App.tsx` | The page, top to bottom. One line per section. |
| `src/index.css` | Design tokens in `@theme`, font faces, global rules. |
| `src/components/hero.tsx` | Hero and the drawn product window (a stand-in). |
| `src/components/features.tsx` | Intro, app wall, pitch, use cases, page weight chart, reorder section. |
| `src/components/theming.tsx` | Theming section and the dark `site.ts` panel. |
| `src/components/open.tsx` | Four tiles on gray. |
| `src/components/end.tsx` | Closing banner and footer. |
| `src/components/nav.tsx` | Both top bars, menus, the split download button. |
| `src/components/bits.tsx` | Shared small parts: logo mark, cursor, hand, reveal hooks. |
| `src/apps.ts` | Generated. Do not edit by hand. |
| `src/weights.ts` | Generated. Do not edit by hand. |
| `public/sky.webp` | Hero background. |
| `src/fonts/` | Headline font and its license. |

## Make it a landing page for a new project

Do these in order.

1. Edit `src/site.ts`: `name`, `repo`, `license`, `copyright`, then the menus. Every link is typed and built from `repo`, so set that first. Do not leave a placeholder URL anywhere.
2. Edit `index.html`: `<title>`, the meta description, and the `og:` tags.
3. Edit the tokens in `src/index.css`. If you change `--color-link`, keep it at 4.5:1 or better against white.
4. Rewrite the copy. The text in the components describes Cirrus itself, so every sentence has to be replaced with something true about the new project. Rules for copy: labels are one to three words, buttons are verbs, no marketing filler, no em dashes, no emoji. Do not invent benchmarks, testimonials, customers or numbers.
   - `hero.tsx`: the headline, the license badge, and the text inside the product window.
   - `features.tsx`: `Intro`, the `Stack` headline, `Pitch`, `UseCases` captions, and the `Weight` and `Reorder` text.
   - `theming.tsx`, `open.tsx`, `end.tsx`: headings and captions.
5. Replace the stand-ins: `public/sky.webp` (update `width` and `height` on the `<img>` in `hero.tsx`), the drawn window in `hero.tsx` (swap for a real screenshot if the project has a UI), `public/favicon.svg`, and the `Mark` in `bits.tsx`.
6. Edit the app list in `scripts/apps.mjs` if those apps mean nothing for the project, then run `node scripts/apps.mjs`.
7. Update `LICENSE`, `package.json` (`name`, `repository`, `homepage`, `bugs`, `author`), `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` and `public/llms.txt`.
8. Run `npm run weigh`, then `npm run build`. Commit the regenerated `src/weights.ts`.

To drop a section, delete its line in `App.tsx`. To reorder, move the line. Sections share no state.

## Rules that have to keep holding

- Icons are SVG. No emoji, no icon fonts, no raster icons.
- Everything clickable uses the pointer cursor. That is set globally in `index.css`.
- Animations stop under `prefers-reduced-motion` (global rule in `index.css`). Content must stay visible if the animation never runs.
- No trackers, analytics or third-party scripts. The page says so, and the chart measures it.
- Display font weights are tuned to the font: 450, 500, 525 and 575 are deliberate. Do not reset them to 400 or 500. `.font-display` carries a base letter spacing in `index.css`.
- Corners use `corner-shape: superellipse(1.4)` globally. `.rounded-full` stays perfectly round.
- Text colors must pass AA on their background. The contrast table is in `README.md`.
- Logos on the app wall come from `simple-icons` and `@iconify-json/logos`. They name apps and belong to their owners.
- Do not use anything from aside.com: no images, fonts or icons.

## Checking your work

1. `npx tsc -b` and `npm run build` pass.
2. Look at it at 1440 px and at 375 px wide. No sideways scroll, no clipped text.
3. The browser console has no errors.
4. Open the three top menus and the download menu, and check every link goes somewhere real.

## Do not commit

`node_modules`, `dist`, `.vercel`.
