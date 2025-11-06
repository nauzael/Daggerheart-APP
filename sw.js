const CACHE_NAME = 'daggerheart-sheet-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/metadata.json',
  '/App.tsx',
  '/types.ts',
  '/components/CharacterCreator.tsx',
  '/components/CharacterSheet.tsx',
  '/components/CharacterSelection.tsx',
  '/components/Card.tsx',
  '/components/ThresholdTracker.tsx',
  '/components/StatDisplay.tsx',
  '/components/DaggerheartLogo.tsx',
  '/components/DomainSelector.tsx',
  '/components/AbilitySelector.tsx',
  '/components/LevelUpModal.tsx',
  '/components/AddDomainCardModal.tsx',
  '/data/classes.ts',
  '/data/ancestries.ts',
  '/data/communities.ts',
  '/data/domains.ts',
  '/data/domainCards.ts',
  '/data/equipment.ts',
  '/data/subclassFeatures.ts',
  '/data/advancements.ts',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});