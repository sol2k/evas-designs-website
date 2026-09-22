# SEO Rules — Evas Designs

Reference doc for AI agents. Follow these conventions exactly when creating or
editing pages. Never change existing titles, descriptions, canonicals, or
schema unless the user explicitly asks.

## Metadata Patterns

- **Title:** `Primary Keyword Phrase | Evas Designs` (or
  `Page Name | … — Evas Designs, Gurugram`), ~50–95 chars. Homepage:
  `Evas Designs | Luxury Interior Design, Architecture & Construction in Gurugram & Delhi NCR`.
- **Meta description:** 1–2 sentences, ~150–200 chars, keyword-first, ends
  with location/CTA flavor ("across Delhi NCR", "Book a free site visit").
- **Canonical:** exact final URL. Homepage `https://evasdesigns.in/`; root
  `.html` pages keep the extension (`https://evasdesigns.in/about.html`);
  directory pages keep the trailing slash
  (`https://evasdesigns.in/services/interior-design/`).
- **Robots meta:** `index, follow` or
  `index, follow, max-image-preview:large`. No hreflang anywhere.
- **Geo metas** (home + Gurgaon landing pages): `geo.region IN-HR`,
  `geo.placename Gurugram…`, `geo.position 28.4818;77.0947` + ICBM.
  Malviya Nagar page: `IN-DL` / `28.5305;77.2104`.
- **OG/Twitter:** `og:type=website`, `og:site_name=Evas Designs`,
  `og:locale=en_IN`, `og:image=https://evasdesigns.in/images/og-cover.jpg`
  (1200×630, include width/height), `twitter:card=summary_large_image`.
  Core inner pages (about/services/portfolio/faq/contact) use a reduced OG
  set (type/title/description/url/image) and no twitter block — match the
  pattern of the page type you're creating.

## Structured Data (JSON-LD, one `<script type="application/ld+json">` per page)

- The business entity is defined once on the homepage as
  `["GeneralContractor","HomeAndConstructionBusiness"]` with
  `@id: "https://evasdesigns.in/#business"` (plus `WebSite` `#website` and
  `BreadcrumbList`). **Everywhere else, reference it** with
  `{ "@id": "https://evasdesigns.in/#business" }` — never redefine it
  (exception: the Malviya Nagar page defines a `#location` branch entity with
  `branchOf #business`).
- Per page type:
  - about → `AboutPage`; contact → `ContactPage`; portfolio →
    `CollectionPage` — all with `isPartOf #website` + `about #business`.
  - services → `ItemList` of 6 `Service`s, `provider #business`.
  - faq → `FAQPage`, answers duplicated verbatim in the visible accordions.
  - pSEO/landing pages → `WebPage` + `Service` (`#service`, areaServed cities,
    `provider #business`) + `BreadcrumbList` (Home / Services / Page) +
    `FAQPage` mirrored in visible `.faq-item` markup.
  - best-architecture-firm → `WebPage` + `BreadcrumbList` + `ItemList`
    (8 ranked firms, Evas #1) + `FAQPage`.
- **Rule:** any FAQPage schema Q&A must match the visible on-page Q&A
  word-for-word.

## Content & Markup Conventions

- Exactly **one h1** per page, containing an italic-gold `<em>` phrase. h2 per
  section (`.section-head` with `.section-num` like `01 — Services`,
  `.eyebrow`, `.desc`); h3 for cards/steps.
- **Internal links:** root pages with `.html` (`/about.html`), directory pages
  with trailing slash (`/building-architect-in-gurgaon/`), service anchors via
  `/services.html#interior-design` etc.
- **Images:** flat `/images/` directory; filenames are kebab-case keyword
  phrases with location suffix, e.g.
  `luxury-living-room-interior-design-gurugram.jpg`. Alt text long and
  location-rich, e.g. "Luxury living room interior designed by Evas Designs in
  Gurugram — warm cove lighting…". Always explicit width/height;
  `loading="lazy"` except the hero image (`fetchpriority="high"` + a
  `<link rel="preload" as="image">` in head).

## Sitemap (`sitemap.xml`)

- 13 URLs currently. `changefreq`/`priority`: home monthly/1.0; services,
  portfolio and all 7 directory pages monthly/0.9; about yearly/0.7; faq
  yearly/0.6; contact yearly/0.8. **No `<lastmod>` anywhere** — don't add it.
- `image:image` entries exist for homepage (2), portfolio (5), and each
  directory page (1) — add one when a new page has a hero image.
- Every new indexable page MUST be added to the sitemap in its exact canonical
  form. (Known gap: `interior-designer-malviya-nagar-delhi.html` is not yet
  listed — ask the user before adding it.)
- `robots.txt` is just `Allow: /` + the sitemap line; leave it alone.

## New-Page Checklist

1. `<html lang="en">`; head in the exact order from `website_context.md` §
   "Page Template Anatomy" (theme-color `#1B1611`, favicon links, font
   preconnects + the exact Google Fonts URL, `/css/style.css`).
2. Title/description/canonical/OG/geo metas per the patterns above.
3. JSON-LD `@graph` for the page type — reference `#business`, don't redefine.
4. Header block copied verbatim; `class="active" aria-current="page"` on the
   matching nav item.
5. Hero: `.page-hero` (simple pages: `.crumb` + h1 with `<em>` + `.desc`) or
   `.landing-hero` (pSEO: crumb, eyebrow, h1, `.hero-copy`, `.keyword-cloud`,
   `.hero-actions`, preloaded hero image + `.landing-hero-card` stat).
6. Body built from existing components only: `.section-head`, `.stats-strip`,
   `.services-grid`, `.feature-split` + `.tick-list`, `.process-list`,
   `.portfolio-grid`/`.mini-gallery`, `.testimonial-grid`, `.service-detail` +
   `.tag-list`, `.deliverable-grid`, `.scope-layout`, `.timeline-grid` +
   `.note-box`, `.related-grid` (+`.five`), `.faq-item` accordions,
   `.lead-section#consultation` + `.lead-form-card`. Add `class="reveal"` to
   animatable blocks. End with `.bg-dark.cta-band` + one-word `.bg-word`.
7. Images per the image rules above.
8. Lead form (if any): `id="contact-form"`, `class="form-grid"`, `novalidate`,
   field names exactly from the main.js label map (`name`, `phone`,
   `project-type`, `location`, `plot-size`, `timeline`, `budget`, `message`,
   optional hidden `lead-topic`), submit `.btn.btn-gold`, and `#form-note`:
   "Submitting opens WhatsApp with your message pre-filled — nothing is
   stored on this site."
9. Footer: main-site variant for core/Delhi pages, pSEO variant for Gurgaon
   pSEO pages — never mix (see AGENTS.md).
10. WhatsApp float last before the script tag — plain
    `https://wa.me/918447512475`, or pSEO-style prefilled
    `?text=Hello%20Evas%20Designs%2C%20I%20would%20like%20to%20request%3A%20…`.
11. `<script src="/js/main.js" defer></script>` immediately before `</body>`
    (matching `?v=YYYYMMDD` on CSS+JS if the page uses one).
12. Add the URL to `sitemap.xml` (exact canonical form, monthly/0.9 for money
    pages, `image:image` if there's a hero image).
13. Cross-link: pSEO pages cross-link each other in the footer "Gurgaon
    Pages" column; services.html has a "07 — Gurgaon Pages"
    `.related-grid.five` block — update both when adding a Gurgaon pSEO page.
