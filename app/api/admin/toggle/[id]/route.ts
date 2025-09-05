import { prisma } from "../../../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const id = Number(params.id);
  const u = await prisma.usuario.findUnique({ where: { id }});
  if (!u) return NextResponse.json({ ok:false }, { status:404 });
  await prisma.usuario.update({ where:{ id }, data:{ ativo: !u.ativo }});
  return NextResponse.redirect(new URL("/admin", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}
