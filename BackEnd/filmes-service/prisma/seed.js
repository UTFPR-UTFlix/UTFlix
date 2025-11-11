// prisma/seed.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Lista de gêneros padrão que você quer criar
const generosPadrao = [
  "Ação",
  "Comédia",
  "Drama",
  "Ficção Científica",
  "Terror",
  "Suspense",
  "Romance",
  "Documentário",
  "Animação",
  "Aventura",
  "Fantasia",
  "Musical",
  "Faroeste",
];

async function main() {
  console.log(`Iniciando o seeding da tabela Genero...`);

  for (const nomeGenero of generosPadrao) {
    // Usamos 'upsert' em vez de 'create'
    // Isso evita erros se o script rodar mais de uma vez.
    // Ele tenta encontrar um gênero com esse nome:
    // - Se encontrar, não faz nada (update: {}).
    // - Se NÃO encontrar, ele cria (create: { genero: nomeGenero }).
    await prisma.genero.upsert({
      where: { genero: nomeGenero }, // Campo com constraint @unique
      update: {}, // O que fazer se encontrar (nada)
      create: {
        genero: nomeGenero,
      },
    });
  }

  console.log(`Seeding finalizado com sucesso.`);
}

// Executa a função main e trata erros
main()
  .catch((e) => {
    console.error("Erro durante o seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Fecha a conexão com o banco
    await prisma.$disconnect();
  });