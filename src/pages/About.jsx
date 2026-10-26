import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import ContactButtons from '../components/ContactButtons';
import categories from '../data/categories.json';
import siteData from '../data/site.json';
import { breadcrumbSchema } from '../utils/seo';

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description={`Learn about ${siteData.business.name}, a bag and luggage shop in ${siteData.contact.address}.`}
        pathname="/about"
        structuredData={breadcrumbSchema([{ label: 'About', path: '/about' }])}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'About', path: '/about' }]} />
      </PageContainer>

      <section className="pb-14 md:pb-20">
        <PageContainer className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
              About {siteData.business.name}
            </h1>
            <p className="text-slate-600 leading-relaxed mb-4">
              {siteData.business.description} We're located in {siteData.contact.address},
              serving customers looking for reliable bags and luggage for travel, work,
              school and everyday life.
            </p>
            <ContactButtons />
          </div>
          <div className="card p-6 bg-surface">
            <h2 className="font-semibold text-primary mb-3">Our Local Presence</h2>
            <p className="text-sm text-slate-600 mb-2">
              <strong>Owner:</strong> {siteData.business.owner}
            </p>
            <p className="text-sm text-slate-600 mb-2">
              <strong>Address:</strong> {siteData.contact.address}
            </p>
            <p className="text-sm text-slate-600">
              <strong>Phone:</strong> {siteData.contact.phoneDisplay}
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="pb-14 md:pb-20">
        <PageContainer>
          <SectionHeading eyebrow="What we offer" title="Product Categories" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories
              .filter((c) => c.active)
              .map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
