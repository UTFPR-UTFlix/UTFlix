/**
 * Representa o modelo Cliente definido no schema.prisma.
 * É uma representação simples para uso em JavaScript (ex: front-end, mocks).
 */
class Cliente {
  /**
   * @param {number} id - O ID único do cliente.
   * @param {string} nome - O nome do cliente.
   * @param {string} email - O email único do cliente.
   * @param {string} senha - A senha do cliente (geralmente não deve ser exposta diretamente).
   * @param {Date} [createdAt=new Date()] - Data de criação do registro.
   * @param {Array<Object>} [filmesFavoritos=[]] - Lista dos registros de ClienteFilmeFavorito associados.
   */
  constructor(id, nome, email, senha, createdAt = new Date(), filmesFavoritos = []) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha; // Cuidado! Em produção, a senha nunca deve ser manipulada assim.
    this.createdAt = createdAt;
    this.filmesFavoritos = filmesFavoritos;
  }

  /**
   * Método de exemplo para exibir informações do cliente.
   */
  getDetalhes() {
    return `ID: ${this.id}, Nome: ${this.nome}, Email: ${this.email}, Criado em: ${this.createdAt.toLocaleDateString()}`;
  }

  /**
   * Método de exemplo para adicionar um favorito.
   * (Em uma aplicação real, isso envolveria uma chamada à API/Prisma).
   */
  adicionarFilmeFavorito(idFilme) {
    const novoFavorito = {
      id: Date.now(), // Simulação de um novo ID
      idFilme: idFilme,
      idCliente: this.id
      // Mais campos do ClienteFilmeFavorito se necessário (e.g., createdAt)
    };
    this.filmesFavoritos.push(novoFavorito);
    return novoFavorito;
  }
}

// --- Exemplo de Uso ---
const cliente1 = new Cliente(
  1,
  "Ana Silva",
  "ana@exemplo.com",
  "senhaSegura123"
);

cliente1.adicionarFilmeFavorito(101);
cliente1.adicionarFilmeFavorito(205);

console.log(cliente1.getDetalhes());
console.log("Filmes Favoritos:", cliente1.filmesFavoritos);

// Exportar a classe, se estiver em um módulo Node.js
// export default Cliente;