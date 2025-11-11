const clienteService = require("../services/clienteService");
const { Prisma } = require("@prisma/client"); // Para tratar erros do Prisma

async function listar(req, res) {
  try {
    const clientes = await clienteService.listarClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar clientes." });
  }
}

/**
 * Controlador para REGISTRO
 */
async function criar(req, res) {
  try {
    const { nome, email, senha } = req.body;
    const cliente = await clienteService.criarCliente(nome, email, senha);
    res.status(201).json(cliente);
  } catch (error) {
    // Trata erro de email duplicado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return res.status(409).json({ error: "Email já cadastrado." });
    }
    res.status(400).json({ error: error.message });
  }
}

/**
 * Controlador para LOGIN
 */
async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const { token } = await clienteService.loginCliente(email, senha);
    res.status(200).json({ token });
  } catch (error) {
    // Erro de "Email ou senha inválidos." vem do service
    res.status(401).json({ error: error.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const cliente = await clienteService.getClienteById(id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: "Cliente não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const cliente = await clienteService.updateCliente(id, data);
    res.status(200).json(cliente);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    res.status(400).json({ error: error.message });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;
    await clienteService.deleteCliente(id);
    res.status(204).send(); // 204 No Content
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }
    res.status(500).json({ error: error.message });
  }
}

// --- Controladores de Favoritos ---

async function adicionarFavorito(req, res) {
  try {
    const { id: idCliente } = req.params; // ID do cliente vindo da URL
    const { idFilme } = req.body; // ID do filme vindo do body

    if (!idFilme) {
      return res.status(400).json({ error: "O 'idFilme' é obrigatório no body." });
    }

    await clienteService.addFilmeFavorito(idCliente, idFilme);
    res.status(201).json({ message: "Filme favoritado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function removerFavorito(req, res) {
  try {
    const { id: idCliente, idFilme } = req.params; // IDs vêm da URL

    await clienteService.removeFilmeFavorito(idCliente, idFilme);
    res.status(204).send();
  } catch (error) {
    // Se o favorito não existir para deletar
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({ error: "Favorito não encontrado." });
    }
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listar,
  criar,
  login,
  buscarPorId,
  atualizar,
  deletar,
  adicionarFavorito,
  removerFavorito,
};