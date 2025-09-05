import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../src/lib/prisma";

// (opcional, evita cache agressivo em rotas)
export const dynamic = "force-dynamic";
// export const runtime = "nodejs"; // se preferir garantir runtime node

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
  const id = Number(ctx.params.id);
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

  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  return NextResponse.redirect(new URL("/admin", base));
}
