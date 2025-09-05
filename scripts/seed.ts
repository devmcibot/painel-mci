import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.usuario.upsert({
    where: { email: "admin@mci.dev.br" },
    update: {},
    create: { nome: "Admin", email: "admin@mci.dev.br", senha: "123", tipo: "admin" }
  });

  await prisma.usuario.upsert({
    where: { email: "medico@mci.dev.br" },
    update: {},
    create: { nome: "Dr. Rodrigo", email: "medico@mci.dev.br", senha: "123", tipo: "medico" }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
