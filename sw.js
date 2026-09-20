const CACHE='karmayogi-v3';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    try{const r=await fetch(e.request); c.put(e.request,r.clone()); return r;}
    catch(err){return c.match(e.request).then(r=>r||c.match('./index.html'));}
  }));
});
