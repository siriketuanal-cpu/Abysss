# 深淵タイマー — Abysss

Abysss is the lightweight, split-file version of the Dot Abyss timer.

## NextGen source layout

- `src/chrono-core.js` — pure shared timer mathematics and state transitions
- `src/chrono-overrides.js` — temporary legacy-compatible Chrono Core adapters
- `src/core.js` — state, persistence, rendering, and compatibility logic
- `src/dotabyss.js` — Dot Abyss-specific UI and interactions
- `src/g-generation.js` — G-Gen timer
- `src/star-leap.js` — STAR LEAP timer
- `src/bootstrap.js` — startup wiring
- `src/runtime.js` — lightweight timer scheduling and resume handling
- `src/asset-loader.js` — temporary legacy asset-name compatibility bridge
- `src/styles.css` — stylesheet source

## Build outputs

- `dist/app.min.js`
- `dist/games.min.js`
- `dist/app.min.css`
- `dist/games.min.css`

The `abysss-nextgen` branch is used for the ongoing architecture cleanup and optimization. The existing `main` branch remains the untouched baseline.
