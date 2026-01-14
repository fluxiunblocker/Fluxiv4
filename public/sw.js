importScripts("/assets/uv.bundle.js");
importScripts("/uv.config.js");
importScripts("/assets/uv.sw.js");

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

const sw = new UVServiceWorker();
self.addEventListener("fetch", e => e.respondWith(sw.fetch(e)));
