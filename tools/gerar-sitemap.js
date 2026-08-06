// Gera sitemap.xml a partir das pastas com index.html.
// Uso: node tools/gerar-sitemap.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const BASE = 'https://brumaservicos.pt';
const urls = [];
const walk = (d, rel) => {
  for (const e of fs.readdirSync(d, {withFileTypes:true})) {
    if (e.name.startsWith('.') || e.name.startsWith('_') || ['node_modules','assets','tools','automation'].includes(e.name)) continue;
    if (e.isDirectory()) walk(path.join(d, e.name), rel + e.name + '/');
  }
  const idx = path.join(d, 'index.html');
  if (fs.existsSync(idx)) {
    const lastmod = fs.statSync(idx).mtime.toISOString().slice(0, 10);
    urls.push({loc: BASE + '/' + rel, lastmod});
  }
};
walk(root, '');
urls.sort((a, b) => a.loc.localeCompare(b.loc));
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
