import { NextResponse } from "next/server";
// use o alias (seu tsconfig já tem @src). Se preferir caminho relativo, veja a linha comentada.
import { prisma } from "@src/lib/prisma";
// import { prisma } from "../../../../src/lib/prisma"; // ← opção com caminho relativo (4 níveis pra cima)

export async function POST(req: Request) {
  const data = await req.formData();
  const nome = String(data.get("nome"));
  const telefone = (data.get("telefone") || "") as string;

  const medicoId = 2; // demo (Dr. Rodrigo)
  await prisma.paciente.create({ data: { nome, telefone, medicoId } });

  return NextResponse.redirect(
    new URL("/medico", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
  );
}
