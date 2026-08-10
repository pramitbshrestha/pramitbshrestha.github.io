import siteData from '../data/site.json';

/**
 * Centralized, security-conscious generators for outbound contact links.
 * Rules enforced here (see spec §10 "WhatsApp and Viber Security/UX"):
 *  - Destination numbers are read only from site.json.
 *  - All prefilled text is URL-encoded.
 *  - No uncontrolled/user-supplied input is concatenated unencoded.
 *  - Only approved protocols are ever produced (https:, tel:, mailto:, viber:).
 */

const { contact } = siteData;

/** Strips everything except leading + and digits, for tel:/wa.me use. */
function toDialFormat(raw) {
  if (!raw) return '';
  const trimmed = raw.trim();
  const plus = trimmed.startsWith('+') ? '+' : '';
  const digits = trimmed.replace(/[^\d]/g, '');
  return `${plus}${digits}`;
}

/**
 * Build a WhatsApp click-to-chat link.
 * @param {string} [message] optional prefilled message (will be encoded)
 */
export function getWhatsAppLink(message = '') {
  const number = (contact.whatsappNumber || '').replace(/[^\d]/g, '');
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a Viber contact link. Viber deep links behave inconsistently across
 * platforms, so callers should always provide a visible phone-number fallback
 * alongside this link (see ContactButtons component).
 */
export function getViberLink() {
  const number = toDialFormat(contact.viberNumber);
  return `viber://chat?number=${encodeURIComponent(number)}`;
}

export function getPhoneLink() {
  const number = toDialFormat(contact.phoneDial);
  return `tel:${number}`;
}

export function getEmailLink(subject = '', body = '') {
  const email = contact.email || '';
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length ? `?${params.join('&')}` : '';
  return `mailto:${email}${query}`;
}

/**
 * Build a standard, contextual product-inquiry WhatsApp message.
 * @param {string} productName
 */
export function getProductInquiryMessage(productName) {
  const safeName = String(productName || '').slice(0, 200);
  return `Hello ${siteData.business.name},\n\nI am interested in:\n${safeName}\n\nCould you please provide availability and price details?`;
}

export function getDisplayPhone() {
  return contact.phoneDisplay;
}

export function getDisplayAddress() {
  return contact.address;
}

export function getEmailAddress() {
  return contact.email;
}

export function getGoogleMapsUrl() {
  return contact.googleMapsUrl || '';
}
