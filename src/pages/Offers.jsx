import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactButtons from '../components/ContactButtons';
import offersData from '../data/offers.json';
import { breadcrumbSchema } from '../utils/seo';
import { withBase } from '../utils/assetPath';

function getActiveOffers() {
  const now = new Date();
  return offersData.filter((offer) => {
    if (!offer.active) return false;
    const start = offer.startDate ? new Date(offer.startDate) : null;
    const end = offer.endDate ? new Date(offer.endDate) : null;
    if (start && Number.isNaN(start.getTime())) return false;
    if (end && Number.isNaN(end.getTime())) return false;
    if (start && now < start) return false;
    if (end && now > end) return false;
    return true;
  });
}

export default function Offers() {
  const activeOffers = getActiveOffers();

  return (
    <>
      <SEO
        title="Offers"
        description="Current offers and promotions from Subechhya Bag पसल, Kathmandu."
        pathname="/offers"
        structuredData={breadcrumbSchema([{ label: 'Offers', path: '/offers' }])}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'Offers', path: '/offers' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8">
            Current Offers
          </h1>

          {activeOffers.length === 0 ? (
            <div className="card p-8 text-center max-w-xl mx-auto">
              <p className="text-slate-600 mb-6">
                There are no active offers right now. Message us on WhatsApp to ask about
                current deals or upcoming promotions.
              </p>
              <div className="flex justify-center">
                <ContactButtons show={['whatsapp', 'viber']} />
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeOffers.map((offer) => (
                <div key={offer.id} className="card overflow-hidden">
                  {offer.image && (
                    <div className="aspect-[16/9] bg-surface">
                      <img
                        src={withBase(offer.image)}
                        alt={offer.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h2 className="font-semibold text-primary mb-2">{offer.title}</h2>
                    <p className="text-sm text-slate-600 mb-4">{offer.description}</p>
                    <ContactButtons show={['whatsapp']} size="small" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </PageContainer>
      </section>
    </>
  );
}
