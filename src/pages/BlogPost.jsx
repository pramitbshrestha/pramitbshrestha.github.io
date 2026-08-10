import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogCard from '../components/BlogCard';
import blogsData from '../data/blogs.json';
import { breadcrumbSchema, articleSchema } from '../utils/seo';
import { withBase } from '../utils/assetPath';

function BlockRenderer({ block }) {
  switch (block.type) {
    case 'heading': {
      const level = block.level && block.level >= 2 && block.level <= 4 ? block.level : 2;
      const Tag = `h${level}`;
      return <Tag className="font-bold text-primary mt-6 mb-3 text-xl">{block.text}</Tag>;
    }
    case 'list':
      return (
        <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
          {block.items?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    case 'paragraph':
    default:
      return <p className="text-slate-600 leading-relaxed mb-4">{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const blog = blogsData.find((b) => b.slug === slug && b.published);

  if (!blog) {
    return <Navigate to="/blog" replace />;
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const related = blogsData
    .filter((b) => b.id !== blog.id && b.category === blog.category && b.published)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'Blog', path: '/blog' },
    { label: blog.title, path: `/blog/${blog.slug}` }
  ];

  return (
    <>
      <SEO
        title={blog.seo?.title || blog.title}
        description={blog.seo?.description || blog.excerpt}
        pathname={`/blog/${blog.slug}`}
        image={blog.image}
        structuredData={[breadcrumbSchema(breadcrumbItems), articleSchema(blog)]}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={breadcrumbItems} />
      </PageContainer>

      <article className="pb-16">
        <PageContainer className="max-w-3xl">
          <span className="text-accent font-semibold text-sm uppercase tracking-wide">
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mt-2 mb-3">
            {blog.title}
          </h1>
          <p className="text-sm text-slate-400 mb-6">
            By {blog.author} · <time dateTime={blog.date}>{formattedDate}</time>
          </p>
          {blog.image && (
            <div className="aspect-[16/9] bg-surface rounded-2xl overflow-hidden mb-8">
              <img
                src={withBase(blog.image)}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            {blog.content?.map((block, index) => (
              <BlockRenderer key={index} block={block} />
            ))}
          </div>
        </PageContainer>
      </article>

      {related.length > 0 && (
        <section className="pb-16">
          <PageContainer className="max-w-3xl">
            <h2 className="text-2xl font-extrabold text-primary mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>
            <Link to="/blog" className="btn btn-outline mt-8">
              Back to Blog
            </Link>
          </PageContainer>
        </section>
      )}
    </>
  );
}
