# Security

This is a static site with no database, no backend, no login, no cart, and no payment
processing. Risk is concentrated in the browser, supply chain, content, and hosting
layers — this document covers the controls in place for each.

## 1. No Secrets in the Frontend

- No API keys, tokens, credentials, or service-account data exist anywhere in this
  repository (source, JSON, or `public/`).
- Nothing in `src/` reads from `import.meta.env` for secret values — there are none to
  read. If a future integration requires a secret, it must be handled by a trusted
  serverless function, never shipped to the client.

## 2. Content Security Policy & Security Headers

Configured at the hosting layer (not achievable purely client-side):

- `vercel.json` — for Vercel deployments
- `netlify.toml` — for Netlify deployments
- `public/_headers` — for Cloudflare Pages (and Netlify as an alternate format)

Baseline policy (adjust only by widening deliberately, never with `*`):

```text
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'none';
form-action 'self';
img-src 'self' data: https:;
font-src 'self' https:;
style-src 'self' 'unsafe-inline';
script-src 'self';
connect-src 'self' https:;
frame-src 'self' https://www.google.com https://www.google.com/maps/;
```

- `script-src 'unsafe-eval'` is never used.
- `script-src 'unsafe-inline'` is never used.
- `frame-ancestors 'none'` is the authoritative clickjacking control; `X-Frame-Options:
  DENY` is set as a legacy fallback.
- HSTS (`Strict-Transport-Security`) should only be enabled after HTTPS is confirmed
  working across the final production domain — it already is in the configs above,
  confirm before going live.
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` — enable
  individual permissions only if a specific future feature genuinely needs them.

If analytics is added later, add only its specific required domains to `connect-src` /
`script-src` — do not broaden the policy speculatively.

## 3. XSS Protection

- `dangerouslySetInnerHTML` is **not used anywhere** in this codebase.
- Blog content is stored as structured JSON blocks (`paragraph` / `heading` / `list`)
  and rendered through `BlockRenderer` in `src/pages/BlogPost.jsx` using plain React
  elements — never raw HTML.
- If Markdown/HTML blog content is introduced later, it must be parsed and sanitized
  with a maintained sanitizer (e.g. DOMPurify) using a strict element/attribute
  allowlist, with scripts, event handlers and dangerous URL schemes stripped, and
  tested against known XSS payloads before merging.

## 4. External Link & URL Validation

- `src/utils/urlValidation.js` defines an explicit protocol allowlist:
  `https:`, `http:`, `mailto:`, `tel:`, `viber:`. Anything else (including
  `javascript:`, `data:`, `vbscript:`) is rejected.
- `src/utils/contactLinks.js` is the **single source** for WhatsApp, Viber, phone, and
  email links — numbers and addresses are read only from `site.json`, and any prefilled
  message text is passed through `encodeURIComponent`.
- The Contact page's Google Maps embed and the Footer's map link are both run through
  `isSafeUrl()` before rendering — an unset or unsafe `googleMapsUrl` renders a
  placeholder instead of an unvalidated `<iframe>`/link.
- All external links that open in a new tab use `rel="noopener noreferrer"`.

## 5. Content Validation (JSON Replaces a Database)

`scripts/validate-content.js` runs automatically as part of `npm run build` (via
`npm run validate-content`) and fails the build on:

- Invalid/malformed JSON in any `src/data/*.json` file
- Duplicate product or blog slugs/IDs
- A product referencing a non-existent `categoryId`
- An invalid `availability` value
- Missing required business contact fields in `site.json`
- An unsafe/invalid protocol in `googleMapsUrl` or any social URL
- Invalid dates in blog posts or offers
- Blog `content` blocks with types outside `paragraph` / `heading` / `list`

Run it independently at any time:

```bash
npm run validate-content
```

## 6. Dependency & Supply-Chain Security

Before every release:

```bash
npm audit
```

Recommended CI additions (see `README.md` for the intended pipeline):

- Run `npm audit` (or a dedicated dependency-scanning action) on every PR.
- Enable GitHub secret scanning and push protection on the repository.
- Protect the `main` branch: require PR review + passing CI before merge.
- Pin dependency versions and review `package-lock.json` diffs on upgrade.

## 7. PWA / Service Worker Rules

- Only public, static assets and safe public JSON content are cached
  (`vite-plugin-pwa`, configured in `vite.config.js`).
- Caches are versioned automatically by the plugin's build hash; obsolete caches are
  cleared on activation (`registerType: 'autoUpdate'`).
- No authenticated or sensitive data exists in this app, so nothing sensitive is ever
  cached.
- `public/offline.html` is served as the offline fallback and contains no user data.

## 8. Reporting

Security concerns about this codebase should be raised with the maintaining developer
before any public disclosure. There is no bug-bounty program at this time.
