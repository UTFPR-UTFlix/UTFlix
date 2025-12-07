// src/routes/filmeRoutes.js
const express = require('express');
// 1. Importar todos os métodos do controller (CommonJS)
const {
  listarFilmes,
  criarFilme,
  buscarFilme,
  atualizarFilme,
  removerFilme,
} = require('../controllers/filmeController');

const router = express.Router();

// 2. Agrupar rotas por caminho

// Rotas para a raiz (ex: /filmes)
router
  .route('/')
  .get(listarFilmes)    // GET /filmes
  .post(criarFilme);    // POST /filmes

// Rotas que exigem um ID (ex: /filmes/123)
router
  .route('/:id')
  .get(buscarFilme)      // GET /filmes/123
  .put(atualizarFilme)   // PUT /filmes/123
  .delete(removerFilme); // DELETE /filmes/123

module.exports = router;
