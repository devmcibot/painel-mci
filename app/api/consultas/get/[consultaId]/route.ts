import { prisma } from "../../../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: any) {
  const id = Number(params.consultaId);
  const c = await prisma.consulta.findUnique({
    where: { id },
    select: { id: true, transcricao: true },
  });

  if (!c) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  return NextResponse.json({ ok: true, ...c });
}
