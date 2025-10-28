/**
 * Breath Web App | © Nick Freear | License: GPL-3.0+.
 *
 * @see https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 */

import urlsToCache from './lib/urlsToCache.js';

const { caches, self } = globalThis;
const cacheName = 'breath-app-cache';

self.addEventListener('install', (event) => {
  console.warn('Breath App: install.', cacheName, event);

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.debug('sw.js ~ Opened cache');
      return cache.addAll(urlsToCache());
    })
  );
});

// https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker#3_serve_files_from_the_cache
// https://dev.to/buildwebcrumbs/why-your-website-should-work-offline-and-what-you-should-do-about-it-fck
// https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith
self.addEventListener('fetch', (event) => {
  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async () => {
      // Try to get the response from a cache.
      const cachedResponse = await caches.match(event.request);
      // Return it if we found one.
      if (cachedResponse) {
        console.debug('sw.js ~ Cache hit - return response');
        return cachedResponse;
      }
      // If we didn't find a match in the cache, use the network.
      return fetch(event.request);
    })()
  );
});

// End.
