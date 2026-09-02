/* Abysss Timer Engine v2
 * Purpose: pure, tiny time math + state transitions. No DOM, timers, or rendering.
 */
(() => {
  'use strict';

  const STEP_MS = 180000;
  const IDLE_CAP_MS = 43200000;
  const IDLE_LEAD_MS = 300000;
  const CONSUME_STEP = 40;

  const int = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? Math.trunc(n) : fallback;
  };
  const clamp = (v, min, max) => Math.min(max, Math.max(min, int(v)));

  function stamina(s, now = Date.now(), stepMs = STEP_MS) {
    const max = Math.max(0, int(s?.stamMax));
    const base = clamp(s?.stamCurrent, 0, max);
    if (!s?.stamRunning || !s?.stamStart || base >= max) {
      return { current: base, max, nextIn: null, fullIn: 0, fullAt: null };
    }
    const elapsed = Math.max(0, now - int(s.stamStart));
    const recovered = Math.floor(elapsed / stepMs);
    const current = Math.min(max, base + recovered);
    if (current >= max) {
      return { current: max, max, nextIn: 0, fullIn: 0, fullAt: int(s.stamStart) + Math.max(0, max - base) * stepMs };
    }
    const nextIn = stepMs - (elapsed % stepMs);
    return {
      current, max, nextIn,
      fullIn: (max - current - 1) * stepMs + nextIn,
      fullAt: now + (max - current - 1) * stepMs + nextIn,
    };
  }

  function idle(s, now = Date.now(), capMs = IDLE_CAP_MS) {
    if (!s?.idleRunning || !s?.idleStart) {
      return { elapsed: 0, remaining: null, pct: 0, fullAt: null, full: false };
    }
    const cap = Math.max(1, int(s.idleCapMs, capMs));
    const elapsed = Math.max(0, now - int(s.idleStart));
    const remaining = Math.max(0, cap - elapsed);
    return { elapsed: Math.min(cap, elapsed), remaining, pct: Math.min(100, elapsed / cap * 100), fullAt: int(s.idleStart) + cap, full: remaining === 0 };
  }

  function remainderAfter40(current) {
    return Math.max(0, int(current)) % CONSUME_STEP;
  }

  function applyStamina(s, next, now = Date.now(), stepMs = STEP_MS) {
    const max = Math.max(0, int(s.stamMax));
    const old = clamp(s.stamCurrent, 0, max);
    const value = clamp(next, 0, max);
    if (!s.stamRunning || !s.stamStart || old >= max) {
      s.stamCurrent = value;
      s.stamStart = now;
      s.stamRunning = value < max;
      return s;
    }
    const elapsed = Math.max(0, now - int(s.stamStart));
    const phase = elapsed % stepMs;
    s.stamCurrent = value;
    s.stamStart = now - phase;
    s.stamRunning = value < max;
    return s;
  }

  function restartIdle(s, now = Date.now(), leadMs = IDLE_LEAD_MS) {
    s.idleStart = now - leadMs;
    s.idleCapMs = Math.max(1, int(s.idleCapMs, IDLE_CAP_MS));
    s.idleRunning = true;
    return s;
  }

  window.AbyssTimerEngine = Object.freeze({
    STEP_MS, IDLE_CAP_MS, IDLE_LEAD_MS, CONSUME_STEP,
    stamina, idle, remainderAfter40, applyStamina, restartIdle
  });
})();
