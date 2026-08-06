# Pôr o site em brumaservicos.pt (instruções para a Mariana)

O site já está publicado em https://mavechfe.github.io/bruma-site/. Estes passos ligam-no ao domínio próprio. Custo total: só o domínio (~10-15€/ano).

## 1. Comprar o domínio

1. Confirmar que `brumaservicos.pt` continua livre em https://www.dns.pt
2. Comprar num registrar português, por exemplo amen.pt ou dominios.pt
3. Ativar a **renovação automática** (importante, para o site nunca cair)

## 2. Configurar o DNS no registrar

No painel do registrar, criar estes registos:

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ (raiz) | 185.199.108.153 |
| A | @ (raiz) | 185.199.109.153 |
| A | @ (raiz) | 185.199.110.153 |
| A | @ (raiz) | 185.199.111.153 |
| CNAME | www | mavechfe.github.io |

## 3. Avisar-me (Claude)

Quando o DNS estiver feito, diz-me numa sessão e eu:
1. Reponho o ficheiro `CNAME` no repositório (conteúdo: `brumaservicos.pt`)
2. Configuro o custom domain no GitHub Pages e ativo o Enforce HTTPS
3. Registo o site no Google Search Console (verificação por registo TXT no DNS, dou-te o valor a colar)
4. Troco o link de website no Google Business Profile de wa.me para https://brumaservicos.pt
5. Submeto o sitemap e peço a indexação das páginas principais

A propagação do DNS demora entre minutos e 24 horas. O HTTPS do GitHub fica disponível pouco depois da propagação.
