"use client";
import { useEffect, useRef, useState } from "react";

export default function Recorder({ onText }: { onText: (t: string) => void }) {
  const [gravando, setGravando] = useState(false);
  const recRef = useRef<any>(null);

  const suportado =
    typeof window !== "undefined" && (window as any).webkitSpeechRecognition;

  useEffect(() => {
    if (!suportado) return;
    const Recognition = (window as any).webkitSpeechRecognition;
    const rec = new Recognition();
    rec.lang = "pt-BR";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      const res = e.results[e.results.length - 1];
      if (res && res[0]) onText(res[0].transcript);
    };
    recRef.current = rec;
  }, [suportado, onText]);

  const start = () => {
    if (!recRef.current)
      return alert("Seu navegador não suporta transcrição automática.");
    recRef.current.start();
    setGravando(true);
  };

  const stop = () => {
    recRef.current?.stop();
    setGravando(false);
  };

  return (
    <div style={{ display: "flex", gap: 12, margin: "12px 0" }}>
      {!gravando ? (
        <button onClick={start}>🎤 Iniciar gravação</button>
      ) : (
        <button onClick={stop}>⏹️ Parar</button>
      )}
    </div>
  );
}
