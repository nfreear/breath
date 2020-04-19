/**
 * Breath Web App | © Nick Freear | License: GPL-3.0+.
 *
 * @see https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

/* eslint-env worker */

const PATH = location.pathname.replace(/\/[^/]+$/, '') + '/lib'; // '/docs/service-worker.js'
const CACHE_NAME = 'breath-app-cache';

console.warn('Worker: location', PATH, location);

self.addEventListener('install', event => {
  console.warn('Breath App: install.', CACHE_NAME, event);

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(
        [
          `${PATH}/analytics.js`,
          `${PATH}/animate.css`,
          `${PATH}/app-about.html`,
          `${PATH}/app-about.js`,
          `${PATH}/icon.png`,
          `${PATH}/icon.svg`,
          `${PATH}/index.js`,
          `${PATH}/sound.js`, // Was: 'audio.js'
          `${PATH}/soundcloud-tec_studio-drone-353976-lq.mp3`,
          `${PATH}/style.css`
          // '/offline.html'
        ]
      );
    })
  );
});

// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker#3_serve_files_from_the_cache
self.addEventListener('fetch', () => console.log('fetch')); // >> ??

// End.
