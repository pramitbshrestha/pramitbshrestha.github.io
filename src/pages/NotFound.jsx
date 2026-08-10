import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import ContactButtons from '../components/ContactButtons';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" pathname="/404" noindex />
      <section className="py-24">
        <PageContainer className="text-center max-w-xl">
          <p className="text-accent font-extrabold text-6xl mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-4">
            Page Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The page you're looking for doesn't exist or may have moved. Try one of the
            links below, or message us directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/products" className="btn btn-outline">
              Browse Products
            </Link>
          </div>
          <div className="flex justify-center">
            <ContactButtons show={['whatsapp', 'viber']} />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
