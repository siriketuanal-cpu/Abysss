(()=>{
'use strict';
const KEY='abysss:starleap:v1', STAMINA_STEP=720000, ORB_STEP=21600000, STAMINA_MAX=80, ORB_MAX=4;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const normalize=t=>({current:clamp(Number(t?.current)||0,0,Number(t?.max)||STAMINA_MAX),max:Math.max(1,Number(t?.max)||STAMINA_MAX),start:Number.isFinite(Number(t?.start))?Number(t.start):null,running:!!t?.running});
const recover=(t,step,max)=>{const n=normalize(t);if(!n.running||n.start===null)return n;const steps=Math.floor(Math.max(0,Date.now()-n.start)/step),current=clamp(n.current+steps,0,max);if(current>=max)return {...n,current,start:null,running:false};return {...n,current,start:n.start+steps*step}};
const recoverStamina=t=>recover(t,STAMINA_STEP,STAMINA_MAX);
const recoverOrb=t=>recover({...t,max:ORB_MAX},ORB_STEP,ORB_MAX);
const load=()=>{try{const raw=JSON.parse(localStorage.getItem(KEY)||'null');return {stamina:recoverStamina(raw?.stamina||{}),orb:recoverOrb(raw?.orb||{})}}catch{return {stamina:normalize({}),orb:normalize({max:ORB_MAX})}}};
const save=m=>{try{localStorage.setItem(KEY,JSON.stringify(m));return true}catch{return false}};
const setCurrent=(t,v,kind)=>{const step=kind==='orb'?ORB_STEP:STAMINA_STEP,max=kind==='orb'?ORB_MAX:STAMINA_MAX,n=recover(t,step,max);n.current=clamp(Number(v)||0,0,max);if(n.current>=max){n.running=false;n.start=null}else{n.running=true;n.start=n.start??Date.now()}return n};
window.AbysssStarLeap={STAMINA_STEP,ORB_STEP,STAMINA_MAX,ORB_MAX,load,save,recoverStamina,recoverOrb,setCurrent};
})();
