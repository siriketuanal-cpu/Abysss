(()=>{
'use strict';
const emit=()=>window.dispatchEvent(new CustomEvent('abysss:modelchange'));
const edit=(id,fn)=>{if(!window.AbysssModel)return false;const model=AbysssModel.load(),i=model.timers.findIndex(t=>t.id===String(id));if(i<0)return false;model.timers[i]=AbysssModel.recover(model.timers[i]);fn(model.timers[i]);AbysssModel.save(model);emit();return true};
const start=id=>edit(id,t=>{if(t.current<t.max){t.running=true;t.start=t.start??Date.now()}});
const stop=id=>edit(id,t=>{t.running=false;t.start=null});
const setCurrent=(id,value)=>edit(id,t=>{t.current=Math.max(0,Math.min(t.max,Number(value)||0));if(t.current>=t.max){t.running=false;t.start=null}else{t.running=true;t.start=t.start??Date.now()}});
const setMax=(id,value)=>edit(id,t=>{t.max=Math.max(1,Number(value)||1);t.current=Math.min(t.current,t.max);if(t.current>=t.max){t.running=false;t.start=null}else{t.running=true;t.start=t.start??Date.now()}});
const consume=(id,amount=1)=>edit(id,t=>{const n=Math.max(0,Number(amount)||0);t.current=Math.max(0,t.current-n);if(t.current<t.max){t.running=true;t.start=t.start??Date.now()}});
const consume40=id=>edit(id,t=>{const phase=AbysssModel.phase(t),chunks=Math.floor(Math.max(0,t.current)/40),amount=chunks*40;if(amount<=0)return;t.current=Math.max(0,t.current-amount);t.running=true;t.start=t.start??(phase===null?Date.now():Date.now()-phase)});
window.AbysssActions={start,stop,setCurrent,setMax,consume,consume40};
})();
