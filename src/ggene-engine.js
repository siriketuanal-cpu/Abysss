(()=>{
'use strict';
const KEY='abysss:ggene:v1', STEP=300000;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const normalize=t=>({current:clamp(Number(t?.current)||0,0,Math.max(1,Number(t?.max)||30)),max:Math.max(1,Number(t?.max)||30),start:Number.isFinite(Number(t?.start))?Number(t.start):null,running:!!t?.running});
const recover=t=>{const n=normalize(t);if(!n.running||n.start===null)return n;const steps=Math.floor(Math.max(0,Date.now()-n.start)/STEP),current=clamp(n.current+steps,0,n.max);if(current>=n.max)return {...n,current,start:null,running:false};return {...n,current,start:n.start+steps*STEP}};
const load=()=>{try{return normalize(JSON.parse(localStorage.getItem(KEY)||'null'))}catch{return normalize({})}};
const save=t=>{try{localStorage.setItem(KEY,JSON.stringify(normalize(t)));return true}catch{return false}};
const setCurrent=(t,v)=>{const n=recover(t);n.current=clamp(Number(v)||0,0,n.max);if(n.current>=n.max){n.running=false;n.start=null}else{n.running=true;n.start=n.start??Date.now()}return n};
const tick=t=>recover(t);
window.AbysssGGene={STEP,load,save,recover,setCurrent,tick};
})();
