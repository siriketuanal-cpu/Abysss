(()=>{
  'use strict';
  const local=(src)=>new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=src;s.defer=true;s.dataset.abysss='module';
    s.onload=resolve;s.onerror=reject;document.body.appendChild(s);
  });
  const modules=[
    'src/timer-core-v1.js?v=1',
    'src/timer-render-v1.js?v=1',
    'src/timer-input-v1.js?v=1',
    'src/persistence-v1.js?v=1',
    'src/daily-weekly-v1.js?v=1',
    'src/games-loader-v1.js?v=1'
  ];
  modules.reduce((p,src)=>p.then(()=>local(src)),Promise.resolve())
    .then(()=>local('app-primary-v237.min.js?v=19'))
    .then(()=>local('timer-sync-v1.js?v=2'))
    .catch(error=>console.warn('Abysss core load failed',error));
})();
