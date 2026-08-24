(()=>{
  'use strict';
  const load=src=>new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.src=src;s.defer=true;s.dataset.abysss='module';
    s.onload=resolve;s.onerror=()=>reject(new Error(src));
    document.body.appendChild(s);
  });
  const modules=[
    'src/timer-core-v1.js?v=3',
    'src/timer-math-v1.js?v=2',
    'src/timer-persistence-v1.js?v=2',
    'src/timer-render-v1.js?v=2',
    'src/timer-input-v1.js?v=2',
    'src/persistence-v1.js?v=2',
    'src/daily-weekly-v1.js?v=2',
    'src/games-loader-v1.js?v=2'
  ];
  let chain=Promise.resolve();
  for(const module of modules)chain=chain.then(()=>load(module));
  chain.then(()=>load('timer-sync-v1.js?v=3'))
    .then(()=>{window.__abysssCoreReady=true})
    .catch(error=>console.warn('Abysss core load failed',error));
})();
