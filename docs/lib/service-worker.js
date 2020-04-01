/**
 *
 * @see https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

/* eslint-env worker */

const PATH = window.location.pathname;
// const CACHES = window.caches;
const CACHE_NAME = 'breath-app-cache';

self.addEventListener('install', event => {
  console.warn('Breath App: install.', CACHE_NAME, event);

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(
        [
          `${PATH}lib/icon.svg`,
          `${PATH}lib/index.js`,
          `${PATH}lib/style.css`
          // '/offline.html'
        ]
      );
    })
  );
});
