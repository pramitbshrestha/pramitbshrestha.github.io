import { Link } from 'react-router-dom';
import { withBase } from '../utils/assetPath';

const availabilityLabels = {
  available: { text: 'Available', className: 'bg-green-100 text-green-700' },
  'made-to-order': { text: 'Made to Order', className: 'bg-amber-100 text-amber-700' },
  'out-of-stock': { text: 'Out of Stock', className: 'bg-slate-200 text-slate-600' }
};

export default function ProductCard({ product }) {
  const availability =
    availabilityLabels[product.availability] || availabilityLabels.available;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="card overflow-hidden flex flex-col focus-visible:outline focus-visible:outline-3"
    >
      <div className="thumbnail-stage thumbnail-stage-product">
        <img
          src={withBase(product.images?.[0])}
          alt={product.name}
          loading="lazy"
          className="thumbnail-image"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span
          className={`self-start text-xs font-semibold px-2 py-1 rounded-full ${availability.className}`}
        >
          {availability.text}
        </span>
        <h3 className="font-semibold text-primary leading-snug">{product.name}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">{product.shortDescription}</p>
        <span className="mt-auto text-accent font-semibold text-sm">View details →</span>
      </div>
    </Link>
  );
}
