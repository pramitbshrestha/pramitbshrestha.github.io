import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import FaqAccordion from '../components/FaqAccordion';
import ContactButtons from '../components/ContactButtons';
import faqData from '../data/faq.json';
import { breadcrumbSchema } from '../utils/seo';

export default function FAQ() {
  const items = faqData.filter((f) => f.active).sort((a, b) => a.sortOrder - b.sortOrder);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer }
    }))
  };

  return (
    <>
      <SEO
        title="FAQ"
        description="Frequently asked questions about Subechhya Bag पसल, Kathmandu."
        pathname="/faq"
        structuredData={[breadcrumbSchema([{ label: 'FAQ', path: '/faq' }]), faqSchema]}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'FAQ', path: '/faq' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8">
            Frequently Asked Questions
          </h1>
          <FaqAccordion items={items} />

          <div className="card p-6 mt-10 bg-surface text-center">
            <p className="text-slate-600 mb-4">Didn't find your answer?</p>
            <div className="flex justify-center">
              <ContactButtons />
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
