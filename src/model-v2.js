(()=>{
'use strict';
const STORAGE='abysss:model:v1',MAX=240,STEP=180000,IDLE_CAP=12*60*60*1000,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const makeTimer=(id,s={})=>{const rank=Math.max(1,Math.min(200,Math.floor(Number(s.rank)||1))),max=Math.max(1,Number(s.max??s.stamMax)||Math.min(999,240+(rank-1)*5));return {id:String(id),name:String(s.name??s.label??''),rank,current:clamp(Number(s.current??s.stamCurrent)||0,0,max),max,start:Number.isFinite(Number(s.start??s.stamStart))?Number(s.start??s.stamStart):null,running:!!(s.running??s.stamRunning),idleStart:Number.isFinite(Number(s.idleStart))?Number(s.idleStart):null,idleCapMs:Math.max(1,Number(s.idleCapMs)||IDLE_CAP),idleRunning:!!s.idleRunning,idleClaimedSteps:Math.max(0,Math.floor(Number(s.idleClaimedSteps)||0)),missionDone:!!s.missionDone,weeklyDone:!!s.weeklyDone}};
const empty=()=>Array.from({length:6},(_,i)=>makeTimer(i+1));
const load=()=>{try{const raw=localStorage.getItem(STORAGE),m=raw?JSON.parse(raw):null;return m&&Array.isArray(m.timers)?{...m,timers:m.timers.map((t,i)=>makeTimer(i+1,t))}:{timers:empty()}}catch{return {timers:empty()}}};
const save=m=>{try{localStorage.setItem(STORAGE,JSON.stringify(m));return true}catch{return false}};
const recover=t=>{if(!t.running||t.start===null)return t;const elapsed=Math.max(0,Date.now()-t.start),steps=Math.floor(elapsed/STEP),current=clamp(t.current+steps,0,t.max);if(current>=t.max)return {...t,current,start:null,running:false};return {...t,current,start:t.start+steps*STEP}};
const phase=t=>{if(!t.running||t.start===null)return null;return Math.max(0,Date.now()-t.start)%STEP};
const consume40KeepingPhase=t=>{const before=recover(t),amount=Math.floor(Math.max(0,before.current)/40)*40,current=Math.max(0,before.current-amount);if(amount<=0)return {...before,consumed:0};return before.start!==null?{...before,current,running:true,consumed:amount}:{...before,current,running:true,start:Date.now(),consumed:amount}};
window.AbysssModel={STORAGE,STEP,MAX,IDLE_CAP,makeTimer,empty,load,save,recover,phase,consume40KeepingPhase};
})();
