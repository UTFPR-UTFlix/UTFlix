import express from "express";
import router from "./routes/filmeRoutes.js";

const app = express();
app.use(express.json());
app.use("/filmes", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🎬 Filme service rodando na porta ${PORT}`));
