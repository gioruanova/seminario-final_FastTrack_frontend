// Registramos el service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado con scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Error al registrar Service Worker:', error);
      });
  });
}
