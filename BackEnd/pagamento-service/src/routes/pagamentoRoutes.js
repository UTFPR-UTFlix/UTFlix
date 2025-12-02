// src/routes/pagamentoRoutes.js
import express from "express";

import {
  listarPagamentos,
  buscarPagamento,
  criarPagamento,
  atualizarPagamento,
  removerPagamento,
} from "../controllers/pagamentoController.js";

const router = express.Router();

// Rotas para /pagamentos
router.route("/")
  .get(listarPagamentos) 
  .post(criarPagamento);

// Rotas para /pagamentos/:id
router.route("/:id")
  .get(buscarPagamento)
  .put(atualizarPagamento)
  .delete(removerPagamento);

export default router;