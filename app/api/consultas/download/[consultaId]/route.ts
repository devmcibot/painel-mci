import { prisma } from "../../../../../src/lib/prisma";

export async function GET(_req: Request, { params }: any) {
  const id = Number(params.consultaId);
  const c = await prisma.consulta.findUnique({
    where: { id },
    select: { transcricao: true },
  });

  const body = c?.transcricao || "";
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="consulta-${id}.txt"`,
    },
  });
}
