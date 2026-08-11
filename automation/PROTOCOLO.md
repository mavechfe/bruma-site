# Protocolo do piloto automático do blog

Uma rotina agendada escreve os artigos do blog. Nada é publicado sem OK explícito da Mariana. Toda a aprovação acontece no Claude (app ou claude.ai/code); o Gmail NÃO faz parte do circuito (decisão da Mariana, 06/08/2026).

## Intervenientes

- **Rotina escritora** (`bruma-escritor`): corre à segunda-feira às 09:00 (Europe/Lisbon). Prompt em `automation/prompt-escritor.md`. Escreve E publica (após OK).
- **Rotina publicadora** (`bruma-publicador`): DESATIVADA a 06/08/2026. Era o caminho de aprovação por Gmail, que deixou de existir. O prompt `automation/prompt-publicador.md` fica como referência dos passos de publicação.
- **Agente diário** (`bruma-agente-diario`, desde 11/08/2026): corre todos os dias às 09:00 (Europe/Lisbon). Prompt em `automation/prompt-agente-diario.md`. Prepara posts GBP e Instagram, otimiza o site, vigia o funil de vendas e escreve o relatório de domingo em `reports/`. Aprovações (respostas a avaliações negativas, alterações sensíveis) seguem o mesmo circuito da escritora: resposta na sessão, na app do Claude.
- **Tarefa local** (PC da Mariana, Agendador do Windows, 3ª/5ª/sábado 10:00): prompt em `automation/prompt-tarefa-local.md`. Publica a fila `automation/gbp-queue.md` no GBP, trata avaliações e recolhe métricas para `automation/metrics/`.
- **Mariana**: aprova respondendo `OK` na sessão da rotina em causa, na app do Claude ou em claude.ai/code.

## Fluxo de aprovação

1. Segunda de manhã, a escritora escreve o artigo, grava em `blog/_rascunhos/<slug>.html` (commit no repositório `mavechfe/bruma-site`) e apresenta o texto integral na própria sessão. A última mensagem é uma linha única a pedir o OK, legível na notificação da app.
2. A app do Claude notifica a Mariana quando a sessão termina.
3. A Mariana abre a sessão e:
   - **Aprovar**: responde `OK`. A escritora publica na hora (validador incluído) e confirma com o URL.
   - **Pedir alterações**: escreve as alterações em texto livre. A escritora reescreve e volta a pedir OK.
   - **Rejeitar/adiar**: não responde. O artigo fica em `blog/_rascunhos/` sem ser publicado.
4. Alternativa sempre disponível: dizer ao Claude Code local (no PC) "publica o artigo <slug>", que segue os mesmos passos de publicação.

## Regras duras

- Nada é publicado sem `OK` explícito.
- Máximo 2 rascunhos por aprovar: com 2 ou mais temas em estado `rascunho` no `content-plan.md`, a escritora termina sem escrever.
- Antes de qualquer publicação correm `node tools/check-site.js` e `node tools/gerar-sitemap.js`. Se o validador falhar, não se publica e o erro é reportado.
- Regras de conteúdo (legais e de marca) estão em `automation/guardrails.md`, no topo do `content-plan.md` e repetidas nos prompts. Em caso de dúvida, não afirmar.
- A tarefa local só responde a avaliações negativas com item `estado: aprovado` em `automation/approvals-pendentes.md`. Nunca por iniciativa própria.
- Nenhuma rotina publica um item sem confirmar em `automation/marketing-log.md` que ainda não saiu.

## Fallback

Se as rotinas cloud não tiverem acesso ao repositório, correr localmente no PC da Mariana via Agendador de Tarefas do Windows:

```
claude -p "$(type automation\prompt-escritor.md)"    (segundas 09:00)
```

A publicação local faz-se pedindo diretamente ao Claude Code: "publica o artigo <slug> seguindo automation/prompt-publicador.md".
