(()=>{
'use strict';
const fmt=s=>{s=Math.max(0,Math.ceil(s/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${m}:${String(sec).padStart(2,'0')}`};
const remaining=t=>{if(!t.running||t.start===null)return 0;return Math.max(0,(t.max-t.current)*180-(Date.now()-t.start)/1000)};
const card=id=>document.querySelector(`.timer-card[data-timer-id="${CSS.escape(String(id))}"]`);
const paint=(el,t)=>{if(!el)return;const value=el.querySelector('.timer-value'),rem=el.querySelector('.timer-remaining');if(value)value.textContent=`${t.current} / ${t.max}`;if(rem)rem.textContent=t.running?fmt(remaining(t)):'—'};
const render=()=>{const root=document.getElementById('grid');if(!root||!window.AbysssModel)return;const model=AbysssModel.load();root.replaceChildren(...model.timers.map(t=>{const el=document.createElement('section');el.className='timer-card';el.dataset.timerId=t.id;el.innerHTML=`<input data-timer-input data-timer-id="${t.id}" value="${t.name.replaceAll('"','&quot;')}" aria-label="タイマー名"><div class="timer-value">${t.current} / ${t.max}</div><div class="timer-remaining">${t.running?fmt(remaining(t)):'—'}</div>`;return el}))};
const syncCard=id=>{const model=AbysssModel.load();const t=model?.timers.find(x=>x.id===String(id));if(!t)return;const next=AbysssModel.recover(t);if(next.current!==t.current||next.start!==t.start||next.running!==t.running){Object.assign(t,next);AbysssModel.save(model)}paint(card(id),t)};
let loop=0,lastSteps=new Map();
const tick=()=>{if(document.visibilityState!=='visible'){loop=0;return}const model=AbysssModel.load(),now=Date.now();let boundary=false;for(const t of model.timers){const el=card(t.id);if(!el)continue;const rem=el.querySelector('.timer-remaining');if(rem)rem.textContent=t.running?fmt(remaining(t)):'—';if(t.running&&t.start!==null){const step=Math.floor(Math.max(0,now-t.start)/AbysssModel.STEP),prev=lastSteps.get(t.id);if(prev!==undefined&&step!==prev)boundary=true;lastSteps.set(t.id,step)}}if(boundary){window.AbysssEngine?.sync();render()}clearTimeout(loop);loop=setTimeout(tick,1000)};
const startTicker=()=>{clearTimeout(loop);lastSteps.clear();tick()};
const touch=e=>{const c=e.target.closest?.('.timer-card');if(!c||e.target.closest('[data-timer-input]'))return;syncCard(c.dataset.timerId)};
document.addEventListener('pointerup',touch,{passive:true});
window.AbysssView={render,startTicker,syncCard};
window.addEventListener('abysss:modelchange',()=>{render();startTicker()});
})();
