import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: object;
}

const DEFAULT_KEYWORDS = [
  'Sujal talreja',
  'Sujal k talreja',
  'Sujal kishore kumar talreja',
  'Sujal zyntral',
  'Talreja',
  'Zyntral AI',
  'RAG Compiler',
  'On-Prompt Compiler',
  'Autonomous Agents',
  'LLM Fine-tuning'
];

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  path = '',
  image = 'https://www.zyntral.dev/assets/Zyntral%20LOGO%20REAL.jpg', // absolute path placeholder for sharing
  type = 'website',
  schema
}) => {
  const siteUrl = 'https://www.zyntral.dev';
  const canonicalUrl = `${siteUrl}${path}`;
  const displayTitle = `${title} | Zyntral AI`;

  // Merge default keywords with page-specific ones
  const allKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])).join(', ');

  return (
    <Helmet>
      {/* HTML Head Meta */}
      <title>{displayTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:site_name" content="Zyntral AI" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
