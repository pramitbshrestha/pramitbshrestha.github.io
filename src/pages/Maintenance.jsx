import { Mail, MessageCircle, Phone, Wrench } from 'lucide-react';
import SEO from '../components/SEO';
import siteData from '../data/site.json';
import { getEmailLink, getPhoneLink, getWhatsAppLink } from '../utils/contactLinks';
import { withBase } from '../utils/assetPath';

export default function Maintenance() {
  const maintenance = siteData.maintenance || {};

  return (
    <main className="maintenance-page min-h-screen overflow-hidden bg-primary px-4 py-6 text-white sm:px-6 sm:py-10">
      <SEO
        title="We’ll be back soon"
        description="Subechhya Bag पसल is currently making improvements. Contact us by phone, WhatsApp, or email."
        noindex
      />

      <div className="maintenance-orb maintenance-orb-top" aria-hidden="true" />
      <div className="maintenance-orb maintenance-orb-bottom" aria-hidden="true" />

      <section className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center" aria-labelledby="maintenance-heading">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <div className="flex items-center gap-3">
              <img
                src={withBase(siteData.business.logo)}
                alt={`${siteData.business.name} logo`}
                className="h-12 w-12 rounded-xl bg-white object-contain p-1"
                width={48}
                height={48}
              />
              <span className="text-lg font-semibold tracking-tight">{siteData.business.name}</span>
            </div>

            <p className="mt-14 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-4 py-2 text-sm font-semibold text-orange-100">
              <Wrench size={16} aria-hidden="true" />
              Website under construction
            </p>
            <h1 id="maintenance-heading" className="mt-5 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
              {maintenance.heading || 'We’re making a few improvements'}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200">
              {maintenance.message || 'Our website is getting a little refresh. We’ll be back soon.'}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={getWhatsAppLink('Hello, I would like to ask about a bag.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
              <a href={getPhoneLink()} className="btn border border-white/35 bg-white/10 text-white hover:bg-white/20">
                <Phone size={18} aria-hidden="true" />
                {siteData.contact.phoneDisplay}
              </a>
            </div>

            <a
              href={getEmailLink('Website enquiry')}
              className="mt-7 inline-flex items-center gap-2 text-sm text-slate-200 underline decoration-white/40 underline-offset-4 hover:text-white"
            >
              <Mail size={16} aria-hidden="true" />
              {siteData.contact.email}
            </a>
          </div>

          <aside className="relative flex min-h-64 items-center justify-center overflow-hidden bg-accent p-8 lg:min-h-full" aria-hidden="true">
            <div className="maintenance-pattern" />
            <div className="relative grid h-44 w-44 place-items-center rounded-[2.5rem] border border-white/30 bg-white/20 shadow-xl sm:h-52 sm:w-52">
              <Wrench size={82} strokeWidth={1.25} />
            </div>
            <p className="absolute bottom-9 text-center text-sm font-medium text-orange-50">Thank you for your patience.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
