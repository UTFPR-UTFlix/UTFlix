const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");

// Rotas de Autenticação
router.post("/registrar", clienteController.criar); // POST /clientes/registrar
router.post("/login", clienteController.login);     // POST /clientes/login

// Rotas de CRUD
router.get("/", clienteController.listar);          // GET /clientes
router.get("/:id", clienteController.buscarPorId);  // GET /clientes/1
router.put("/:id", clienteController.atualizar);    // PUT /clientes/1
router.delete("/:id", clienteController.deletar);   // DELETE /clientes/1

// Rotas de Favoritos
// (Nota: Em um sistema real, o 'idCliente' viria do token JWT, não da URL)
router.post("/:id/favoritos", clienteController.adicionarFavorito);        // POST /clientes/1/favoritos (Body: { "idFilme": 123 })
router.delete("/:id/favoritos/:idFilme", clienteController.removerFavorito); // DELETE /clientes/1/favoritos/123

module.exports = router;