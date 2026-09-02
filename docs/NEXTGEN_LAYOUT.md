# Abysss NextGen layout

## Runtime layers

1. `src/chrono-core.js` — pure timer mathematics and state transitions.
2. `src/timer-engine.js` — compatibility layer retained during migration.
3. `src/core.js` — application state, persistence, rendering, and legacy-compatible orchestration.
4. `src/dotabyss.js` — Dot Abyss UI and interaction behavior.
5. `src/g-generation.js` / `src/star-leap.js` — secondary-game logic.
6. `src/runtime.js` — lightweight scheduling/resume layer.

## Distribution

- `dist/app.min.js` — primary application bundle.
- `dist/games.min.js` — secondary-game bundle.
- `dist/app.min.css` — primary styles.
- `dist/games.min.css` — secondary-game styles.

Legacy root bundles remain only where the current deferred-loading path still references them. They should be removed after the deferred source references and regenerated distribution are verified together.