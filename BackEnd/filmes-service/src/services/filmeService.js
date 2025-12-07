// src/services/filmeService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lista todos os filmes, incluindo gêneros e atores.
 */
async function getFilmes() {
  return prisma.filme.findMany({
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      atores: {
        include: {
          ator: true,
        },
      },
    },
  });
}

/**
 * Busca um único filme pelo seu ID, incluindo gêneros e atores.
 */
async function getFilmeById(id) {
  const filmeId = parseInt(id, 10);

  if (isNaN(filmeId)) {
    throw new Error('ID do filme inválido.');
  }

  return prisma.filme.findUnique({
    where: { idFilme: filmeId },
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      atores: {
        include: {
          ator: true,
        },
      },
    },
  });
}

/**
 * Adiciona um novo filme e associa seus gêneros e atores.
 */
async function addFilme(filmeData) {
  const { titulo, anoLancamento, generos, atores, rating, duration } = filmeData || {};

  if (!titulo || !anoLancamento || !generos || !Array.isArray(generos) || generos.length === 0) {
    throw new Error('Dados incompletos. Título, ano de lançamento e ao menos um gênero são obrigatórios.');
  }

  const generosParaCriar = generos.map((g) => {
    if (!g.idGenero) {
      throw new Error("Cada gênero deve ter um 'idGenero'.");
    }
    return {
      principal: g.principal || false,
      genero: {
        connect: {
          idGenero: g.idGenero,
        },
      },
    };
  });

  const atoresParaCriar = (atores || []).map((a) => {
    if (!a.idAtor) {
      throw new Error("Cada ator deve ter um 'idAtor'.");
    }
    return {
      personagem: a.personagem || null,
      principal: a.principal || false,
      ator: {
        connect: {
          idAtor: a.idAtor,
        },
      },
    };
  });

  return prisma.filme.create({
    data: {
      titulo: titulo,
      anoLancamento: anoLancamento,
      rating: rating ?? 0.0,
      duration: duration ?? '120 min',
      generos: {
        create: generosParaCriar,
      },
      atores: {
        create: atoresParaCriar,
      },
    },
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      atores: {
        include: {
          ator: true,
        },
      },
    },
  });
}

/**
 * Atualiza um filme existente.
 * Se fornecer 'generos' ou 'atores', a lista passada substitui as relações
 * anteriores (deleteMany + create).
 */
async function updateFilme(id, filmeData) {
  const filmeId = parseInt(id, 10);

  if (isNaN(filmeId)) {
    throw new Error('ID do filme inválido.');
  }

  const { titulo, anoLancamento, generos, atores, rating, duration } = filmeData || {};

  const updateData = {};
  if (titulo !== undefined) updateData.titulo = titulo;
  if (anoLancamento !== undefined) updateData.anoLancamento = anoLancamento;
  if (rating !== undefined) updateData.rating = rating;
  if (duration !== undefined) updateData.duration = duration;

  if (generos && Array.isArray(generos)) {
    const generosParaCriar = generos.map((g) => {
      if (!g.idGenero) throw new Error("Cada gênero deve ter um 'idGenero'.");
      return {
        principal: g.principal || false,
        genero: {
          connect: { idGenero: g.idGenero },
        },
      };
    });

    updateData.generos = {
      deleteMany: {}, // remove relações antigas
      create: generosParaCriar,
    };
  }

  if (atores && Array.isArray(atores)) {
    const atoresParaCriar = atores.map((a) => {
      if (!a.idAtor) throw new Error("Cada ator deve ter um 'idAtor'.");
      return {
        personagem: a.personagem || null,
        principal: a.principal || false,
        ator: {
          connect: { idAtor: a.idAtor },
        },
      };
    });

    updateData.atores = {
      deleteMany: {}, // remove relações antigas
      create: atoresParaCriar,
    };
  }

  return prisma.filme.update({
    where: { idFilme: filmeId },
    data: updateData,
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      atores: {
        include: {
          ator: true,
        },
      },
    },
  });
}

/**
 * Remove um filme pelo ID.
 */
async function deleteFilme(id) {
  const filmeId = parseInt(id, 10);

  if (isNaN(filmeId)) {
    throw new Error('ID do filme inválido.');
  }

  return prisma.filme.delete({
    where: { idFilme: filmeId },
  });
}

module.exports = {
  getFilmes,
  getFilmeById,
  addFilme,
  updateFilme,
  deleteFilme,
};
