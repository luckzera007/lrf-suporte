"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGESTOES = [
  "Como faço uma consulta?",
  "Como comparar dois municípios?",
  "Como gerar o relatório do PSPN?",
  "Como baixar a planilha?",
  "Quais são os limites da LRF?",
  "O resultado veio vazio, e agora?",
];

const BOAS_VINDAS: Msg = {
  role: "assistant",
  content:
    "Olá! Sou o suporte do **site LRF**. Posso te **ensinar a usar** cada tela, explicar os indicadores e resolver problemas. Escolha uma sugestão ou escreva sua dúvida.",
};

function Texto({ texto }: { texto: string }) {
  return (
    <>
      {texto.split("\n").map((linha, i) => {
        if (!linha.trim()) return null;
        const partes = linha.split(/(\*\*[^*]+\*\*)/g).map((p, k) =>
          p.startsWith("**") && p.endsWith("**") ? <strong key={k}>{p.slice(2, -2)}</strong> : <span key={k}>{p}</span>
        );
        const item = /^(\d+\.|[-•*])\s/.test(linha.trim());
        return <p key={i} className={item ? "item" : undefined}>{partes}</p>;
      })}
    </>
  );
}

export default function Home() {
  const [msgs, setMsgs] = useState<Msg[]>([BOAS_VINDAS]);
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const fim = useRef<HTMLDivElement>(null);
  const urlLrf = process.env.NEXT_PUBLIC_LRF_URL;

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, carregando]);

  async function enviar(pergunta: string) {
    const p = pergunta.trim();
    if (!p || carregando) return;
    const historico: Msg[] = [...msgs, { role: "user", content: p }];
    setMsgs(historico);
    setTexto("");
    setCarregando(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagens: historico.filter((m) => m !== BOAS_VINDAS) }),
      });
      const j = await r.json();
      setMsgs([...historico, { role: "assistant", content: j.resposta }]);
    } catch {
      setMsgs([...historico, { role: "assistant", content: "Não consegui responder agora. Tente novamente em instantes." }]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="app">
      <header className="topo">
        <div>
          <h1>Suporte LRF</h1>
          <p>Tire dúvidas e aprenda a usar o site</p>
        </div>
        {urlLrf && <a href={urlLrf} target="_blank" rel="noreferrer">Abrir o site LRF ↗</a>}
      </header>

      <div className="msgs">
        {msgs.map((m, i) => (
          <div key={i} className={"linha " + m.role}>
            <div className="bolha"><Texto texto={m.content} /></div>
          </div>
        ))}
        {msgs.length === 1 && (
          <div className="sugestoes">
            {SUGESTOES.map((s) => (
              <button key={s} onClick={() => enviar(s)}>{s}</button>
            ))}
          </div>
        )}
        {carregando && <div className="linha"><div className="bolha digitando">Digitando…</div></div>}
        <div ref={fim} />
      </div>

      <form className="form" onSubmit={(e) => { e.preventDefault(); enviar(texto); }}>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={500} placeholder="Digite sua dúvida…" autoFocus />
        <button type="submit" disabled={carregando || !texto.trim()}>Enviar</button>
      </form>
      <p className="rodape">As respostas podem conter erros. Confira dados oficiais no SICONFI / Tesouro Nacional.</p>
    </main>
  );
}
