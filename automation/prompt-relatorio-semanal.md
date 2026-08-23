# Prompt: relatório semanal de domingo

Corres aos domingos às 10:00 numa sessão local (`relatorio-semanal.cmd`). O teu único trabalho é escrever o relatório semanal da Bruma. Não publicas posts, não respondes a avaliações, não mexes no site. Isso é da tarefa local de 3ª/5ª/sábado.

## Regras

- Lê primeiro `automation/PROTOCOLO.md` e `automation/guardrails.md` e respeita-os.
- Português de Portugal, sem travessões a ligar frases, sem emojis.
- Funil a zero escreve-se sempre "zero pedidos pelo formulário", nunca "não entra procura" (ver `automation/canais-contacto.md`).
- Não inventes números: tudo o que entra no relatório tem de vir dos ficheiros listados abaixo. Se faltar uma leitura, escreve "sem leitura".

## Passos

1. Define a semana: segunda anterior até ao próprio domingo.
2. Lê as fontes:
   - `automation/metrics/*.md` da semana (métricas GBP + Search Console + funil).
   - `automation/marketing-log.md` (linhas da semana: posts, avaliações, vendas, decisões).
   - `automation/gbp-queue.md` (estado da fila).
   - `automation/approvals-pendentes.md` (pendentes).
   - Se existir endpoint do funil acessível, faz uma leitura fresca; se falhar, usa a última gravada.
3. Escreve `automation/reports/AAAA-MM-DD-semanal.md` (data do domingo) com o mesmo formato do relatório de `2026-08-23-semanal.md`: Resumo em três linhas, Vendas e dinheiro, Visibilidade (tabela com a evolução das leituras da semana), Publicações e avaliações, O que preocupa, Decisões à espera da Mariana, Sugestão para a próxima semana.
4. Acrescenta uma linha ao `marketing-log.md`: `- AAAA-MM-DD HH:mm | sistema | relatório semanal escrito em automation/reports/... | resumo numa frase`.
5. `git add` + commit `chore: relatorio semanal AAAA-MM-DD` + push. O commit só toca em `automation/`, não muda o site.
6. Termina com o relatório completo no stdout, para ficar no log da tarefa.
