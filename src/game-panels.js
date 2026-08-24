(()=>{
'use strict';
const fmt=s=>{s=Math.max(0,Math.ceil(s/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h}h ${String(m).padStart(2,'0')}m`:`${m}:${String(sec).padStart(2,'0')}`};
const val=(v,next)=>({label:v.label,value:v.value,next});
const panel=(title,sub,items,cls)=>{const el=document.createElement('section');el.className=`game-panel ${cls}`;el.innerHTML=`<header><div><small>${sub}</small><h2>${title}</h2></div></header><div class="game-values">${items.map(x=>`<div class="game-value"><span>${x.label}</span><strong>${x.value}</strong>${x.next==null?'':`<small>次回 ${fmt(x.next)}</small>`}</div>`).join('')}</div>`;return el};
const readEngine=(name)=>window[name]?.state?.()||null;
const render=()=>{const g=document.getElementById('gwrap'),s=document.getElementById('slwrap');const ge=readEngine('GgeneEngine'),sl=readEngine('StarLeapEngine');if(g)g.replaceChildren(panel('Gジェネ','STAMINA',[val({label:'スタミナ',value:ge?.stamina??'—'},ge?.staminaNext)],'g-panel'));if(s)s.replaceChildren(panel('幻想水滸伝 STAR LEAP','STAMINA / ORB',[val({label:'スタミナ',value:sl?.stamina??'—'},sl?.staminaNext),val({label:'オーブ',value:sl?.orb??'—'},sl?.orbNext)],'sl-panel'))};
window.AbysssGamePanels={render};
})();
