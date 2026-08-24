(()=>{
  'use strict';

  // Keep the proven Abyss.3 engine as the compatibility layer for now.
  // The new architecture owns WHEN it is asked to recalculate, rather than
  // forcing the PWA to behave like a continuously running timer.
  const legacy=document.createElement('script');
  legacy.src='app-primary-v237.min.js?v=2';
  legacy.async=false;
  legacy.dataset.abysss='legacy-core';
  legacy.onload=()=>{
    const sync=document.createElement('script');
    sync.src='timer-sync-v1.js?v=1';
    sync.async=false;
    sync.dataset.abysss='timer-sync';
    document.body.appendChild(sync);
  };
  legacy.onerror=()=>{window.__abysssCoreError=true};
  document.body.appendChild(legacy);
})();
