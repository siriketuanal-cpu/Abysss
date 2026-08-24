(()=>{
'use strict';
const fmt=s=>{s=Math.max(0,Math.ceil(s/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`:`${m}:${String(sec).padStart(2,'0')}`};
const remaining=t=>{if(!t.running||t.start===null)return 0;return Math.max(0,(t.max-t.current)*180-(Date.now()-t.start)/1000)};
const updateCard=(el,t)=>{if(!el)return;const value=el.querySelector('.timer-value'),rem=el.querySelector('.timer-remaining');if(value)value.textContent=`${t.current} / ${t.max}`;if(rem)rem.textContent=t.running?fmt(remaining(t)):'—'};
const syncCard=id=>{if(!window.AbysssModel)return;const model=AbysssModel.load(),index=model.timers.findIndex(t=>t.id===id);if(index<0)return;const before=model.timers[index],after=AbysssModel.recover(before);const changed=after.current!==before.current||after.start!==before.start||after.running!==before.running;model.timers[index]=after;if(changed)AbysssModel.save(model);updateCard(document.querySelector(`.timer-card[data-timer-id="${CSS.escape(id)}"]`),after)};
const render=()=>{const root=document.getElementById('grid');if(!root||!window.AbysssModel)return;const model=AbysssModel.load();root.replaceChildren(...model.timers.map(t=>{const el=document.createElement('section');el.className='timer-card';el.dataset.timerId=t.id;el.innerHTML=`<input data-timer-input data-timer-id="${t.id}" value="${t.name.replaceAll('"','&quot;')}" aria-label="タイマー名"><div class="timer-value">${t.current} / ${t.max}</div><div class="timer-remaining">${t.running?fmt(remaining(t)):'—'}</div>`;return el}))};
document.addEventListener('pointerdown',e=>{const card=e.target.closest?.('.timer-card');if(card)syncCard(card.dataset.timerId)},{passive:true});
window.AbysssView={render,syncCard};
window.addEventListener('abysss:modelchange',render);
})();
