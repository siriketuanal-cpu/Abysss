(()=>{
'use strict';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>{s=Math.max(0,Math.ceil(s/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h}h ${String(m).padStart(2,'0')}m`:`${m}:${String(sec).padStart(2,'0')}`};
const commitCurrent=input=>{const id=input.dataset.currentId;if(!id||!window.AbysssActions)return;AbysssActions.setCurrent(id,input.value);const t=AbysssModel.load().timers.find(t=>t.id===String(id));if(t)input.value=t.current};
const dotCard=t=>{const r=AbysssModel.recover(t),phase=AbysssModel.phase(r),next=phase===null?null:AbysssModel.STEP-phase;const available=Math.floor(r.current/40);const card=document.createElement('article');card.className='abyss-card dot-card';card.dataset.timerId=r.id;card.innerHTML=`<div class="state-head"><input class="abyss-name" data-timer-input data-timer-id="${esc(r.id)}" value="${esc(r.name||'Dot Abyss')}" aria-label="タイマー名"><span class="state-tag">DOT ABYSS</span></div><div class="state-main"><input class="abyss-current-input" data-current-id="${esc(r.id)}" inputmode="numeric" pattern="[0-9]*" value="${r.current}" aria-label="現在スタミナ"><small>/ ${r.max}</small></div><div class="state-meta"><span>${r.current?'次の1回復':'回復中'}</span><b>${next===null?'—':fmt(next)}</b></div><div class="state-foot"><span>${available} × 40</span><button type="button" data-action="consume40" data-id="${esc(r.id)}">使い切る</button></div>`;return card};
const render=()=>{const root=document.getElementById('grid');if(!root||!window.AbysssModel)return;const model=AbysssModel.load();root.replaceChildren(...model.timers.map(dotCard))};
const sync=id=>{const m=AbysssModel.load(),i=m.timers.findIndex(t=>t.id===String(id));if(i<0)return;m.timers[i]=AbysssModel.recover(m.timers[i]);AbysssModel.save(m);render()};
document.addEventListener('pointerup',e=>{const card=e.target.closest?.('.dot-card');if(!card)return;if(e.target.closest('input,button'))return;sync(card.dataset.timerId)},{passive:true});
document.addEventListener('keydown',e=>{const input=e.target.closest?.('[data-current-id]');if(input&&e.key==='Enter'){e.preventDefault();commitCurrent(input);input.blur()}},{passive:false});
document.addEventListener('blur',e=>{if(e.target.matches?.('[data-current-id]'))commitCurrent(e.target)},true);
document.addEventListener('click',e=>{const b=e.target.closest?.('[data-action="consume40"]');if(b&&window.AbysssActions)AbysssActions.consume40(b.dataset.id)},{passive:true});
window.AbysssDashboard={render,sync};
})();
