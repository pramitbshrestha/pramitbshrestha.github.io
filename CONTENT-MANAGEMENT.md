# Content Management Guide

All editable business content lives in `src/data/*.json`. You do not need to touch any
React component (`.jsx` file) to update products, blog posts, FAQs, offers, gallery
images, or contact details.

After any content change, always run:

```bash
npm run validate-content
```

This checks your JSON for mistakes (duplicate IDs, broken category references, invalid
dates, etc.) before you commit or deploy. `npm run build` runs this automatically and
**will refuse to build** if validation fails.

---

## Update Contact Information

Only edit:

```text
src/data/site.json
```

Never search through components to change the phone number, email, or address — every
page reads from this one file.

Fields you can safely edit:

- `contact.phoneDisplay` — the human-readable phone number shown on the site
- `contact.phoneDial` — same number, used for `tel:` links
- `contact.whatsappNumber` — digits only, no `+`, no spaces (e.g. `9779841594084`)
- `contact.viberNumber`
- `contact.email`
- `contact.address`
- `contact.googleMapsUrl` — a Google Maps **embed** URL (Maps → Share → Embed a map →
  copy the `src="..."` value). Leave blank if not yet available; the Contact page will
  show a "map not yet configured" placeholder instead of breaking.
- `openingHours` — replace the placeholder once hours are confirmed
- `social.facebook` / `instagram` / `tiktok` / `youtube` — leave blank to hide
- `website.domain` / `website.url` — set this to the real production domain before launch

---

## Add a Product

1. Open `src/data/products.json`.
2. Copy an existing product object (one `{ ... }` block).
3. Give it a new, unique `id` (e.g. `"prod-009"`) and a unique `slug` (URL-friendly,
   lowercase, hyphenated — e.g. `"kids-mini-backpack"`).
4. Set `categoryId` to an existing category `id` from `src/data/categories.json`.
5. Add the product image(s) to `public/assets/products/` and reference them in
   `images: []` with a path starting `/assets/products/...`.
6. Fill in `name`, `shortDescription`, `description`, `features`, `colors`, `sizes`.
7. Set `availability` to one of: `"available"`, `"made-to-order"`, `"out-of-stock"`.
8. Set `featured: true` if it should appear on the homepage.
9. Run `npm run validate-content`.
10. Preview locally with `npm run dev`.
11. Commit and deploy.

Do not add a `price` field unless the business has explicitly decided to display prices
— the default product call-to-action is a WhatsApp/Viber inquiry, not a price tag.

## Add a Blog Post

1. Open `src/data/blogs.json`.
2. Add a new object with a unique `id` and unique `slug`.
3. Fill in `title`, `excerpt`, `date` (format: `YYYY-MM-DD`), `category`.
4. Add an image to `public/assets/blog/` and reference it in `image`.
5. Write the article body as an array of structured blocks in `content`:
   - `{ "type": "paragraph", "text": "..." }`
   - `{ "type": "heading", "level": 2, "text": "..." }`
   - `{ "type": "list", "items": ["...", "..."] }`
6. Fill in `seo.title` and `seo.description`.
7. Set `published: true` when ready to go live (or `false` to keep it as a draft).
8. Run `npm run validate-content`.
9. Deploy.

**Never** paste raw HTML into `content` — only use the structured block types above.
This keeps the site safe from injected scripts in blog content.

## Add/Update an FAQ

Edit `src/data/faq.json`. Each entry needs a unique `id`, a `question`, and an `answer`.
Use `sortOrder` to control display order and `active: false` to hide an entry without
deleting it.

## Add/Update an Offer

Edit `src/data/offers.json`. Offers only display on the site when **all** of the
following are true:

- `active: true`
- Today's date is on or after `startDate` (if set)
- Today's date is on or before `endDate` (if set)

If there are no active offers, the Offers page and homepage automatically show a
"no active offers — message us" state instead of an empty section — you don't need to
do anything special to hide an expired offer.

## Add/Update Gallery Images

Edit `src/data/gallery.json`. Add the image file to `public/assets/gallery/`, then add
an entry with a unique `id`, the `image` path, and **meaningful `alt` text** describing
the photo (required for accessibility and SEO).

## Replace the Sample/Placeholder Content

Everything currently in `products.json`, `blogs.json`, and `gallery.json` is prefixed
`[SAMPLE]` and uses placeholder illustrations, not real photos. Before launch:

1. Replace each `[SAMPLE]` product with real inventory, real photos, and real
   descriptions supplied by the business.
2. Replace or remove the sample blog posts.
3. Replace the placeholder gallery images with real store/product photos.
4. Remove the `[SAMPLE]` prefix from any titles once real content is in place.

## After Any Content Change

```bash
npm run validate-content   # check for errors
npm run dev                # preview locally
npm run build               # full production build (also validates + regenerates sitemap.xml)
```

Then commit and push — your hosting provider (Vercel/Netlify/Cloudflare Pages) will
redeploy automatically from the connected Git repository.
