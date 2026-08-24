(()=>{
  'use strict';
  const KEY='abysss:timer-model:v1';
  const load=()=>{try{const v=localStorage.getItem(KEY);return v?JSON.parse(v):null}catch{return null}};
  const save=model=>{try{localStorage.setItem(KEY,JSON.stringify(model));return true}catch{return false}};
  const clear=()=>{try{localStorage.removeItem(KEY)}catch{}};
  window.AbysssTimerPersistence={KEY,load,save,clear};
})();
