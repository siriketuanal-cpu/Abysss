# Abysss NextGen layout

## Runtime layers

1. `src/chrono-core.js` — pure timer mathematics and state transitions.
2. `src/chrono-overrides.js` — legacy-compatible adapters backed by Chrono Core during migration.
3. `src/core.js` — application state, persistence, rendering, and legacy-compatible orchestration.
4. `src/dotabyss.js` — Dot Abyss UI and interaction behavior.
5. `src/g-generation.js` / `src/star-leap.js` — secondary-game logic.
6. `src/runtime.js` — lightweight scheduling/resume layer and deferred-asset compatibility.
7. `src/bootstrap.js` — startup and event wiring only.

## Distribution

- `dist/app.min.js` — primary application bundle.
- `dist/games.min.js` — canonical secondary-game bundle.
- `dist/app.min.css` — primary styles.
- `dist/games.min.css` — canonical secondary-game stylesheet.

Legacy root-level versioned game assets have been removed from the NextGen branch. `runtime.js` redirects the existing deferred-loader names to the canonical `dist` assets, preserving the current lazy-load contract without retaining duplicate generated files.

`main` remains untouched while this branch is verified.
