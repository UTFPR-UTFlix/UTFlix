/*
  Warnings:

  - The primary key for the `Filme` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ano` on the `Filme` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `Filme` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Filme` table. All the data in the column will be lost.
  - Added the required column `anoLancamento` to the `Filme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filme" DROP CONSTRAINT "Filme_pkey",
DROP COLUMN "ano",
DROP COLUMN "genero",
DROP COLUMN "id",
ADD COLUMN     "anoLancamento" INTEGER NOT NULL,
ADD COLUMN     "idFilme" SERIAL NOT NULL,
ADD CONSTRAINT "Filme_pkey" PRIMARY KEY ("idFilme");

-- CreateTable
CREATE TABLE "Genero" (
    "idGenero" SERIAL NOT NULL,
    "genero" TEXT NOT NULL,

    CONSTRAINT "Genero_pkey" PRIMARY KEY ("idGenero")
);

-- CreateTable
CREATE TABLE "FilmeGenero" (
    "idFilmeGenero" SERIAL NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "idFilme" INTEGER NOT NULL,
    "idGenero" INTEGER NOT NULL,

    CONSTRAINT "FilmeGenero_pkey" PRIMARY KEY ("idFilmeGenero")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genero_genero_key" ON "Genero"("genero");

-- CreateIndex
CREATE UNIQUE INDEX "FilmeGenero_idFilme_idGenero_key" ON "FilmeGenero"("idFilme", "idGenero");

-- AddForeignKey
ALTER TABLE "FilmeGenero" ADD CONSTRAINT "FilmeGenero_idFilme_fkey" FOREIGN KEY ("idFilme") REFERENCES "Filme"("idFilme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmeGenero" ADD CONSTRAINT "FilmeGenero_idGenero_fkey" FOREIGN KEY ("idGenero") REFERENCES "Genero"("idGenero") ON DELETE CASCADE ON UPDATE CASCADE;
