(()=>{
  'use strict';
  let promise=null;
  window.AbysssGamesLoader={load(){
    if(promise)return promise;
    promise=new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src='games-deferred-v237.min.js?v=18';s.defer=true;
      s.onload=resolve;s.onerror=reject;document.body.appendChild(s);
    });
    return promise;
  }};
})();
