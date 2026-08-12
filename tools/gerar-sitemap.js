// Gera sitemap.xml a partir das pastas com index.html.
// Uso: node tools/gerar-sitemap.js
const fs = require('fs'), path = require('path'), cp = require('child_process');
const root = path.join(__dirname, '..');
const BASE = 'https://brumaservicos.pt';
const urls = [];

// A data vem do ultimo commit que tocou o ficheiro, NAO do mtime: num clone novo
// (as rotinas cloud clonam sempre de raiz) todos os ficheiros ficavam com a data de hoje
// e o sitemap dizia ao Google que o site inteiro tinha mudado. Corrigido em 12/08/2026.
const dataDoFicheiro = f => {
  try {
    const d = cp.execSync('git log -1 --format=%cs -- "' + f + '"', {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch (e) { /* sem git ou ficheiro ainda nao commitado */ }
  return fs.statSync(f).mtime.toISOString().slice(0, 10);
};

const walk = (d, rel) => {
  for (const e of fs.readdirSync(d, {withFileTypes:true})) {
    if (e.name.startsWith('.') || e.name.startsWith('_') || ['node_modules','assets','tools','automation','confirmar'].includes(e.name)) continue;
    if (e.isDirectory()) walk(path.join(d, e.name), rel + e.name + '/');
  }
  const idx = path.join(d, 'index.html');
  if (fs.existsSync(idx)) {
    urls.push({loc: BASE + '/' + rel, lastmod: dataDoFicheiro(idx)});
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
