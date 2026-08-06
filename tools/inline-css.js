// Embute assets/site.css em todas as paginas HTML. Corre APENAS no deploy (CI);
// o codigo-fonte mantem o <link> para facilitar a manutencao.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'assets', 'site.css'), 'utf8');
const walk = d => fs.readdirSync(d, {withFileTypes:true}).flatMap(e => {
  if (e.name.startsWith('.') || e.name === 'node_modules') return [];
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : (p.endsWith('.html') ? [p] : []);
});
let n = 0;
for (const p of walk(root)) {
  const c = fs.readFileSync(p, 'utf8');
  const novo = c.replace(/<link rel="stylesheet" href="(?:\.\.\/)*assets\/site\.css">/, '<style>\n' + css + '</style>');
  if (novo !== c) { fs.writeFileSync(p, novo); n++; }
}
console.log(`css embutido em ${n} paginas`);
