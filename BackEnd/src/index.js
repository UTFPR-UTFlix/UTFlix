const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rota para criar um novo cliente
app.post('/clientes', async (req, res) => {
  try {
    const { nome, email } = req.body; 
    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        email,
      },
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o cliente.' });
  }
});

// Rota para listar todos os clientes
app.get('/clientes', async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});