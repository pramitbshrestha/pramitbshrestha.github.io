import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
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

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const category = categories.find((c) => c.id === product.categoryId);
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
            <div className="card overflow-hidden aspect-square bg-surface mb-4">
              <img
                src={withBase(product.images?.[activeImage])}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={img + index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 ${
                      activeImage === index ? 'border-accent' : 'border-transparent'
                    }`}
                    aria-label={`Show image ${index + 1} of ${product.name}`}
                  >
                    <img
                      src={withBase(img)}
                      alt=""
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
