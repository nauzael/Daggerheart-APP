const CACHE_NAME = 'daggerheart-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/manifest.json',
  '/components/CharacterCreator.tsx',
  '/components/CharacterSheet.tsx',
  '/components/CharacterSelection.tsx',
  '/components/Card.tsx',
  '/components/DaggerheartLogo.tsx',
  '/components/ThresholdTracker.tsx',
  '/components/StatDisplay.tsx',
  '/components/DomainSelector.tsx',
  '/components/AbilitySelector.tsx',
  '/components/LevelUpModal.tsx',
  '/components/AddDomainCardModal.tsx',
  '/components/AddEquipmentModal.tsx',
  '/components/DomainCardSelectorModal.tsx',
  '/components/RestModal.tsx',
  '/components/BeastformDisplay.tsx',
  '/components/BeastformSelectorModal.tsx',
  '/components/BeastformListModal.tsx',
  '/components/BeastformCard.tsx',
  '/components/SelectionModal.tsx',
  '/data/classes.ts',
  '/data/domains.ts',
  '/data/ancestries.ts',
  '/data/communities.ts',
  '/data/domainCards.ts',
  '/data/equipment.ts',
  '/data/subclassFeatures.ts',
  '/data/advancements.ts',
  '/data/classFeatures.ts',
  '/data/downtimeMoves.ts',
  '/data/longRestDowntimeMoves.ts',
  '/data/beastforms.ts'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add the new file to the cache
        const updatedUrls = urlsToCache.filter(url => !url.includes('abilities.ts'));
        return cache.addAll(updatedUrls);
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