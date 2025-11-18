import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Lista todos os atores.
 */
export async function getAllAtores() {
  return prisma.ator.findMany({
    orderBy: {
      nome: "asc",
    },
  });
}

/**
 * Busca um ator pelo ID, incluindo os filmes associados.
 */
export async function getAtorById(id) {
  const atorId = parseInt(id);
  if (isNaN(atorId)) {
    throw new Error("ID do ator inválido.");
  }

  return prisma.ator.findUnique({
    where: { idAtor: atorId },
    include: {
      filmes: { // Relação em 'Ator' -> 'FilmeAtor'
        include: {
          filme: true, // Relação em 'FilmeAtor' -> 'Filme'
        },
      },
    },
  });
}

/**
 * Cria um novo ator.
 */
export async function createAtor(atorData) {
  const { nome } = atorData;
  if (!nome || nome.trim() === "") {
    throw new Error("O nome do ator é obrigatório.");
  }

  return prisma.ator.create({
    data: {
      nome: nome,
    },
  });
}

/**
 * Atualiza o nome de um ator.
 */
export async function updateAtor(id, atorData) {
  const atorId = parseInt(id);
  if (isNaN(atorId)) {
    throw new Error("ID do ator inválido.");
  }

  const { nome } = atorData;
  if (!nome || nome.trim() === "") {
    throw new Error("O nome do ator é obrigatório.");
  }

  return prisma.ator.update({
    where: { idAtor: atorId },
    data: {
      nome: nome,
    },
  });
}

/**
 * Deleta um ator.
 */
export async function deleteAtor(id) {
  const atorId = parseInt(id);
  if (isNaN(atorId)) {
    throw new Error("ID do ator inválido.");
  }

  // Verifica se o ator está em uso
  const count = await prisma.filmeAtor.count({
    where: { idAtor: atorId },
  });

  if (count > 0) {
    throw new Error("Não é possível deletar: Ator está associado a filmes.");
  }

  return prisma.ator.delete({
    where: { idAtor: atorId },
  });
}