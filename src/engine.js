(()=>{
'use strict';
const model=()=>window.AbysssModel?.load();
const save=m=>{if(m)AbysssModel.save(m)};
const sync=(silent=false)=>{const m=model();if(!m)return null;let changed=false;m.timers=m.timers.map(t=>{const n=AbysssModel.recover(t);if(n.current!==t.current||n.start!==t.start||n.running!==t.running)changed=true;return n});if(changed)save(m);if(changed&&!silent)window.dispatchEvent(new CustomEvent('abysss:modelchange'));return m};
const update=(id,fn)=>{const m=model();if(!m)return;const t=m.timers.find(x=>x.id===String(id));if(!t)return;fn(t);save(m);window.dispatchEvent(new CustomEvent('abysss:modelchange'));return t};
const start=id=>update(id,t=>{if(t.current>=t.max){t.start=null;t.running=false;return}if(!t.running){t.start=Date.now();t.running=true}});
const stop=id=>update(id,t=>{const n=AbysssModel.recover(t);Object.assign(t,n);t.start=null;t.running=false});
const setCurrent=(id,value)=>update(id,t=>{t.current=Math.max(0,Math.min(t.max,Number(value)||0));if(t.current>=t.max){t.start=null;t.running=false}});
const setMax=(id,value)=>update(id,t=>{t.max=Math.max(1,Number(value)||1);t.current=Math.min(t.current,t.max);if(t.current>=t.max){t.start=null;t.running=false}});
const resume=()=>{sync();window.AbysssView?.startTicker()};
window.addEventListener('pageshow',resume,{passive:true});
window.addEventListener('focus',resume,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')resume()},{passive:true});
window.AbysssEngine={sync,start,stop,setCurrent,setMax,resume};
})();
