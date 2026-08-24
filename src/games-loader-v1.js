(()=>{
  'use strict';
  let promise=null;
  const load=()=>{
    if(promise)return promise;
    promise=new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src='games-deferred-v237.min.js?v=19';s.defer=true;
      s.onload=resolve;s.onerror=reject;document.body.appendChild(s);
    });
    return promise;
  };
  window.AbysssGamesLoader={load};
  const arm=()=>{
    const host=document.getElementById('gamesAll');
    if(!host)return;
    host.addEventListener('pointerdown',load,{once:true,passive:true});
    host.addEventListener('keydown',load,{once:true,passive:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',arm,{once:true});else arm();
})();
