// A link-preview bot (iMessage, WhatsApp, Slack, ...) never runs the SPA's
// JS, so it only ever sees the static tags baked into the shell HTML by
// public/_redirects (see scripts/prerender.js and the fix in
// fix/card-link-shows-homepage). Those tags are generic "Digital QR Card"
// branding, not the card being shared. This rewrites them, per request, to
// the real card's name/title/photo by calling the same public endpoint the
// SPA itself calls client-side.
//
// Runs for every request to a single-segment /c/:id, not just bots, since
// Apple does not publish a distinguishing user agent for the iMessage
// preview fetcher. Any failure (card not found, archived, API timeout,
// unexpected shape) falls through to the untouched shell response — this
// must never be the reason a real visitor's card page fails to load.
import type { Context } from "https://edge.netlify.com";
// Netlify's edge-bundler registers every top-level .ts/.js file under
// netlify/edge-functions/ as its own function (no default export required).
// These helpers live one level down in lib/ so the bundler skips them, and
// so a Vitest-only test file (which imports "vitest" — unresolvable by Deno)
// never gets picked up as a deployable function either.
import { setMeta, setTitle } from "./lib/cardMetaHtml.ts";

const API_URL = Deno.env.get("VITE_API_URL") ?? "https://api.digitalqrcard.com";
// This runs on every real visitor's card load, not just bots, so a slow API
// directly delays their page. 1.5s is an unmeasured starting value, not a
// derived one — tighten it once real p99 latency for GET /cards/:id is known.
const FETCH_TIMEOUT_MS = 1500;
const DEFAULT_IMAGE = "https://www.digitalqrcard.com/og-default.png";

interface PublicCard {
  name?: string;
  title?: string;
  org?: string;
  photoUrl?: string;
  cardStatus?: string;
}

export default async (request: Request, context: Context) => {
  const response = await context.next();

  // Single path segment only: /c/:id, never /c/:id/manifest.webmanifest or
  // /c/:id/icon-192.png, which _redirects proxies straight to the API and
  // which never reach here as HTML anyway (the content-type guard below is
  // the actual backstop).
  const { pathname } = new URL(request.url);
  const match = pathname.match(/^\/c\/([^/]+)\/?$/);
  const contentType = response.headers.get("content-type") ?? "";

  // Nothing to rewrite: hand back the untouched response exactly as
  // context.next() produced it, body and headers (content-length, etag)
  // included. No reason to read the body at all on these paths. The status
  // check also matters on its own: Response bodies are illegal on 204/205/304
  // (a conditional GET revalidation), and `done()` below would throw trying
  // to construct one — this keeps any such response on the untouched path,
  // never passed to `done()`.
  if (
    request.method !== "GET" ||
    response.status !== 200 ||
    !match ||
    !contentType.includes("text/html")
  ) {
    return response;
  }

  // Cloned BEFORE the body is read: response.text() below can throw (e.g. a
  // network blip while streaming the origin body — this runs on every real
  // visitor's GET of a card page, not a rare path). The clone shares the
  // same underlying stream, so it can't manufacture bytes a genuinely broken
  // transfer never delivered — but we hand it back unread in the catch below
  // rather than reading it ourselves, so OUR code exits cleanly instead of
  // throwing an unhandled error out of the function (what Netlify reports as
  // "edge function invocation failed"). Any residual stream failure then
  // surfaces as an ordinary truncated response while Netlify serves it, not
  // as a crashed invocation.
  const fallback = response.clone();

  try {
    // content-length and etag describe the ORIGINAL body. A rewritten body
    // must not ship a stale length/etag, so this header set drops both.
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    const done = (body: string, status = response.status) =>
      new Response(body, { status, headers });

    const shellHtml = await response.text();

    const cardRes = await fetch(
      `${API_URL}/cards/${encodeURIComponent(match[1])}`,
      { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) },
    );
    if (!cardRes.ok) {
      return done(shellHtml);
    }

    const card = (await cardRes.json()) as PublicCard;
    if (!card.name || card.cardStatus === "archive") {
      return done(shellHtml);
    }

    const title = card.title
      ? `${card.name}, ${card.title}${card.org ? ` at ${card.org}` : ""} — Digital QR Card`
      : `${card.name} — Digital QR Card`;
    const description = `View ${card.name}'s digital business card. One tap saves their contact info.`;
    const image =
      typeof card.photoUrl === "string" && card.photoUrl.startsWith("https://")
        ? card.photoUrl
        : DEFAULT_IMAGE;

    let html = setTitle(shellHtml, title);
    html = setMeta(html, "property", "og:title", title);
    html = setMeta(html, "property", "og:description", description);
    html = setMeta(html, "property", "og:image", image);
    html = setMeta(html, "name", "twitter:title", title);
    html = setMeta(html, "name", "twitter:description", description);
    html = setMeta(html, "name", "twitter:image", image);
    html = setMeta(html, "name", "description", description);

    return done(html);
  } catch {
    // Returns the clone unread, never shellHtml (which may never have been
    // assigned if response.text() itself is what threw) and never the
    // already-disturbed `response`. This stops our own code from throwing;
    // it is not a guarantee the origin's bytes were recoverable if the
    // underlying transfer genuinely broke mid-stream — see the comment
    // where `fallback` is created.
    return fallback;
  }
};

export const config = { path: "/c/*" };
