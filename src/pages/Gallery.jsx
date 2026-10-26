import SEO from '../components/SEO';
import PageContainer from '../components/PageContainer';
import Breadcrumbs from '../components/Breadcrumbs';
import GalleryGrid from '../components/GalleryGrid';
import galleryData from '../data/gallery.json';
import { breadcrumbSchema } from '../utils/seo';

export default function Gallery() {
  const items = galleryData
    .filter((item) => item.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <SEO
        title="Gallery"
        description="Photos from Subechhya Bag पसल - Asan, Balkumari, Kathmandu."
        pathname="/gallery"
        structuredData={breadcrumbSchema([{ label: 'Gallery', path: '/gallery' }])}
      />
      <PageContainer className="py-8">
        <Breadcrumbs items={[{ label: 'Gallery', path: '/gallery' }]} />
      </PageContainer>

      <section className="pb-16">
        <PageContainer>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-8">Gallery</h1>
          {items.length === 0 ? (
            <p className="text-slate-600">No gallery images yet.</p>
          ) : (
            <GalleryGrid items={items} />
          )}
        </PageContainer>
      </section>
    </>
  );
}
