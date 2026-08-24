(()=>{
  'use strict';
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const create=({current=0,max=240,start=null,interval=180000,running=false}={})=>({current:clamp(Number(current)||0,0,max),max:Math.max(1,Number(max)||240),start:Number(start)||null,interval:Math.max(1,Number(interval)||180000),running:!!running});
  const read=(timer,now=Date.now())=>{
    const t=create(timer);
    if(!t.running||!t.start)return {current:t.current,max:t.max,running:false,start:t.start,nextAt:null,fullAt:t.current>=t.max?t.start:null};
    const elapsed=Math.max(0,now-t.start);
    const recovered=Math.floor(elapsed/t.interval);
    const current=clamp(t.current+recovered,0,t.max);
    const nextAt=current>=t.max?null:t.start+(recovered+1)*t.interval;
    const fullAt=current>=t.max?t.start+(t.max-t.current)*t.interval:null;
    return {current,max:t.max,running:true,start:t.start,nextAt,fullAt};
  };
  const advance=(timer,now=Date.now())=>{
    const r=read(timer,now);
    return {...timer,current:r.current,start:r.current>=r.max?timer.start:r.start};
  };
  window.AbysssTimerMath={create,read,advance};
})();
