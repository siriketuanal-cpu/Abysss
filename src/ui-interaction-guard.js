(()=>{
'use strict';
let suppressUntil=0;
const arm=()=>{suppressUntil=performance.now()+350};
window.AbysssUIInteractionGuard={arm};
document.addEventListener('pointerup',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;const el=e.target.closest?.('.name-lp-hit,.rank-lp-hit,.abyss-stam-card,[data-idle-receive]');if(!el)return;}, {passive:true});
document.addEventListener('click',e=>{if(performance.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
window.addEventListener('abysss:longpress',arm,{passive:true});
})();
