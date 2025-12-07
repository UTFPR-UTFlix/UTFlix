// src/services/generoService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lista todos os gêneros.
 * @returns {Promise<Array<object>>} Lista de gêneros.
 */
async function getAllGeneros() {
  return prisma.genero.findMany({
    orderBy: {
      genero: 'asc',
    },
  });
}

/**
 * Busca um gênero pelo ID, incluindo os filmes associados.
 * @param {string|number} id - ID do Gênero.
 * @returns {Promise<object|null>} Objeto do gênero ou nulo.
 */
async function getGeneroById(id) {
  const generoId = parseInt(id, 10);
  if (isNaN(generoId)) {
    throw new Error('ID do gênero inválido.');
  }

  return prisma.genero.findUnique({
    where: { idGenero: generoId },
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
 * Cria um novo gênero.
 * @param {object} generoData - Dados do gênero.
 * @param {string} generoData.genero - Nome do gênero (ex: "Ação").
 * @returns {Promise<object>} O gênero criado.
 */
async function createGenero(generoData) {
  const { genero } = generoData || {};
  if (!genero || genero.trim() === '') {
    throw new Error('O nome do gênero é obrigatório.');
  }

  return prisma.genero.create({
    data: {
      genero: genero,
    },
  });
}

/**
 * Atualiza o nome de um gênero.
 * @param {string|number} id - ID do Gênero a atualizar.
 * @param {object} generoData - Dados do gênero.
 * @param {string} generoData.genero - Novo nome do gênero.
 * @returns {Promise<object>} O gênero atualizado.
 */
async function updateGenero(id, generoData) {
  const generoId = parseInt(id, 10);
  if (isNaN(generoId)) {
    throw new Error('ID do gênero inválido.');
  }

  const { genero } = generoData || {};
  if (!genero || genero.trim() === '') {
    throw new Error('O nome do gênero é obrigatório.');
  }

  return prisma.genero.update({
    where: { idGenero: generoId },
    data: {
      genero: genero,
    },
  });
}

/**
 * Deleta um gênero.
 * @param {string|number} id - ID do Gênero a deletar.
 * @returns {Promise<object>} O gênero que foi deletado.
 */
async function deleteGenero(id) {
  const generoId = parseInt(id, 10);
  if (isNaN(generoId)) {
    throw new Error('ID do gênero inválido.');
  }

  // Verifica se o gênero está em uso
  const count = await prisma.filmeGenero.count({
    where: { idGenero: generoId },
  });

  if (count > 0) {
    throw new Error('Não é possível deletar: Gênero está associado a filmes.');
  }

  return prisma.genero.delete({
    where: { idGenero: generoId },
  });
}

module.exports = {
  getAllGeneros,
  getGeneroById,
  createGenero,
  updateGenero,
  deleteGenero,
};
