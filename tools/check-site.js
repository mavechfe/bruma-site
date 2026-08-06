// Valida o site inteiro: regras legais, marca e SEO tecnico.
// Uso: node tools/check-site.js  (sai com codigo 1 se houver violacoes)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const errs = [];
const PROIBIDO = [
  /desinfe/i, /higieniz/i, /mata\s+(os\s+)?(ácaros|acaros|bact)/i,
  /elimina\s+(os\s+)?(ácaros|acaros|bact|fungos|v[ií]rus)/i,
  /trata\s+(a\s+)?(asma|alergia)/i, /ozono/i, /casa respira/i,
  /—/,
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u,
];
const walk = d => fs.readdirSync(d, {withFileTypes:true}).flatMap(e => {
  if (e.name.startsWith('.') || e.name.startsWith('_') || e.name === 'node_modules') return [];
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : (p.endsWith('.html') ? [p] : []);
});
const pages = walk(root);
const titles = new Map(), descs = new Map();
for (const p of pages) {
  const rel = path.relative(root, p), c = fs.readFileSync(p, 'utf8');
  const texto = c.replace(/<script(?! type="application\/ld\+json")[\s\S]*?<\/script>/g, '');
  for (const re of PROIBIDO) { const m = texto.match(re); if (m) errs.push(`${rel}: termo proibido "${m[0]}"`); }
  const t = (c.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (!t) errs.push(`${rel}: sem <title>`);
  else if (titles.has(t)) errs.push(`${rel}: title duplicado com ${titles.get(t)}`);
  else titles.set(t, rel);
  const d = (c.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!d) errs.push(`${rel}: sem meta description`);
  else if (d.length < 50 || d.length > 160) errs.push(`${rel}: description com ${d.length} carateres (50-160)`);
  else if (descs.has(d)) errs.push(`${rel}: description duplicada com ${descs.get(d)}`);
  else descs.set(d, rel);
  for (const m of c.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { errs.push(`${rel}: JSON-LD invalido (${e.message})`); }
  }
  for (const m of c.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    let alvo = path.join(path.dirname(p), decodeURIComponent(u.split('?')[0]));
    if (u.endsWith('/')) alvo = path.join(alvo, 'index.html');
    if (!fs.existsSync(alvo)) errs.push(`${rel}: link quebrado "${u}"`);
  }
}
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log(`OK: ${pages.length} paginas validas`);
