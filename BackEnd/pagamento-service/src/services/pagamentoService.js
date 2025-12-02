// src/services/pagamentoService.js
import { PrismaClient } from "@prisma/client";
import Pagamento from "../entities/Pagamento.js";

const prisma = new PrismaClient();

/**
 * Lista todos os pagamentos.
 */
export async function getAllPagamentos() {
  return prisma.pagamento.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Busca um pagamento pelo ID.
 */
export async function getPagamentoById(id) {
  const pagamentoId = parseInt(id);
  if (isNaN(pagamentoId)) {
    throw new Error("ID de pagamento inválido.");
  }

  return prisma.pagamento.findUnique({
    where: { idPagamento: pagamentoId },
  });
}

/**
 * Cria um novo pagamento.
 */
export async function createPagamento(pagamentoData) {
  // 1. Cria uma instância da Entidade para validação
  const novoPagamento = new Pagamento(pagamentoData);
  novoPagamento.validar();

  return prisma.pagamento.create({
    data: {
      idCliente: novoPagamento.idCliente,
      descricao: novoPagamento.descricao,
      valor: novoPagamento.valor,
      metodoPagamento: novoPagamento.metodoPagamento,
    },
  });
}

/**
 * Atualiza um pagamento existente.
 */
export async function updatePagamento(id, pagamentoData) {
  const pagamentoId = parseInt(id);
  if (isNaN(pagamentoId)) {
    throw new Error("ID de pagamento inválido.");
  }
  
  // Filtra apenas os campos que podem ser atualizados
  const updateData = {};
  if (pagamentoData.descricao !== undefined) updateData.descricao = pagamentoData.descricao;
  if (pagamentoData.valor !== undefined) updateData.valor = parseFloat(pagamentoData.valor);
  if (pagamentoData.metodoPagamento !== undefined) updateData.metodoPagamento = pagamentoData.metodoPagamento;
  
  // Verificação de valor (opcional)
  if (updateData.valor !== undefined && updateData.valor <= 0) {
      throw new Error("O valor não pode ser negativo ou zero.");
  }

  return prisma.pagamento.update({
    where: { idPagamento: pagamentoId },
    data: updateData,
  });
}

/**
 * Deleta um pagamento.
 */
export async function deletePagamento(id) {
  const pagamentoId = parseInt(id);
  if (isNaN(pagamentoId)) {
    throw new Error("ID de pagamento inválido.");
  }

  // Não há necessidade de verificação de uso, pois pagamento é um registro isolado.
  return prisma.pagamento.delete({
    where: { idPagamento: pagamentoId },
  });
}