// src/controllers/generoController.js
const {
  getAllGeneros,
  getGeneroById,
  createGenero,
  updateGenero,
  deleteGenero,
} = require('../services/generoService');
const { Prisma } = require('@prisma/client');

/**
 * Rota: GET /generos
 */
async function listarGeneros(req, res) {
  try {
    const generos = await getAllGeneros();
    res.status(200).json(generos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar gêneros.', error: error.message });
  }
}

/**
 * Rota: GET /generos/:id
 */
async function buscarGenero(req, res) {
  try {
    const { id } = req.params;
    const genero = await getGeneroById(id);

    if (genero) {
      res.status(200).json(genero);
    } else {
      res.status(404).json({ message: 'Gênero não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar gênero.', error: error.message });
  }
}

/**
 * Rota: POST /generos
 * Body: { "genero": "Aventura" }
 */
async function criarGenero(req, res) {
  try {
    const generoData = req.body;
    const novoGenero = await createGenero(generoData);
    res.status(201).json(novoGenero);
  } catch (error) {
    // P2002 é o código de erro do Prisma para "Unique constraint failed"
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ message: 'Erro: Gênero com este nome já existe.' });
    } else {
      res.status(400).json({ message: 'Erro ao criar gênero.', error: error.message });
    }
  }
}

/**
 * Rota: PUT /generos/:id
 * Body: { "genero": "Aventura Sci-Fi" }
 */
async function atualizarGenero(req, res) {
  try {
    const { id } = req.params;
    const generoData = req.body;
    const generoAtualizado = await updateGenero(id, generoData);
    res.status(200).json(generoAtualizado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Não encontrado
        res.status(404).json({ message: 'Gênero não encontrado para atualização.' });
      } else if (error.code === 'P2002') { // Já existe
        res.status(409).json({ message: 'Erro: Gênero com este nome já existe.' });
      } else {
        res.status(400).json({ message: 'Erro ao atualizar gênero.', error: error.message });
      }
    } else {
      res.status(400).json({ message: 'Erro ao atualizar gênero.', error: error.message });
    }
  }
}

/**
 * Rota: DELETE /generos/:id
 */
async function removerGenero(req, res) {
  try {
    const { id } = req.params;
    await deleteGenero(id);
    res.status(204).send(); // Sucesso, sem conteúdo
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Gênero não encontrado para remoção.' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = {
  listarGeneros,
  buscarGenero,
  criarGenero,
  atualizarGenero,
  removerGenero,
};
