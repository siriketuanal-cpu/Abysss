(()=>{
  'use strict';
  const start=performance.now();
  let started=false;
  const loadCore=()=>{
    if(started)return;
    started=true;
    const s=document.createElement('script');
    s.src='core-loader.js?v=1';
    s.async=true;
    s.dataset.abysss='core';
    s.onload=()=>{window.__abysssBootReady=performance.now()-start};
    s.onerror=()=>{window.__abysssBootError=true};
    document.body.appendChild(s);
  };
  const firstPaint=()=>requestAnimationFrame(()=>requestAnimationFrame(loadCore));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',firstPaint,{once:true,passive:true});else firstPaint();
})();
