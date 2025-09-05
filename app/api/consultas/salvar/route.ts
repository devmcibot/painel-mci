import { prisma } from "../../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    // validação básica
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, reason: "Corpo ausente ou inválido" },
        { status: 400 }
      );
    }

    const consultaIdNum = Number((body as any).consultaId);
    const transcricao = String((body as any).transcricao ?? "");

    if (!consultaIdNum || Number.isNaN(consultaIdNum)) {
      return NextResponse.json(
        { ok: false, reason: "consultaId inválido" },
        { status: 400 }
      );
    }

    const updated = await prisma.consulta.update({
      where: { id: consultaIdNum },
      data: { transcricao },
      select: { id: true, transcricao: true },
    });

    return NextResponse.json({ ok: true, updated });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
