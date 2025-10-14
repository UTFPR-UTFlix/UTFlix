const express = require('express');
const { PrismaClient } = require('@prisma/client');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const prisma = new PrismaClient();

// Configuração do Swagger
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UTFlix API',
      version: '1.0.0',
      description: 'Documentação da API do projeto UTFlix',
    },
  },
  apis: ['./src/index.js'],
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

// ===== ROTAS =====

/**
 * @swagger
 * /filmes:
 *   get:
 *     summary: Retorna todos os filmes
 *     description: Lista de filmes disponíveis
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 */
app.get('/filmes', (req, res) => {
  res.json([{ id: 1, nome: 'Matrix' }]);
});

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     description: Retorna todos os clientes cadastrados no banco
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 */
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível listar os clientes.' });
  }
});

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Adiciona um cliente ao banco de dados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       500:
 *         description: Não foi possível criar o cliente
 */
app.post('/clientes', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoCliente = await prisma.cliente.create({
      data: { nome, email },
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível criar o cliente.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
