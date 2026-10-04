import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONVEX_URL = process.env.VITE_CONVEX_URL || 'https://savory-corgi-783.convex.cloud';
const SITE_DOMAIN = 'https://www.zyntral.dev';

// High-value, real routes verified in App.tsx
const ROUTE_CONFIGS = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/marketplace', priority: '0.95', changefreq: 'daily' },
  { path: '/workspace', priority: '0.90', changefreq: 'weekly' },
  { path: '/platform', priority: '0.85', changefreq: 'weekly' },
  { path: '/roadmap', priority: '0.80', changefreq: 'weekly' },
  { path: '/waitlist', priority: '0.80', changefreq: 'weekly' },
  { path: '/contact', priority: '0.70', changefreq: 'monthly' },
  { path: '/about', priority: '0.85', changefreq: 'weekly' },
  { path: '/legal/privacy-policy', priority: '0.30', changefreq: 'monthly' },
  { path: '/legal/terms', priority: '0.30', changefreq: 'monthly' }
];

async function generateSitemap() {
  console.log('Generating production sitemap dynamically...');
  console.log(`Connecting to Convex deployment: ${CONVEX_URL}`);

  let dynamicRoutes = [];

  try {
    const response = await fetch(`${CONVEX_URL}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: 'research:get',
        args: {},
        format: 'json'
      })
    });

    if (response.ok) {
      const data = await response.json();
      const articles = data.value || [];
      console.log(`Successfully fetched ${articles.length} research articles from database.`);
      
      dynamicRoutes = articles.map(art => ({
        path: art.path.startsWith('/research/') ? art.path : `/research/${art.path}`,
        priority: '0.85',
        changefreq: 'weekly'
      }));
    } else {
      console.warn(`Convex query failed with status: ${response.status}. Using verified static routes.`);
    }
  } catch (error) {
    console.error('Failed to fetch dynamic paths from Convex:', error.message);
  }

  // Combine and deduplicate
  const seenPaths = new Set();
  const allRoutes = [...ROUTE_CONFIGS, ...dynamicRoutes].filter(r => {
    if (seenPaths.has(r.path)) return false;
    seenPaths.add(r.path);
    return true;
  });

  const currentDate = new Date().toISOString().split('T')[0];

  // Compile valid XML structure
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
  xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  for (const item of allRoutes) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_DOMAIN}${item.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Write to build dist directory if it exists
  const distDir = path.join(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
    console.log('Sitemap successfully compiled to dist/sitemap.xml');
  }

  // Also write to public folder for source control & dev server
  const publicDir = path.join(__dirname, '../public');
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
    console.log('Sitemap successfully compiled to public/sitemap.xml');
  }
}

generateSitemap().catch(err => {
  console.error('Fatal error during sitemap compilation:', err);
  process.exit(1);
});
