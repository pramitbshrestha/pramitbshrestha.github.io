import { Link } from 'react-router-dom';
import { withBase } from '../utils/assetPath';

export default function BlogCard({ blog }) {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link to={`/blog/${blog.slug}`} className="card overflow-hidden flex flex-col">
      <div className="aspect-[16/9] bg-surface overflow-hidden">
        <img
          src={withBase(blog.image)}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs font-semibold text-accent uppercase tracking-wide">
          {blog.category}
        </span>
        <h3 className="font-semibold text-primary leading-snug">{blog.title}</h3>
        <p className="text-sm text-slate-600 line-clamp-3">{blog.excerpt}</p>
        <time dateTime={blog.date} className="mt-auto text-xs text-slate-400">
          {formattedDate}
        </time>
      </div>
    </Link>
  );
}
