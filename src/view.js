(()=>{
'use strict';
const fmt=s=>{s=Math.max(0,Math.ceil(s/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${m}:${String(sec).padStart(2,'0')}`};
const remaining=t=>{if(!t.running||t.start===null)return 0;return Math.max(0,(t.max-t.current)*180-(Date.now()-t.start)/1000)};
const render=()=>{const root=document.getElementById('grid');if(!root||!window.AbysssModel)return;const model=AbysssModel.load();root.replaceChildren(...model.timers.map(t=>{const el=document.createElement('section');el.className='timer-card';el.dataset.timerId=t.id;el.innerHTML=`<input data-timer-input data-timer-id="${t.id}" value="${t.name.replaceAll('"','&quot;')}" aria-label="タイマー名"><div class="timer-value">${t.current} / ${t.max}</div><div class="timer-remaining">${t.running?fmt(remaining(t)):'—'}</div>`;return el}))};
let loop=0,lastSteps=new Map();
const tick=()=>{if(document.visibilityState!=='visible'){loop=0;return}const model=AbysssModel.load(),now=Date.now();let boundary=false;for(const t of model.timers){const el=document.querySelector(`.timer-card[data-timer-id="${t.id}"]`);if(!el)continue;const rem=el.querySelector('.timer-remaining');if(rem)rem.textContent=t.running?fmt(remaining(t)):'—';if(t.running&&t.start!==null){const step=Math.floor(Math.max(0,now-t.start)/AbysssModel.STEP),prev=lastSteps.get(t.id);if(prev!==undefined&&step!==prev)boundary=true;lastSteps.set(t.id,step)}}if(boundary){window.AbysssEngine?.sync();window.AbysssView?.render()}clearTimeout(loop);loop=setTimeout(tick,1000)};
const startTicker=()=>{clearTimeout(loop);tick()};
const touch= e=>{const card=e.target.closest?.('.timer-card');if(!card||e.target.closest('[data-timer-input]'))return;window.AbysssEngine?.sync();render()};
document.addEventListener('pointerup',touch,{passive:true});
window.AbysssView={render,startTicker};
window.addEventListener('abysss:modelchange',()=>{render();startTicker()});
})();
