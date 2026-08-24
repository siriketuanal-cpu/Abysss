(()=>{
  'use strict';
  const run=()=>{try{if(window.AbysssTimerSync&&typeof window.AbysssTimerSync.sync==='function')window.AbysssTimerSync.sync('resume')}catch(error){console.warn('Abysss resume sync failed',error)}};
  window.addEventListener('pageshow',run,{passive:true});
  window.addEventListener('focus',run,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')run()},{passive:true});
  setTimeout(run,0);
})();
