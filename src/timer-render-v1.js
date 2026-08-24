(()=>{
  'use strict';
  let raf=0,last='';
  const render=()=>{
    raf=0;
    if(typeof window.render!=='function')return;
    const key=String(Date.now()-(Date.now()%1000));
    if(key===last)return;
    last=key;
    window.render();
  };
  window.AbysssTimerRender={
    request(){if(!raf)raf=requestAnimationFrame(render)},
    cancel(){if(raf){cancelAnimationFrame(raf);raf=0}}
  };
})();
