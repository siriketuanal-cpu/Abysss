(()=>{
  'use strict';
  const STEP=180000;
  const now=()=>Date.now();
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const normalize=(t={})=>({
    current:clamp(Number(t.current)||0,0,Math.max(1,Number(t.max)||240)),
    max:Math.max(1,Number(t.max)||240),
    start:Number.isFinite(Number(t.start))?Number(t.start):null,
    interval:Math.max(1,Number(t.interval)||STEP),
    running:!!t.running
  });
  const snapshot=(timer,at=now())=>{
    const t=normalize(timer);
    if(!t.running||t.start===null)return {...t,recovered:0,nextAt:null,fullAt:null};
    const elapsed=Math.max(0,at-t.start);
    const recovered=Math.floor(elapsed/t.interval);
    const current=clamp(t.current+recovered,0,t.max);
    const nextAt=current>=t.max?null:t.start+(recovered+1)*t.interval;
    const fullAt=current>=t.max?at:t.start+(t.max-t.current)*t.interval;
    return {...t,current,recovered,nextAt,fullAt};
  };
  const commit=(timer,at=now())=>{
    const s=snapshot(timer,at);
    if(!s.running||s.start===null||s.recovered<=0)return {...timer,current:s.current};
    const consumed=s.recovered*s.interval;
    const nextStart=s.current>=s.max?null:s.start+consumed;
    return {...timer,current:s.current,start:nextStart,running:s.current<s.max};
  };
  window.AbysssTimerCore={STEP,normalize,snapshot,commit,dueCount:(start,at=now())=>Number.isFinite(start)?Math.floor(Math.max(0,at-start)/STEP):0};
})();
