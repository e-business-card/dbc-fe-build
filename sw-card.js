/* eslint-env serviceworker */
//
// Card shell service worker for digitalqrcard.com.
//
// Registered only from the public card page and deliberately scoped to /c/ so
// the marketing site keeps its normal, un-intercepted caching. Chrome requires
// a fetch handler that can answer a navigation while offline before it will
// offer to install a page, which is what makes the home-screen shortcut open
// standalone instead of in a browser tab.
//
// Strategy is network-first: the cache exists to answer an offline navigation,
// never to shadow a fresh deploy.

const CACHE = "dqc-card-shell-v1";

const OFFLINE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Offline</title>
<style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;
font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#0a2540;color:#fff;text-align:center;padding:24px}
p{opacity:.75;margin:8px 0 0}</style></head>
<body><div><h1>You're offline</h1><p>This card will load again once you have a connection.</p></div></body></html>`;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only card navigations. Everything else (API calls, images, assets) is left
  // to the browser so nothing here can serve a stale build.
  if (request.method !== "GET" || request.mode !== "navigate") return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then(
          (cached) =>
            cached ||
            new Response(OFFLINE_HTML, {
              status: 200,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            }),
        ),
      ),
  );
});
