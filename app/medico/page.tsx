import { prisma } from "../../src/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Medico() {
  const medicoId = 2; // demo (Dr. Rodrigo)
  const pacientes = await prisma.paciente.findMany({
    where: { medicoId },
    orderBy: { id: "asc" },
  });

  return (
    <main style={{ padding: 24 }}>
      <h1>Médico - Pacientes</h1>

      <form action="/api/pacientes/novo" method="post" style={{ margin: "16px 0" }}>
        <input name="nome" placeholder="Nome do paciente" required />
        <input name="telefone" placeholder="Telefone" />
        <button type="submit">+ Adicionar</button>
      </form>

      <ul>
        {pacientes.map((p) => (
          <li key={p.id} style={{ margin: "6px 0" }}>
            <Link href={`/medico/${p.id}`}>#{p.id} - {p.nome}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
