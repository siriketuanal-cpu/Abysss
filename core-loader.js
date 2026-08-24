(()=>{
'use strict';
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error(src));document.body.appendChild(s)});
const modules=['src/model.js?v=1','src/timer-core-v1.js?v=5','src/timer-math-v1.js?v=4','src/input.js?v=1','src/view.js?v=1','src/persistence-v1.js?v=4','src/daily-weekly-v1.js?v=4','src/games-loader-v1.js?v=4'];
(async()=>{try{for(const m of modules)await load(m);window.AbysssView?.render();window.__abysssCoreReady=true}catch(e){console.warn('Abysss boot failed',e)}})();
})();
