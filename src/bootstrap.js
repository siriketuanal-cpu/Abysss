/* Abysss application bootstrap */
loadState();
setupDelegatedEvents();

// Secondary games remain lazy, but a direct interaction can promote their load.
const gamesRootForPriorityLoad = document.getElementById('gamesAll');
if (gamesRootForPriorityLoad) {
  gamesRootForPriorityLoad.addEventListener(
    'pointerdown',
    () => scheduleSecondaryGamesBuild(true),
    { passive: true }
  );
}

// Service-worker registration is intentionally deferred by the core startup path.
scheduleStartupStabilization();
