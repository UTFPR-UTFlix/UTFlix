import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Lista todos os filmes, incluindo gêneros e atores.
 */
export async function getFilmes() {
  return prisma.filme.findMany({
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      // ADICIONAR ESTA SEÇÃO
      atores: {
        include: {
          ator: true, // Traz os detalhes do ator (ex: nome)
        },
      },
    },
  });
}

/**
 * Busca um único filme pelo seu ID, incluindo gêneros e atores.
 */
export async function getFilmeById(id) {
  const filmeId = parseInt(id);

  if (isNaN(filmeId)) {
    throw new Error("ID do filme inválido.");
  }

  return prisma.filme.findUnique({
    where: { idFilme: filmeId },
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      // ADICIONAR ESTA SEÇÃO
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
 * @param {object} filmeData - Os dados do filme.
 * ...
 * @param {Array<object>} [filmeData.atores] - Array de atores para associar.
 * @param {number} filmeData.atores[].idAtor - O ID do ator a conectar.
 * @param {string} [filmeData.atores[].personagem] - O nome do personagem.
 * @param {boolean} [filmeData.atores[].principal] - Se é o ator principal.
 */
export async function addFilme(filmeData) {
  // 1. DESESTRUTURAR 'atores'
  const { titulo, anoLancamento, generos, atores, rating, duration } = filmeData;

  // 2. ATUALIZAR VALIDAÇÃO
  if (!titulo || !anoLancamento || !generos || !Array.isArray(generos) || generos.length === 0) {
    throw new Error("Dados incompletos. Título, ano de lançamento e ao menos um gênero são obrigatórios.");
  }

  // 3. MAPEAR GÊNEROS (como antes)
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

  // 4. ADICIONAR MAPEAMENTO DE ATORES
  const atoresParaCriar = (atores || []).map((a) => {
    if (!a.idAtor) {
      throw new Error("Cada ator deve ter um 'idAtor'.");
    }
    return {
      personagem: a.personagem || null, // Pega o nome do personagem
      principal: a.principal || false,
      ator: {
        connect: {
          idAtor: a.idAtor,
        },
      },
    };
  });

  // 5. ATUALIZAR O 'create'
  return prisma.filme.create({
    data: {
      titulo: titulo,
      anoLancamento: anoLancamento,
      rating: rating ?? 0.0,
      duration: duration ?? "120 min",
      generos: {
        create: generosParaCriar,
      },
      atores: {
        create: atoresParaCriar,
      },
    },
    include: { // Manter includes para retornar o objeto completo
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
 * Permite atualizar título, ano, gêneros e/ou atores.
 * ...
 * @param {Array<object>} [filmeData.atores] - A *nova lista completa* de atores.
 */
export async function updateFilme(id, filmeData) {
  const filmeId = parseInt(id);
  
  if (isNaN(filmeId)) {
    throw new Error("ID do filme inválido.");
  }

  // 1. DESESTRUTURAR 'atores'
  const { titulo, anoLancamento, generos, atores, rating, duration } = filmeData;

  // 2. PREPARAR DADOS BÁSICOS (como antes)
  const updateData = {};
  if (titulo !== undefined) {
    updateData.titulo = titulo;
  }
  if (anoLancamento !== undefined) {
    updateData.anoLancamento = anoLancamento;
  }
  if (rating !== undefined) {
    updateData.rating = rating;
  }
  if (duration !== undefined) {
    updateData.duration = duration;
  }

  // 3. ATUALIZAR GÊNEROS (como antes)
  if (generos && Array.isArray(generos)) {
    const generosParaCriar = generos.map((g) => {
      if (!g.idGenero) {
        throw new Error("Cada gênero deve ter um 'idGenero'.");
      }
      return {
        principal: g.principal || false,
        genero: {
          connect: { idGenero: g.idGenero },
        },
      };
    });

    updateData.generos = {
      deleteMany: {},
      create: generosParaCriar,
    };
  }

  // 4. ADICIONAR ATUALIZAÇÃO DE ATORES
  if (atores && Array.isArray(atores)) {
    
    // Mapeia os atores para o formato de 'create' do Prisma
    const atoresParaCriar = atores.map((a) => {
      if (!a.idAtor) {
        throw new Error("Cada ator deve ter um 'idAtor'.");
      }
      return {
        personagem: a.personagem || null,
        principal: a.principal || false,
        ator: {
          connect: { idAtor: a.idAtor },
        },
      };
    });

    // Adiciona a operação de relação ao 'updateData'
    updateData.atores = {
      deleteMany: {}, // Deleta todas as relações antigas
      create: atoresParaCriar, // Cria as novas relações
    };
  }

  // 5. EXECUTAR ATUALIZAÇÃO (com includes atualizados)
  return prisma.filme.update({
    where: { idFilme: filmeId },
    data: updateData,
    include: {
      generos: {
        include: {
          genero: true,
        },
      },
      atores: { // ADICIONAR ESTE INCLUDE
        include: {
          ator: true,
        },
      },
    },
  });
}

/**
 * Remove um filme (como antes - sem mudanças necessárias)
 */
export async function deleteFilme(id) {
  const filmeId = parseInt(id);

  if (isNaN(filmeId)) {
    throw new Error("ID do filme inválido.");
  }

  // 'onDelete: Cascade' cuidará de remover
  // entradas em 'FilmeGenero' e 'FilmeAtor'.
  return prisma.filme.delete({
    where: { idFilme: filmeId },
  });
}