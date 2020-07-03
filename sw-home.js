var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'https://code.jquery.com/jquery-3.5.1.min.js',
  'custom-home-js.js',
  'sw-home.js',
  'manifest.webmanifest',
  'home.html',
  'details.html',
  'bulma-0.9.0/css/bulma.min.css',
  'favicon.ico',
  'apple-icon.png',
  'images/34.jpeg',
  'images/225.jpeg',
  'images/311.jpeg',
  'images/385.jpeg',
  'images/395.jpeg',
  'images/586.jpeg',
  'https://rickandmortyapi.com/api/character/34',
  'https://rickandmortyapi.com/api/character/225',
  'https://rickandmortyapi.com/api/character/311',
  'https://rickandmortyapi.com/api/character/385',
  'https://rickandmortyapi.com/api/character/395',
  'https://rickandmortyapi.com/api/character/586',
  'https://rickandmortyapi.com/api/location/6'
];
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
    .then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheNames) {
          return cacheNames != CACHE_NAME
        })
        .map(function (cacheName) {
			console.log(cacheName);
          return caches.delete(cacheName)
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request));
});