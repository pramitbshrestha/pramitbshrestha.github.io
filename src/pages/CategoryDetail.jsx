import { useParams, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import categories from '../data/categories.json';
import products from '../data/products.json';
import { breadcrumbSchema } from '../utils/seo';

export default function CategoryDetail() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug && c.active);

  if (!category) {
    return <Navigate to="/products" replace />;
  }

  const categoryProducts = products
    .filter((p) => p.categoryId === category.id && p.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: category.name, path: `/categories/${category.slug}` }
  ];

  return (
    <>
      <SEO
        title={category.name}
        description={category.description || `Browse ${category.name} from Subechhya Bag पसल.`}
        pathname={`/categories/${category.slug}`}
        image={category.image}
        structuredData={breadcrumbSchema(breadcrumbItems)}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={breadcrumbItems} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-slate-600 max-w-2xl mb-8">{category.description}</p>
          )}

          {categoryProducts.length === 0 ? (
            <p className="text-slate-600">
              No products listed in this category yet. Message us — we may still have
              relevant stock.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </PageContainer>
      </section>
    </>
  );
}
