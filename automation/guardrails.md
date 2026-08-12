# Guardrails do agente MK Bruma

Qualquer rotina (cloud ou local) lê este ficheiro antes de escrever conteúdo. Em caso de dúvida, não afirmar.

## Limites legais (Reg. UE 528/2012 Biocidas + Puzzi 10/1 máx. 50°C)

- NUNCA usar: "desinfeta", "higieniza", "elimina ácaros", "mata ácaros", "elimina bactérias", "mata bactérias", "trata asma", "trata alergias", qualquer alegação de ozono.
- Regra de ouro: **"remove", nunca "elimina/mata"** quando se fala de organismos. "Elimina manchas" e "elimina odores" estão aprovados.
- Posicionamento-mestre aprovado: **"remove o reservatório de pó e sujidade que o aspirador deixa para trás"**.
- Alegações por segmento (crianças/bebés, animais, fumadores, humidade): usar apenas as versões seguras com fonte, registadas na secção legal de `02-Marketing\google-business-bruma.html` (pasta Bruma local). Sem fonte, não se afirma.

## Marca e tom

- PT-PT sempre. **Sem emojis** em qualquer texto ou visual. **Sem travessões a ligar frases** (usar ponto final ou vírgula).
- Tom Bruma: pergunta provocadora + contraponto seco. Exemplo aprovado: "Quando foi a última vez que lavou o sofá?" / "aspirar não conta".
- Identidade: paleta teal (#0D9488, #0B6E66, #5EC5B8, #12333A, #D9E7E5, #FBFCFC), fonte Nunito.

## Oferta em vigor (11/08/2026)

- Preços: 1 dia 40€, 2 dias 65€, 3 dias 90€, fim de semana 70€, semana 160€.
- Caução: 50€ (simbólica, decisão de 12/08/2026), devolvida por inteiro na recolha. Comunicar sempre sem letras pequenas.
- Incluído: 3 bocais + 1 pastilha RM 760. Extras: pastilhas a 5€, à consignação.
- Entrega: grátis até 5 km de Viseu; depois (km-5)×1,50€ ida e volta.
- NÃO existe pacote "Casa Respira". O RM 761 não se menciona (recomendação em vigor: vinagre branco).
- Urgências: nunca prometer prazo em horas nem 24/7; apenas "hoje, se a máquina estiver livre".

## Contactos oficiais

- 914 502 987 · wa.me/351914502987 · geral.brumaservicos@gmail.com · https://brumaservicos.pt · Instagram @bruma.servicos

## Regras de conduta do agente

- **Nunca enviar mensagens diretas a clientes.** Lembretes e materiais vão para a Mariana; quem fala com clientes é ela.
- Nada é publicado no blog sem "OK" explícito na sessão do Claude. Máximo 2 rascunhos de artigo por aprovar.
- Avaliações negativas no GBP: nunca responder sem OK; a resposta proposta espera em `automation/approvals-pendentes.md`.
- Antes de qualquer push: `node tools/check-site.js` (e `node tools/gerar-sitemap.js` se páginas mudaram).
- Nenhuma rotina publica um item sem confirmar no `automation/marketing-log.md` que ainda não saiu.
