const { body, validationResult, param } = require("express-validator");

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ error: "Payload inválido.", errors: errors.array() });
}

const registrarValidator = [
  body("nome").isString().trim().notEmpty().withMessage("Nome é obrigatório."),
  body("email").isEmail().withMessage("Email inválido."),
  body("senha").isString().isLength({ min: 6 }).withMessage("Senha deve ter ao menos 6 caracteres."),
];

const loginValidator = [
  body("email").isEmail().withMessage("Email inválido."),
  body("senha").isString().notEmpty().withMessage("Senha é obrigatória."),
];

const updateClienteValidator = [
  param("id").isInt({ gt: 0 }).withMessage("ID inválido."),
  body("nome").optional().isString().trim().notEmpty().withMessage("Nome não pode ser vazio."),
  body("email").optional().isEmail().withMessage("Email inválido."),
];

const favoritoValidator = [
  param("id").isInt({ gt: 0 }).withMessage("ID inválido."),
  body("idFilme").isInt({ gt: 0 }).withMessage("idFilme deve ser inteiro positivo."),
];

module.exports = {
  registrarValidator,
  loginValidator,
  updateClienteValidator,
  favoritoValidator,
  handleValidationErrors
};