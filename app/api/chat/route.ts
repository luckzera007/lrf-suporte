import { NextResponse } from "next/server";
import { PROMPT_SUPORTE, respostaFaq } from "@/lib/base";

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };

// Limite simples por IP (memória do servidor): 20 mensagens por minuto.
const acessos = new Map<string, number[]>();
function limitado(ip: string) {
  const agora = Date.now();
  const lista = (acessos.get(ip) ?? []).filter((t) => agora - t < 60_000);
  lista.push(agora);
  acessos.set(ip, lista);
  return lista.length > 20;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limitado(ip)) {
    return NextResponse.json(
      { resposta: "Muitas mensagens em pouco tempo. Aguarde um minuto e tente de novo." },
      { status: 429 }
    );
  }

  let corpo: { mensagens?: Msg[] };
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ resposta: "Requisição inválida." }, { status: 400 });
  }

  const mensagens = (corpo.mensagens ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  if (!mensagens.length || mensagens[mensagens.length - 1].role !== "user") {
    return NextResponse.json({ resposta: "Envie uma pergunta." }, { status: 400 });
  }

  const ultima = mensagens[mensagens.length - 1].content;
  const chave = process.env.ANTHROPIC_API_KEY;

  // Sem chave configurada: usa as respostas prontas (FAQ).
  if (!chave) {
    return NextResponse.json({ resposta: respostaFaq(ultima), modo: "faq" });
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": chave,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
        max_tokens: 600,
        system: PROMPT_SUPORTE,
        messages: mensagens,
      }),
    });
    if (!r.ok) throw new Error(`API ${r.status}`);
    const j = await r.json();
    const texto = (j.content ?? [])
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { text: string }) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ resposta: texto || respostaFaq(ultima), modo: "ia" });
  } catch (e) {
    console.error("suporte:", e);
    return NextResponse.json({ resposta: respostaFaq(ultima), modo: "faq" });
  }
}
