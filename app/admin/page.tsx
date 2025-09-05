import { prisma } from "../../src/lib/prisma";
import Link from "next/link";

export default async function Admin() {
  const usuarios = await prisma.usuario.findMany({ orderBy: { id: "asc" }});
  return (
    <main style={{padding:24}}>
      <h1>Admin - Usuários</h1>
      <ul>
        {usuarios.map(u => (
          <li key={u.id} style={{margin:"10px 0"}}>
            #{u.id} {u.nome} ({u.tipo}) — {u.ativo ? "ATIVO" : "BLOQUEADO"}{" "}
            <Link href={`/api/admin/toggle/${u.id}`}>[Alternar acesso]</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
