// Filme.js

class Filme {
  /**
   * @param {object} props
   * @param {string} props.titulo - O título do filme.
   * @param {number} props.anoLancamento - O ano de lançamento.
   * @param {number | null} [props.idFilme] - O ID (geralmente nulo ao criar).
   * @param {Date} [props.createdAt] - A data de criação.
   * @param {Genero[]} [props.generos] - Array de objetos Genero associados.
   */
  constructor({ titulo, anoLancamento, idFilme = null, createdAt = new Date(), generos = [] }) {
    // Propriedades diretas do modelo
    this.idFilme = idFilme;
    this.titulo = titulo;
    this.anoLancamento = anoLancamento;
    this.createdAt = createdAt;

    // Propriedade da relação
    this.generos = generos;
  }

  // Você pode adicionar métodos aqui (ex: validação)
  validar() {
    if (!this.titulo || this.titulo.trim() === '') {
      throw new Error("O título é obrigatório.");
    }
    if (!this.anoLancamento || this.anoLancamento < 1888) {
      throw new Error("Ano de lançamento inválido.");
    }
  }
}

// Exporta a classe para ser usada em outros arquivos
module.exports = Filme;