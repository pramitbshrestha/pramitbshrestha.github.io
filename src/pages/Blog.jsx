import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';
import blogsData from '../data/blogs.json';
import { breadcrumbSchema } from '../utils/seo';

const POSTS_PER_PAGE = 5;

export default function Blog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(0);

  const published = blogsData.filter((b) => b.published);
  const categories = ['all', ...new Set(published.map((b) => b.category))];

  const filtered = useMemo(() => {
    return published
      .filter((b) => category === 'all' || b.category === category)
      .filter((b) =>
        query.trim()
          ? `${b.title} ${b.excerpt}`.toLowerCase().includes(query.trim().toLowerCase())
          : true
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  const pageCount = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const pagePosts = filtered.slice(page * POSTS_PER_PAGE, (page + 1) * POSTS_PER_PAGE);

  useEffect(() => {
    setPage(0);
  }, [query, category]);

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, Math.max(pageCount - 1, 0)));
  }, [pageCount]);

  return (
    <>
      <SEO
        title="Blog"
        description="Travel tips, care guides and news from Subechhya Bag पसल, Kathmandu."
        pathname="/blog"
        structuredData={breadcrumbSchema([{ label: 'Blog', path: '/blog' }])}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'Blog', path: '/blog' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">
            Blog &amp; Travel Tips
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
            <label className="relative block w-full md:w-72 shrink-0">
              <span className="sr-only">Search articles</span>
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
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

            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`btn ${category === c ? 'btn-primary' : 'btn-outline'} text-sm px-4 py-2`}
                  aria-pressed={category === c}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-4" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-600 mb-4">No articles match your search.</p>
              {(query || category !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategory('all');
                  }}
                  className="btn btn-outline text-sm px-4 py-2"
                >
                  Clear search &amp; filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pagePosts.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
          <Pagination page={page} pageCount={pageCount} onPageChange={setPage} label="blog page" />
        </PageContainer>
      </section>
    </>
  );
}
