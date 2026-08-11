import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import ContactButtons from '../components/ContactButtons';
import products from '../data/products.json';
import categories from '../data/categories.json';
import { getProductInquiryMessage } from '../utils/contactLinks';
import { breadcrumbSchema } from '../utils/seo';
import { withBase } from '../utils/assetPath';

const availabilityLabels = {
  available: { text: 'Available', className: 'bg-green-100 text-green-700' },
  'made-to-order': { text: 'Made to Order', className: 'bg-amber-100 text-amber-700' },
  'out-of-stock': { text: 'Out of Stock', className: 'bg-slate-200 text-slate-600' }
};

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug && p.active);
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setActiveImage(0);
    setZoom(1);
  }, [slug]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const images = product.images?.filter(Boolean) || [];
  const availability = availabilityLabels[product.availability] || availabilityLabels.available;
  const inquiryMessage = getProductInquiryMessage(product.name);

  const related = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId && p.active)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    ...(category ? [{ label: category.name, path: `/categories/${category.slug}` }] : []),
    { label: product.name, path: `/products/${product.slug}` }
  ];

  const changeImage = (index) => {
    setActiveImage(index);
    setZoom(1);
  };

  const showPreviousImage = () => {
    changeImage((activeImage - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    changeImage((activeImage + 1) % images.length);
  };

  return (
    <>
      <SEO
        title={product.seo?.title || product.name}
        description={product.seo?.description || product.shortDescription}
        pathname={`/products/${product.slug}`}
        image={product.images?.[0]}
        structuredData={breadcrumbSchema(breadcrumbItems)}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={breadcrumbItems} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="card overflow-hidden aspect-square bg-surface mb-4 relative group">
              <img
                src={withBase(images[activeImage] || images[0])}
                alt={`${product.name} view ${activeImage + 1}`}
                className="w-full h-full object-contain p-8 transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoom})` }}
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-primary shadow-md transition hover:bg-white"
                    aria-label="Show previous product view"
                  >
                    <ChevronLeft size={20} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-primary shadow-md transition hover:bg-white"
                    aria-label="Show next product view"
                  >
                    <ChevronRight size={20} aria-hidden="true" />
                  </button>
                </>
              )}

              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/95 p-1 shadow-md">
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.max(1, current - 0.25))}
                  disabled={zoom === 1}
                  className="rounded-full p-2 text-primary transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Zoom out"
                >
                  <ZoomOut size={18} aria-hidden="true" />
                </button>
                <span className="min-w-12 text-center text-xs font-semibold text-primary" aria-live="polite">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((current) => Math.min(2.5, current + 0.25))}
                  disabled={zoom === 2.5}
                  className="rounded-full p-2 text-primary transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Zoom in"
                >
                  <ZoomIn size={18} aria-hidden="true" />
                </button>
                {zoom > 1 && (
                  <button
                    type="button"
                    onClick={() => setZoom(1)}
                    className="rounded-full p-2 text-primary transition hover:bg-surface"
                    aria-label="Reset image zoom"
                  >
                    <RotateCcw size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Product views">
                {images.map((img, index) => (
                  <button
                    key={img + index}
                    type="button"
                    onClick={() => changeImage(index)}
                    className={`h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-accent' : 'border-transparent'
                    }`}
                    aria-label={`Show image ${index + 1} of ${product.name}`}
                  >
                    <img
                      src={withBase(img)}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-contain bg-surface"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {category && (
              <Link
                to={`/categories/${category.slug}`}
                className="text-accent font-semibold text-sm uppercase tracking-wide"
              >
                {category.name}
              </Link>
            )}
            <h1 className="text-3xl font-extrabold text-primary mt-2 mb-3">{product.name}</h1>
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-4 ${availability.className}`}
            >
              {availability.text}
            </span>
            <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

            {product.features?.length > 0 && (
              <div className="mb-6">
                <h2 className="font-semibold text-primary mb-2">Features</h2>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.colors?.length > 0 && (
                <div>
                  <h2 className="font-semibold text-primary text-sm mb-1">Colors</h2>
                  <p className="text-sm text-slate-600">{product.colors.join(', ')}</p>
                </div>
              )}
              {product.sizes?.length > 0 && (
                <div>
                  <h2 className="font-semibold text-primary text-sm mb-1">Sizes</h2>
                  <p className="text-sm text-slate-600">{product.sizes.join(', ')}</p>
                </div>
              )}
            </div>

            <div className="card p-5 bg-surface">
              <p className="text-sm text-slate-600 mb-3">
                Interested in this product? Message us for availability and pricing.
              </p>
              <ContactButtons message={inquiryMessage} />
            </div>
          </div>
        </PageContainer>
      </section>

      {related.length > 0 && (
        <section className="pb-16">
          <PageContainer>
            <h2 className="text-2xl font-extrabold text-primary mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </PageContainer>
        </section>
      )}
    </>
  );
}
