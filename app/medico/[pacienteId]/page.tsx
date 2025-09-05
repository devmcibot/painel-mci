import { prisma } from "../../../src/lib/prisma";
import Link from "next/link";

type PageProps = {
  params: Promise<{ pacienteId: string }>; // 👈 params como Promise
};

export default async function Paciente({ params }: PageProps) {
  const { pacienteId } = await params;     // 👈 await aqui
  const pacienteIdNum = Number(pacienteId);

  const paciente = await prisma.paciente.findUnique({
    where: { id: pacienteIdNum },
  });

  const consultas = await prisma.consulta.findMany({
    where: { pacienteId: pacienteIdNum },
    orderBy: { id: "desc" },
  });

  return (
    <main style={{ padding: 24 }}>
      <h2>Paciente: {paciente?.nome}</h2>

      <form
        action={`/api/consultas/nova/${pacienteIdNum}`}
        method="post"
        style={{ margin: "16px 0" }}
      >
        <button type="submit">+ Nova consulta (criar subpasta)</button>
      </form>

      <ul>
        {consultas.map((c) => (
          <li key={c.id}>
            <Link href={`/medico/${pacienteIdNum}/${c.id}`}>
              Consulta #{c.id} - {new Date(c.data).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
