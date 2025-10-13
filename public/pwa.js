// Registramos el service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado con scope:', registration.scope);
        
        // Forzar actualización si hay una nueva versión
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('Nueva versión del SW disponible, actualizando...');
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            });
          }
        });
        
        // Verificar actualizaciones cada 5 minutos
        setInterval(() => {
          registration.update();
        }, 5 * 60 * 1000);
      })
      .catch((error) => {
        console.error('Error al registrar Service Worker:', error);
      });
  });
  
  // Recargar cuando se active un nuevo SW
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Worker actualizado, recargando...');
    window.location.reload();
  });
}
