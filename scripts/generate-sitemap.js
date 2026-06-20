import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONVEX_URL = process.env.VITE_CONVEX_URL || 'https://savory-corgi-783.convex.cloud';
const SITE_DOMAIN = 'https://www.zyntral.dev';

const STATIC_ROUTES = [
  '',
  '/roadmap',
  '/waitlist',
  '/contact',
  '/platform/overview',
  '/platform/agent-engine',
  '/platform/knowledge-engine',
  '/platform/workflow-engine',
  '/platform/deployment-engine',
  '/solutions/enterprise-ai',
  '/solutions/logistics-intelligence',
  '/solutions/supply-chain-ai',
  '/solutions/knowledge-systems',
  '/solutions/custom-ai-systems',
  '/research',
  '/about/vision',
  '/about/founder',
  '/about/mission',
  '/legal/privacy-policy',
  '/legal/terms'
];

async function generateSitemap() {
  console.log('Generating sitemap dynamically...');
  console.log(`Connecting to Convex deployment: ${CONVEX_URL}`);

  let dynamicRoutes = [];

  try {
    // Fetch live research papers from Convex HTTP API endpoint
    const response = await fetch(`${CONVEX_URL}/api/1/run/research/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    if (response.ok) {
      const data = await response.json();
      // Inspect articles and map path properties
      const articles = data.value || [];
      console.log(`Successfully fetched ${articles.length} research articles from database.`);
      
      dynamicRoutes = articles.map(art => {
        // Ensure path uses clean format
        if (art.path.startsWith('/research/')) {
          return art.path;
        }
        return `/research/${art.path}`;
      });
    } else {
      console.warn(`Convex request failed with status: ${response.status}. Using static fallbacks.`);
    }
  } catch (error) {
    console.error('Failed to fetch dynamic paths from Convex. Fallback to static routes only:', error.message);
  }

  // Combine static and dynamic paths
  const allPaths = Array.from(new Set([...STATIC_ROUTES, ...dynamicRoutes]));
  const currentDate = new Date().toISOString().split('T')[0];

  // Compile XML structure
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const route of allPaths) {
    const priority = route === '' ? '1.0' : route.includes('research') ? '0.90' : '0.80';
    const changeFreq = route === '' || route.includes('research') ? 'daily' : 'weekly';

    xml += '  <url>\n';
    xml += `    <loc>${SITE_DOMAIN}${route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changeFreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  // Write to build directory if it exists
  const distDir = path.join(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
    console.log('Sitemap successfully compiled to dist/sitemap.xml');
  }

  // Also write to public folder to sync source code
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
