# Evas Designs Website — Agent Guide

Static marketing website for Evas Designs (luxury interior design / design-build
studio), hosted on Hostinger at https://evasdesigns.in, repo
`sol2k/evas-designs-website`, plain HTML/CSS/vanilla JS. **No build system, no
framework** — do not migrate to React/Next/Vue/Astro/Tailwind/PHP unless
explicitly requested.

## Token-Saving Rule (read this first)

This repo ships persistent context docs so you do NOT need to scan the website:

- `website_context.md` — business info, design tokens, page template anatomy,
  CSS/JS conventions, URL routing.
- `SEO_Rules.md` — metadata/schema/sitemap conventions + the new-page checklist.

- For a **new page**: read `SEO_Rules.md` (checklist) + `website_context.md`
  (template), then ONE existing page of the same type as a markup reference —
  not the whole site.
- For an **edit to an existing page**: read only the files in the
  file-selection table below. Do not read `website_context.md`/`SEO_Rules.md`
  unless the task touches SEO, schema, or shared markup.
- Never read the whole repository "to get a grasp of the website."

## Current Architecture

```
index.html  about.html  services.html  portfolio.html  faq.html  contact.html
interior-designer-malviya-nagar-delhi.html      (2nd studio, Delhi)
css/style.css        (single global stylesheet, ~1800 lines, section banners)
js/main.js           (year, sticky header, mobile nav, FAQ accordion,
                      scroll reveal, hero parallax, contact→WhatsApp form)
images/              (flat; kebab-case keyword-rich names)
.htaccess            (serves foo.html at /foo clean URLs, single segment only)
robots.txt  sitemap.xml
```

Plus 7 self-contained landing pages (each duplicates header/footer inline):

```
building-architect-in-gurgaon/index.html
house-construction-from-scratch-gurgaon/index.html
building-renovation-contractor-gurgaon/index.html
architectural-design-3d-elevation-gurgaon/index.html
commercial-building-architect-gurgaon/index.html      (5 original "pSEO" pages)
best-architecture-firm-in-gurgaon/index.html          (ranked listicle)
services/interior-design/index.html
```

All are live URLs indexed in `sitemap.xml` — never break them.

### Two footer variants — do not mix

- **Main-site footer** (core pages + best-firm + malviya-nagar +
  services/interior-design): 4 columns incl. "Follow" (IG/FB/LI) and the Delhi
  studio address.
- **pSEO footer** (the 5 original Gurgaon pages): "Gurgaon Pages" cross-link
  column instead of "Follow", phone and WhatsApp on separate lines,
  personalized closing tagline, prefilled WhatsApp float message.

## Editing Rules

1. Smallest possible change; no refactoring/redesign/cleanup unless asked.
2. Only inspect files directly relevant to the change (table below).
3. Do not change URLs, canonicals, or SEO metadata unless explicitly asked.
4. Preserve structured data (JSON-LD), responsive behavior, animations,
   content, image references and alt text.
5. Do not rename CSS classes or CSS variable values.
6. Header/footer changes must account for **both** footer variants above —
   confirm scope with the user before touching shared markup.
7. Do not create new files unless necessary.

## File-Selection Table

| Change type | Inspect only |
|---|---|
| Visual change on one page | that page's `.html` + relevant selectors in `css/style.css` |
| Homepage | `index.html` + `css/style.css` |
| Services / Portfolio / FAQ / About / Contact content or visual | that `.html` + `css/style.css` (+ `js/main.js` for FAQ/form behavior) |
| One pSEO landing page | that page's own `index.html` only |
| Header/footer on all pages | every page's header/footer block — confirm scope with user first |
| New page | `SEO_Rules.md` + `website_context.md` + one same-type page as reference |
| Sitemap/robots/SEO meta | `SEO_Rules.md` + the affected page(s) + `sitemap.xml` |

## After Editing

Verify only the changed functionality. No test suite or build exists — open the
changed HTML and check the specific change. Keep commits focused: one commit
per logical change, no unrelated formatting.

## Gotchas

- Phone (`+91 99991 45949`) ≠ WhatsApp (`+91 84475 12475`) — different numbers.
- No email address exists anywhere; contact is phone/WhatsApp/form only.
- Cache-busting `?v=YYYYMMDD` on the CSS/JS links exists on some landing pages
  with different dates — match the per-page convention when editing them.
- `interior-designer-malviya-nagar-delhi.html` is intentionally not (yet) in
  `sitemap.xml` — ask before adding.
- `.htaccess` deliberately makes `/services` serve `services.html`, not the
  `services/` directory — do not break this.
