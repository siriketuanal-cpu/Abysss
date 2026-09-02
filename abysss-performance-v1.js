/* Abysss performance layer v1 — behavior-preserving */
(function () {
  'use strict';

  // The minute scheduler already self-reconnects after render/user actions.
  // Disable the legacy click recovery work without changing the visible interaction model.
  if (typeof scheduleInteractionTickRecovery === 'function') {
    scheduleInteractionTickRecovery = function () {};
  }

  // Do not keep the timer scheduler alive while the PWA is backgrounded.
  // Resume by recalculating from Date.now(), rather than replaying elapsed time.
  if (typeof resumeTicking === 'function') {
    resumeTicking = function () {
      if (document.hidden) return;
      render();
      startTicking();
    };
  }

  // The existing visibility handler owns resume; this handler only stops hidden ticking.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stopTicking();
  }, { passive: true });
})();
