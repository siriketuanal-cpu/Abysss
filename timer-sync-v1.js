(()=>{
  'use strict';

  // Abysss timer philosophy:
  // Do not try to keep the timer "alive" while the PWA is suspended.
  // Recalculate from the saved timestamps when the app becomes usable again.
  // The proven recovery math remains in parseStoredState(); this bridge only
  // decides WHEN to ask for that calculation.

  let lastSyncAt=0;
  let lastVisibleAt=performance.now();
  let resumeTimer=0;
  let syncing=false;

  const signature=()=>JSON.stringify({
    slots:state.slots,
    dailyDate:state.dailyDate,
    weeklyDate:state.weeklyDate,
    g:state.g,
    sl:state.sl
  });

  const sync=()=>{
    if(syncing)return;
    const now=performance.now();
    if(now-lastSyncAt<700)return;
    lastSyncAt=now;
    syncing=true;
    try{
      const before=signature();
      const parsed=parseStoredState();
      if(parsed.slots)state.slots=parsed.slots;
      state.dailyDate=parsed.dailyDate;
      state.weeklyDate=parsed.weeklyDate;
      if(parsed.g){
        if(parsed.g.slots)state.g.slots=parsed.g.slots;
        state.g.dailyDate=parsed.g.dailyDate;
      }
      if(parsed.sl)state.sl=parsed.sl;

      const after=signature();
      if(before!==after){
        render();
        if(storageOk)saveState();
      }
    }catch(error){
      console.warn('Abysss resume sync failed',error);
    }finally{
      syncing=false;
    }
  };

  const scheduleResumeSync=()=>{
    clearTimeout(resumeTimer);
    resumeTimer=setTimeout(()=>{
      if(!document.hidden)sync();
    },120);
  };

  // One post-core check, then only sync when returning from suspension.
  sync();

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){
      lastVisibleAt=performance.now();
      return;
    }
    if(performance.now()-lastVisibleAt>900)scheduleResumeSync();
  },{passive:true});

  window.addEventListener('pageshow',event=>{
    if(event.persisted)scheduleResumeSync();
  },{passive:true});

  window.addEventListener('focus',()=>{
    if(document.hidden)return;
    if(performance.now()-lastVisibleAt>900)scheduleResumeSync();
  },{passive:true});

  window.__abysssTimerSync={sync};
})();
