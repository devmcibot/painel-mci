import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: any) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ ok: false, error: "id inválido" }, { status: 400 });
  }

  const u = await prisma.usuario.findUnique({ where: { id } });
  if (!u) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  await prisma.usuario.update({
    where: { id },
    data: { ativo: !u.ativo },
  });

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.redirect(new URL("/admin", base));
}
