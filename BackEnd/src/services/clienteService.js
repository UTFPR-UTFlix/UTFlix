const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function listarClientes () {
  return prisma.cliente.findMany()
}

async function criarCliente (nome, email) {
  return prisma.cliente.create({ data: { nome, email } })
}

module.exports = { listarClientes, criarCliente }
