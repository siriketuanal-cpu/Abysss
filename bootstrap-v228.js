loadState();
setupDelegatedEvents();
const appRootForTickRecovery = document.querySelector('.wrap');
if (appRootForTickRecovery) appRootForTickRecovery.addEventListener('click', scheduleInteractionTickRecovery);
const gamesRootForPriorityLoad = document.getElementById('gamesAll');
if (gamesRootForPriorityLoad) gamesRootForPriorityLoad.addEventListener('pointerdown', () => scheduleSecondaryGamesBuild(true), { passive: true });
scheduleStartupStabilization();
const startupGraceUntil = Date.now() + 3000;

// ---- 画面復帰時のタイマー同期処理 ----
// 復帰時は下段ロードを絶対に走らせず、タイマー再接続と最小限の再描画だけにする。
let resumeRenderTimer = null;

function resumeTicking(){
  if (document.hidden) return;
  // 復帰時は下段の遅延ロードを一切しない（ネットワーク発生を防ぐ）
  // scheduleSecondaryGamesBuild();  ← 削除
  startTicking(true);
  if (resumeRenderTimer) clearTimeout(resumeRenderTimer);
  resumeRenderTimer = setTimeout(() => {
    resumeRenderTimer = null;
    if (document.hidden) return;
    render();
  }, 120); // 150→120に少し短縮
}

function scheduleResetCheck(){
  if (resetCheckTimer) clearTimeout(resetCheckTimer);

  const now = new Date();
  const next = new Date(now);
  next.setHours(1, 0, 1, 0);
  if (next <= now) next.setDate(next.getDate() + 1);

  const nextGameReset = new Date(now);
  nextGameReset.setHours(5, 0, 1, 0);
  if (nextGameReset <= now) nextGameReset.setDate(nextGameReset.getDate() + 1);
  if (nextGameReset < next) next.setTime(nextGameReset.getTime());

  resetCheckTimer = setTimeout(() => {
    resetCheckTimer = null;
    if (!document.hidden) {
      render();
      startTicking();
    }
    scheduleResetCheck();
  }, Math.max(1000, next.getTime() - now.getTime()));
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (Date.now() < startupGraceUntil) return;
    if (resumeRenderTimer) {
      clearTimeout(resumeRenderTimer);
      resumeRenderTimer = null;
    }
  } else {
    resumeTicking();
  }
});

function scheduleServiceWorkerRegistration(){
  if (swRegistrationScheduled) return;
  if (!('serviceWorker' in navigator)) return;
  if (location.protocol !== 'http:' && location.protocol !== 'https:') return;

  swRegistrationScheduled = true;
  const register = async () => {
    try {
      const existing = await navigator.serviceWorker.getRegistration('./');
      // 未登録時だけ登録する。登録済みなら、アプリ側から更新確認を一切促さない。
      // registration.update() は絶対に呼ばない。
      if (!existing) {
        await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      }
      // 登録済みの場合は何もしない（ブラウザ標準の更新判定に完全に任せる）
    } catch (_) {}
  };

  // 初回登録だけを、さらに後ろにずらして初期描画とネットワーク競合を避ける
  if ('requestIdleCallback' in window) {
    requestIdleCallback(register, { timeout: 12000 }); // 8秒→12秒に延長
  } else {
    setTimeout(register, 4000); // 2.5秒→4秒に延長
  }
}
