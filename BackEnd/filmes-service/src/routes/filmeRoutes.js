import express from "express";

// 1. Importar todos os métodos do controller
import {
  listarFilmes,
  criarFilme,
  buscarFilme,
  atualizarFilme,
  removerFilme,
} from "../controllers/filmeController.js";

const router = express.Router();

// 2. Agrupar rotas por caminho

// Rotas para a raiz (ex: /filmes)
router.route("/")
  .get(listarFilmes)    // GET /filmes
  .post(criarFilme);   // POST /filmes

// Rotas que exigem um ID (ex: /filmes/123)
router.route("/:id")
  .get(buscarFilme)      // GET /filmes/123
  .put(atualizarFilme)   // PUT /filmes/123
  .delete(removerFilme); // DELETE /filmes/123

export default router;