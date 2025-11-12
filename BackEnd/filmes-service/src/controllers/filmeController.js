import {
  getFilmes,
  addFilme,
  getFilmeById,
  updateFilme,
  deleteFilme,
} from "../services/filmeService.js";
import { Prisma } from "@prisma/client";

/**
 * Lista todos os filmes.
 * Rota: GET /filmes
 */
export async function listarFilmes(req, res) {
  try {
    const filmes = await getFilmes();
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filmes.", error: error.message });
  }
}

/**
 * Busca e retorna um filme específico pelo ID.
 * Rota: GET /filmes/:id
 */
export async function buscarFilme(req, res) {
  try {
    const { id } = req.params;
    const filme = await getFilmeById(id);

    if (filme) {
      res.status(200).json(filme);
    } else {
      // Retorna 404 se o filme não for encontrado
      res.status(404).json({ message: "Filme não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filme.", error: error.message });
  }
}

/**
 * Cria um novo filme.
 * Rota: POST /filmes
 * * Exemplo de Body:
 * {
 * "titulo": "Matrix",
 * "anoLancamento": 1999,
 * "generos": [
 * { "idGenero": 1, "principal": true },
 * { "idGenero": 2, "principal": false }
 * ]
 * }
 */
export async function criarFilme(req, res) {
  try {
    const filmeData = req.body;

    // Passa o objeto 'filmeData' inteiro para o service
    const filme = await addFilme(filmeData);
    
    // 201 Created é o status HTTP correto para criação
    res.status(201).json(filme);
  } catch (error) {
    // 400 Bad Request é comum para falhas de validação ou dados faltando
    res.status(400).json({ message: "Erro ao criar filme.", error: error.message });
  }
}

/**
 * Atualiza um filme existente pelo ID.
 * Rota: PUT /filmes/:id
 */
export async function atualizarFilme(req, res) {
  try {
    const { id } = req.params;
    const filmeData = req.body; // Contém { titulo?, anoLancamento?, generos? }

    const filmeAtualizado = await updateFilme(id, filmeData);
    res.status(200).json(filmeAtualizado);
  } catch (error) {
    // P2025 é o código de erro do Prisma para "Registro não encontrado"
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      res.status(404).json({ message: "Filme não encontrado para atualização." });
    } else {
      res.status(400).json({ message: "Erro ao atualizar filme.", error: error.message });
    }
  }
}

/**
 * Remove um filme pelo ID.
 * Rota: DELETE /filmes/:id
 */
export async function removerFilme(req, res) {
  try {
    const { id } = req.params;
    await deleteFilme(id);
    
    // 204 No Content é a resposta padrão para DELETE bem-sucedido
    res.status(204).send(); 
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      res.status(404).json({ message: "Filme não encontrado para remoção." });
    } else {
      res.status(500).json({ message: "Erro ao remover filme.", error: error.message });
    }
  }
}