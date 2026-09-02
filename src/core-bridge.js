/* Abysss Chrono Core bridge
 * Replaces duplicated timer math in the legacy-compatible core without touching UI flow.
 */
(() => {
  'use strict';
  const C = window.AbyssChronoCore;
  if (!C) return;

  window.getStamInfo = function(s, now) {
    const r = C.stamina(s, now, C.STEP_MS);
    return { current:r.current, fullIn:r.fullIn || (r.fullIn === 0 ? 0 : null), fullAt:r.fullAt, isFull:r.current >= r.max };
  };

  window.getGStamInfo = function(s, now) {
    const interval = 5 * 60 * 1000;
    const max = Math.max(0, Number(s?.stamMax) || 0);
    const base = Math.max(0, Math.min(max, Number(s?.stamCurrent) || 0));
    if (!s?.stamRunning || !s?.stamStart) return { current:base, fullIn:null, fullAt:null, isFull:base >= max };
    const elapsed = Math.max(0, now - Number(s.stamStart));
    const recovered = Math.floor(elapsed / interval);
    const current = Math.min(max, base + recovered);
    if (current >= max) return { current:max, fullIn:0, fullAt:Number(s.stamStart) + Math.max(0, max - base) * interval, isFull:true };
    const nextIn = interval - elapsed % interval;
    const fullIn = (max - current - 1) * interval + nextIn;
    return { current, fullIn, fullAt:now + fullIn, isFull:false };
  };

  window.getSLTimerInfo = function(timer, max, interval, now) {
    const m = Math.max(0, Number(max) || 0);
    const base = Math.max(0, Math.min(m, Number(timer?.current) || 0));
    if (!timer?.running || !timer?.start) return { current:base, nextIn:null, fullIn:null, fullAt:null, isFull:base >= m };
    const elapsed = Math.max(0, now - Number(timer.start));
    const recovered = Math.floor(elapsed / interval);
    const current = Math.min(m, base + recovered);
    if (current >= m) return { current:m, nextIn:0, fullIn:0, fullAt:Number(timer.start) + Math.max(0, m - base) * interval, isFull:true };
    const nextIn = interval - elapsed % interval;
    const fullIn = (m - current - 1) * interval + nextIn;
    return { current, nextIn, fullIn, fullAt:now + fullIn, isFull:false };
  };

  window.getIdleInfo = function(s, now) {
    const r = C.idle(s, now, C.IDLE_CAP_MS);
    if (!s?.idleRunning || !s?.idleStart) return { display:'—:—', meta:'未開始', isFull:false, remainingMs:null };
    const fullAt = r.fullAt;
    const full = r.full;
    return {
      display:full ? 'MAX' : window.formatGameMinute(r.remaining),
      meta:full ? window.formatClock(fullAt) + ' 到達' : window.formatClock(fullAt) + ' 満タン',
      clockTxt:window.formatClock(fullAt), suffix:full ? ' 到達' : ' 満タン',
      isFull:full, remainingMs:r.remaining
    };
  };

  window.stamRemainderAfter40s = C.remainderAfter40;
  window.getLiveStamCurrent = function(i) {
    const s = window.state?.slots?.[i];
    if (!s) return 0;
    return s.stamRunning ? C.stamina(s, Date.now(), C.STEP_MS).current : s.stamCurrent;
  };
})();
