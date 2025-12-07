const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const auth = require("../middleware/auth");
const { registrarValidator, loginValidator, updateClienteValidator, favoritoValidator, handleValidationErrors } = require("../validators/clienteValidators");

// Rotas de Autenticação
router.post("/registrar", registrarValidator, handleValidationErrors, clienteController.criar); // POST /clientes/registrar
router.post("/login", loginValidator, handleValidationErrors, clienteController.login);     // POST /clientes/login

// Rotas de CRUD
router.get("/", clienteController.listar);
router.get("/:id", auth, auth.ensureSelf, clienteController.buscarPorId);
router.put("/:id", auth, auth.ensureSelf, updateClienteValidator, handleValidationErrors, clienteController.atualizar);
router.delete("/:id", auth, auth.ensureSelf, clienteController.deletar);

// Rotas de Favoritos
router.get("/:id/favoritos", auth, auth.ensureSelf, clienteController.listarFavoritos);
router.post("/:id/favoritos", auth, auth.ensureSelf, favoritoValidator, handleValidationErrors, clienteController.adicionarFavorito);
router.delete("/:id/favoritos/:idFilme", auth, auth.ensureSelf, clienteController.removerFavorito);

module.exports = router;