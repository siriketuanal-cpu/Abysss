# 深淵タイマー — Abysss

Abysss is the lightweight, split-file version of the Dot Abyss timer.

## NextGen source layout

- `src/timer-engine.js` — shared timer calculations
- `src/core.js` — state, rendering, and compatibility logic
- `src/dotabyss.js` — Dot Abyss-specific UI and interactions
- `src/g-generation.js` — G-Gen timer
- `src/star-leap.js` — STAR LEAP timer
- `src/bootstrap.js` — startup/reset/service-worker wiring
- `src/runtime.js` — lightweight timer scheduling and resume handling
- `src/styles.css` — stylesheet source

## Build outputs

- `dist/app.min.js`
- `dist/games.min.js`
- `dist/app.min.css`
- `dist/games.min.css`

The `abysss-nextgen` branch is used for the ongoing architecture cleanup and optimization. The existing `main` branch remains the untouched baseline.
