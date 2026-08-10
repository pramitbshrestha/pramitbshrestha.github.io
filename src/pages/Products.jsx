import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';
import categories from '../data/categories.json';
import { breadcrumbSchema } from '../utils/seo';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'all';
  const [query, setQuery] = useState('');

  const activeCategories = categories.filter((c) => c.active);

  const filtered = useMemo(() => {
    return products
      .filter((p) => p.active)
      .filter((p) => categoryFilter === 'all' || p.categoryId === categoryFilter)
      .filter((p) =>
        query.trim()
          ? `${p.name} ${p.shortDescription}`.toLowerCase().includes(query.trim().toLowerCase())
          : true
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categoryFilter, query]);

  function handleCategoryChange(slugOrId) {
    if (slugOrId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slugOrId);
    }
    setSearchParams(searchParams);
  }

  return (
    <>
      <SEO
        title="Products"
        description="Browse suitcases, backpacks, school bags, office bags and more from Subechhya Bag पसल, Kathmandu."
        pathname="/products"
        structuredData={breadcrumbSchema([{ label: 'Products', path: '/products' }])}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'Products', path: '/products' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
            All Products
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
            <label className="relative block w-full md:w-72 shrink-0">
              <span className="sr-only">Search products</span>
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full h-11 pl-11 pr-11 rounded-full border-2 border-slate-200 bg-white text-base focus:border-accent outline-none shadow-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </label>

            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter by category"
            >
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`btn ${categoryFilter === 'all' ? 'btn-primary' : 'btn-outline'} text-sm px-4 py-2`}
                aria-pressed={categoryFilter === 'all'}
              >
                All
              </button>
              {activeCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`btn ${
                    categoryFilter === category.id ? 'btn-primary' : 'btn-outline'
                  } text-sm px-4 py-2`}
                  aria-pressed={categoryFilter === category.id}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-4" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-600 mb-2">No products match your search.</p>
              <p className="text-sm text-slate-400 mb-6">
                Try a different keyword or category, or message us directly — we may still
                have what you're looking for.
              </p>
              {(query || categoryFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    handleCategoryChange('all');
                  }}
                  className="btn btn-outline text-sm px-4 py-2"
                >
                  Clear search &amp; filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </PageContainer>
      </section>
    </>
  );
}
