/* Abysss application bootstrap */
loadState();
setupDelegatedEvents();

// Secondary games stay lazy; touching their area promotes the canonical bundle load.
const gamesRoot = document.getElementById('gamesAll');
if (gamesRoot) gamesRoot.addEventListener('pointerdown', () => scheduleSecondaryGamesBuild(true), { passive: true });

scheduleStartupStabilization();
