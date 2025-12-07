import { body, validationResult } from "express-validator";

const METODOS = ["CREDITO", "PIX", "BOLETO", "DEBITO"];

export const createPagamentoValidator = [
  body("descricao").isString().trim().notEmpty().withMessage("Descrição é obrigatória."),
  body("valor").isFloat({ gt: 0 }).withMessage("Valor deve ser um número positivo."),
  body("metodoPagamento").isIn(METODOS).withMessage(`Método inválido. Use: ${METODOS.join(", ")}.`),
];

export const updatePagamentoValidator = [
  body("descricao").optional().isString().trim().notEmpty().withMessage("Descrição não pode ser vazia."),
  body("valor").optional().isFloat({ gt: 0 }).withMessage("Valor deve ser positivo."),
  body("metodoPagamento").optional().isIn(METODOS).withMessage(`Método inválido. Use: ${METODOS.join(", ")}.`),
];

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({ message: "Payload inválido.", errors: errors.array() });
}