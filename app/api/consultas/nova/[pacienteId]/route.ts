import { NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/prisma";

export async function POST(_: Request, { params }: { params: { pacienteId: string }}) {
  const pacienteId = Number(params.pacienteId);
  await prisma.consulta.create({ data: { pacienteId }});
  return NextResponse.redirect(new URL(`/medico/${pacienteId}`, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}
