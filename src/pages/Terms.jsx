import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import siteData from '../data/site.json';
import { breadcrumbSchema } from '../utils/seo';

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description={`Terms of service for ${siteData.business.name}.`}
        pathname="/terms"
        structuredData={breadcrumbSchema([{ label: 'Terms of Service', path: '/terms' }])}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'Terms of Service', path: '/terms' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            [PLACEHOLDER - draft, not yet legally reviewed]
          </p>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              This is placeholder terms-of-service content for {siteData.business.name}. It
              has not been reviewed by a lawyer and should be replaced with terms approved by
              the business before the site goes live.
            </p>

            <div>
              <h2 className="font-semibold text-primary mb-2">Use of This Website</h2>
              <p>
                This website is an informational product catalogue. It does not process
                orders, payments, or accounts. Product availability, pricing and terms of
                sale are confirmed directly with the business via WhatsApp, Viber, phone or
                in person.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-primary mb-2">Product Information</h2>
              <p>
                Product descriptions, images and availability shown on this site are for
                general reference. Please confirm current stock, pricing and specifications
                with the business before making a purchase decision.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-primary mb-2">Contact</h2>
              <p>
                Questions about these terms can be sent to{' '}
                <a href={`mailto:${siteData.contact.email}`} className="text-accent underline">
                  {siteData.contact.email}
                </a>
                .
              </p>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
