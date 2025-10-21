const clienteService = require("../services/clienteService");

async function listar(req, res) {
  try {
    const clientes = await clienteService.listarClientes();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar clientes." });
  }
}

async function criar(req, res) {
  try {
    const { nome, email } = req.body;
    const cliente = await clienteService.criarCliente(nome, email);
    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar cliente." });
  }
}

module.exports = { listar, criar };
