import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Lista todos os gêneros.
 * @returns {Promise<Array<object>>} Lista de gêneros.
 */
export async function getAllGeneros() {
  return prisma.genero.findMany({
    orderBy: {
      genero: "asc", // Ordena por nome
    },
  });
}

/**
 * Busca um gênero pelo ID, incluindo os filmes associados.
 * @param {string | number} id - ID do Gênero.
 * @returns {Promise<object | null>} Objeto do gênero ou nulo.
 */
export async function getGeneroById(id) {
  const generoId = parseInt(id);
  if (isNaN(generoId)) {
    throw new Error("ID do gênero inválido.");
  }

  return prisma.genero.findUnique({
    where: { idGenero: generoId },
    include: {
      // "filmes" é a relação em 'Genero' que aponta para 'FilmeGenero'
      filmes: {
        include: {
          // "filme" é a relação em 'FilmeGenero' que aponta para 'Filme'
          filme: true, // Traz os detalhes do filme
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
export async function createGenero(generoData) {
  const { genero } = generoData;
  if (!genero || genero.trim() === "") {
    throw new Error("O nome do gênero é obrigatório.");
  }

  return prisma.genero.create({
    data: {
      genero: genero,
    },
  });
}

/**
 * Atualiza o nome de um gênero.
 * @param {string | number} id - ID do Gênero a atualizar.
 * @param {object} generoData - Dados do gênero.
 * @param {string} generoData.genero - Novo nome do gênero.
 * @returns {Promise<object>} O gênero atualizado.
 */
export async function updateGenero(id, generoData) {
  const generoId = parseInt(id);
  if (isNaN(generoId)) {
    throw new Error("ID do gênero inválido.");
  }

  const { genero } = generoData;
  if (!genero || genero.trim() === "") {
    throw new Error("O nome do gênero é obrigatório.");
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
 * @param {string | number} id - ID do Gênero a deletar.
 * @returns {Promise<object>} O gênero que foi deletado.
 */
export async function deleteGenero(id) {
  const generoId = parseInt(id);
  if (isNaN(generoId)) {
    throw new Error("ID do gênero inválido.");
  }

  // Boa prática: Verificar se o gênero está em uso antes de deletar
  // Embora 'onDelete: Cascade' funcione, pode ser destrutivo.
  // Esta lógica impede a deleção se ele estiver ligado a qualquer filme.
  const count = await prisma.filmeGenero.count({
    where: { idGenero: generoId },
  });

  if (count > 0) {
    throw new Error("Não é possível deletar: Gênero está associado a filmes.");
  }

  // Se não estiver em uso, deleta o gênero
  return prisma.genero.delete({
    where: { idGenero: generoId },
  });
}