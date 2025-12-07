// src/controllers/filmeController.js
const {
  getFilmes,
  addFilme,
  getFilmeById,
  updateFilme,
  deleteFilme,
} = require('../services/filmeService');
const { Prisma } = require('@prisma/client');

/**
 * Lista todos os filmes.
 * Rota: GET /filmes
 */
async function listarFilmes(req, res) {
  try {
    const filmes = await getFilmes();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar filmes.', error: error.message });
  }
}

/**
 * Busca e retorna um filme específico pelo ID.
 * Rota: GET /filmes/:id
 */
async function buscarFilme(req, res) {
  try {
    const { id } = req.params;
    const filme = await getFilmeById(id);

    if (filme) {
      res.status(200).json(filme);
    } else {
      res.status(404).json({ message: 'Filme não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar filme.', error: error.message });
  }
}

/**
 * Cria um novo filme.
 * Rota: POST /filmes
 */
async function criarFilme(req, res) {
  try {
    const filmeData = req.body;
    const filme = await addFilme(filmeData);
    res.status(201).json(filme);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar filme.', error: error.message });
  }
}

/**
 * Atualiza um filme existente pelo ID.
 * Rota: PUT /filmes/:id
 */
async function atualizarFilme(req, res) {
  try {
    const { id } = req.params;
    const filmeData = req.body;
    const filmeAtualizado = await updateFilme(id, filmeData);
    res.status(200).json(filmeAtualizado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Filme não encontrado para atualização.' });
    } else {
      res.status(400).json({ message: 'Erro ao atualizar filme.', error: error.message });
    }
  }
}

/**
 * Remove um filme pelo ID.
 * Rota: DELETE /filmes/:id
 */
async function removerFilme(req, res) {
  try {
    const { id } = req.params;
    await deleteFilme(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Filme não encontrado para remoção.' });
    } else {
      res.status(500).json({ message: 'Erro ao remover filme.', error: error.message });
    }
  }
}

module.exports = {
  listarFilmes,
  buscarFilme,
  criarFilme,
  atualizarFilme,
  removerFilme,
};
