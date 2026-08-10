import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * items: [{ label, path }] — the current page should be the last item
 * without further linking meaning (still rendered as plain text).
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-slate-500">
        <li className="flex items-center gap-1">
          <Link to="/" className="flex items-center gap-1 hover:text-primary">
            <Home size={14} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path || item.label} className="flex items-center gap-1">
              <ChevronRight size={14} aria-hidden="true" />
              {isLast ? (
                <span className="text-primary font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
