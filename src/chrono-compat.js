/* Abysss Chrono Core compatibility adapters
 * Keeps legacy function names while routing timer math through Chrono Core.
 */
const CHRONO = window.AbyssChronoCore;

function getStamInfo(s, now){
  const r = CHRONO.stamina(s, now, CHRONO.STEP_MS);
  return { current:r.current, fullIn:r.fullIn === 0 ? 0 : r.fullIn || null, fullAt:r.fullAt, isFull:r.current >= r.max };
}

function getGStamInfo(s, now){
  const interval = 5 * 60 * 1000;
  const max = Math.max(0, Number(s?.stamMax) || 0), base = Math.max(0, Math.min(max, Number(s?.stamCurrent) || 0));
  if (!s?.stamRunning || !s?.stamStart) return { current:base, fullIn:null, fullAt:null, isFull:base >= max };
  const elapsed = Math.max(0, now - Number(s.stamStart)), recovered = Math.floor(elapsed / interval), current = Math.min(max, base + recovered);
  if (current >= max) return { current:max, fullIn:0, fullAt:Number(s.stamStart) + Math.max(0, max - base) * interval, isFull:true };
  const nextIn = interval - elapsed % interval, fullIn = (max - current - 1) * interval + nextIn;
  return { current, fullIn, fullAt:now + fullIn, isFull:false };
}

function getSLTimerInfo(timer, max, interval, now){
  const m = Math.max(0, Number(max) || 0), base = Math.max(0, Math.min(m, Number(timer?.current) || 0));
  if (!timer?.running || !timer?.start) return { current:base, nextIn:null, fullIn:null, fullAt:null, isFull:base >= m };
  const elapsed = Math.max(0, now - Number(timer.start)), recovered = Math.floor(elapsed / interval), current = Math.min(m, base + recovered);
  if (current >= m) return { current:m, nextIn:0, fullIn:0, fullAt:Number(timer.start) + Math.max(0, m - base) * interval, isFull:true };
  const nextIn = interval - elapsed % interval, fullIn = (m - current - 1) * interval + nextIn;
  return { current, nextIn, fullIn, fullAt:now + fullIn, isFull:false };
}

function getIdleInfo(s, now){
  if (!s.idleRunning || !s.idleStart) return { display:'—:—', meta:'未開始', isFull:false, remainingMs:null };
  const r = CHRONO.idle(s, now, CHRONO.IDLE_CAP_MS), fullAt = r.fullAt, full = r.full;
  return { display:full ? 'MAX' : formatGameMinute(r.remaining), meta:full ? formatClock(fullAt) + ' 到達' : formatClock(fullAt) + ' 満タン', clockTxt:formatClock(fullAt), suffix:full ? ' 到達' : ' 満タン', isFull:full, remainingMs:r.remaining };
}

function stamRemainderAfter40s(current){ return CHRONO.remainderAfter40(current); }

function getLiveStamCurrent(i){
  const s = state.slots[i];
  return s.stamRunning ? CHRONO.stamina(s, Date.now(), CHRONO.STEP_MS).current : s.stamCurrent;
}
