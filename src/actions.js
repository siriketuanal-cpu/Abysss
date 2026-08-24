(()=>{
'use strict';
const emit=()=>window.dispatchEvent(new CustomEvent('abysss:modelchange'));
const edit=(id,fn)=>{if(!window.AbysssModel)return false;const model=AbysssModel.load(),i=model.timers.findIndex(t=>t.id===String(id));if(i<0)return false;model.timers[i]=AbysssModel.recover(model.timers[i]);fn(model.timers[i]);AbysssModel.save(model);emit();return true};
const start=id=>edit(id,t=>{if(t.current<t.max){t.running=true;t.start=Date.now()}});
const stop=id=>edit(id,t=>{t.running=false;t.start=null});
const setCurrent=(id,value)=>edit(id,t=>{t.current=Math.max(0,Math.min(t.max,Number(value)||0));if(t.current>=t.max){t.running=false;t.start=null}});
const setMax=(id,value)=>edit(id,t=>{t.max=Math.max(1,Number(value)||1);t.current=Math.min(t.current,t.max);if(t.current>=t.max){t.running=false;t.start=null}});
const consume=(id,amount=1)=>edit(id,t=>{t.current=Math.max(0,t.current-(Number(amount)||0));if(t.current<t.max&&!t.running){t.running=true;t.start=Date.now()}});
window.AbysssActions={start,stop,setCurrent,setMax,consume};
})();
