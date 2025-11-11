import express from "express";

import {
  listarGeneros,
  buscarGenero,
  criarGenero,
  atualizarGenero,
  removerGenero,
} from "../controllers/generoController.js";

const router = express.Router();

// Rotas para /generos
router.route("/")
  .get(listarGeneros)   // GET /generos
  .post(criarGenero);  // POST /generos

// Rotas para /generos/:id
router.route("/:id")
  .get(buscarGenero)     // GET /generos/1
  .put(atualizarGenero)  // PUT /generos/1
  .delete(removerGenero); // DELETE /generos/1

export default router;