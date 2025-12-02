// src/index.js
import express from "express";
import cors from "cors";
import pagamentoRoutes from "./routes/pagamentoRoutes.js";

const app = express();
const PORT = 3002;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite que o Express leia o corpo da requisição em JSON

// Rota de saúde simples
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Pagamento Service rodando! Versão 1.0' });
});

// Rotas do Serviço de Pagamento
app.use("/pagamentos", pagamentoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`[Pagamento Service] rodando em http://localhost:${PORT}`);
});

export default app; // Exporta para testes (como você fez no filmes-service)