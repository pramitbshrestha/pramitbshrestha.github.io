import { Link } from 'react-router-dom';
import { withBase } from '../utils/assetPath';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="card overflow-hidden flex flex-col group"
    >
      <div className="thumbnail-stage thumbnail-stage-category">
        <img
          src={withBase(category.image)}
          alt={category.name}
          loading="lazy"
          className="thumbnail-image"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-primary">{category.name}</h3>
        {category.description && (
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{category.description}</p>
        )}
      </div>
    </Link>
  );
}
