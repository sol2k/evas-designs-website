# Website Context — Evas Designs

Reference doc for AI agents. Read this (not the whole site) when you need
business facts, design tokens, or the page template. Paired with
`SEO_Rules.md` (metadata/schema/checklist) and `AGENTS.md` (rules).

## Business Info (NAP)

- **Name:** Evas Designs (alternateName "Evas") — luxury design-build studio:
  interior design, architecture, construction, renovation, facades.
- **Phone:** `+91 99991 45949` → `tel:+919999145949` (schema: `+91-99991-45949`)
- **WhatsApp:** `+91 84475 12475` → `https://wa.me/918447512475` — **different
  number from the phone line.**
- **Email:** none. Contact is phone / WhatsApp / on-site form only.
- **Studio 1 (HQ):** W5/3, DLF Phase 3, Gurugram, Haryana 122010 —
  geo `28.4818;77.0947`
- **Studio 2 (Delhi):** C-71, near HDFC Bank, Shivalik Colony, Malviya Nagar,
  New Delhi 110017 — geo `28.5305;77.2104`
- **Hours:** Mon–Sat, 10:00–19:00
- **Areas served (schema):** Gurugram, Delhi, Noida, Faridabad, Ghaziabad.
  Malviya Nagar page adds South Delhi localities (Saket, Hauz Khas,
  Panchsheel Park, Greater Kailash, South Extension, Green Park, Vasant Kunj,
  Chattarpur, Safdarjung Enclave).
- **Social:** instagram.com/evasdesigns · facebook.com/evasdesigns ·
  linkedin.com/company/evasdesigns (footer links use `target="_blank"
  rel="noopener"`)
- **Consistent stats:** 10+ years · 180+ projects · 5 cities · 100% in-house ·
  rating 4.9★ / 47 reviews · `priceRange "₹₹₹"`. No founding year — say "over
  a decade".
- **Taglines:** H1 style "We design it, build it, and hand you back the keys.";
  footer "Interior Design · Architecture · Construction — Gurugram & Delhi NCR".

## Design Tokens (`css/style.css` `:root`, lines ~7–26 — never alter values)

```css
--ivory: #F7F2E9;         --champagne: #FCF9F3;
--espresso: #1B1611;      --espresso-soft: #4A4036;
--ink-dark: #14100C;      --gold: #B08D57;
--gold-deep: #8C6B3F;     --gold-light: #D8BE8C;
--champagne-text: #EFE6D3; --line: #E2D8C4;
--line-gold: rgba(176, 141, 87, 0.45);
--font-display: 'Fraunces', Georgia, 'Times New Roman', serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--max-width: 1240px;  --gutter: 32px;  --speed: 260ms;
```

- **Fonts** (identical Google Fonts URL on every page, with preconnects to
  fonts.googleapis.com + fonts.gstatic.com):
  `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter:wght@400;500;600&display=swap`
  Fraunces = headings (weight 300–450), Inter = body/UI.
- **No border-radius** anywhere except `50%` on `.whatsapp-float` — the design
  is sharp-edged.
- **`<meta name="theme-color" content="#1B1611">`** on every page.
- **Signature devices:** `✦` bullets/separators; outlined display numbers via
  `-webkit-text-stroke: 1px var(--gold)` on transparent text (`.process-num`,
  `.rank-num`, etc.); giant outlined background words (`.hero-bg-word`,
  `.cta-band .bg-word`); gold gradient buttons
  `linear-gradient(120deg, var(--gold-deep), var(--gold) 55%, var(--gold-light))`;
  italic `<em>` inside h1/h2 rendered gold (heading emphasis convention).

## Page Template Anatomy

**Head order (consistent):** charset → viewport → title → description →
(keywords/author + geo metas: home & landing pages only) → canonical → robots
→ OG block → (twitter block: home & landing pages only) → theme-color →
favicon (`/images/favicon.png` + apple-touch-icon) → font preconnects →
Google Fonts → (`<link rel="preload" as="image">` hero image: home & landing
pages) → `<link rel="stylesheet" href="/css/style.css">` → one JSON-LD script.

**Header (identical everywhere; set `class="active" aria-current="page"` on
the current page's link):**

```html
<header class="site-header"><div class="wrap">
  <a href="/" class="brand" aria-label="Evas Designs — home">
    <img src="/images/evas-designs-logo.png" alt="Evas Designs logo" width="65" height="44">
    <span class="brand-word">Evas <em>Designs</em></span></a>
  <nav class="main-nav" aria-label="Primary">
    <a href="/">Home</a> <a href="/about.html">About</a> <a href="/services.html">Services</a>
    <a href="/portfolio.html">Portfolio</a> <a href="/faq.html">FAQ</a>
    <a href="/contact.html" class="nav-cta">Contact Us</a></nav>
  <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
</div></header>
```

**Footers:** two variants — see "Two footer variants" in `AGENTS.md`. Main
variant columns: brand block (logo `width="93" height="64"`), "Studio"
(About/Services/Portfolio/FAQ), "Contact" (phone line, Gurugram address, link
to `/interior-designer-malviya-nagar-delhi.html`, "Contact form"), "Follow"
(IG/FB/LI). `.footer-bottom`: `© <span id="year">2026</span> Evas Designs…`.

**WhatsApp float:** fixed gold circle, last element before the script tag:
`<a href="https://wa.me/918447512475" class="whatsapp-float" target="_blank"
rel="noopener" aria-label="Chat with Evas Designs on WhatsApp">` + inline SVG.
The 5 original pSEO pages add a page-specific `?text=Hello%20Evas%20Designs…`
prefilled message; newer pages use the plain link.

**CTA band (end of most pages):**
`<section class="bg-dark cta-band"><span class="bg-word" aria-hidden="true">WORD</span><div class="wrap"><h2 class="reveal">… <em>…</em></h2><a href="/contact.html" class="btn btn-gold reveal">… <span class="arrow">→</span></a></div></section>`

**Scripts:** single `<script src="/js/main.js" defer></script>` immediately
before `</body>`. Some landing pages cache-bust CSS+JS with `?v=YYYYMMDD` —
match the page's existing convention.

## CSS/JS Conventions

- `css/style.css` is one global stylesheet organized by
  `/* ---------- Section name ---------- */` banners: root/reset → header →
  buttons → hero → marquee → sections → stats → services → process →
  portfolio → feature-split → testimonials → CTA → forms → contact → footer →
  WhatsApp float → page-hero → service-detail → about → FAQ → reveal →
  responsive → pSEO-landing block → ranked-list. Add new styles in the
  matching banner section.
- **Naming:** kebab-case utility-ish classes, not BEM (`.service-card`,
  `.btn-gold`, `.bg-champagne`). Buttons: `.btn` +
  `btn-gold|btn-dark|btn-ghost|btn-light|btn-outline-light`. Backgrounds:
  `.bg-champagne`, `.bg-dark`. Section padding: 104px default,
  `.section-tight` 72px, `.cta-band` 110px.
- **Responsive:** desktop-first `max-width` queries at 1024px and 720px
  (mobile: hamburger nav, single-column grids); 1180px only for
  `.related-grid.five`.
- `js/main.js` (IIFE, strict, vanilla): footer `#year`; `.site-header.scrolled`
  past 24px; mobile nav toggle; FAQ accordion (one open at a time); scroll
  reveal via IntersectionObserver (`.reveal` → `.in`, stagger via
  `--reveal-delay`); hero parallax (skipped under prefers-reduced-motion);
  contact form → builds a WhatsApp message from FormData and opens
  `wa.me/918447512475?text=…`.
  **Form field names must match its label map:** `name`, `phone`,
  `project-type`, `location`, `plot-size`, `timeline`, `budget`, `message`,
  optional hidden `lead-topic`.
- Reduced motion is respected in both CSS and JS — preserve that.

## URL / Routing

- `.htaccess`: `RewriteRule ^([^/.]+)/?$ $1.html [L]` (condition: the `.html`
  file exists) — serves `foo.html` at `/foo` for single-segment paths without
  a redirect. Deliberately makes `/services` resolve to `services.html`, not
  the `services/` directory. Multi-segment paths (e.g.
  `/services/interior-design/`) are untouched directory indexes.
- **Link convention:** root pages linked with the real `.html` extension
  (`/about.html`); directory landing pages linked with trailing slash
  (`/building-architect-in-gurgaon/`). Canonicals match those exact forms.
- No redirects are configured; never rename/move a page without updating
  canonical, sitemap, and all internal links.
