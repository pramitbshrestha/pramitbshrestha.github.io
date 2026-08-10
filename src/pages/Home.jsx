import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Tag, Users } from 'lucide-react';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import ContactButtons from '../components/ContactButtons';
import categories from '../data/categories.json';
import products from '../data/products.json';
import blogs from '../data/blogs.json';
import offers from '../data/offers.json';
import siteData from '../data/site.json';
import { localBusinessSchema, organizationSchema } from '../utils/seo';
import { withBase } from '../utils/assetPath';

const featuredCategories = categories.filter((c) => c.featured && c.active);
const featuredProducts = products.filter((p) => p.featured && p.active).slice(0, 8);
const latestBlogs = blogs.filter((b) => b.published).slice(0, 3);

function activeOffers() {
  const now = new Date();
  return offers.filter((offer) => {
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

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: 'Durable, Reliable Bags',
    description: 'A wide range of bags and luggage selected for everyday reliability.'
  },
  {
    icon: MapPin,
    title: 'Easy to Find in Asan',
    description: 'Conveniently located in Asan, Balkumari, Kathmandu.'
  },
  {
    icon: Tag,
    title: 'Wide Product Range',
    description: 'Suitcases, backpacks, school bags, office bags and more, under one roof.'
  },
  {
    icon: Users,
    title: 'Direct, Personal Service',
    description: 'Message us directly on WhatsApp or Viber for quick answers.'
  }
];

export default function Home() {
  const offersToShow = activeOffers();

  return (
    <>
      <SEO
        pathname="/"
        structuredData={[localBusinessSchema(), organizationSchema()]}
      />

      {/* Hero */}
      <section className="bg-primary text-white">
        <PageContainer className="py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-accent font-semibold uppercase tracking-wide text-sm mb-3">
              {siteData.contact.address}
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              {siteData.business.tagline}
            </h1>
            <p className="text-slate-200 text-lg mb-8 max-w-xl">
              {siteData.business.description} Browse our catalogue and reach out directly —
              no accounts, no checkout, just a quick message.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary">
                Explore Products
              </Link>
              <ContactButtons show={['whatsapp', 'viber']} />
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={withBase(siteData.business.logo)}
              alt={`${siteData.business.name} logo`}
              className="w-64 md:w-80 bg-white rounded-3xl p-6 shadow-card-hover"
            />
          </div>
        </PageContainer>
      </section>

      {/* Featured categories */}
      <section className="py-14 md:py-20">
        <PageContainer>
          <SectionHeading
            eyebrow="Shop by category"
            title="Find the Right Bag for Every Need"
            description="From daily commutes to long journeys, browse our most popular categories."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Featured products */}
      <section className="py-14 md:py-20 bg-surface">
        <PageContainer>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <SectionHeading
              eyebrow="Popular picks"
              title="Featured Products"
              description="A look at some of what we carry. Message us to confirm current stock."
            />
            <Link to="/products" className="btn btn-outline mb-8">
              View All Products
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Why choose us */}
      <section className="py-14 md:py-20">
        <PageContainer>
          <SectionHeading
            eyebrow="Why Subechhya Bag पसल"
            title="Why Shoppers Choose Us"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-6 text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-accent-light text-accent flex items-center justify-center mb-4">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{title}</h3>
                <p className="text-sm text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Offers — only rendered when there is real active content */}
      {offersToShow.length > 0 && (
        <section className="py-14 md:py-20 bg-accent-light">
          <PageContainer>
            <SectionHeading eyebrow="Limited time" title="Current Offers" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {offersToShow.map((offer) => (
                <div key={offer.id} className="card p-6">
                  <h3 className="font-semibold text-primary mb-2">{offer.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{offer.description}</p>
                  <ContactButtons show={['whatsapp']} size="small" />
                </div>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* About summary */}
      <section className="py-14 md:py-20">
        <PageContainer className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading eyebrow="About us" title={`About ${siteData.business.name}`} />
            <p className="text-slate-600 mb-6 leading-relaxed">
              {siteData.business.description} We're based in {siteData.contact.address}, and
              we're happy to help you find the right bag for travel, work, school or
              everyday life.
            </p>
            <Link to="/about" className="btn btn-outline">
              Learn More About Us
            </Link>
          </div>
          <div className="card p-8 bg-surface">
            <h3 className="font-semibold text-primary mb-4">Visit or Message Us</h3>
            <ul className="text-sm text-slate-600 space-y-2 mb-6">
              <li>{siteData.contact.address}</li>
              <li>{siteData.contact.phoneDisplay}</li>
              <li>{siteData.contact.email}</li>
            </ul>
            <ContactButtons />
          </div>
        </PageContainer>
      </section>

      {/* Blog highlights */}
      {latestBlogs.length > 0 && (
        <section className="py-14 md:py-20 bg-surface">
          <PageContainer>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <SectionHeading eyebrow="From our blog" title="Travel Tips & Guides" />
              <Link to="/blog" className="btn btn-outline mb-8">
                View All Articles
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-14 md:py-20 bg-primary text-white">
        <PageContainer className="text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Have a Question About a Product?
          </h2>
          <p className="text-slate-200 mb-8">
            Send us a message on WhatsApp or Viber and we'll get back to you directly.
          </p>
          <div className="flex justify-center">
            <ContactButtons />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
