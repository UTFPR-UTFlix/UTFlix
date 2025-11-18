-- CreateTable
CREATE TABLE "Ator" (
    "idAtor" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Ator_pkey" PRIMARY KEY ("idAtor")
);

-- CreateTable
CREATE TABLE "FilmeAtor" (
    "idFilmeAtor" SERIAL NOT NULL,
    "personagem" TEXT,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "idFilme" INTEGER NOT NULL,
    "idAtor" INTEGER NOT NULL,

    CONSTRAINT "FilmeAtor_pkey" PRIMARY KEY ("idFilmeAtor")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilmeAtor_idFilme_idAtor_key" ON "FilmeAtor"("idFilme", "idAtor");

-- AddForeignKey
ALTER TABLE "FilmeAtor" ADD CONSTRAINT "FilmeAtor_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("idFilme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmeAtor" ADD CONSTRAINT "FilmeAtor_idAtor_fkey" FOREIGN KEY ("idAtor") REFERENCES "Ator"("idAtor") ON DELETE CASCADE ON UPDATE CASCADE;
