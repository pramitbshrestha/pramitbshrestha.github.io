/**
 * Validates the JSON content layer before build.
 * Exits with a non-zero code (failing the build) if content is invalid.
 * See spec §8 "Content Validation".
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const errors = [];
const warnings = [];

function readJson(relativePath) {
  const fullPath = path.join(root, relativePath);
  try {
    const raw = readFileSync(fullPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    errors.push(`Invalid JSON in ${relativePath}: ${err.message}`);
    return null;
  }
}

const ALLOWED_PROTOCOLS = ['https:', 'http:', 'mailto:', 'tel:', 'viber:'];

function isSafeExternalUrl(value) {
  if (!value) return true; // empty is allowed (treated as "not set")
  try {
    const url = new URL(value);
    return ALLOWED_PROTOCOLS.includes(url.protocol);
  } catch {
    return false;
  }
}

// ---------- site.json ----------
const site = readJson('src/data/site.json');
if (site) {
  const requiredContactFields = ['phoneDisplay', 'phoneDial', 'whatsappNumbers', 'viberNumbers', 'email', 'address'];
  requiredContactFields.forEach((field) => {
    if (!site.contact?.[field]) {
      errors.push(`site.json: missing required contact field "${field}"`);
    }
  });
  if (site.contact?.googleMapsUrl && !isSafeExternalUrl(site.contact.googleMapsUrl)) {
    errors.push(`site.json: contact.googleMapsUrl has an unsafe/invalid protocol`);
  }
  ['whatsappGroupInviteUrl', 'viberGroupInviteUrl'].forEach((field) => {
    const value = site.contact?.[field];
    if (value && !/^https:\/\//i.test(value)) {
      errors.push(`site.json: contact.${field} must use HTTPS`);
    }
  });
  ['whatsappNumbers', 'viberNumbers'].forEach((field) => {
    const numbers = site.contact?.[field];
    if (!Array.isArray(numbers) || numbers.length < 2 || numbers.some((number) => !/^[+\d][\d\s-]*$/.test(number))) {
      errors.push(`site.json: contact.${field} must contain both valid contact numbers`);
    }
  });
  ['facebook', 'instagram', 'tiktok', 'youtube'].forEach((key) => {
    const value = site.social?.[key];
    if (value && !isSafeExternalUrl(value)) {
      errors.push(`site.json: social.${key} has an unsafe/invalid protocol`);
    }
  });
}

// ---------- categories.json ----------
const categories = readJson('src/data/categories.json') || [];
const categoryIds = new Set();
const categorySlugs = new Set();
categories.forEach((cat, index) => {
  const label = `categories.json[${index}] (${cat.id || 'no id'})`;
  if (!cat.id) errors.push(`${label}: missing id`);
  if (!cat.slug) errors.push(`${label}: missing slug`);
  if (!cat.name) errors.push(`${label}: missing name`);
  if (cat.id && categoryIds.has(cat.id)) errors.push(`${label}: duplicate id "${cat.id}"`);
  if (cat.slug && categorySlugs.has(cat.slug)) errors.push(`${label}: duplicate slug "${cat.slug}"`);
  categoryIds.add(cat.id);
  categorySlugs.add(cat.slug);
});

// ---------- products.json ----------
const products = readJson('src/data/products.json') || [];
const productIds = new Set();
const productSlugs = new Set();
const validAvailability = ['available', 'made-to-order', 'out-of-stock'];
products.forEach((product, index) => {
  const label = `products.json[${index}] (${product.id || 'no id'})`;
  if (!product.id) errors.push(`${label}: missing id`);
  if (!product.slug) errors.push(`${label}: missing slug`);
  if (!product.name) errors.push(`${label}: missing name`);
  if (product.id && productIds.has(product.id)) errors.push(`${label}: duplicate id "${product.id}"`);
  if (product.slug && productSlugs.has(product.slug))
    errors.push(`${label}: duplicate slug "${product.slug}"`);
  productIds.add(product.id);
  productSlugs.add(product.slug);

  if (product.categoryId && !categoryIds.has(product.categoryId)) {
    errors.push(`${label}: references missing categoryId "${product.categoryId}"`);
  }
  if (product.availability && !validAvailability.includes(product.availability)) {
    errors.push(
      `${label}: invalid availability "${product.availability}" (allowed: ${validAvailability.join(', ')})`
    );
  }
  if (!Array.isArray(product.images) || product.images.length === 0) {
    warnings.push(`${label}: has no images`);
  }
});

// ---------- blogs.json ----------
const blogs = readJson('src/data/blogs.json') || [];
const blogSlugs = new Set();
blogs.forEach((blog, index) => {
  const label = `blogs.json[${index}] (${blog.id || 'no id'})`;
  if (!blog.id) errors.push(`${label}: missing id`);
  if (!blog.slug) errors.push(`${label}: missing slug`);
  if (blog.slug && blogSlugs.has(blog.slug)) errors.push(`${label}: duplicate slug "${blog.slug}"`);
  blogSlugs.add(blog.slug);
  if (blog.date && Number.isNaN(new Date(blog.date).getTime())) {
    errors.push(`${label}: invalid date "${blog.date}"`);
  }
  if (!Array.isArray(blog.content)) {
    errors.push(`${label}: "content" must be an array of structured blocks`);
  } else {
    blog.content.forEach((block, blockIndex) => {
      if (!['paragraph', 'heading', 'list'].includes(block.type)) {
        errors.push(`${label}: content[${blockIndex}] has invalid type "${block.type}"`);
      }
    });
  }
});

// ---------- faq.json ----------
const faqs = readJson('src/data/faq.json') || [];
faqs.forEach((faq, index) => {
  const label = `faq.json[${index}] (${faq.id || 'no id'})`;
  if (!faq.question) errors.push(`${label}: missing question`);
  if (!faq.answer) errors.push(`${label}: missing answer`);
});

// ---------- offers.json ----------
const offers = readJson('src/data/offers.json') || [];
offers.forEach((offer, index) => {
  const label = `offers.json[${index}] (${offer.id || 'no id'})`;
  if (offer.startDate && Number.isNaN(new Date(offer.startDate).getTime())) {
    errors.push(`${label}: invalid startDate "${offer.startDate}"`);
  }
  if (offer.endDate && Number.isNaN(new Date(offer.endDate).getTime())) {
    errors.push(`${label}: invalid endDate "${offer.endDate}"`);
  }
});

// ---------- gallery.json ----------
const gallery = readJson('src/data/gallery.json') || [];
gallery.forEach((item, index) => {
  const label = `gallery.json[${index}] (${item.id || 'no id'})`;
  if (!item.image) errors.push(`${label}: missing image`);
  if (!item.alt) errors.push(`${label}: missing alt text`);
});

// ---------- Report ----------
if (warnings.length) {
  console.warn(`\n⚠ Content validation warnings (${warnings.length}):`);
  warnings.forEach((w) => console.warn(`  - ${w}`));
}

if (errors.length) {
  console.error(`\n✘ Content validation failed with ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  console.error('');
  process.exit(1);
}

console.log(`✔ Content validation passed (${products.length} products, ${blogs.length} blogs, ${categories.length} categories)`);
