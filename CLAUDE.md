# Evas Designs Website

## Project

Lightweight marketing website for Evas Designs (interior design / design-build studio),
hosted on Hostinger at evasdesigns.in, connected to GitHub (sol2k/evas-designs-website).

Do not migrate this project to React, Next.js, Vue, Astro, Tailwind, or any other
frontend framework or build system unless explicitly requested. Keep it plain
PHP / HTML / CSS / vanilla JavaScript.

## Primary Principle

Make the smallest possible change required by the user's request.
Only inspect files directly relevant to the requested change.
Do not scan the entire repository for small changes.

## Current State (as of last inspection)

The repo has NOT yet been migrated to the target architecture below. It is still:

```
index.html        (432 lines)
about.html         (189 lines)
services.html      (280 lines)
portfolio.html     (194 lines)
faq.html           (210 lines)
contact.html       (189 lines)
css/style.css      (1696 lines — all pages' styles in one file)
js/main.js         (133 lines)
robots.txt
sitemap.xml
images/            (flat, not yet split into brand/portfolio/services/og)
```

Plus five standalone programmatic-SEO landing pages, each a full self-contained
HTML file (~588 lines) duplicating the entire header/nav/footer/CTA/WhatsApp
markup inline — these are indexed in sitemap.xml, so their URLs are live and
must be preserved:

```
architectural-design-3d-elevation-gurgaon/index.html
building-architect-in-gurgaon/index.html
building-renovation-contractor-gurgaon/index.html
commercial-building-architect-gurgaon/index.html
house-construction-from-scratch-gurgaon/index.html
```

Shared structural markers found in the main pages (for extraction reference):
- Header: `<header class="site-header">` ... `</header>`
- Footer: `<footer class="site-footer">` ... `</footer>`
- WhatsApp floating button: `<a class="whatsapp-float" href="https://wa.me/918447512475">`

**These pSEO pages were not mentioned in the original restructuring brief**
(added by a colleague after the brief was written). Diffed against the main
pages, their shared markup is NOT identical — it's a deliberate, consistent
variant across all five:

- **Header/nav:** effectively identical to the main site's header. Only
  difference is which nav link carries `class="active"` (all five mark
  "Services" active, not "Home") — this is correct, expected per-page
  behavior, not drift.
- **Footer:** consistently different from the main site's footer, not
  accidentally different:
  - adds a "Gurgaon Pages" column cross-linking all five pSEO pages
    (identical content on all five)
  - drops the "Follow" (Instagram/Facebook/LinkedIn) column entirely
  - splits the phone number and WhatsApp number into two separate lines
    instead of one combined `tel:` line
  - the closing tagline span is personalized per page (e.g. "Building
    Architect in Gurgaon · Gurugram & Delhi NCR")
- **WhatsApp float button:** same target number, but the `wa.me` link
  includes a pre-filled, page-specific message (e.g. "...I would like to
  request: Architectural design and 3D elevation consultation.").

**Implication for migration:** don't fold these into the main site's
`components/footer.php` or `components/whatsapp.php` as-is — that would
either lose the Gurgaon cross-link column and personalized WhatsApp text
everywhere, or leak pSEO-only markup onto the main pages. Instead, when PHP
components are introduced, give the pSEO pages their own variants that
share what's actually identical:
  - `components/header.php` — shared as-is (just pass which nav item is active)
  - `components/footer-pseo.php` — the pSEO variant, parameterized by page
    title/tagline and WhatsApp message text
  - `components/whatsapp.php` — parameterized by prefilled message text
Do not silently collapse the two footer variants into one, and do not
silently drop the Gurgaon cross-link column or the personalized WhatsApp
text during migration.

## Target Architecture (post-migration)

```
index.php, about.php, services.php, portfolio.php, faq.php, contact.php

components/
  head.php, header.php, footer.php, cta.php, whatsapp.php

css/
  base.css        — variables, reset, typography, links, images
  layout.css      — .wrap, sections, grids, hero layout
  components.css  — header, nav, buttons, footer, cards, shared CTA, forms
  responsive.css  — media queries
  pages/
    home.css, about.css, services.css, portfolio.css, faq.css, contact.css

js/
  core.js   — footer year, sticky header, mobile nav, scroll reveal
  faq.js    — FAQ accordion only, loaded only on the FAQ page

data/
  site.json, services.json, portfolio.json, faq.json

images/
  brand/, portfolio/, services/, og/

.htaccess   — rewrites so public URLs stay /about.html etc. while files are .php
robots.txt
sitemap.xml
```

Public URLs must keep working as `/about.html`, `/services.html`, etc. even
though the underlying files become `.php` — use `.htaccess` rewrites.

CSS variables currently defined at the top of `css/style.css` (e.g. `--ivory`,
`--champagne`, `--espresso`, `--gold`) must be preserved exactly and centralized
in `css/base.css` — do not alter their values during restructuring.

## Editing Rules

1. Make the smallest possible change.
2. Only inspect files directly relevant to the requested change.
3. Do not scan the entire repository for small changes.
4. Do not read every page before making a change.
5. Do not modify unrelated files.
6. Do not refactor unless explicitly requested.
7. Do not redesign anything unless explicitly requested.
8. Do not create new files unless necessary.
9. Do not change URLs unless explicitly requested.
10. Do not change SEO metadata unless explicitly requested.
11. Do not change canonical URLs unless explicitly requested.
12. Preserve structured data.
13. Preserve existing responsive behavior.
14. Preserve existing animations.
15. Preserve existing content unless explicitly requested.
16. Preserve existing image references and alt text.
17. Do not rename CSS classes unless necessary.
18. Do not perform broad cleanup during a small change.
19. Do not forget the five pSEO landing pages when a change touches shared
    header/footer/CTA/WhatsApp markup — they currently duplicate that markup
    inline and are not part of the components/ system unless explicitly migrated.

## File Selection Rules

**Before the migration (current state):**

| Change type | Inspect only |
|---|---|
| Small visual change on one page | that page's `.html` + `css/style.css` (relevant selectors) |
| Navbar/header change | every page's header block (not yet shared) — confirm with user which pages to touch |
| Footer change | every page's footer block (not yet shared) |
| FAQ content/visual/interaction | `faq.html` + `css/style.css` + `js/main.js` |
| Portfolio content/visual | `portfolio.html` + `css/style.css` |
| Services content/visual | `services.html` + `css/style.css` |
| Homepage change | `index.html` + `css/style.css` |
| pSEO landing page change | that page's own `index.html` only, unless the change should propagate to all five |

**After the migration (target state):**

| Change type | Inspect only |
|---|---|
| Small visual change | the relevant page + relevant CSS file |
| Navbar change | `components/header.php`, `css/components.css` if needed |
| Footer change | `components/footer.php`, `css/components.css` if needed |
| FAQ content change | `faq.php`, `data/faq.json` |
| FAQ visual change | `faq.php`, `css/pages/faq.css` |
| FAQ interaction change | `faq.php`, `js/faq.js` |
| Portfolio content change | `portfolio.php`, `data/portfolio.json` |
| Portfolio visual change | `portfolio.php`, `css/pages/portfolio.css` |
| Services content change | `services.php`, `data/services.json` |
| Services visual change | `services.php`, `css/pages/services.css` |
| Homepage change | `index.php`, `css/pages/home.css` |

Do not inspect other pages unless there is an actual dependency.

## Before Editing

Identify the minimum files required for the requested change. Do not explore
unrelated files.

## After Editing

Verify only the changed functionality. Do not run unnecessary tests, builds,
repository scans, or broad validation for a small change.

## Git

Keep commits focused. One commit per logical change. Do not include unrelated
formatting changes.
