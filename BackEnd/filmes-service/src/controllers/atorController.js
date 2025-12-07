// src/controllers/atorController.js
const {
  getAllAtores,
  getAtorById,
  createAtor,
  updateAtor,
  deleteAtor,
} = require('../services/atorService');
const { Prisma } = require('@prisma/client');

/**
 * Rota: GET /atores
 */
async function listarAtores(req, res) {
  try {
    const atores = await getAllAtores();
    res.status(200).json(atores);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar atores.', error: error.message });
  }
}

/**
 * Rota: GET /atores/:id
 */
async function buscarAtor(req, res) {
  try {
    const { id } = req.params;
    const ator = await getAtorById(id);

    if (ator) {
      res.status(200).json(ator);
    } else {
      res.status(404).json({ message: 'Ator não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar ator.', error: error.message });
  }
}

/**
 * Rota: POST /atores
 * Body: { "nome": "Keanu Reeves" }
 */
async function criarAtor(req, res) {
  try {
    const atorData = req.body;
    const novoAtor = await createAtor(atorData);
    res.status(201).json(novoAtor);
  } catch (error) {
    // P2002 é o código de erro do Prisma para "Unique constraint failed"
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(409).json({ message: 'Erro: Ator com este nome já existe.' });
    } else {
      res.status(400).json({ message: 'Erro ao criar ator.', error: error.message });
    }
  }
}

/**
 * Rota: PUT /atores/:id
 * Body: { "nome": "Keanu C. Reeves" }
 */
async function atualizarAtor(req, res) {
  try {
    const { id } = req.params;
    const atorData = req.body;
    const atorAtualizado = await updateAtor(id, atorData);
    res.status(200).json(atorAtualizado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Ator não encontrado para atualização.' });
    } else {
      res.status(400).json({ message: 'Erro ao atualizar ator.', error: error.message });
    }
  }
}

/**
 * Rota: DELETE /atores/:id
 */
async function removerAtor(req, res) {
  try {
    const { id } = req.params;
    await deleteAtor(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Ator não encontrado para remoção.' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = {
  listarAtores,
  buscarAtor,
  criarAtor,
  atualizarAtor,
  removerAtor,
};
