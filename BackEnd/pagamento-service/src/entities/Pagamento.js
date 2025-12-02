// src/entities/Pagamento.js

/**
 * Tipos de métodos de pagamento permitidos.
 * @readonly
 * @enum {string}
 */
const MetodosPagamento = {
  CREDITO: 'CREDITO',
  PIX: 'PIX',
  BOLETO: 'BOLETO',
  DEBITO: 'DEBITO',
};

class Pagamento {
  /**
   * @param {object} props
   * @param {number | null} [props.idPagamento] - ID próprio da classe (autoincrementável).
   * @param {string} props.idCliente - ID do cliente que efetuou o pagamento.
   * @param {string} props.descricao - Descrição do que está sendo pago (ex: "Assinatura Mensal").
   * @param {number} props.valor - O valor do pagamento.
   * @param {string} props.metodoPagamento - Ex: "Cartão", "Pix", "Boleto".
   */
  constructor({ idCliente, descricao, valor, metodoPagamento, idPagamento = null }) {
    this.idPagamento = idPagamento;
    // Garante que o idCliente seja string, como no schema.prisma
    this.idCliente = String(idCliente); 
    this.descricao = descricao;
    // Garante que o valor seja float/number
    this.valor = parseFloat(valor);
    this.metodoPagamento = metodoPagamento;
  }

  /**
   * Realiza a validação dos dados da entidade, incluindo o método de pagamento.
   * @throws {Error} Se algum dado for inválido ou estiver faltando.
   */
  validar() {
    if (!this.idCliente) {
      throw new Error("O ID do cliente é obrigatório.");
    }
    if (!this.descricao || this.descricao.trim() === '') {
      throw new Error("A descrição é obrigatória.");
    }
    if (this.valor <= 0 || isNaN(this.valor)) {
      throw new Error("O valor deve ser um número positivo.");
    }
    // Validação estrita do método de pagamento
    if (!Object.values(MetodosPagamento).includes(this.metodoPagamento)) {
      throw new Error(`Método de pagamento inválido. Deve ser um dos seguintes: ${Object.values(MetodosPagamento).join(', ')}.`);
    }
  }
}

export default Pagamento;