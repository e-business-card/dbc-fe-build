import { describe, expect, it } from "vitest";
import { escapeHtml, setMeta, setTitle } from "./cardMetaHtml";

// A trimmed stand-in for the real shell's <head>, in the same multi-line,
// Prettier-formatted shape the actual build output uses (see index.html).
const SHELL_HEAD = `
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Digital QR Card" />
    <meta
      property="og:title"
      content="DigitalQRCard - Modern Digital Business Cards with Voice Intros, Lead Capture & Lifetime Team Plans"
    />
    <meta
      property="og:description"
      content="Free digital business card that shares your full profile in one tap."
    />
    <meta
      property="og:image"
      content="https://www.digitalqrcard.com/og-default.png"
    />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="Digital QR Card: one tap shares your whole profile"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="DigitalQRCard - Modern Digital Business Cards with Voice Intros, Lead Capture & Lifetime Team Plans"
    />
    <meta
      name="description"
      content="Free digital business card that shares your full profile in one tap."
    />
    <title>
      Digital QR Card — Free Digital Business Card, Pro $29 Lifetime
    </title>
`;

describe("setMeta", () => {
  it("replaces a property= tag's content across the multi-line Prettier layout", () => {
    const result = setMeta(
      SHELL_HEAD,
      "property",
      "og:title",
      "Ilyes Tounsi — Digital QR Card",
    );
    expect(result).toMatch(
      /property="og:title"\s+content="Ilyes Tounsi — Digital QR Card"/,
    );
    // The sibling twitter:title tag, which shares the old wording, is untouched.
    expect(result).toMatch(
      /name="twitter:title"\s+content="DigitalQRCard - Modern/,
    );
  });

  it("replaces a name= tag's content", () => {
    const result = setMeta(
      SHELL_HEAD,
      "name",
      "twitter:title",
      "Ilyes Tounsi — Digital QR Card",
    );
    expect(result).toMatch(
      /name="twitter:title"\s+content="Ilyes Tounsi — Digital QR Card"/,
    );
  });

  it("does not touch og:image:width or og:image:height when setting og:image", () => {
    const result = setMeta(
      SHELL_HEAD,
      "property",
      "og:image",
      "https://cdn.example.com/photo.jpg",
    );
    expect(result).toContain('content="https://cdn.example.com/photo.jpg"');
    expect(result).toContain('property="og:image:width" content="1200"');
    expect(result).toContain('property="og:image:height" content="630"');
  });

  it("leaves the document unchanged when the property is not present", () => {
    const result = setMeta(
      SHELL_HEAD,
      "property",
      "og:nonexistent",
      "anything",
    );
    expect(result).toBe(SHELL_HEAD);
  });

  it("escapes a card name containing HTML before inserting it", () => {
    const result = setMeta(
      SHELL_HEAD,
      "property",
      "og:title",
      "<script>alert(1)</script>",
    );
    expect(result).not.toContain("<script>alert(1)</script>");
    expect(result).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });

  it("escapes a double quote so a card name cannot break out of the content attribute", () => {
    const result = setMeta(
      SHELL_HEAD,
      "property",
      "og:title",
      'Name" onmouseover="alert(1)',
    );
    expect(result).toContain('content="Name&quot; onmouseover=&quot;alert(1)"');
    // The injected attribute must not appear as a real, separate attribute.
    expect(result).not.toMatch(/content="Name"\s+onmouseover="alert\(1\)"/);
  });

  // String.prototype.replace treats "$&", "$$", "$`" and "$'" in the
  // REPLACEMENT as special even when no $1/$2 is used. A function replacer
  // avoids that; these guard against regressing back to a template-string one.
  it("treats a literal dollar sign in the name as plain text, not a $$ escape", () => {
    const result = setMeta(SHELL_HEAD, "property", "og:title", "Cash $$ Co");
    expect(result).toMatch(/property="og:title"\s+content="Cash \$\$ Co"/);
  });

  it("does not splice the preceding document in for a name containing $`", () => {
    const result = setMeta(SHELL_HEAD, "property", "og:title", "Weird $` Name");
    expect(result).toMatch(/property="og:title"\s+content="Weird \$` Name"/);
    // A splice bug would duplicate everything before the match into the
    // attribute, so og:type (the very first tag) would appear a second time.
    expect(result.match(/og:type/g)).toHaveLength(1);
  });

  it("does not interpret $& as the whole matched tag", () => {
    const result = setMeta(SHELL_HEAD, "property", "og:title", "A $& B");
    expect(result).toMatch(/property="og:title"\s+content="A \$&amp; B"/);
  });
});

describe("setTitle", () => {
  it("replaces the multi-line <title> content", () => {
    const result = setTitle(SHELL_HEAD, "Ilyes Tounsi — Digital QR Card");
    expect(result).toContain("<title>Ilyes Tounsi — Digital QR Card</title>");
    expect(result).not.toContain("Pro $29 Lifetime");
  });

  it("escapes HTML in the title", () => {
    const result = setTitle(SHELL_HEAD, "</title><script>alert(1)</script>");
    expect(result).not.toContain("<script>alert(1)</script>");
  });

  it("treats $& in the title as plain text, not the matched tag", () => {
    const result = setTitle(SHELL_HEAD, "A $& B");
    expect(result).toContain("<title>A $&amp; B</title>");
  });
});

describe("escapeHtml", () => {
  it("escapes all five reserved characters", () => {
    expect(escapeHtml(`& < > " '`)).toBe("&amp; &lt; &gt; &quot; &#39;");
  });

  it("leaves plain text untouched", () => {
    expect(escapeHtml("Ilyes Tounsi, Founder at Digital QR Card")).toBe(
      "Ilyes Tounsi, Founder at Digital QR Card",
    );
  });
});
