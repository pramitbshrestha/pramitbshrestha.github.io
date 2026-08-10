import siteData from '../data/site.json';

export function buildTitle(pageTitle) {
  if (!pageTitle) return siteData.seoDefaults.defaultTitle;
  return `${pageTitle}${siteData.seoDefaults.titleSuffix}`;
}

export function buildCanonical(pathname) {
  const domain = siteData.website.url.replace(/\/$/, '');
  return `${domain}${pathname}`;
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteData.business.name,
    image: `${siteData.website.url}${siteData.business.logo}`,
    description: siteData.business.description,
    telephone: siteData.contact.phoneDial,
    email: siteData.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.contact.address,
      addressLocality: 'Kathmandu',
      addressCountry: 'NP'
    },
    url: siteData.website.url
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.business.name,
    logo: `${siteData.website.url}${siteData.business.logo}`,
    url: siteData.website.url
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteData.website.url}${item.path}`
    }))
  };
}

export function articleSchema(blog) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    author: { '@type': 'Organization', name: blog.author },
    datePublished: blog.date,
    image: blog.image ? `${siteData.website.url}${blog.image}` : undefined
  };
}
