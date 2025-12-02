// src/controllers/pagamentoController.js
import {
  getAllPagamentos,
  getPagamentoById,
  createPagamento,
  updatePagamento,
  deletePagamento,
} from "../services/pagamentoService.js";
import { Prisma } from "@prisma/client";

/**
 * Rota: GET /pagamentos
 */
export async function listarPagamentos(req, res) {
  try {
    const pagamentos = await getAllPagamentos();
    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pagamentos.", error: error.message });
  }
}

/**
 * Rota: GET /pagamentos/:id
 */
export async function buscarPagamento(req, res) {
  try {
    const { id } = req.params;
    const pagamento = await getPagamentoById(id);

    if (pagamento) {
      res.status(200).json(pagamento);
    } else {
      res.status(404).json({ message: "Pagamento não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pagamento.", error: error.message });
  }
}

/**
 * Rota: POST /pagamentos
 * Body: { idCliente: "...", descricao: "...", valor: 99.99, metodoPagamento: "..." }
 */
export async function criarPagamento(req, res) {
  try {
    const pagamentoData = req.body;
    const novoPagamento = await createPagamento(pagamentoData);
    res.status(201).json(novoPagamento);
  } catch (error) {
    // Erros de validação customizada (como valor <= 0)
    if (error.message.includes("inválidos") || error.message.includes("valor")) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Erro ao criar pagamento.", error: error.message });
    }
  }
}

/**
 * Rota: PUT /pagamentos/:id
 */
export async function atualizarPagamento(req, res) {
  try {
    const { id } = req.params;
    const pagamentoData = req.body;
    const pagamentoAtualizado = await updatePagamento(id, pagamentoData);
    res.status(200).json(pagamentoAtualizado);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      res.status(404).json({ message: "Pagamento não encontrado para atualização." });
    } else {
      res.status(400).json({ message: "Erro ao atualizar pagamento.", error: error.message });
    }
  }
}

/**
 * Rota: DELETE /pagamentos/:id
 */
export async function removerPagamento(req, res) {
  try {
    const { id } = req.params;
    await deletePagamento(id);
    res.status(204).send(); // Sucesso, sem conteúdo
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      res.status(404).json({ message: "Pagamento não encontrado para remoção." });
    } else {
      res.status(500).json({ message: "Erro ao remover pagamento.", error: error.message });
    }
  }
}