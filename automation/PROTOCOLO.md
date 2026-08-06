# Protocolo do piloto automático do blog

Duas rotinas agendadas escrevem e publicam os artigos do blog. Nada é publicado sem OK explícito da Mariana.

## Intervenientes

- **Rotina escritora** (`bruma-escritor`): corre à segunda-feira às 09:00 (Europe/Lisbon). Prompt em `automation/prompt-escritor.md`.
- **Rotina publicadora** (`bruma-publicador`): corre todos os dias às 10:00 (Europe/Lisbon). Prompt em `automation/prompt-publicador.md`.
- **Mariana**: aprova de duas formas possíveis: respondendo `OK` na própria sessão da escritora (app do Claude ou claude.ai/code), ou por email a partir do Gmail (mavechfe@gmail.com).

## Fluxo de aprovação na sessão (caminho rápido)

1. A app do Claude notifica quando a escritora termina (segundas de manhã).
2. A Mariana abre a sessão da escritora e responde `OK` (ou escreve as alterações que quer).
3. A própria escritora publica na hora (mesmos passos e validador da publicadora) e marca o rascunho do Gmail como "JÁ PUBLICADO", ou reescreve o artigo se houver alterações.

## Fluxo de aprovação por email (alternativa, sempre disponível)

O conector Gmail não envia emails; cria rascunhos e pesquisa. O fluxo usa isso:

1. A escritora escreve o artigo, grava em `blog/_rascunhos/<slug>.html` (commit no repositório `mavechfe/bruma-site`) e cria um **rascunho no Gmail** dirigido a mavechfe@gmail.com com o assunto `[Bruma blog] Aprovação: <slug>` e o texto integral do artigo no corpo.
2. A Mariana abre o rascunho no Gmail e:
   - **Aprovar**: escreve `OK` na primeira linha do corpo e envia (o email é dela para ela).
   - **Pedir alterações**: escreve as alterações em texto livre no corpo e envia.
   - **Rejeitar**: apaga o rascunho.
3. A publicadora pesquisa no Gmail `subject:"[Bruma blog]" newer_than:14d`:
   - Corpo a começar por `OK` e slug ainda não publicado: publica.
   - Corpo com outro texto: reescreve o rascunho seguindo as alterações e cria novo rascunho `[Bruma blog] Aprovação v2: <slug>`.

## Regras duras

- Nada é publicado sem `OK` explícito.
- Máximo 2 rascunhos por aprovar: com 2 ou mais temas em estado `rascunho` no `content-plan.md`, a escritora termina sem escrever.
- Antes de qualquer publicação correm `node tools/check-site.js` e `node tools/gerar-sitemap.js`. Se o validador falhar, não se publica e o erro é reportado.
- Regras de conteúdo (legais e de marca) estão no topo do `content-plan.md` e repetidas nos prompts. Em caso de dúvida, não afirmar.

## Fallback

Se as rotinas cloud não tiverem acesso ao Gmail ou ao repositório, correr localmente no PC da Mariana via Agendador de Tarefas do Windows:

```
claude -p "$(type automation\prompt-escritor.md)"    (segundas 09:00)
claude -p "$(type automation\prompt-publicador.md)"  (diário 10:00)
```
