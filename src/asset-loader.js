/* Abysss asset loader compatibility bridge
 * Keeps the existing lazy-load call sites while routing them to the canonical dist assets.
 */
(() => {
  const legacyToDist = Object.freeze({
    'styles-games-v237.min.css': 'dist/games.min.css',
    'games-deferred-v237.min.js': 'dist/games.min.js'
  });

  const originalLoad = window.loadDeferredAsset;
  if (typeof originalLoad !== 'function') return;

  window.loadDeferredAsset = (kind, src) => {
    const clean = String(src || '').split('?')[0].replace(/^\.\//, '');
    const mapped = legacyToDist[clean];
    return originalLoad(kind, mapped ? mapped + '?v=1' : src);
  };
})();
