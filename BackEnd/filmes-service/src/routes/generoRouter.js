// src/routes/generoRoutes.js
const express = require('express');
const {
  listarGeneros,
  buscarGenero,
  criarGenero,
  atualizarGenero,
  removerGenero,
} = require('../controllers/generoController');

const router = express.Router();

// Rotas para /generos
router
  .route('/')
  .get(listarGeneros)   // GET /generos
  .post(criarGenero);   // POST /generos

// Rotas para /generos/:id
router
  .route('/:id')
  .get(buscarGenero)     // GET /generos/1
  .put(atualizarGenero)  // PUT /generos/1
  .delete(removerGenero); // DELETE /generos/1

module.exports = router;
