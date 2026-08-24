(()=>{
  'use strict';
  let queued=false;
  const flush=()=>{
    queued=false;
    try{if(window.storageOk&&typeof window.saveState==='function')window.saveState()}catch(e){}
  };
  window.AbysssPersistence={
    queue(){if(queued)return;queued=true;const run=()=>flush();
      if('requestIdleCallback' in window)requestIdleCallback(run,{timeout:1500});else setTimeout(run,300);
    },
    flush
  };
})();
