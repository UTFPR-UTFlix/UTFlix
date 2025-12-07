// src/services/atorService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lista todos os atores.
 */
async function getAllAtores() {
  return prisma.ator.findMany({
    orderBy: {
      nome: 'asc',
    },
  });
}

/**
 * Busca um ator pelo ID, incluindo os filmes associados.
 */
async function getAtorById(id) {
  const atorId = parseInt(id, 10);
  if (isNaN(atorId)) {
    throw new Error('ID do ator inválido.');
  }

  return prisma.ator.findUnique({
    where: { idAtor: atorId },
    include: {
      filmes: {
        include: {
          filme: true,
        },
      },
    },
  });
}

/**
 * Cria um novo ator.
 */
async function createAtor(atorData) {
  const { nome } = atorData;
  if (!nome || nome.trim() === '') {
    throw new Error('O nome do ator é obrigatório.');
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
async function updateAtor(id, atorData) {
  const atorId = parseInt(id, 10);
  if (isNaN(atorId)) {
    throw new Error('ID do ator inválido.');
  }

  const { nome } = atorData;
  if (!nome || nome.trim() === '') {
    throw new Error('O nome do ator é obrigatório.');
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
async function deleteAtor(id) {
  const atorId = parseInt(id, 10);
  if (isNaN(atorId)) {
    throw new Error('ID do ator inválido.');
  }

  // Verifica se o ator está em uso
  const count = await prisma.filmeAtor.count({
    where: { idAtor: atorId },
  });

  if (count > 0) {
    throw new Error('Não é possível deletar: Ator está associado a filmes.');
  }

  return prisma.ator.delete({
    where: { idAtor: atorId },
  });
}

module.exports = {
  getAllAtores,
  getAtorById,
  createAtor,
  updateAtor,
  deleteAtor,
};
