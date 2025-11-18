const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use uma chave secreta do seu .env, ou um valor padrão (NÃO RECOMENDADO EM PRODUÇÃO)
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Cria um novo cliente (Registro)
 * Criptografa a senha antes de salvar.
 */
async function criarCliente(nome, email, senha) {
  if (!nome || !email || !senha) {
    throw new Error("Nome, email e senha são obrigatórios.");
  }

  // Gera o "sal" e cria o hash da senha
  const salt = await bcrypt.genSalt(10);
  const senhaHash = await bcrypt.hash(senha, salt);

  return prisma.cliente.create({
    data: {
      nome,
      email,
      senha: senhaHash, // Salva a senha criptografada
    },
    // Retorna o cliente sem a senha
    select: {
      id: true,
      nome: true,
      email: true,
      createdAt: true,
    },
  });
}

/**
 * Autentica um cliente (Login)
 * Retorna um token JWT se a senha estiver correta.
 */
async function loginCliente(email, senha) {
  const cliente = await prisma.cliente.findUnique({
    where: { email },
  });

  // 1. Verifica se o cliente existe
  if (!cliente) {
    throw new Error("Email ou senha inválidos.");
  }

  // 2. Compara a senha enviada com o hash salvo no banco
  const isMatch = await bcrypt.compare(senha, cliente.senha);
  if (!isMatch) {
    throw new Error("Email ou senha inválidos.");
  }

  // 3. Gera o token JWT
  const token = jwt.sign(
    { idCliente: cliente.id, email: cliente.email },
    JWT_SECRET,
    { expiresIn: "1h" } // Token expira em 1 hora
  );

  return { token, idCliente: cliente.id };
}

/**
 * Lista todos os clientes (sem a senha).
 */
async function listarClientes() {
  return prisma.cliente.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      createdAt: true,
    },
  });
}

/**
 * Busca um cliente pelo ID.
 */
async function getClienteById(id) {
  const clienteId = parseInt(id);
  if (isNaN(clienteId)) throw new Error("ID inválido.");

  return prisma.cliente.findUnique({
    where: { id: clienteId },
    select: {
      id: true,
      nome: true,
      email: true,
      createdAt: true,
      // Inclui os IDs dos filmes favoritos
      filmesFavoritos: {
        select: {
          idFilme: true,
        },
      },
    },
  });
}

/**
 * Atualiza um cliente (nome ou email).
 */
async function updateCliente(id, data) {
  const clienteId = parseInt(id);
  if (isNaN(clienteId)) throw new Error("ID inválido.");

  // Remove a senha do objeto de dados, se ela foi enviada
  // (A senha deve ser trocada em uma rota específica, não em um update comum)
  // eslint-disable-next-line no-unused-vars
  const { senha: _senha, ...dadosParaAtualizar } = data;

  return prisma.cliente.update({
    where: { id: clienteId },
    data: dadosParaAtualizar,
    select: {
      id: true,
      nome: true,
      email: true,
    },
  });
}

/**
 * Remove um cliente do banco.
 */
async function deleteCliente(id) {
  const clienteId = parseInt(id);
  if (isNaN(clienteId)) throw new Error("ID inválido.");

  return prisma.cliente.delete({
    where: { id: clienteId },
  });
}

// --- Funções de Filmes Favoritos ---

/**
 * Adiciona um filme à lista de favoritos de um cliente.
 */
async function addFilmeFavorito(idCliente, idFilme) {
  const clienteId = parseInt(idCliente);
  const filmeId = parseInt(idFilme);

  // 'upsert' evita erros se o filme já foi favoritado.
  // Ele tenta criar; se o '@@unique' falhar, ele não faz nada (update: {}).
  return prisma.clienteFilmeFavorito.upsert({
    where: {
      idCliente_idFilme: { idCliente: clienteId, idFilme: filmeId },
    },
    update: {}, // Não faz nada se já existe
    create: {
      idCliente: clienteId,
      idFilme: filmeId,
    },
  });
}

/**
 * Remove um filme da lista de favoritos.
 */
async function removeFilmeFavorito(idCliente, idFilme) {
  const clienteId = parseInt(idCliente);
  const filmeId = parseInt(idFilme);

  return prisma.clienteFilmeFavorito.delete({
    where: {
      idCliente_idFilme: { idCliente: clienteId, idFilme: filmeId },
    },
  });
}

async function getFavoritosCliente(idCliente) {
  const clienteId = parseInt(idCliente);
  if (isNaN(clienteId)) throw new Error("ID inválido.");
  const favoritos = await prisma.clienteFilmeFavorito.findMany({
    where: { idCliente: clienteId },
    select: { idFilme: true },
  });
  return favoritos.map(f => f.idFilme);
}

module.exports = {
  listarClientes,
  criarCliente,
  loginCliente,
  getClienteById,
  updateCliente,
  deleteCliente,
  addFilmeFavorito,
  removeFilmeFavorito,
  getFavoritosCliente,
  // (getClienteById já retorna a lista de favoritos)
};