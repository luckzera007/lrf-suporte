# Suporte LRF

App separado de suporte (chatbot) para o site LRF. Next.js, sem banco de dados.

## Rodar
```bash
npm install
cp .env.example .env.local   # preencha ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```
Sem `ANTHROPIC_API_KEY`, o app responde só com o FAQ pronto (`lib/base.ts`).

## Manter atualizado
Edite `lib/base.ts` (texto `PROMPT_SUPORTE` e lista `FAQ`) sempre que o site LRF mudar.

## Deploy (Vercel)
Importe o repositório e cadastre `ANTHROPIC_API_KEY` (e, se quiser, `NEXT_PUBLIC_LRF_URL`) em Environment Variables.
