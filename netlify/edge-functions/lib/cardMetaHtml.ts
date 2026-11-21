// Pure string helpers for netlify/edge-functions/card-meta.ts, split out so
// they can run under plain Node (Vitest) instead of only the Deno edge
// runtime. card.name/title/org are user-controlled free text, so every value
// going into an HTML attribute must be escaped — this is the one place an
// escaping mistake would be a stored XSS into every card's share preview.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function setMeta(
  html: string,
  attr: "property" | "name",
  key: string,
  content: string,
): string {
  const pattern = new RegExp(
    `(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`,
    "i",
  );
  // A string replacement (even with no $1/$2 used) still special-cases "$&",
  // "$$" and "$`"/"$'" in CONTENT. A card name of "Cash $$ Co" would silently
  // collapse to "Cash $ Co", and a crafted "$`" would splice the entire
  // preceding document into the attribute. A function replacer treats the
  // escaped content as a literal string instead.
  return pattern.test(html)
    ? html.replace(
        pattern,
        (_match, open: string, close: string) =>
          `${open}${escapeHtml(content)}${close}`,
      )
    : html;
}

export function setTitle(html: string, content: string): string {
  return html.replace(
    /<title>[\s\S]*?<\/title>/,
    () => `<title>${escapeHtml(content)}</title>`,
  );
}
