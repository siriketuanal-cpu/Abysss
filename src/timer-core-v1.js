(()=>{
  'use strict';
  // Lightweight truth layer: timestamps are authoritative; the UI never needs
  // a continuously running timer to remain correct after suspension.
  const STEP=180000;
  const now=()=>Date.now();
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  window.AbysssTimerCore={
    STEP,
    remaining(start,nowMs=now(),max=Infinity){
      if(!Number.isFinite(start))return 0;
      return Math.max(0, start-nowMs);
    },
    recoveredValue(value,start,nowMs=now(),max=Infinity){
      if(!Number.isFinite(value)||!Number.isFinite(start))return value;
      const recovered=Math.floor(Math.max(0,nowMs-start)/STEP);
      return clamp(value+recovered,0,max);
    },
    dueCount(start,nowMs=now()){
      return Number.isFinite(start)?Math.floor(Math.max(0,nowMs-start)/STEP):0;
    }
  };
})();
