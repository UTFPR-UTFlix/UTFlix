import express from "express";
import { listarFilmes, criarFilme } from "../controllers/filmeController.js";
const router = express.Router();

router.get("/", listarFilmes);
router.post("/", criarFilme);

export default router;
