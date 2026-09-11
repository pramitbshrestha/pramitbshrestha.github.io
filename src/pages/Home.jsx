import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Tag,
  Users
} from 'lucide-react';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import ContactButtons from '../components/ContactButtons';
import ContentCarousel from '../components/ContentCarousel';
import categories from '../data/categories.json';
import products from '../data/products.json';
import blogs from '../data/blogs.json';
import offers from '../data/offers.json';
import siteData from '../data/site.json';
import { localBusinessSchema, organizationSchema } from '../utils/seo';
import { withBase } from '../utils/assetPath';

const featuredCategories = categories.filter((category) => category.featured && category.active);
const featuredProducts = products.filter((product) => product.featured && product.active).slice(0, 8);
const latestBlogs = blogs.filter((blog) => blog.published).slice(0, 5);
const heroProduct = featuredProducts.find((product) => product.slug === 'large-travel-trolley-bag') || featuredProducts[0];

function activeOffers() {
  const now = new Date();
  return offers.filter((offer) => {
    if (!offer.active) return false;
    const start = offer.startDate ? new Date(offer.startDate) : null;
    const end = offer.endDate ? new Date(offer.endDate) : null;
    if (start && Number.isNaN(start.getTime())) return false;
    if (end && Number.isNaN(end.getTime())) return false;
    return !(start && now < start) && !(end && now > end);
  });
}

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: 'Built for the everyday',
    description: 'Reliable bags and luggage picked for the journeys you actually make.'
  },
  {
    icon: MapPin,
    title: 'Easy to find in Asan',
    description: 'Come by our Balkumari location and see your options in person.'
  },
  {
    icon: Tag,
    title: 'One store, more choice',
    description: 'Travel, work, school and everyday bags under one roof.'
  },
  {
    icon: Users,
    title: 'Real help, directly',
    description: 'Message us on WhatsApp or Viber for a fast stock check.'
  }
];

const storeSignals = [
  ['01', 'Travel-ready', 'Suitcases & trolley bags'],
  ['02', 'Daily carry', 'Work, laptop & backpacks'],
  ['03', 'Ready to help', 'Quick answers by message']
];

export default function Home() {
  const offersToShow = activeOffers();

  return (
    <>
      <SEO pathname="/" structuredData={[localBusinessSchema(), organizationSchema()]} />

      <section className="home-hero overflow-hidden bg-primary text-white">
        <PageContainer className="relative grid min-h-[600px] items-center gap-8 py-12 sm:py-14 lg:min-h-[640px] lg:grid-cols-[1.03fr_0.97fr] lg:py-16">
          <div className="home-hero-copy relative z-10 max-w-2xl">
            <p className="home-eyebrow">
              <span className="home-status-dot" aria-hidden="true" />
              Asan, Balkumari · Kathmandu
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Carry what moves <span className="text-accent">you.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
              {siteData.business.description} Explore the catalogue, then get a real answer
              from our team—no account or checkout required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn btn-primary home-primary-cta">
                Explore the collection <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <a href="#contact" className="btn home-hero-secondary">Visit or message us</a>
            </div>
            <dl className="home-hero-stats" aria-label="Store highlights">
              <div><dt>Collections</dt><dd>{featuredCategories.length}+</dd></div>
              <div><dt>Shopping style</dt><dd>Direct</dd></div>
              <div><dt>Location</dt><dd>Asan</dd></div>
            </dl>
          </div>

          <div className="home-hero-stage relative z-10 mx-auto w-full max-w-[540px]" aria-label={`Featured product: ${heroProduct.name}`}>
            <div className="home-stage-grid" aria-hidden="true" />
            <div className="home-stage-orbit home-stage-orbit-one" aria-hidden="true" />
            <div className="home-stage-orbit home-stage-orbit-two" aria-hidden="true" />
            <div className="home-featured-label"><Sparkles size={15} aria-hidden="true" /> Featured now</div>
            <Link to={`/products/${heroProduct.slug}`} className="home-product-vault">
              <span className="home-vault-index">01 / Selected</span>
              <div className="home-hero-product-frame">
                <img src={withBase(heroProduct.images?.[0])} alt={heroProduct.name} fetchPriority="high" className="home-hero-product" />
              </div>
              <div className="home-vault-meta"><span>{heroProduct.name}</span><ArrowUpRight size={17} aria-hidden="true" /></div>
            </Link>
            <div className="home-floating-note home-floating-note-top">
              <PackageCheck size={18} aria-hidden="true" />
              <span><strong>Stock check</strong>Message us directly</span>
            </div>
            <div className="home-floating-note home-floating-note-bottom">
              <BadgeCheck size={18} aria-hidden="true" />
              <span><strong>Made for movement</strong>Travel · work · everyday</span>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="home-signal-section">
        <PageContainer className="home-signal-grid">
          {storeSignals.map(([number, title, description]) => (
            <div key={number} className="home-signal-card">
              <span className="home-signal-number">{number}</span>
              <div><h2>{title}</h2><p>{description}</p></div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
          ))}
        </PageContainer>
      </section>

      <section className="home-section py-12 md:py-16">
        <PageContainer>
          <div className="home-section-top">
            <SectionHeading eyebrow="Browse by purpose" title="Find your next carry." description="Start with how you move through the day, then find the bag that keeps up." />
            <Link to="/products" className="home-text-link">See all categories <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <ContentCarousel label="bag categories" className="home-category-grid">
            {featuredCategories.map((category) => <CategoryCard key={category.id} category={category} />)}
          </ContentCarousel>
        </PageContainer>
      </section>

      <section className="home-product-section py-12 md:py-16">
        <PageContainer>
          <div className="home-products-heading">
            <div>
              <p className="home-eyebrow home-eyebrow-dark"><span className="home-status-dot" aria-hidden="true" /> Curated selection</p>
              <h2>Popular picks,<br /><span>ready for the road.</span></h2>
            </div>
            <p>A quick look at bags our customers reach for most. Message us to confirm live availability.</p>
          </div>
          <div className="home-products-panel">
            <ContentCarousel label="popular products" tone="dark">
              {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </ContentCarousel>
            <Link to="/products" className="home-products-footer"><span>Explore every product</span><ArrowUpRight size={22} aria-hidden="true" /></Link>
          </div>
        </PageContainer>
      </section>

      <section className="home-section py-12 md:py-16">
        <PageContainer>
          <SectionHeading eyebrow="The Subechhya difference" title="Simple shopping. Solid choices." align="center" />
          <div className="home-value-grid mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="home-value-card">
                <span className="home-value-index">0{index + 1}</span>
                <div className="home-value-icon"><Icon size={23} aria-hidden="true" /></div>
                <h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      {offersToShow.length > 0 && (
        <section className="bg-accent-light py-12 md:py-16">
          <PageContainer>
            <SectionHeading eyebrow="Limited time" title="Current offers" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {offersToShow.map((offer) => (
                <article key={offer.id} className="home-offer-card">
                  <span>Available now</span><h3>{offer.title}</h3><p>{offer.description}</p>
                  <ContactButtons show={['whatsapp']} size="small" />
                </article>
              ))}
            </div>
          </PageContainer>
        </section>
      )}

      <section id="contact" className="home-contact-section py-12 md:py-16">
        <PageContainer className="grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="home-contact-copy">
            <p className="home-eyebrow"><MessageCircle size={16} aria-hidden="true" /> No checkout maze</p>
            <h2>See it. Ask about it.<br />Take it with you.</h2>
            <p>Visit us in Kathmandu or message the store with the bag you have in mind. We will help you check details before you make the trip.</p>
            <ContactButtons />
          </div>
          <aside className="home-contact-details">
            <div className="home-location-mark"><MapPin size={24} aria-hidden="true" /></div>
            <p className="home-contact-label">Find the store</p>
            <h3>{siteData.contact.address}</h3>
            <div className="home-contact-rule" />
            <a href={`tel:${siteData.contact.phoneDial}`} className="home-contact-detail">{siteData.contact.phoneDisplay}</a>
            <a href={`mailto:${siteData.contact.email}`} className="home-contact-detail">{siteData.contact.email}</a>
            <Link to="/about" className="home-text-link">More about our shop <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </aside>
        </PageContainer>
      </section>

      {latestBlogs.length > 0 && (
        <section className="home-section bg-surface py-12 md:py-16">
          <PageContainer>
            <div className="home-section-top">
              <SectionHeading eyebrow="Pack smarter" title="Travel notes & guides" />
              <Link to="/blog" className="home-text-link">Read all guides <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <ContentCarousel label="travel guides" fitContent>
              {latestBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
            </ContentCarousel>
          </PageContainer>
        </section>
      )}
    </>
  );
}
