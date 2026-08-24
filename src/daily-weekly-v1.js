(()=>{
  'use strict';
  const run=()=>{
    try{
      if(typeof window.updateDaily==='function')window.updateDaily();
      if(typeof window.updateWeekly==='function')window.updateWeekly();
    }catch(e){}
  };
  window.AbysssDailyWeekly={run};
})();
