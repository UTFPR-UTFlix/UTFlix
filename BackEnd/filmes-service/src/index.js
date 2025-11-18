import express from "express";
import routerFilmes from "./routes/filmeRoutes.js";
import generoRouter from './routes/generoRouter.js';
import atorRouter from './routes/atorRoutes.js'; // 1. IMPORTAR
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/filmes", routerFilmes);
app.use("/generos", generoRouter);
app.use("/atores", atorRouter); // 2. USAR

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🎬 Filme service rodando na porta ${PORT}`));