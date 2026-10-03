import React from 'react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: object;
  breadcrumbs?: BreadcrumbItem[];
  noindex?: boolean;
}

// High-impact domain keywords combined with founder/brand keywords
const DEFAULT_KEYWORDS = [
  'Zyntral AI',
  'RAG Compiler',
  'On-Prompt Compiler',
  'Autonomous AI Agents',
  'AI Agent Marketplace',
  'Enterprise RAG Architecture',
  'LLM Fine-tuning',
  'Vector Database Orchestration',
  'Production AI Builder',
  'AI Compiler Engine',
  'Sujal Talreja',
  'Sujal K Talreja',
  'Zyntral Labs',
  'Decentralized GPU Compute'
];

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  path = '',
  image = 'https://www.zyntral.dev/og-image.jpg',
  type = 'website',
  schema,
  breadcrumbs,
  noindex = false
}) => {
  const siteUrl = 'https://www.zyntral.dev';
  const canonicalUrl = `${siteUrl}${path}`;
  const displayTitle = title.includes('Zyntral') ? title : `${title} | Zyntral AI`;

  // Merge default keywords with page-specific ones
  const allKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])).join(', ');

  // Automatic BreadcrumbList schema if breadcrumbs are provided or path exists
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`
    }))
  } : null;

  return (
    <Helmet>
      {/* HTML Head Meta */}
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="author" content="Sujal Talreja, Zyntral AI" />
      <meta name="publisher" content="Zyntral AI" />

      {/* Crawl Directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:site_name" content="Zyntral AI" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={displayTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@zyntral_ai" />
      <meta name="twitter:creator" content="@sujaltalreja" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={displayTitle} />

      {/* Primary JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {/* Breadcrumb JSON-LD Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};
