(()=>{
'use strict';
const commit=(input)=>{const id=input.dataset.timerId;if(!id)return;const value=input.value.trim();if(!window.AbysssModel)return;const model=AbysssModel.load(),timer=model.timers.find(t=>t.id===id);if(!timer)return;timer.name=value;AbysssModel.save(model);input.blur();window.dispatchEvent(new CustomEvent('abysss:modelchange'))};
document.addEventListener('keydown',e=>{if(e.target.matches('[data-timer-input]')&&e.key==='Enter'){e.preventDefault();commit(e.target)}},{passive:false});
document.addEventListener('blur',e=>{if(e.target.matches?.('[data-timer-input]'))commit(e.target)},true);
window.AbysssInput={commit};
})();
