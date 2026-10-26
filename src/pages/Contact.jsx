import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactButtons from '../components/ContactButtons';
import siteData from '../data/site.json';
import { getGoogleMapsUrl } from '../utils/contactLinks';
import { isSafeUrl } from '../utils/urlValidation';
import { breadcrumbSchema, localBusinessSchema } from '../utils/seo';

export default function Contact() {
  const mapsUrl = getGoogleMapsUrl();
  const hasMap = isSafeUrl(mapsUrl) && Boolean(mapsUrl);

  return (
    <>
      <SEO
        title="Contact Us"
        description={`Contact ${siteData.business.name} - ${siteData.contact.address}. Reach us on WhatsApp, Viber, phone or email.`}
        pathname="/contact"
        structuredData={[
          breadcrumbSchema([{ label: 'Contact', path: '/contact' }]),
          localBusinessSchema()
        ]}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'Contact', path: '/contact' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer className="grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
              Get in Touch
            </h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We don't run an online checkout - the fastest way to check availability or
              pricing is to message us directly on WhatsApp or Viber.
            </p>

            <dl className="space-y-4 mb-8 text-sm">
              <div>
                <dt className="font-semibold text-primary">Address</dt>
                <dd className="text-slate-600">{siteData.contact.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Phone</dt>
                <dd className="text-slate-600">{siteData.contact.phoneDisplay}</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Email</dt>
                <dd className="text-slate-600">{siteData.contact.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Opening Hours</dt>
                <dd className="text-slate-600">
                  {siteData.openingHours.status === 'PLACEHOLDER_NOT_SUPPLIED'
                    ? siteData.openingHours.note
                    : siteData.openingHours.status}
                </dd>
              </div>
            </dl>

            <ContactButtons />
          </div>

          <div>
            {hasMap ? (
              <div className="card overflow-hidden aspect-[4/3]">
                <iframe
                  title="Subechhya Bag पसल location"
                  src={mapsUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="card p-8 bg-surface text-center">
                <p className="text-slate-600 mb-2 font-medium">Map not yet configured</p>
                <p className="text-sm text-slate-500">
                  A Google Maps embed URL has not been supplied for this location. Add it to{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded">
                    contact.googleMapsUrl
                  </code>{' '}
                  in <code className="bg-white px-1.5 py-0.5 rounded">site.json</code> to
                  enable the map here.
                </p>
              </div>
            )}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
