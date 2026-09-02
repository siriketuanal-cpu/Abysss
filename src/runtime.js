/* Abysss NextGen runtime layer v1
 * Keeps the existing UI/interaction code intact.
 * Owns lightweight scheduling and runtime asset compatibility.
 */
(() => {
  if (typeof window === 'undefined') return;

  // Legacy lazy-load call sites still name the old generated assets.
  // Resolve those names here, at runtime, to the canonical dist bundles.
  const legacyToDist = Object.freeze({
    'styles-games-v237.min.css': 'dist/games.min.css',
    'games-deferred-v237.min.js': 'dist/games.min.js'
  });
  const originalLoadDeferredAsset = window.loadDeferredAsset;
  if (typeof originalLoadDeferredAsset === 'function') {
    window.loadDeferredAsset = (kind, src) => {
      const raw = String(src || '');
      const clean = raw.split('?')[0].replace(/^\.\//, '');
      const mapped = legacyToDist[clean];
      return originalLoadDeferredAsset(kind, mapped ? mapped + '?v=1' : src);
    };
  }

  const originalStopTicking = typeof window.stopTicking === 'function'
    ? window.stopTicking
    : null;

  // The existing bundle may have scheduled one callback before this layer loads.
  // Cancel that scheduler once, then own scheduling from here on.
  if (originalStopTicking) {
    try { originalStopTicking(); } catch (_) {}
  }

  let timerId = null;
  let generation = 0;

  const hasProgress = () => {
    try {
      return typeof window.needsTicking === 'function' && window.needsTicking();
    } catch (_) {
      return false;
    }
  };

  const clearTimer = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  const schedule = () => {
    clearTimer();
    if (document.hidden || !hasProgress()) return;

    const myGeneration = generation;
    // The UI displays minute-level countdowns, so a minute boundary is the
    // only regular refresh point required for the visible timer text.
    const now = Date.now();
    const delay = Math.max(80, 60000 - (now % 60000));

    timerId = setTimeout(() => {
      timerId = null;
      if (myGeneration !== generation || document.hidden) return;

      try {
        if (typeof window.render === 'function') window.render();
      } catch (_) {}

      schedule();
    }, delay);
  };

  window.startTicking = () => {
    schedule();
  };

  window.stopTicking = () => {
    generation += 1;
    clearTimer();
  };

  // The old handler used requestAnimationFrame after essentially every
  // interaction. The scheduler above already remains valid, so this recovery
  // hook becomes intentionally inert.
  window.scheduleInteractionTickRecovery = () => {};

  // Resume is a single synchronous resync instead of a second delayed render.
  window.resumeTicking = () => {
    if (document.hidden) return;
    try {
      if (typeof window.render === 'function') window.render();
    } catch (_) {}
    schedule();
  };

  document.addEventListener('visibilitychange', () => {
    generation += 1;
    clearTimer();
    if (!document.hidden) {
      try {
        if (typeof window.render === 'function') window.render();
      } catch (_) {}
      schedule();
    }
  }, { passive: true });

  window.addEventListener('pageshow', () => {
    if (document.hidden) return;
    try {
      if (typeof window.render === 'function') window.render();
    } catch (_) {}
    schedule();
  }, { passive: true });

  // Reconnect once after the current bundle has finished installing.
  schedule();
})();
