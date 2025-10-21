import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getFilmes() {
  return prisma.filme.findMany();
}

export async function addFilme(titulo, genero, ano) {
  return prisma.filme.create({
    data: { titulo, genero, ano }
  });
}
