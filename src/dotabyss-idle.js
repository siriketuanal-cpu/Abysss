(()=>{
'use strict';
const CAP=12*60*60*1000,LEAD=5*60*1000;
const recover=t=>{const idleStart=Number(t.idleStart);if(!t.idleRunning||!Number.isFinite(idleStart)||idleStart<=0)return {...t,idleCapMs:Number(t.idleCapMs)||CAP};return {...t,idleCapMs:Number(t.idleCapMs)||CAP,idleStart}};
const start=id=>{const m=AbysssModel.load(),i=m.timers.findIndex(t=>t.id===String(id));if(i<0)return;m.timers[i]={...recover(m.timers[i]),idleStart:Date.now(),idleRunning:true,idleCapMs:Number(m.timers[i].idleCapMs)||CAP};AbysssModel.save(m);window.dispatchEvent(new CustomEvent('abysss:modelchange'))};
const stop=id=>{const m=AbysssModel.load(),i=m.timers.findIndex(t=>t.id===String(id));if(i<0)return;m.timers[i]={...recover(m.timers[i]),idleRunning:false,idleStart:null};AbysssModel.save(m);window.dispatchEvent(new CustomEvent('abysss:modelchange'))};
const info=t=>{const r=recover(t),start=Number(r.idleStart);if(!r.idleRunning||!Number.isFinite(start))return {elapsed:0,remaining:null,complete:false,armed:false};const elapsed=Math.max(0,Date.now()-start),cap=Number(r.idleCapMs)||CAP,remaining=Math.max(0,cap-elapsed);return {elapsed,remaining,complete:remaining===0,armed:remaining<=LEAD}};
window.AbysssIdle={CAP,LEAD,recover,start,stop,info};
})();
