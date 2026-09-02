# Abysss architecture

## Runtime layers

- `src/chrono-core.js` — Abysss Chrono Core: pure timer mathematics and timer-state transitions.
- `src/chrono-compat.js` — compatibility adapters that keep legacy function names while routing shared timer math through Chrono Core.
- `src/core.js` — application state, persistence, rendering, and legacy-compatible orchestration.
- `src/dotabyss.js` — Dot Abyss-specific behavior and interactions.
- `src/bootstrap.js` — startup and secondary-game bootstrap wiring.
- `src/g-generation.js` — G-Gen secondary-game logic.
- `src/star-leap.js` — STAR LEAP secondary-game logic.
- `src/runtime.js` — lightweight visibility/resume and minute-boundary scheduling, plus deferred-asset compatibility.
- `src/styles.css` — stylesheet source.

## Distribution

- `dist/app.min.js` — primary application bundle.
- `dist/games.min.js` — canonical secondary-game bundle.
- `dist/app.min.css` — primary stylesheet bundle.
- `dist/games.min.css` — canonical secondary-game stylesheet bundle.

## Cleanup policy

Legacy root-level versioned game assets and the old `timer-engine.js` source have been removed from the NextGen branch. The compatibility layer has a descriptive name and is included in the primary build before Dot Abyss UI code.

The runtime compatibility shim keeps the existing deferred-loader contract working while legacy call sites are migrated to canonical `dist` assets.

The `main` branch is intentionally left untouched while this architecture is verified.