/* Abysss timer engine — shared, side-effect-free calculations. */
(() => {
  if (typeof window === 'undefined') return;

  const ENGINE = Object.freeze({
    STAM_INTERVAL: 3 * 60 * 1000,
    IDLE_CAP_MS: 12 * 60 * 60 * 1000,
    IDLE_LEAD_MS: 5 * 60 * 1000,
    G_STAM_INTERVAL: 5 * 60 * 1000,
    SL_STAM_INTERVAL: 12 * 60 * 1000,
    SL_ORB_INTERVAL: 6 * 60 * 60 * 1000,
  });

  const finite = (value, fallback = 0) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function recover(current, max, start, interval, now = Date.now()) {
    const safeMax = Math.max(0, finite(max));
    const safeCurrent = clamp(finite(current), 0, safeMax);
    if (!start || safeCurrent >= safeMax || interval <= 0) {
      return { current: safeCurrent, start: start || null, running: !!start && safeCurrent < safeMax };
    }
    const elapsed = Math.max(0, now - finite(start, now));
    const gained = Math.floor(elapsed / interval);
    const next = Math.min(safeMax, safeCurrent + gained);
    const nextStart = next >= safeMax ? null : finite(start, now) + gained * interval;
    return { current: next, start: nextStart, running: next < safeMax };
  }

  function applyManual(current, max, oldStart, interval, now = Date.now()) {
    const safeMax = Math.max(0, finite(max));
    const next = clamp(finite(current), 0, safeMax);
    if (next >= safeMax) return { current: safeMax, start: null, running: false };
    if (!oldStart || interval <= 0) return { current: next, start: now, running: true };
    const phase = Math.max(0, (now - finite(oldStart, now)) % interval);
    return { current: next, start: now - phase, running: true };
  }

  function remainingAfter40(current) {
    return Math.max(0, finite(current)) % 40;
  }

  function restartIdle(capMs = ENGINE.IDLE_CAP_MS, now = Date.now()) {
    return { start: now - ENGINE.IDLE_LEAD_MS, capMs: Math.max(0, finite(capMs, ENGINE.IDLE_CAP_MS)), running: true };
  }

  function hasTimedProgress(slot) {
    return !!slot && (
      (!!slot.stamRunning && finite(slot.stamStart) > 0 && finite(slot.stamCurrent) < finite(slot.stamMax)) ||
      (!!slot.idleRunning && finite(slot.idleStart) > 0 && finite(slot.idleCapMs) > 0)
    );
  }

  window.AbyssTimerEngine = Object.freeze({
    ...ENGINE,
    recover,
    applyManual,
    remainingAfter40,
    restartIdle,
    hasTimedProgress,
  });
})();
