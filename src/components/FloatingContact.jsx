import { MessageCircle, Phone } from 'lucide-react';
import { getWhatsAppLink, getViberLink, getPhoneLink } from '../utils/contactLinks';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-card-hover hover:scale-105 transition-transform"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={26} aria-hidden="true" />
      </a>
      <a
        href={getViberLink()}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#7360F2] text-white shadow-card-hover hover:scale-105 transition-transform"
        aria-label="Contact us on Viber"
        title="If Viber doesn't open, use the Call button on our Contact page"
      >
        <Phone size={24} aria-hidden="true" />
      </a>
      <a
        href={getPhoneLink()}
        className="sr-only focus:not-sr-only focus:flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-card-hover"
        aria-label="Call us"
      >
        <Phone size={24} aria-hidden="true" />
      </a>
    </div>
  );
}
