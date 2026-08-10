/**
 * Resolves a public asset path against Vite's configured base path.
 *
 * Content data stores assets as root-relative paths (for example,
 * `/assets/logo.png`). Vite may serve the app from a subdirectory, so those
 * paths need the generated base URL prepended at runtime.
 */
export function withBase(path) {
  if (!path || typeof path !== 'string') return path;

  // Do not rewrite URLs that are already absolute or handled by the browser.
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}
