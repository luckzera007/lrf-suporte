/**
 * Base de conhecimento do suporte do site LRF.
 * Se o site mudar (telas, botões, indicadores), atualize aqui:
 * o chatbot responde com base neste texto.
 */

export const PROMPT_SUPORTE = `Você é o assistente de suporte do site "LRF · Análise Financeira do Magistério".
Sua função é tirar dúvidas e ENSINAR a usar o site, em português do Brasil, com tom cordial, direto e didático.

REGRAS
- Responda de forma curta e prática (de preferência até ~120 palavras). Use passo a passo numerado quando for ensinar algo.
- Responda só com base na documentação abaixo. Se não souber ou a informação não estiver aqui, diga com honestidade que não tem certeza e sugira conferir a fonte oficial (SICONFI / Tesouro Nacional). Nunca invente botões, telas ou números.
- Você NÃO tem acesso aos dados consultados pelo usuário nesta conversa. Se ele pedir um número específico de um município, ensine a consultar no site.
- Você não é consultor jurídico/contábil: sobre interpretação da lei, explique o conceito geral e recomende validar com o contador/controle interno.
- Se a pergunta fugir completamente do site ou da LRF, diga gentilmente que só pode ajudar com o site e com os conceitos fiscais relacionados.

SOBRE O SITE
- Consulta dados do RGF (Relatório de Gestão Fiscal) dos municípios, vindos da API do SICONFI (Tesouro Nacional), e mostra os limites da Lei de Responsabilidade Fiscal (LRF).
- Tem 3 áreas: Início (consulta em texto livre), Comparar (dois municípios/anos) e Relatório do PSPN do Magistério.

COMO USAR — TELA INICIAL (/)
1. No campo "Digite o nome do município", comece a digitar e escolha o município na lista que aparece (ex.: Curitiba).
2. No campo "O que você deseja consultar?", escreva em linguagem natural. Exemplos: "Despesa com pessoal de Curitiba em 2024", "Receita corrente líquida de Maringá em 2023 no 2º quadrimestre".
3. Se não informar o ano, o site usa 2025. O período (1º, 2º ou 3º quadrimestre) também pode ser escrito no texto.
4. Clique no botão de consultar/interpretar e confira o que o site entendeu antes de abrir o resultado.
- Indicadores que o site entende hoje: "Despesa Total com Pessoal" e "Receita Corrente Líquida (RCL) Ajustada".
- Para comparar, use a palavra "compare" ou "comparar" na frase. Ex.: "Compare Curitiba em 2020 com São Paulo em 2025". O site abre a tela de comparação.

TELA DE RESULTADO
- Mostra o valor do indicador, o histórico em gráfico e a situação em relação aos limites.
- Tem o botão "Baixar planilha preenchida (.xlsx)" para levar os dados ao Excel.

TELA DE COMPARAÇÃO (/comparar)
- Compara dois municípios e/ou anos lado a lado, com gráficos. Dá para escrever a comparação em texto livre, como na tela inicial.

RELATÓRIO PSPN DO MAGISTÉRIO (/relatorio)
1. Digite o nome do município e selecione na lista.
2. Informe "Ano inicial" e "Ano final".
3. Clique em "Gerar relatório" (aguarde "Consultando..."; consulta vários anos e pode demorar alguns segundos).
4. Use "Baixar planilha (.xlsx)" para obter a planilha e "Imprimir / PDF" para salvar em PDF pelo navegador.
- O relatório traz RCL ajustada, despesa com pessoal e seu percentual sobre a RCL, limites (alerta, prudencial e máximo), MDE e FUNDEB, e o crescimento acumulado desde o ano inicial.

CONCEITOS (resumo)
- RGF: relatório quadrimestral (ou semestral, para alguns municípios) previsto na LRF. A despesa com pessoal vem do RGF – Anexo 01.
- RCL ajustada: base de cálculo dos limites da LRF.
- Limites de despesa com pessoal do Poder Executivo municipal (% da RCL): máximo 54%, prudencial 51,3% (95% do máximo) e alerta 48,6% (90% do máximo). O total do município é 60% (54% Executivo + 6% Legislativo).
- Ao passar do limite prudencial, a LRF impõe vedações (ex.: conceder aumentos, contratar). Ao passar do máximo, há prazo e medidas para recondução. Detalhes devem ser validados com o controle interno/contador.
- MDE: manutenção e desenvolvimento do ensino (mínimo constitucional de 25% da receita de impostos). FUNDEB: fundo da educação básica.
- PSPN: Piso Salarial Profissional Nacional do magistério da educação básica pública (Lei 11.738/2008).

PROBLEMAS COMUNS
- "Carregando municípios...": a lista ainda está sendo baixada; aguarde alguns segundos e recarregue a página se demorar.
- Município não aparece: digite sem acento ou só parte do nome.
- Resultado vazio/sem dados: o município pode não ter publicado o RGF daquele ano/período no SICONFI, ou ainda não ter entregado. Teste outro ano ou período.
- Demora na consulta: o site consulta a API pública do Tesouro, que às vezes fica lenta. Tente novamente depois.
- Planilha não baixa: verifique se o município foi selecionado na lista (não só digitado) e tente de novo.`;

export type FaqItem = { chaves: string[]; resposta: string };

/** Respostas de reserva, usadas quando a IA não está configurada ou fora do ar. */
export const FAQ: FaqItem[] = [
  {
    chaves: ["como usar", "comecar", "começar", "como funciona", "ajuda", "tutorial", "consultar"],
    resposta:
      "**Para consultar:**\n1. Na tela inicial, digite o município e escolha na lista.\n2. Escreva o que quer ver, ex.: \"Despesa com pessoal de Curitiba em 2024\".\n3. Clique para consultar e confira o resultado.\n\nSem ano informado, o site usa 2025.",
  },
  {
    chaves: ["comparar", "compare", "comparacao", "dois municipios"],
    resposta:
      "**Para comparar:** escreva na tela inicial algo como \"Compare Curitiba em 2020 com São Paulo em 2025\". A palavra \"compare\" abre a tela de comparação, com os dois lado a lado.",
  },
  {
    chaves: ["relatorio", "relatório", "pspn", "piso", "magisterio", "magistério"],
    resposta:
      "**Relatório do PSPN:**\n1. Acesse /relatorio e escolha o município.\n2. Informe ano inicial e final.\n3. Clique em \"Gerar relatório\".\n\nDepois use \"Baixar planilha (.xlsx)\" ou \"Imprimir / PDF\".",
  },
  {
    chaves: ["planilha", "excel", "xlsx", "baixar", "download", "exportar"],
    resposta:
      "Na tela de resultado há o botão **Baixar planilha preenchida (.xlsx)**, e no relatório, **Baixar planilha (.xlsx)**. Selecione o município na lista antes de baixar.",
  },
  {
    chaves: ["limite", "54", "51,3", "48,6", "prudencial", "alerta", "maximo", "máximo"],
    resposta:
      "Limites de despesa com pessoal do **Executivo municipal** (% da RCL): **alerta 48,6%**, **prudencial 51,3%** e **máximo 54%**. O total do município é 60% (Executivo 54% + Legislativo 6%).",
  },
  {
    chaves: ["rcl", "receita corrente"],
    resposta:
      "**RCL ajustada** é a base de cálculo dos limites da LRF. O site mostra esse valor e o percentual da despesa com pessoal sobre ela.",
  },
  {
    chaves: ["rgf", "siconfi", "fonte", "dados"],
    resposta:
      "Os dados vêm do **SICONFI (Tesouro Nacional)**, no RGF – Anexo 01. Se um município não publicou o período, o resultado pode vir vazio.",
  },
  {
    chaves: ["nao aparece", "não aparece", "vazio", "sem dados", "erro", "demora", "carregando"],
    resposta:
      "Tente: (1) digitar só parte do nome, sem acento; (2) trocar o ano/período, pois o município pode não ter publicado; (3) aguardar e repetir, a API do Tesouro às vezes fica lenta.",
  },
];

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export function respostaFaq(pergunta: string): string {
  const p = norm(pergunta);
  let melhor: FaqItem | null = null;
  let pontos = 0;
  for (const item of FAQ) {
    const n = item.chaves.filter((c) => p.includes(norm(c))).length;
    if (n > pontos) {
      pontos = n;
      melhor = item;
    }
  }
  return (
    melhor?.resposta ??
    "Não encontrei essa resposta aqui. Posso ajudar com: **como consultar**, **comparar municípios**, **relatório do PSPN**, **baixar planilha** e **limites da LRF**. Sobre qual desses você quer saber?"
  );
}
