# Contributing

Cirrus is small on purpose, so contributing is mostly two things: open an issue, or send a pull request.

## Before you start

If you found a bug, open an issue and say what you saw and in which browser. If you want to add something bigger, like a new section or a new dependency, open an issue first. It's easier to agree on the idea before you've spent a weekend on it.

## Run it

```bash
npm install
npm run dev
```

Before you push, run `npx tsc -b` and `npm run build`. CI runs the same two commands.

## What fits

Fixes for layout, accessibility and contrast problems are always welcome. So are new sections that follow the pattern the others use: one component, no shared state, safe to delete without breaking anything else. Anything that makes the page lighter is a good change.

What doesn't fit is trackers, analytics, a CSS-in-JS library, or any dependency that makes the first load heavier without a reason you can give in one sentence.

## Style

Match the code around you. Keep UI copy short: labels of one to three words, verbs on buttons, and no emoji. Icons are SVG. If you change something visible, check it at phone width and with reduced motion turned on.
