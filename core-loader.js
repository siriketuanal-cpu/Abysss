(()=>{
'use strict';
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error(src));document.body.appendChild(s)});
const modules=['src/model.js?v=2','src/timer-core-v1.js?v=6','src/timer-math-v1.js?v=5','src/input.js?v=2','src/view.js?v=4','src/persistence-v1.js?v=5','src/engine.js?v=2','src/actions.js?v=1','src/daily-weekly-v1.js?v=5','src/games-loader-v1.js?v=5'];
(async()=>{try{for(const m of modules)await load(m);window.AbysssEngine?.resume();window.AbysssView?.render();window.AbysssView?.startTicker();window.__abysssCoreReady=true}catch(e){console.warn('Abysss boot failed',e)}})();
})();
