// src/routes/pagamentoRoutes.js
import express from "express";

import {
  listarPagamentos,
  buscarPagamento,
  criarPagamento,
  atualizarPagamento,
  removerPagamento,
} from "../controllers/pagamentoController.js";
import auth from "../middleware/auth.js";
import { createPagamentoValidator, updatePagamentoValidator, handleValidationErrors } from "../validators/pagamentoValidators.js";

const router = express.Router();
router.use(auth);

router.route("/")
  .get(listarPagamentos)
  .post(createPagamentoValidator, handleValidationErrors, criarPagamento);

router.route("/:id")
  .get(buscarPagamento)
  .put(updatePagamentoValidator, handleValidationErrors, atualizarPagamento)
  .delete(removerPagamento);

export default router;