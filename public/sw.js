const CACHE_NAME = 'fasttrack-pwa-v3';

// Recursos a cachear
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
    '/favicon.ico'
];

// Instalación: cacheamos los recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Manejar mensajes para forzar actualización
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Activación: limpiamos cachés antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: NO INTERCEPTAR NADA DE LA API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // SI es petición a API, dejar pasar SIN tocar
  if (url.pathname.includes('Api') || 
      url.hostname !== self.location.hostname) {
    return; // NO interceptar
  }
  
  // Solo cachear recursos estáticos locales
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

