// Genero.js

class Genero {
  /**
   * @param {object} props
   * @param {string} props.genero - O nome do gênero (ex: "Ação").
   * @param {number | null} [props.idGenero] - O ID (geralmente nulo ao criar).
   */
  constructor({ genero, idGenero = null }) {
    this.idGenero = idGenero;
    this.genero = genero;
  }
}

// Exporta a classe para ser usada em outros arquivos
module.exports = Genero;