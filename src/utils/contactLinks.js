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
 * iPads can report themselves as Macs when requesting desktop sites, so include
 * the touch-point check in addition to the normal iPhone/iPad user-agent test.
 */
function isAppleMobileDevice() {
  if (typeof navigator === 'undefined') return false;

  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

/**
 * Build a Viber contact link.
 *
 * `viber://chat` opens a number directly on Android, but iOS does not handle
 * that action reliably. Its supported contact action is `viber://add`, which
 * opens the business contact in Viber so the customer can start a chat.
 * Callers should still provide a visible phone-number fallback alongside this
 * link (see ContactButtons component).
 */
export function getViberLink() {
  const number = toDialFormat(contact.viberNumber);

  if (isAppleMobileDevice()) {
    return `viber://add?number=${encodeURIComponent(number)}`;
  }

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
