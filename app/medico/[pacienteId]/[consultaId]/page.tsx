"use client";
import Recorder from "../../../../src/components/Recorder";
import { useEffect, useState } from "react";

type PageProps = { params: { pacienteId: string; consultaId: string } };

export default function Consulta({ params }: PageProps) {
  const [texto, setTexto] = useState("");

  //👇 carrega o texto salvo (se existir)
  useEffect(() => {
    (async () => {
      const r = await fetch(`/api/consultas/get/${params.consultaId}`);
      if (r.ok) {
        const d = await r.json();
        if (d?.transcricao) setTexto(d.transcricao);
      }
    })();
  }, [params.consultaId]);

  const salvar = async () => {
    await fetch("/api/consultas/salvar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consultaId: Number(params.consultaId),
        transcricao: texto,
      }),
    });
    alert("Transcrição salva!");
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>Consulta #{params.consultaId}</h2>
      <Recorder onText={setTexto} />
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={12}
        style={{ display: "block", width: "100%", marginTop: 12 }}
      />
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <button onClick={salvar}>💾 Salvar transcrição</button>
        <a href={`/api/consultas/download/${params.consultaId}`}>⬇️ Baixar .txt</a>
      </div>
    </main>
  );
}
