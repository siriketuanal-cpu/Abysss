(()=>{
'use strict';
const fmt=s=>{s=Math.max(0,Math.ceil(s/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${m}:${String(sec).padStart(2,'0')}`};
const remaining=t=>{if(!t.running||t.start===null)return 0;return Math.max(0,(t.max-t.current)*180-(Date.now()-t.start)/1000)};
const render=()=>{const root=document.getElementById('grid');if(!root||!window.AbysssModel)return;const model=AbysssModel.load();root.replaceChildren(...model.timers.map(t=>{const el=document.createElement('section');el.className='timer-card';el.dataset.timerId=t.id;el.innerHTML=`<input data-timer-input data-timer-id="${t.id}" value="${t.name.replaceAll('"','&quot;')}" aria-label="タイマー名"><div class="timer-value">${t.current} / ${t.max}</div><div class="timer-remaining">${t.running?fmt(remaining(t)):'—'}</div>`;return el}));};
window.AbysssView={render};
window.addEventListener('abysss:modelchange',render);
})();
