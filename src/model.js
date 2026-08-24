(()=>{
'use strict';
const STORAGE='abysss:model:v1', MAX=240, STEP=180000, IDLE_CAP=12*60*60*1000;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const makeTimer=(id,src={})=>({id:String(id),name:String(src.name??''),current:clamp(Number(src.current)||0,0,Number(src.max)||MAX),max:Math.max(1,Number(src.max)||MAX),start:Number.isFinite(Number(src.start))?Number(src.start):null,running:!!src.running,idleStart:Number.isFinite(Number(src.idleStart))?Number(src.idleStart):null,idleCapMs:Math.max(1,Number(src.idleCapMs)||IDLE_CAP),idleRunning:!!src.idleRunning,missionDone:!!src.missionDone,weeklyDone:!!src.weeklyDone});
const empty=()=>Array.from({length:6},(_,i)=>makeTimer(i+1));
const load=()=>{try{const raw=localStorage.getItem(STORAGE),m=raw?JSON.parse(raw):null;return m&&Array.isArray(m.timers)?{...m,timers:m.timers.map((t,i)=>makeTimer(i+1,t))}:{timers:empty()}}catch{return {timers:empty()}}};
const save=m=>{try{localStorage.setItem(STORAGE,JSON.stringify(m));return true}catch{return false}};
const recover=t=>{if(!t.running||t.start===null)return t;const elapsed=Math.max(0,Date.now()-t.start),steps=Math.floor(elapsed/STEP),current=clamp(t.current+steps,0,t.max);if(current>=t.max)return {...t,current,start:null,running:false};return {...t,current,start:t.start+steps*STEP}};
const phase=t=>{if(!t.running||t.start===null)return null;return Math.max(0,Date.now()-t.start)%STEP};
const consume40KeepingPhase=t=>{const before=recover(t),amount=Math.floor(Math.max(0,before.current)/40)*40,current=Math.max(0,before.current-amount);if(amount<=0)return {...before,consumed:0};if(before.start!==null)return {...before,current,running:true,consumed:amount};return {...before,current,running:true,start:Date.now(),consumed:amount};};
window.AbysssModel={STORAGE,STEP,MAX,IDLE_CAP,makeTimer,empty,load,save,recover,phase,consume40KeepingPhase};
})();
