import { getFilmes, addFilme } from "../services/filmeService.js";

export async function listarFilmes(req, res) {
  const filmes = await getFilmes();
  res.json(filmes);
}

export async function criarFilme(req, res) {
  const { titulo, genero, ano } = req.body;
  const filme = await addFilme(titulo, genero, ano);
  res.json(filme);
}
