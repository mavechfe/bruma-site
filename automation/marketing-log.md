# Diário de ações do agente MK Bruma

Fonte única de verdade do que já foi feito e publicado. Uma linha por ação, mais recente no fim.

Formato: `- AAAA-MM-DD HH:mm | <canal: gbp|blog|ig|site|funil|sistema> | <ação> | <porquê/resultado>`

- 2026-08-11 22:00 | sistema | arranque do agente MK | ficheiros de estado criados (Fase B do plano 2026-08-11)
- 2026-08-11 23:12 | gbp | post de arranque publicado (Publicada ha 4 segundos, confirmado) | teste de producao do post-gbp.js; receita: keyboard.type + botao Mensagem
- 2026-08-11 23:25 | sistema | REVERTIDOS commits 13c1930+260da58 (fim da caucao, +5 EUR) de outra sessao | decisao da Mariana: esquecer esses commits; caucao 150 e precos originais mantem-se
- 2026-08-11 23:23 | funil | tentativa de leitura do endpoint do funil de vendas (funil=bruma2026) falhou | egress bloqueado a script.google.com no ambiente cloud; seguido sem dados do funil conforme guardrails, sem alternativa local disponivel nesta sessao
- 2026-08-11 23:23 | gbp | adicionado 1 post a fila (id 2026-08-11-1, estado: fila) para a tarefa local publicar hoje as 10:00 | terca-feira, fila estava vazia; derivado do cluster de manchas publicado a 06/08 (guia mae nodoas-guia-mancha-a-mancha) com angulo sazonal de convivios de verao; validado contra guardrails (sem elimina/mata/desinfeta, sem emojis, sem travessoes, sem alegacoes de saude)
- 2026-08-11 23:27 | gbp | avaliacao positiva nova de Mariana Fernandes (5 estrelas) respondida no Gestor de Perfis | agradecimento curto no tom Bruma, sem emojis; resposta confirmada como proprietario apos reload
- 2026-08-11 23:28 | sistema | metricas gravadas em automation/metrics/2026-08-11.md | GBP 13 visualizacoes de perfil, 0 chamadas, 0 cliques para o site; Search Console ainda a processar dados, sem numeros
- 2026-08-11 23:31 | gbp | post 2026-08-11-1 publicado com imagem puzzi.jpg (Publicada ha 2 minutos, confirmado na lista de publicacoes) | item da fila; post-gbp.js reportou FALHA por a confirmacao correr durante o upload da imagem, publicacao verificada manualmente no separador updates
- 2026-08-12 09:09 | funil | automation/metrics/funil-*.json continua inexistente | tarefa local so grava a 3a/5a/sabado, ainda nao correu desde o arranque; seguido sem funil conforme guardrails
- 2026-08-12 09:09 | sistema | approvals-pendentes.md sem itens pendentes | nada a apresentar a Mariana hoje
- 2026-08-12 09:09 | site | title do artigo guia mae encurtado (blog/nodoas-guia-mancha-a-mancha) de 83 para 70 carateres, title e og:title atualizados | acao de quarta-feira (otimizacao on-page); title tinha "tapete ou carro" a mais e cortava no Google; H1, breadcrumb e JSON-LD mantidos completos; node tools/check-site.js OK (19 paginas validas), node tools/gerar-sitemap.js correu (18 URLs)
- 2026-08-12 09:09 | ig | sem 2o post Instagram hoje | nao ha material novo esta semana (cluster de manchas de 06/08 ja foi usado no post GBP de 11/08); nao se justifica repetir o mesmo angulo em dois canais na mesma semana
