/*
  Warnings:

  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Experience` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Experience_level_key";

-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("level");
