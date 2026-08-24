(()=>{
  'use strict';
  const load=(src)=>new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=src;
    s.defer=true;
    s.dataset.abysss='core';
    s.onload=resolve;
    s.onerror=reject;
    document.body.appendChild(s);
  });
  load('app-primary-v237.min.js?v=18')
    .then(()=>load('timer-sync-v1.js?v=1'))
    .catch(error=>console.warn('Abysss core load failed',error));
})();
