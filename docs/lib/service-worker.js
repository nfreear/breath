/**
 * Breath Web App | © Nick Freear | License: GPL-3.0+.
 *
 * @see https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

/* eslint-env worker */

const PATH = location.pathname.replace(/\/[^/]+$/, ''); // '/docs/lib/service-worker.js'
const CACHE_NAME = 'breath-app-cache';

console.warn('Worker: location', PATH, location);

self.addEventListener('install', event => {
  console.warn('Breath App: install.', CACHE_NAME, event);

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(
        [
          `${PATH}/icon.svg`,
          `${PATH}/index.js`,
          `${PATH}/style.css`
          // '/offline.html'
        ]
      );
    })
  );
});
