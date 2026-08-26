import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pageCount, onPageChange, label }) {
  if (pageCount < 2) return null;

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label={label}>
      <button
        type="button"
        className="btn btn-outline px-4 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        <ChevronLeft size={18} aria-hidden="true" /> Previous
      </button>
      {Array.from({ length: pageCount }, (_, index) => (
        <button
          key={index}
          type="button"
          className={`min-h-11 min-w-11 rounded-full px-3 font-semibold transition-colors ${page === index ? 'bg-primary text-white' : 'bg-surface text-primary hover:bg-accent-light'}`}
          onClick={() => onPageChange(index)}
          aria-label={`Go to ${label} ${index + 1}`}
          aria-current={page === index ? 'page' : undefined}
        >
          {index + 1}
        </button>
      ))}
      <button
        type="button"
        className="btn btn-outline px-4 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === pageCount - 1}
      >
        Next <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}
