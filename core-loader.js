(()=>{
'use strict';
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(new Error(src));document.body.appendChild(s)});
const modules=['src/model-v2.js?v=1','src/timer-core-v1.js?v=6','src/timer-math-v1.js?v=5','src/input.js?v=2','src/timer-view.js?v=1','src/dotabyss-idle.js?v=2','src/ui-slot-metadata.js?v=1','src/abyss-dashboard.js?v=5','src/game-panels.js?v=1','src/persistence-v1.js?v=5','src/engine.js?v=2','src/actions.js?v=1','src/daily-weekly-v1.js?v=5','src/games-loader-v1.js?v=5'];
(async()=>{try{for(const m of modules)await load(m);window.AbysssEngine?.resume();window.AbysssDashboard?.render();window.AbysssDashboard?.startTicker();window.AbysssGamePanels?.render();window.__abysssCoreReady=true}catch(e){console.warn('Abysss boot failed',e)}})();
})();
