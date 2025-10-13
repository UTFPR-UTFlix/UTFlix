const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UTFlix API",
      version: "1.0.0",
      description: "Documentação da API do projeto UTFlix"
    },
  },
  apis: ["./index.js"], // ou outro caminho onde ficam suas rotas
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(express.json())

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Retorna todos os filmes
 *     responses:
 *       200:
 *         description: Lista de filmes
 */
app.get("/filmes", (req, res) => {
  res.json([{ id: 1, nome: "Matrix" }]);
});

// Rota para criar um novo cliente
app.post('/clientes', async (req, res) => {
  try {
    const { nome, email } = req.body
    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        email
      }
    })
    res.status(201).json(novoCliente)
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o cliente.' })
  }
})

// Rota para listar todos os clientes
app.get('/clientes', async (req, res) => {
  const clientes = await prisma.cliente.findMany()
  res.json(clientes)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
