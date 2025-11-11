/*
  Warnings:

  - Added the required column `senha` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "senha" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ClienteFilmeFavorito" (
    "id" SERIAL NOT NULL,
    "idFilme" INTEGER NOT NULL,
    "idCliente" INTEGER NOT NULL,

    CONSTRAINT "ClienteFilmeFavorito_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClienteFilmeFavorito_idCliente_idFilme_key" ON "ClienteFilmeFavorito"("idCliente", "idFilme");

-- AddForeignKey
ALTER TABLE "ClienteFilmeFavorito" ADD CONSTRAINT "ClienteFilmeFavorito_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
