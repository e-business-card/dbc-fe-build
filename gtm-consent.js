// Loads Google Tag Manager only if the visitor granted tracking consent, and
// never in development. A file rather than an inline script so the Content
// Security Policy can allow 'self' scripts without allowing inline ones: the
// login token lives in localStorage, where any injected inline script reads it.
(function () {
  var host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return;
  try {
    var raw = localStorage.getItem("cookie_preferences_v1");
    if (!(raw && JSON.parse(raw).tracking)) return;
  } catch (e) {
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var first = document.getElementsByTagName("script")[0];
  var gtm = document.createElement("script");
  gtm.async = true;
  gtm.src = "https://www.googletagmanager.com/gtm.js?id=GTM-N7SQZ3GM";
  first.parentNode.insertBefore(gtm, first);
})();
