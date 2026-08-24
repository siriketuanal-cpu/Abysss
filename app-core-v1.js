(()=>{
  'use strict';
  // Compatibility core: keeps the proven timer engine intact while making
  // boot and secondary-game loading independent. This file is the seam for
  // the next source-level split (state / timer / UI).
  const s=document.createElement('script');
  s.src='app-primary-v237.min.js?v=1';
  s.defer=true;
  s.dataset.abysss='legacy-core';
  document.body.appendChild(s);
})();
