# Abysss architecture

## Runtime layers

- `src/timer-engine.js` — shared, side-effect-free timer calculations.
- `src/core.js` — existing state, rendering, and interaction compatibility layer.
- `src/dotabyss.js` — Dot Abyss-specific behavior.
- `src/bootstrap.js` — startup, resume, reset, and service-worker wiring.
- `src/g-generation.js` — G-Gen secondary timer.
- `src/star-leap.js` — STAR LEAP secondary timer.
- `src/runtime.js` — lightweight scheduler/resume layer.
- `src/styles.css` — stylesheet source.

## Build outputs

- `dist/app.min.js` — primary application bundle.
- `dist/games.min.js` — secondary-game bundle.
- `dist/app.min.css` — primary stylesheet bundle.
- `dist/games.min.css` — secondary-game stylesheet bundle.

The legacy versioned root files are being phased out only after their runtime references are migrated. The working application remains on the known-good behavior while this cleanup proceeds.
