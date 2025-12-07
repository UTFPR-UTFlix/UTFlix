export function pagamentoToResponseDTO(p) {
  if (!p) return null;
  return {
    idPagamento: p.idPagamento,
    idCliente: p.idCliente,
    descricao: p.descricao,
    valor: p.valor,
    metodoPagamento: p.metodoPagamento,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
}

export function normalizeCreatePagamentoDTO(body, idCliente) {
  return {
    idCliente: String(idCliente),
    descricao: String(body.descricao || ""),
    valor: Number(body.valor),
    metodoPagamento: String(body.metodoPagamento || "")
  };
}