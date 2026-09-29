import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// The public address of the site, used for canonical/share URLs, the sitemap
// and robots.txt. VITE_SITE_URL wins; on Netlify, `URL` is always set to the
// site's primary address, so builds there never ship a placeholder.
function seo(siteUrl) {
  const url = siteUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().slice(0, 10);

  return {
    name: 'seo',
    // 'pre' so the URLs are real before Vite parses the HTML's links.
    transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', url) },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[`${url}/`, `${url}/?lang=pt`]
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${url}/"/>
    <xhtml:link rel="alternate" hreflang="pt" href="${url}/?lang=pt"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url}/"/>
  </url>`
  )
  .join('\n')}
</urlset>
`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL || process.env.URL || 'https://fabiopguerreiro.netlify.app';

  return {
    plugins: [react(), seo(siteUrl)],
    base: './',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
