(()=>{
'use strict';
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
window.AbysssSlotMeta={
  get(t){return {name:String(t.name??''),rank:Math.max(1,Math.min(200,Math.floor(Number(t.rank)||1)))}},
  setName(id,name){const m=AbysssModel.load(),t=m.timers.find(x=>x.id===String(id));if(!t)return false;t.name=String(name??'');AbysssModel.save(m);window.dispatchEvent(new CustomEvent('abysss:modelchange'));return true},
  setRank(id,rank){const m=AbysssModel.load(),t=m.timers.find(x=>x.id===String(id));if(!t)return false;t.rank=clamp(Math.floor(Number(rank)||1),1,200);t.max=Math.min(999,240+(t.rank-1)*5);t.current=Math.min(t.current,t.max);AbysssModel.save(m);window.dispatchEvent(new CustomEvent('abysss:modelchange'));return true}
};
})();
