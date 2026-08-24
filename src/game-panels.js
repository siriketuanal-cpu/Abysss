(()=>{
'use strict';
const fmt=s=>{s=Math.max(0,Math.ceil(s/1000));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return h?`${h}h ${String(m).padStart(2,'0')}m`:`${m}:${String(sec).padStart(2,'0')}`};
const panel=(title,sub,items,cls)=>{const el=document.createElement('section');el.className=`game-panel ${cls}`;el.innerHTML=`<header><div><small>${sub}</small><h2>${title}</h2></div></header><div class="game-values">${items.map(x=>`<div class="game-value"><span>${x.label}</span><strong>${x.value}</strong>${x.next?`<small>次回 ${fmt(x.next)}</small>`:''}</div>`).join('')}</div>`;return el};
const render=()=>{const g=document.getElementById('gwrap'),s=document.getElementById('slwrap');if(g)g.replaceChildren(panel('Gジェネ','STAMINA',[{label:'スタミナ',value:'—',next:null}],'g-panel'));if(s)s.replaceChildren(panel('幻想水滸伝 STAR LEAP','STAMINA / ORB',[{label:'スタミナ',value:'—',next:null},{label:'オーブ',value:'—',next:null}],'sl-panel'))};
window.AbysssGamePanels={render};
})();
