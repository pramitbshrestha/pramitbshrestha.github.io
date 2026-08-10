# Subechhya Bag पसल — Website

A fast, JSON-driven React + Vite website for Subechhya Bag पसल, a bags and luggage shop
in Asan, Balkumari, Kathmandu. Built as a static, no-database, no-backend, no-checkout
product catalogue and lead-generation site — customers reach the business directly via
WhatsApp, Viber, phone or email.

## Tech Stack

- React 18 + Vite
- React Router (client-side routing)
- Tailwind CSS
- lucide-react (icons)
- react-helmet-async (per-page SEO)
- vite-plugin-pwa (installable PWA + offline fallback)

## Getting Started

```bash
npm install
npm run dev
```

Open the printed local URL in your browser.

## Available Scripts

| Command                  | Purpose                                                        |
|---------------------------|------------------------------------------------------------------|
| `npm run dev`              | Start the local dev server                                      |
| `npm run build`            | Validate content, generate sitemap.xml, then build for production |
| `npm run preview`          | Preview the production build locally                            |
| `npm run lint`              | Run ESLint                                                       |
| `npm run format`           | Run Prettier                                                     |
| `npm run validate-content` | Validate all `src/data/*.json` files independently               |
| `npm run generate-sitemap` | Regenerate `public/sitemap.xml` from current JSON content        |

The production build **fails** if content validation fails — see `SECURITY.md` and
`CONTENT-MANAGEMENT.md`.

## Project Structure

```text
src/
├── data/            All editable business content (JSON) — see CONTENT-MANAGEMENT.md
├── utils/           contactLinks.js, urlValidation.js, seo.js
├── components/      Reusable UI (Header, Footer, cards, SEO, etc.)
├── pages/           One file per route
├── App.jsx          Route definitions
└── main.jsx         App entry point
scripts/
├── validate-content.js  Content validation (runs before every build)
└── generate-sitemap.js  Sitemap generation (runs before every build)
public/
├── assets/          Logo + placeholder product/category/gallery/blog images
├── robots.txt
├── sitemap.xml       (generated — committed baseline included)
├── offline.html       PWA offline fallback
└── _headers           Security headers for Cloudflare Pages / Netlify
```

## Editing Business Content

**Do not** search through components to change contact details, products, blog posts,
FAQs, offers or gallery images. Everything lives in `src/data/*.json`. See
`CONTENT-MANAGEMENT.md` for step-by-step instructions.

## Current Placeholders — Action Required Before Launch

The following were **not supplied** and must be filled in before going live
(see `src/data/site.json` and `CONTENT-MANAGEMENT.md`):

- `website.domain` / `website.url` — final domain
- `contact.googleMapsUrl` — Google Maps embed URL
- `openingHours` — confirmed opening hours
- `social.*` — social media URLs (left blank; footer links are hidden until filled)
- All `[SAMPLE]`-prefixed products, blog posts, and gallery images — these are
  placeholder/demo content only and must be replaced with the business's real products,
  photos and copy before launch.

## Deployment

The project deploys as a static site to Vercel, Netlify, or Cloudflare Pages.

```text
GitHub → Vercel / Netlify / Cloudflare Pages → Custom Domain → HTTPS
```

- `vercel.json` — SPA rewrites + security headers for Vercel.
- `netlify.toml` — build command, SPA redirects + security headers for Netlify.
- `public/_headers` — security headers for Cloudflare Pages (and Netlify, as a fallback).

Build command: `npm run build`. Output directory: `dist`.

**Do not deploy if `npm run build` fails** — this means content validation, linting, or
the build itself failed. See `SECURITY.md` for the full security checklist.

### Deploying to GitHub Pages

A ready-to-use workflow lives at `.github/workflows/deploy.yml`. It builds and deploys
automatically on every push to `main` — no manual `gh-pages` commands needed. It
auto-detects whether you're using a custom domain (`public/CNAME` present), a
`username.github.io` root repo, or an ordinary project repo, and sets the correct base
path either way. See the step-by-step guide for enabling Pages in repo settings.

## Accessibility & SEO

- Semantic HTML, one `<h1>` per page, visible focus states, skip-to-content link.
- Keyboard-accessible mobile menu, FAQ accordion, and gallery lightbox.
- Per-page title/description/canonical/Open Graph/Twitter meta via `SEO.jsx`.
- LocalBusiness, Organization, BreadcrumbList, Article and FAQPage structured data.
- `sitemap.xml` and `robots.txt` generated/included.

## License / Ownership

All source code and content in this repository belongs to Subechhya Bag पसल
(Owner: Sanat Kumar Pradhan).

