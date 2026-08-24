(()=>{
  'use strict';
  // Keep the existing inline <input> UX. This layer only normalizes blur/Enter
  // completion so editing never requires a heavyweight form lifecycle.
  const finish=(el)=>{
    if(!el)return;
    el.dispatchEvent(new Event('change',{bubbles:true}));
    el.blur();
  };
  document.addEventListener('keydown',event=>{
    const el=event.target;
    if(!(el instanceof HTMLInputElement))return;
    if(event.key==='Enter'){event.preventDefault();finish(el)}
  },{passive:false});
  window.AbysssTimerInput={finish};
})();
