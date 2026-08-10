import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import navigation from '../data/navigation.json';
import siteData from '../data/site.json';
import {
  getPhoneLink,
  getEmailLink,
  getDisplayPhone,
  getDisplayAddress,
  getEmailAddress,
  getGoogleMapsUrl
} from '../utils/contactLinks';
import { isSafeUrl } from '../utils/urlValidation';
import { withBase } from '../utils/assetPath';

export default function Footer() {
  const year = new Date().getFullYear();
  const mapsUrl = getGoogleMapsUrl();

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="container-page py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <img
            src={withBase(siteData.business.logo)}
            alt={`${siteData.business.name} logo`}
            className="h-14 w-auto bg-white rounded-md p-1 mb-4"
          />
          <p className="text-slate-300 text-sm leading-relaxed">
            {siteData.business.description}
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {navigation.footerQuickLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Support</h2>
          <ul className="space-y-2 text-sm text-slate-300">
            {navigation.footerSupportLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-4">Visit / Contact</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              {isSafeUrl(mapsUrl) && mapsUrl ? (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {getDisplayAddress()}
                </a>
              ) : (
                <span>{getDisplayAddress()}</span>
              )}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="shrink-0" aria-hidden="true" />
              <a href={getPhoneLink()} className="hover:text-accent">
                {getDisplayPhone()}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="shrink-0" aria-hidden="true" />
              <a href={getEmailLink()} className="hover:text-accent break-all">
                {getEmailAddress()}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            © {year} {siteData.business.name}. All rights reserved.
          </p>
          <p>Owner: {siteData.business.owner}</p>
        </div>
      </div>
    </footer>
  );
}
