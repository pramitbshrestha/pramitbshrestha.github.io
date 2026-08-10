import { Helmet } from 'react-helmet-async';
import { buildTitle, buildCanonical } from '../utils/seo';
import siteData from '../data/site.json';

export default function SEO({
  title,
  description,
  pathname = '/',
  image,
  noindex = false,
  structuredData
}) {
  const finalTitle = buildTitle(title);
  const finalDescription = description || siteData.seoDefaults.defaultDescription;
  const canonical = buildCanonical(pathname);
  const ogImage = image
    ? `${siteData.website.url}${image}`
    : `${siteData.website.url}${siteData.business.logo}`;

  const schemas = Array.isArray(structuredData)
    ? structuredData
    : structuredData
    ? [structuredData]
    : [];

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteData.business.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
