/**
 * Generates public/sitemap.xml from the JSON content files.
 * Run automatically before build via `npm run build`.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), 'utf-8'));
}

const site = readJson('src/data/site.json');
const products = readJson('src/data/products.json');
const categories = readJson('src/data/categories.json');
const blogs = readJson('src/data/blogs.json');

const domain = site.website.url.replace(/\/$/, '');

const staticRoutes = [
  '/',
  '/about',
  '/products',
  '/offers',
  '/gallery',
  '/blog',
  '/faq',
  '/contact',
  '/privacy-policy',
  '/terms'
];

const productRoutes = products.filter((p) => p.active).map((p) => `/products/${p.slug}`);
const categoryRoutes = categories.filter((c) => c.active).map((c) => `/categories/${c.slug}`);
const blogRoutes = blogs.filter((b) => b.published).map((b) => `/blog/${b.slug}`);

const allRoutes = [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${domain}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(path.join(root, 'public/sitemap.xml'), xml, 'utf-8');

console.log(`✔ sitemap.xml generated with ${allRoutes.length} URLs`);
