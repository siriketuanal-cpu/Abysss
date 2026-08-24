// Abysss shell SW: deliberately passive.
// No cache writes, no skipWaiting, no clients.claim, no fetch interception.
self.addEventListener('install',()=>{});
self.addEventListener('activate',()=>{});
