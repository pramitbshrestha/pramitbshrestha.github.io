/**
 * Validates external/JSON-supplied URLs before they are ever placed into
 * href/src attributes. Only an explicit allowlist of protocols is permitted.
 * See spec §17.6 "External Links".
 */

const ALLOWED_PROTOCOLS = new Set([
  'https:',
  'http:',
  'mailto:',
  'tel:',
  'viber:'
]);

/**
 * Returns true only if the given string is a safe, allowed URL.
 * Relative paths (e.g. "/products/foo") are also considered safe.
 */
export function isSafeUrl(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();

  // Allow same-site relative paths (used for internal images/links).
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;

  try {
    const url = new URL(trimmed);
    return ALLOWED_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}

/**
 * Returns the URL if safe, otherwise a safe fallback ('#').
 */
export function safeHref(value, fallback = '#') {
  return isSafeUrl(value) ? value : fallback;
}
