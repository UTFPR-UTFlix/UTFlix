function clienteToResponseDTO(c) {
  if (!c) return null;
  return {
    id: c.id,
    nome: c.nome,
    email: c.email,
    createdAt: c.createdAt,
    favoritos: Array.isArray(c.filmesFavoritos)
      ? c.filmesFavoritos.map(f => f.idFilme)
      : undefined
  };
}

module.exports = { clienteToResponseDTO };