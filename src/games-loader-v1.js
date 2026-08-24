(()=>{
'use strict';
let promise=null;
const loadScript=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error(src));document.body.appendChild(s)});
const load=()=>promise||(promise=(async()=>{await loadScript('src/ggene-engine.js?v=1');await loadScript('src/starleap-engine.js?v=1');return true})());
window.AbysssGamesLoader={load};
})();
