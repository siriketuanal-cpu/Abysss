(()=>{
'use strict';
let queued=false;
const flush=()=>{queued=false;try{if(window.AbysssModel){const m=AbysssModel.load();AbysssModel.save(m)}}catch{}};
window.AbysssPersistence={
  queue(){if(queued)return;queued=true;const run=()=>flush();if('requestIdleCallback'in window)requestIdleCallback(run,{timeout:800});else setTimeout(run,120)},
  flush
};
})();
