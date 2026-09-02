# Source layout

- `chrono-core.js` — Abysss Chrono Core: pure shared time math and timer state transitions.
- `chrono-overrides.js` — temporary legacy-compatible adapters that route primary timer calculations into Chrono Core.
- `core.js` — shared application state, persistence, rendering, and compatibility logic.
- `dotabyss.js` — Dot Abyss UI and interaction behavior.
- `g-generation.js` — G-Gen secondary-game logic.
- `star-leap.js` — STAR LEAP secondary-game logic.
- `runtime.js` — lightweight visibility/resume and minute-boundary scheduling.
- `asset-loader.js` — temporary lazy-load compatibility bridge from legacy game asset names to canonical dist assets.
- `bootstrap.js` — application startup and delegated-event wiring.
- `styles.css` — stylesheet source.

## Migration policy

New shared timer calculations belong in `chrono-core.js`. Game-specific state stays in its own module. Compatibility files are temporary and may be removed only after all legacy call sites have been migrated and verified.