import express from "express";

import {
  listarAtores,
  buscarAtor,
  criarAtor,
  atualizarAtor,
  removerAtor,
} from "../controllers/atorController.js";

const router = express.Router();

// Rotas para /atores
router.route("/")
  .get(listarAtores)   // GET /atores
  .post(criarAtor);  // POST /atores

// Rotas para /atores/:id
router.route("/:id")
  .get(buscarAtor)     // GET /atores/1
  .put(atualizarAtor)   // PUT /atores/1
  .delete(removerAtor); // DELETE /atores/1

export default router;