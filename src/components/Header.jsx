import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import navigation from '../data/navigation.json';
import siteData from '../data/site.json';
import { getWhatsAppLink } from '../utils/contactLinks';
import { withBase } from '../utils/assetPath';

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'text-accent' : 'text-primary hover:text-accent'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="container-page flex items-center justify-between py-3">
        <NavLink
          to="/"
          className="flex items-center gap-2"
          aria-label={`${siteData.business.name} home`}
        >
          <img
            src={withBase(siteData.business.logo)}
            alt={`${siteData.business.name} logo`}
            className="h-12 w-auto"
            width={48}
            height={48}
          />
          <span className="sr-only">{siteData.business.name}</span>
        </NavLink>
        <button
          ref={toggleRef}
          type="button"
          className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-md text-primary"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      <nav className="hidden md:block border-t border-slate-100" aria-label="Primary">
        <div className="container-page flex items-center justify-between py-2">
          <ul className="flex items-center gap-1">
            {navigation.header.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={linkClass} end={item.path === '/'}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp text-sm px-4 py-2"
          >
            <MessageCircle size={16} aria-hidden="true" />
            WhatsApp Us
          </a>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? 'max-h-[28rem]' : 'max-h-0'
        }`}
      >
        <ul className="container-page py-3 flex flex-col gap-1 border-t border-slate-100">
          {navigation.header.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={linkClass}
                end={item.path === '/'}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
