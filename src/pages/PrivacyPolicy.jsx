import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import siteData from '../data/site.json';
import { breadcrumbSchema } from '../utils/seo';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`Privacy policy for ${siteData.business.name}.`}
        pathname="/privacy-policy"
        structuredData={breadcrumbSchema([{ label: 'Privacy Policy', path: '/privacy-policy' }])}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy', path: '/privacy-policy' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer className="max-w-3xl prose-content">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 mb-8">
            [PLACEHOLDER - draft, not yet legally reviewed]
          </p>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              This is placeholder privacy-policy content for {siteData.business.name}. It has
              not been reviewed by a lawyer and should be replaced with policy language
              approved by the business before the site goes live.
            </p>

            <div>
              <h2 className="font-semibold text-primary mb-2">Information We Collect</h2>
              <p>
                This website does not use accounts, logins, a shopping cart, or online
                payments. It does not use a server-side database. Any information you choose
                to share - for example, by messaging us on WhatsApp, Viber, phone or email -
                is handled through those respective services, according to their own privacy
                practices.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-primary mb-2">Cookies &amp; Analytics</h2>
              <p>
                [PLACEHOLDER] This section should describe any analytics or cookies actually
                in use once configured. If no analytics tools are added, this section should
                state that clearly instead.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-primary mb-2">Third-Party Services</h2>
              <p>
                Contact links on this site open WhatsApp, Viber, your phone dialer or your
                email client. Interactions on those platforms are governed by their own
                privacy policies.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-primary mb-2">Contact</h2>
              <p>
                Questions about this policy can be sent to{' '}
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
