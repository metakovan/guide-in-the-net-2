# Islands in the Net — Digital Guide

A mobile-first digital exhibition guide for **Islands in the Net**, presented at Padimai Art & Tech Studio, Tanjong Pagar Distripark, Singapore.

[Open the production guide](https://guide-in-the-net.vercel.app)

## Current build

Package version **0.8.0**. The guide is a React, TypeScript and Vite single-page application with a complete visitor journey:

1. Cover and visitor-name entry
2. Welcome and How to Use This Space
3. **You and the Net**
4. **Together in the Net**
5. **Here in the Net**
6. **Futures Reading Room**
7. Continue? closing questions and credits

The artwork sequence currently includes:

- **You and the Net:** Safe Entry V.2.5; A History of Intelligence in ((South)(East)) Asia; Future You; Open Benchmark of AI Impact on Humans (ImpactBench) × CereaLLMs; Art in the Age of Human Cloning
- **Together in the Net:** The Commons; F4NT4SY_H4RD_DR1VE://ALTAR; Traces
- **Here in the Net:** ASIA MAXXING; ICHING HEXAGRAM; XO

## Features

- Personalised visitor name and map headings
- Persistent back/next navigation and a sliding section menu
- Direct screen routes through the `?screen=` query parameter
- Artwork pages with About, Why Now? and Pause / Reflect sections
- Private reflection responses saved locally on the visitor’s device
- Small, Standard and Large text-size settings
- Standard, red/green-safe, blue/yellow-safe and high-contrast colour modes
- Reduced-motion support
- A Futures Reading Room with browsing cues and reflection prompts
- Field Notes from the Net assembled from saved responses
- Client-side PDF and JPG export of Field Notes
- Responsive mobile and desktop layouts
- Custom PxPlus IBM BIOS display typography with a system fallback

The app has no backend. Visitor names, settings and reflections remain in browser `localStorage`; reflection responses are not uploaded.

## Run locally

Use Node.js 18–22, matching the package engine constraint.

```bash
npm ci
npm run dev
```

The development server is available at `http://localhost:5173` by default. To preview a production build locally:

```bash
npm run build
npm run preview
```

## Checks

```bash
npm run check
npm run build
```

`npm run check` runs TypeScript validation. `npm run build` validates the TypeScript and creates the Vite production bundle in `dist/`.

## Project layout

- `src/App.tsx` — application flow, screen routing, visitor name and settings state
- `src/content/guideContent.ts` — section, artwork and reflection content
- `src/components/` — page-level and reusable interface components
- `src/components/SectionMenu.tsx` — section navigation
- `src/components/ReflectionResponseList.tsx` — local reflection response UI
- `src/components/ReadingRoomPage.tsx` — Futures Reading Room page
- `src/components/CreditsPage.tsx` — Field Notes display and PDF/JPG export controls
- `src/utils/reflections.ts` — local reflection storage and ordering
- `src/utils/rewindExport.ts` — client-side Field Notes export generation
- `src/styles.css` — layout, typography, responsive behaviour, animation and accessibility modes
- `public/assets/` — artwork, map and interface assets
- `public/fonts/Header_Font.ttf` — bundled PxPlus IBM BIOS display font

Keep `public/fonts/Header_Font.ttf` at that exact path. The app preloads it and falls back to a system monospace font if it is unavailable.

## Local storage keys

The current app uses these browser storage keys:

- `iitn-guide-name`
- `iitn-guide-reduced-motion`
- `iitn-guide-text-size`
- `iitn-guide-colour-mode`
- `iitn-guide-reflections-v1`

## Deployment

The app is configured as a Vite SPA through `vercel.json`, which rewrites routes to `index.html`. Production deployments are made from the `main` branch to the Vercel project `guide-in-the-net`.

See [`CHANGELOG.md`](CHANGELOG.md) for historical changes. The handover and progress documents in the repository contain additional project context for maintainers.
